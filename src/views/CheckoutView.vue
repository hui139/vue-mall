<template>
  <div class="checkout page-wrap">
    <div class="section-head">
      <h1 class="section-title">确认订单</h1>
      <RouterLink to="/cart" class="section-more">
        <el-icon><ArrowLeft /></el-icon> 返回购物车
      </RouterLink>
    </div>

    <!-- 收货地址 -->
    <section class="card block">
      <div class="block__head">
        <h2 class="block__title"><el-icon><Location /></el-icon> 收货地址</h2>
        <button class="block__action" @click="addressDialog = true">
          <el-icon><Plus /></el-icon> 新增地址
        </button>
      </div>

      <div v-if="selectedAddress" class="addr addr--active">
        <div class="addr__main">
          <div class="addr__line">
            <strong>{{ selectedAddress.name }}</strong>
            <span class="addr__phone">{{ selectedAddress.phone }}</span>
            <span v-if="selectedAddress.tag" class="tag-line">{{ selectedAddress.tag }}</span>
          </div>
          <p class="addr__detail">
            {{ selectedAddress.region }} {{ selectedAddress.detail }}
          </p>
        </div>
        <button class="addr__edit" @click="openEdit(selectedAddress)">修改</button>
      </div>

      <el-empty v-else description="还没有收货地址，请先新增一个" />

      <!-- 可切换的其他地址 -->
      <div v-if="userStore.addresses.length > 1" class="addr-list">
        <button
          v-for="addr in userStore.addresses"
          :key="addr.id"
          class="addr-list__item"
          :class="{ 'is-active': selectedAddressId === addr.id }"
          @click="selectedAddressId = addr.id"
        >
          <span class="addr-list__name">{{ addr.name }} {{ addr.phone }}</span>
          <span class="addr-list__detail ellipsis">
            {{ addr.region }} {{ addr.detail }}
          </span>
        </button>
      </div>
    </section>

    <!-- 商品清单 -->
    <section class="card block">
      <div class="block__head">
        <h2 class="block__title"><el-icon><Goods /></el-icon> 商品清单</h2>
        <span class="text-sm text-3">共 {{ totalCount }} 件</span>
      </div>

      <div v-for="row in checkoutItems" :key="row.id" class="order-item">
        <RouterLink :to="`/products/${row.productId}`" class="order-item__media">
          <el-image :src="row.product.image" fit="cover" class="order-item__img">
            <template #error>
              <div class="order-item__img-fallback"><el-icon><Picture /></el-icon></div>
            </template>
          </el-image>
        </RouterLink>
        <div class="order-item__info">
          <RouterLink :to="`/products/${row.productId}`" class="order-item__name ellipsis-2">
            {{ row.product.name }}
          </RouterLink>
          <p class="text-xs text-3">{{ row.color || row.spec || '默认规格' }}</p>
        </div>
        <PriceTag :value="row.price" size="sm" class="order-item__price" />
        <span class="order-item__count text-sm text-3">×{{ row.count }}</span>
        <PriceTag :value="row.price * row.count" size="md" class="order-item__subtotal" />
      </div>
    </section>

    <!-- 优惠券 -->
    <section class="card block">
      <div class="block__head">
        <h2 class="block__title"><el-icon><Ticket /></el-icon> 优惠券</h2>
      </div>
      <div class="coupon-picker">
        <el-select v-model="selectedCouponId" placeholder="选择优惠券" class="coupon-picker__select">
          <el-option label="不使用优惠券" :value="''" />
          <el-option
            v-for="c in usableCoupons"
            :key="c.id"
            :label="`${c.name}（满 ${c.threshold} 减 ${c.discount}）`"
            :value="c.id"
          />
        </el-select>
        <RouterLink to="/coupon" class="section-more">去领券</RouterLink>
      </div>
    </section>

    <!-- 配送与备注 -->
    <section class="card block">
      <div class="block__head">
        <h2 class="block__title"><el-icon><Van /></el-icon> 配送方式</h2>
      </div>
      <p class="block__text">
        快递配送（顺丰 / 京东，随机发货）· 预计 {{ deliveryDays }} 内送达
      </p>
      <el-input
        v-model="remark"
        type="textarea"
        :rows="2"
        maxlength="50"
        show-word-limit
        placeholder="给商家留言，可填写对配送的要求"
        class="mt-3"
      />
    </section>

    <!-- 费用明细 -->
    <section class="card block">
      <div class="block__head">
        <h2 class="block__title"><el-icon><Wallet /></el-icon> 费用明细</h2>
      </div>
      <div class="fee">
        <div class="fee__row">
          <span>商品金额</span>
          <span>¥{{ formatMoney(goodsTotal) }}</span>
        </div>
        <div class="fee__row">
          <span>运费</span>
          <span>{{ freight === 0 ? '免运费' : `¥${formatMoney(freight)}` }}</span>
        </div>
        <div v-if="couponDiscount > 0" class="fee__row fee__row--cut">
          <span>优惠券抵扣</span>
          <span>-¥{{ formatMoney(couponDiscount) }}</span>
        </div>
        <div class="fee__row fee__row--total">
          <span>应付金额</span>
          <PriceTag :value="payable" size="lg" />
        </div>
      </div>
    </section>

    <!-- 提交栏 -->
    <div class="submit-bar">
      <div class="submit-bar__total">
        <span class="text-sm text-2">应付：</span>
        <PriceTag :value="payable" size="lg" />
      </div>
      <button class="btn btn--primary submit-bar__btn" :disabled="submitting" @click="onSubmit">
        <span v-if="submitting">提交中…</span>
        <span v-else>提交订单</span>
      </button>
    </div>

    <!-- 地址编辑弹窗 -->
    <DialogShell v-model="addressDialog" :title="editingId ? '编辑地址' : '新增地址'">
      <el-form :model="addressForm" label-width="72px" class="address-form">
        <el-form-item label="收货人" required>
          <el-input v-model="addressForm.name" placeholder="请输入收货人姓名" />
        </el-form-item>
        <el-form-item label="手机号" required>
          <el-input v-model="addressForm.phone" placeholder="请输入 11 位手机号" maxlength="11" />
        </el-form-item>
        <el-form-item label="所在地区" required>
          <el-input v-model="addressForm.region" placeholder="如：广东省 深圳市 南山区" />
        </el-form-item>
        <el-form-item label="详细地址" required>
          <el-input
            v-model="addressForm.detail"
            type="textarea"
            :rows="2"
            placeholder="街道、楼牌号等"
          />
        </el-form-item>
        <el-form-item label="标签">
          <el-radio-group v-model="addressForm.tag">
            <el-radio-button label="" value="">无</el-radio-button>
            <el-radio-button label="公司" value="公司">公司</el-radio-button>
            <el-radio-button label="家" value="家">家</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="addressForm.isDefault">设为默认地址</el-checkbox>
        </el-form-item>
      </el-form>

      <template #footer>
        <button class="btn btn--ghost btn--sm" @click="addressDialog = false">取消</button>
        <button class="btn btn--primary btn--sm" @click="onSaveAddress">保存</button>
      </template>
    </DialogShell>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import PriceTag from '@/components/common/PriceTag.vue'
import DialogShell from '@/components/common/DialogShell.vue'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'
import { useUserStore } from '@/stores/user'
import { coupons } from '@/data/user'
import { formatMoney } from '@/utils/format'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const userStore = useUserStore()

const FREIGHT = 10
const FREE_FREIGHT_LIMIT = 99

// ---------- 待结算商品 ----------
// 优先取购物车中已勾选的行；没有勾选则取全部；直接进结算页（详情页"立即购买"）时取最近加入的那件
const checkoutItems = computed(() => {
  if (cartStore.checkedItems.length) return cartStore.checkedItems
  if (cartStore.detailItems.length) return cartStore.detailItems
  const last = cartStore.lastAdded
  return last ? [{ ...last, product: last, count: 1 }] : []
})

const totalCount = computed(() =>
  checkoutItems.value.reduce((sum, item) => sum + item.count, 0)
)

const goodsTotal = computed(() =>
  checkoutItems.value.reduce((sum, item) => sum + item.price * item.count, 0)
)

const freight = computed(() =>
  goodsTotal.value >= FREE_FREIGHT_LIMIT || goodsTotal.value === 0 ? 0 : FREIGHT
)

// ---------- 地址 ----------
const selectedAddressId = ref('')
const selectedAddress = computed(() => {
  const list = userStore.addresses
  return list.find((a) => a.id === selectedAddressId.value) || userStore.defaultAddress
})

onMounted(() => {
  selectedAddressId.value = userStore.defaultAddress?.id || userStore.addresses[0]?.id || ''
})

const addressDialog = ref(false)
const editingId = ref('')
const addressForm = reactive({
  name: '',
  phone: '',
  region: '',
  detail: '',
  tag: '',
  isDefault: false
})

function openEdit(addr) {
  editingId.value = addr.id
  Object.assign(addressForm, { ...addr })
  addressDialog.value = true
}

function onSaveAddress() {
  const { name, phone, region, detail } = addressForm
  if (!name || !phone || !region || !detail) {
    ElMessage.warning('请把收货信息填写完整')
    return
  }
  if (!/^1\d{10}$/.test(phone)) {
    ElMessage.warning('请输入正确的 11 位手机号')
    return
  }
  if (editingId.value) {
    userStore.updateAddress(editingId.value, { ...addressForm })
    ElMessage.success('地址已更新')
  } else {
    const created = userStore.addAddress({ ...addressForm })
    selectedAddressId.value = created.id
    ElMessage.success('地址已添加')
  }
  addressDialog.value = false
  editingId.value = ''
  Object.assign(addressForm, {
    name: '', phone: '', region: '', detail: '', tag: '', isDefault: false
  })
}

// ---------- 优惠券 ----------
const selectedCouponId = ref('')

const usableCoupons = computed(() =>
  coupons.filter((c) => goodsTotal.value >= c.threshold)
)

const selectedCoupon = computed(() =>
  coupons.find((c) => c.id === selectedCouponId.value) || null
)

const couponDiscount = computed(() => selectedCoupon.value?.discount || 0)

const payable = computed(() =>
  Math.max(0, goodsTotal.value + freight.value - couponDiscount.value)
)

const deliveryDays = computed(() => {
  const d = new Date()
  const day = new Date(d)
  day.setDate(d.getDate() + 2)
  const fmt = (x) => `${x.getMonth() + 1}月${x.getDate()}日`
  return `${fmt(d)} - ${fmt(day)}`
})

// ---------- 备注与提交 ----------
const remark = ref('')
const submitting = ref(false)

async function onSubmit() {
  if (!selectedAddress.value) {
    ElMessage.warning('请先选择收货地址')
    return
  }
  if (!checkoutItems.value.length) {
    ElMessage.warning('没有可结算的商品')
    return
  }

  submitting.value = true
  // 模拟提交订单的网络过程
  await new Promise((resolve) => setTimeout(resolve, 800))

  const order = orderStore.createOrder({
    items: checkoutItems.value.map((item) => ({
      productId: item.productId,
      spec: item.spec,
      color: item.color,
      price: item.price,
      count: item.count
    })),
    total: payable.value,
    freight: freight.value,
    address: {
      name: selectedAddress.value.name,
      phone: selectedAddress.value.phone,
      region: selectedAddress.value.region,
      detail: selectedAddress.value.detail
    },
    remark: remark.value,
    couponDiscount: couponDiscount.value
  })

  // 下单成功后清空购物车中已结算的行
  cartStore.clearChecked()
  submitting.value = false

  ElMessage.success('订单提交成功，请尽快完成支付')
  router.replace(`/pay/${order.id}`)
}
</script>

<style scoped>
.checkout {
  max-width: 1000px;
  padding-top: var(--sp-5);
  padding-bottom: var(--sp-8);
}

.block {
  padding: var(--sp-5);
  margin-bottom: var(--sp-4);
}

.block__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
  margin-bottom: var(--sp-3);
}

.block__title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--fs-md);
  font-weight: 700;
}

.block__title :deep(.el-icon) {
  color: var(--c-brand);
}

.block__action {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: var(--fs-sm);
  color: var(--c-brand);
}

.block__text {
  font-size: var(--fs-sm);
  color: var(--c-text-2);
}

/* ---------- 地址 ---------- */
.addr {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3);
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
}

.addr--active {
  border-color: var(--c-brand);
  background: var(--c-brand-soft);
}

.addr__main {
  flex: 1;
  min-width: 0;
}

.addr__line {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: 4px;
}

.addr__phone {
  color: var(--c-text-2);
  font-size: var(--fs-sm);
}

.addr__detail {
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  line-height: 1.6;
}

.addr__edit {
  font-size: var(--fs-sm);
  color: var(--c-brand);
  flex-shrink: 0;
}

.addr-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--sp-2);
  margin-top: var(--sp-3);
}

.addr-list__item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: var(--sp-3);
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  text-align: left;
  transition: all var(--dur) var(--ease);
}

.addr-list__item:hover {
  border-color: var(--c-brand);
}

.addr-list__item.is-active {
  border-color: var(--c-brand);
  background: var(--c-brand-soft);
}

.addr-list__name {
  font-size: var(--fs-sm);
  font-weight: 600;
}

/* ---------- 商品行 ---------- */
.order-item {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3) 0;
  border-top: 1px solid var(--c-border);
}

.order-item__media {
  flex-shrink: 0;
}

.order-item__img {
  width: 64px;
  height: 64px;
  border-radius: var(--r-sm);
  background: var(--c-bg-muted);
}

.order-item__img-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-4);
}

.order-item__info {
  flex: 1;
  min-width: 0;
}

.order-item__name {
  font-size: var(--fs-sm);
  line-height: 1.45;
}

.order-item__name:hover {
  color: var(--c-brand);
}

.order-item__price {
  width: 76px;
  flex-shrink: 0;
}

.order-item__count {
  width: 44px;
  flex-shrink: 0;
}

.order-item__subtotal {
  width: 92px;
  text-align: right;
  flex-shrink: 0;
}

/* ---------- 优惠券选择 ---------- */
.coupon-picker {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.coupon-picker__select {
  flex: 1;
  max-width: 380px;
}

/* ---------- 费用 ---------- */
.fee__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 0;
  font-size: var(--fs-base);
  color: var(--c-text-2);
}

.fee__row--cut {
  color: var(--c-danger);
}

.fee__row--total {
  margin-top: var(--sp-2);
  padding-top: var(--sp-3);
  border-top: 1px dashed var(--c-border);
  font-weight: 600;
  color: var(--c-text);
}

/* ---------- 提交栏：PC 端普通文档流，不做底部固定 ---------- */
.submit-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--sp-5);
  margin-top: var(--sp-4);
  padding: var(--sp-4) var(--sp-6);
  background: var(--c-bg-elevated);
  border: 1px solid var(--c-border);
  border-radius: var(--r-lg);
  box-shadow: var(--sh-sm);
}

.submit-bar__total {
  display: flex;
  align-items: baseline;
  gap: var(--sp-2);
}

.submit-bar__btn {
  height: 46px;
  padding: 0 var(--sp-10);
  font-size: var(--fs-lg);
}

.address-form {
  padding-top: var(--sp-2);
}
</style>

<template>
  <div class="order-detail page-wrap">
    <div class="section-head">
      <h1 class="section-title">订单详情</h1>
      <RouterLink to="/orders" class="section-more">
        <el-icon><ArrowLeft /></el-icon> 返回订单列表
      </RouterLink>
    </div>

    <div v-if="!order" class="card">
      <EmptyState
        icon="WarnTriangleFilled"
        title="订单不存在"
        description="该订单可能已被删除"
        action-text="查看我的订单"
        action-to="/orders"
      />
    </div>

    <template v-else>
      <!-- 状态条 -->
      <section class="status-bar" :class="`status-bar--${statusInfo.type}`">
        <div>
          <h2 class="status-bar__title">{{ statusInfo.label }}</h2>
          <p class="status-bar__desc">{{ statusInfo.desc }}</p>
        </div>
        <el-icon :size="52" class="status-bar__icon"><CircleCheckFilled /></el-icon>
      </section>

      <!-- 收货地址 -->
      <section class="card block">
        <h2 class="block__title"><el-icon><Location /></el-icon> 收货信息</h2>
        <p class="block__line">
          <strong>{{ order.address.name }}</strong>
          <span class="block__phone">{{ order.address.phone }}</span>
        </p>
        <p class="block__text">
          {{ order.address.region }} {{ order.address.detail }}
        </p>
        <p v-if="order.remark" class="block__remark">买家留言：{{ order.remark }}</p>
      </section>

      <!-- 商品 -->
      <section class="card block">
        <h2 class="block__title"><el-icon><Goods /></el-icon> 商品信息</h2>
        <div v-for="(item, idx) in order.items" :key="idx" class="goods">
          <RouterLink :to="`/products/${item.productId}`" class="goods__media">
            <el-image :src="item.product.image" fit="cover" class="goods__img">
              <template #error>
                <div class="goods__img-fallback"><el-icon><Picture /></el-icon></div>
              </template>
            </el-image>
          </RouterLink>
          <div class="goods__info">
            <RouterLink :to="`/products/${item.productId}`" class="goods__name ellipsis-2">
              {{ item.product.name }}
            </RouterLink>
            <p class="text-xs text-3">{{ item.spec || '默认规格' }}</p>
          </div>
          <PriceTag :value="item.price" size="sm" class="goods__price" />
          <span class="goods__count text-sm text-3">×{{ item.count }}</span>
        </div>
      </section>

      <!-- 费用与订单信息 -->
      <section class="card block">
        <h2 class="block__title"><el-icon><Tickets /></el-icon> 费用与信息</h2>
        <div class="info-row">
          <span>商品金额</span>
          <span>¥{{ formatMoney(goodsTotal) }}</span>
        </div>
        <div class="info-row">
          <span>运费</span>
          <span>{{ order.freight === 0 ? '免运费' : `¥${formatMoney(order.freight)}` }}</span>
        </div>
        <div v-if="order.couponDiscount > 0" class="info-row info-row--cut">
          <span>优惠券抵扣</span>
          <span>-¥{{ formatMoney(order.couponDiscount) }}</span>
        </div>
        <div class="info-row info-row--total">
          <span>实付款</span>
          <PriceTag :value="order.total" size="lg" />
        </div>
        <div class="info-row">
          <span>订单编号</span>
          <span>{{ order.id }}</span>
        </div>
        <div class="info-row">
          <span>下单时间</span>
          <span>{{ order.createdAt }}</span>
        </div>
        <div class="info-row">
          <span>配送方式</span>
          <span>快递配送（顺丰 / 京东）</span>
        </div>
      </section>

      <!-- 操作 -->
      <div class="detail-actions">
        <template v-if="order.status === 'pending'">
          <button class="btn btn--ghost" @click="onCancel">取消订单</button>
          <RouterLink :to="`/pay/${order.id}`" class="btn btn--primary">去支付</RouterLink>
        </template>
        <template v-else-if="order.status === 'shipped'">
          <button class="btn btn--primary" @click="onConfirm">确认收货</button>
        </template>
        <template v-else-if="order.status === 'done' || order.status === 'cancelled'">
          <button class="btn btn--ghost" @click="onRepurchase">再次购买</button>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import PriceTag from '@/components/common/PriceTag.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useOrderStore } from '@/stores/order'
import { useCartStore } from '@/stores/cart'
import { orderStatusMap } from '@/data/orders'
import { formatMoney } from '@/utils/format'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()
const cartStore = useCartStore()

const order = computed(() => orderStore.getById(String(route.params.id)))

const statusInfo = computed(
  () => orderStatusMap[order.value?.status] || { label: '未知', type: 'plain', desc: '' }
)

const goodsTotal = computed(() =>
  order.value ? order.value.items.reduce((sum, item) => sum + item.price * item.count, 0) : 0
)

async function onCancel() {
  await ElMessageBox.confirm('取消后订单不可恢复，确定要取消该订单吗？', '取消订单', {
    confirmButtonText: '确定取消',
    cancelButtonText: '再想想',
    type: 'warning'
  })
  orderStore.cancelOrder(order.value.id)
  ElMessage.success('订单已取消')
  router.replace('/orders')
}

async function onConfirm() {
  await ElMessageBox.confirm('请确认已收到商品，确认后订单将标记为已完成。', '确认收货', {
    confirmButtonText: '确认收货',
    cancelButtonText: '取消',
    type: 'success'
  })
  orderStore.confirmReceive(order.value.id)
  ElMessage.success('已确认收货，交易完成')
}

/** 再次购买：把订单里的商品重新加回购物车并去结算 */
function onRepurchase() {
  order.value.items.forEach((item) => cartStore.addToCart(item.product, { count: item.count, spec: item.spec }))
  ElMessage.success('已将订单商品加入购物车')
  router.push('/cart')
}
</script>

<style scoped>
.order-detail {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-8);
  max-width: 860px;
}

.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
  padding: var(--sp-5) var(--sp-6);
  border-radius: var(--r-lg);
  margin-bottom: var(--sp-3);
  background: var(--c-bg-elevated);
  box-shadow: var(--sh-sm);
}

.status-bar--success { background: linear-gradient(135deg, #e8f8f0 0%, #d5f0e2 100%); }
.status-bar--warning { background: linear-gradient(135deg, #fff6e6 0%, #ffeccc 100%); }
.status-bar--info { background: linear-gradient(135deg, #eaf1ff 0%, #dbe7ff 100%); }
.status-bar--plain { background: var(--c-bg-elevated); }

.status-bar__title {
  font-size: var(--fs-xl);
  font-weight: 700;
  margin-bottom: 2px;
}

.status-bar__desc {
  font-size: var(--fs-sm);
  color: var(--c-text-2);
}

.status-bar__icon {
  color: var(--c-brand);
  opacity: 0.35;
}

.status-bar--success .status-bar__icon { color: var(--c-success); }
.status-bar--warning .status-bar__icon { color: var(--c-warning); }
.status-bar--info .status-bar__icon { color: var(--c-info); }
.status-bar--plain .status-bar__icon { color: var(--c-text-4); }

.block {
  padding: var(--sp-4);
  margin-bottom: var(--sp-3);
}

.block__title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--fs-md);
  font-weight: 700;
  margin-bottom: var(--sp-3);
}

.block__title :deep(.el-icon) {
  color: var(--c-brand);
}

.block__line {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: 4px;
}

.block__phone {
  color: var(--c-text-2);
  font-size: var(--fs-sm);
}

.block__text {
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  line-height: 1.6;
}

.block__remark {
  margin-top: var(--sp-2);
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--r-sm);
  background: var(--c-bg-muted);
  font-size: var(--fs-sm);
  color: var(--c-text-2);
}

.goods {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-2) 0;
  border-top: 1px solid var(--c-border);
}

.goods__img {
  width: 64px;
  height: 64px;
  border-radius: var(--r-sm);
  background: var(--c-bg-muted);
  flex-shrink: 0;
}

.goods__img-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-4);
}

.goods__info {
  flex: 1;
  min-width: 0;
}

.goods__name {
  font-size: var(--fs-sm);
  line-height: 1.45;
  margin-bottom: 2px;
}

.goods__name:hover {
  color: var(--c-brand);
}

.goods__price {
  width: 80px;
  flex-shrink: 0;
}

.goods__count {
  width: 48px;
  text-align: right;
  flex-shrink: 0;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
  padding: 7px 0;
  font-size: var(--fs-base);
  color: var(--c-text-2);
}

.info-row--cut {
  color: var(--c-danger);
}

.info-row--total {
  margin: var(--sp-2) 0;
  padding: var(--sp-3) 0;
  border-top: 1px dashed var(--c-border);
  border-bottom: 1px dashed var(--c-border);
  font-weight: 600;
  color: var(--c-text);
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--sp-3);
  margin-top: var(--sp-5);
}
</style>

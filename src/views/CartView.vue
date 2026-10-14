<template>
  <div class="cart page-wrap">
    <div class="section-head">
      <h1 class="section-title">购物车</h1>
      <span class="text-sm text-3">共 {{ cartCount }} 件商品</span>
    </div>

    <!-- 空购物车 -->
    <div v-if="cartStore.isEmpty" class="card">
      <EmptyState
        icon="ShoppingCart"
        title="购物车还是空的"
        description="挑几件喜欢的商品吧，满 99 元免运费"
        action-text="去逛逛"
        action-to="/products"
      />
    </div>

    <template v-else>
      <div class="cart__table card">
        <!-- 表头 -->
        <div class="cart__thead">
          <el-checkbox
            :model-value="cartStore.allChecked"
            class="cart__th cart__th--check"
            @change="cartStore.toggleAll"
          >
            全选
          </el-checkbox>
          <span class="cart__th cart__th--info">商品信息</span>
          <span class="cart__th cart__th--price">单价</span>
          <span class="cart__th cart__th--qty">数量</span>
          <span class="cart__th cart__th--subtotal">小计</span>
          <span class="cart__th cart__th--op">操作</span>
        </div>

        <!-- 商品行 -->
        <div
          v-for="row in cartStore.detailItems"
          :key="row.id"
          class="cart__row"
          :class="{ 'is-unchecked': !row.checked }"
        >
          <el-checkbox
            :model-value="row.checked"
            class="cart__td cart__td--check"
            @change="cartStore.toggleChecked(row.id)"
          />

          <div class="cart__td cart__td--info">
            <RouterLink :to="`/products/${row.productId}`" class="cart__media">
              <el-image :src="row.product.image" fit="cover" class="cart__img">
                <template #error>
                  <div class="cart__img-fallback"><el-icon><Picture /></el-icon></div>
                </template>
              </el-image>
            </RouterLink>
            <div class="cart__desc">
              <RouterLink :to="`/products/${row.productId}`" class="cart__name ellipsis-2">
                {{ row.product.name }}
              </RouterLink>
              <p class="cart__spec text-xs text-3 ellipsis">
                <template v-if="row.color">{{ row.color }}</template>
                <template v-if="row.color && row.spec"> · </template>
                <template v-if="row.spec">{{ row.spec }}</template>
              </p>
            </div>
          </div>

          <div class="cart__td cart__td--price">
            <PriceTag :value="row.price" size="sm" />
          </div>

          <div class="cart__td cart__td--qty">
            <StepperInput
              :model-value="row.count"
              :max="row.product.stock"
              size="sm"
              @update:model-value="cartStore.updateCount(row.id, $event)"
            />
            <span class="text-xs text-3">库存 {{ row.product.stock }}</span>
          </div>

          <div class="cart__td cart__td--subtotal">
            <PriceTag :value="row.price * row.count" size="md" />
          </div>

          <div class="cart__td cart__td--op">
            <button class="cart__remove" title="删除" @click="onRemoveOne(row)">删除</button>
          </div>
        </div>

        <!-- 结算工具条（PC 端放在表格顶部，不做底部固定） -->
        <div class="settle-bar">
          <el-checkbox
            :model-value="cartStore.allChecked"
            @change="cartStore.toggleAll"
          >
            全选（共 {{ cartStore.count }} 件）
          </el-checkbox>

          <button class="settle-bar__del" @click="onRemoveChecked">
            <el-icon><Delete /></el-icon> 删除选中
          </button>

          <div class="settle-bar__total">
            已选 <strong>{{ cartStore.checkedCount }}</strong> 件，合计：
            <PriceTag :value="settleAmount" size="lg" />
            <span v-if="freightText" class="settle-bar__freight">{{ freightText }}</span>
          </div>

          <button
            class="btn btn--primary settle-bar__btn"
            :disabled="cartStore.checkedCount === 0"
            @click="onCheckout"
          >
            去结算
          </button>
        </div>
      </div>

      <!-- 推荐 -->
      <section class="section">
        <div class="section-head">
          <h2 class="section-title">猜你喜欢</h2>
          <RouterLink to="/products" class="section-more">查看更多</RouterLink>
        </div>
        <div class="grid grid-5">
          <ProductCard v-for="p in recommend" :key="p.id" :product="p" :show-favorite="false" />
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import PriceTag from '@/components/common/PriceTag.vue'
import StepperInput from '@/components/common/StepperInput.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import ProductCard from '@/components/common/ProductCard.vue'
import { useCartStore } from '@/stores/cart'
import { products } from '@/data/products'

const router = useRouter()
const cartStore = useCartStore()

const cartCount = computed(() => cartStore.count)

// 满 99 免运费，否则收 10 元运费
const FREIGHT = 10
const FREE_FREIGHT_LIMIT = 99

const settleAmount = computed(() => {
  const goods = cartStore.checkedTotal
  const freight = goods >= FREE_FREIGHT_LIMIT || goods === 0 ? 0 : FREIGHT
  return goods + freight
})

const freightText = computed(() => {
  const goods = cartStore.checkedTotal
  if (goods === 0) return ''
  return goods >= FREE_FREIGHT_LIMIT
    ? '已免运费'
    : `运费 ¥${FREIGHT}（满 ¥${FREE_FREIGHT_LIMIT} 免运）`
})

// 推荐：优先推购物车中没有的分类热销品
const recommend = computed(() => {
  const inCart = new Set(cartStore.items.map((i) => i.productId))
  return [...products]
    .filter((p) => !inCart.has(p.id))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5)
})

async function onRemoveOne(row) {
  await ElMessageBox.confirm(`确定要删除「${row.product.name}」吗？`, '删除商品', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning'
  })
  cartStore.removeItem(row.id)
  ElMessage.success('已删除')
}

async function onRemoveChecked() {
  if (!cartStore.checkedCount) {
    ElMessage.info('请先勾选要删除的商品')
    return
  }
  await ElMessageBox.confirm(
    `确定要删除选中的 ${cartStore.checkedCount} 件商品吗？`,
    '批量删除',
    { confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning' }
  )
  cartStore.removeChecked()
  ElMessage.success('已删除选中商品')
}

function onCheckout() {
  if (!cartStore.checkedCount) {
    ElMessage.warning('请先勾选要结算的商品')
    return
  }
  router.push('/checkout')
}
</script>

<style scoped>
.cart {
  padding-top: var(--sp-5);
  padding-bottom: var(--sp-8);
}

.cart__table {
  overflow: hidden;
}

/* ---------- 表头 ---------- */
.cart__thead {
  display: grid;
  grid-template-columns: 60px minmax(0, 1fr) 120px 150px 140px 80px;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-5);
  background: var(--c-bg-muted);
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--c-text-2);
}

.cart__th--info,
.cart__th--price,
.cart__th--qty,
.cart__th--subtotal {
  text-align: center;
}

/* ---------- 商品行 ---------- */
.cart__row {
  display: grid;
  grid-template-columns: 60px minmax(0, 1fr) 120px 150px 140px 80px;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-4) var(--sp-5);
  border-top: 1px solid var(--c-border);
  transition: background var(--dur) var(--ease), opacity var(--dur) var(--ease);
}

.cart__row:hover {
  background: var(--c-bg-hover);
}

.cart__row.is-unchecked {
  opacity: 0.55;
}

.cart__td--check {
  display: flex;
  justify-content: center;
}

.cart__td--info {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  min-width: 0;
}

.cart__img {
  width: 90px;
  height: 90px;
  border-radius: var(--r-md);
  background: var(--c-bg-muted);
  flex-shrink: 0;
}

.cart__img-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-4);
}

.cart__desc {
  flex: 1;
  min-width: 0;
}

.cart__name {
  font-size: var(--fs-base);
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 4px;
  transition: color var(--dur) var(--ease);
}

.cart__name:hover {
  color: var(--c-brand);
}

.cart__td--price,
.cart__td--subtotal {
  display: flex;
  justify-content: center;
  text-align: center;
}

.cart__td--qty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.cart__td--op {
  display: flex;
  justify-content: center;
}

.cart__remove {
  font-size: var(--fs-sm);
  color: var(--c-text-3);
  padding: 4px var(--sp-2);
  border-radius: var(--r-xs);
  transition: all var(--dur) var(--ease);
}

.cart__remove:hover {
  color: var(--c-danger);
  background: var(--c-danger-soft);
}

/* ---------- 结算工具条 ---------- */
.settle-bar {
  display: flex;
  align-items: center;
  gap: var(--sp-5);
  padding: var(--sp-4) var(--sp-5);
  background: var(--c-bg-muted);
  border-top: 1px solid var(--c-border);
}

.settle-bar__del {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  transition: color var(--dur) var(--ease);
}

.settle-bar__del:hover {
  color: var(--c-danger);
}

.settle-bar__total {
  margin-left: auto;
  display: flex;
  align-items: baseline;
  gap: var(--sp-2);
  font-size: var(--fs-base);
  color: var(--c-text-2);
}

.settle-bar__total strong {
  color: var(--c-brand);
}

.settle-bar__freight {
  font-size: var(--fs-sm);
  color: var(--c-success);
}

.settle-bar__btn {
  height: 42px;
  padding: 0 var(--sp-10);
  font-size: var(--fs-lg);
}
</style>

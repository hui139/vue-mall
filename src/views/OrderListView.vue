<template>
  <div class="orders page-wrap">
    <div class="section-head">
      <h1 class="section-title">我的订单</h1>
      <span class="text-sm text-3">共 {{ orderStore.count }} 笔</span>
    </div>

    <!-- 状态标签页 -->
    <div class="card tabs">
      <button
        v-for="tab in orderTabs"
        :key="tab.key"
        class="tabs__item"
        :class="{ 'is-active': activeTab === tab.key }"
        @click="switchTab(tab.key)"
      >
        {{ tab.label }}
        <span v-if="countOf(tab.key)" class="tabs__count">{{ countOf(tab.key) }}</span>
      </button>
    </div>

    <!-- 订单列表 -->
    <div v-if="list.length" class="orders__list">
      <article v-for="order in list" :key="order.id" class="card order">
        <header class="order__head">
          <div class="flex gap-3" style="min-width: 0">
            <span class="tag-line" :class="`tag-line--${statusInfo(order.status).type}`">
              {{ statusInfo(order.status).label }}
            </span>
            <span class="text-sm text-3 order__date">{{ order.createdAt }}</span>
          </div>
          <span class="text-sm text-3">订单号：{{ order.id }}</span>
        </header>

        <div class="order__items">
          <RouterLink
            v-for="(item, idx) in order.items"
            :key="`${order.id}-${idx}`"
            :to="`/products/${item.productId}`"
            class="order__item"
          >
            <el-image :src="item.product.image" fit="cover" class="order__img">
              <template #error>
                <div class="order__img-fallback"><el-icon><Picture /></el-icon></div>
              </template>
            </el-image>
            <div class="order__item-info">
              <p class="order__item-name ellipsis-2">{{ item.product.name }}</p>
              <p class="text-xs text-3">{{ item.spec || '默认规格' }}</p>
            </div>
            <div class="order__item-price">
              <PriceTag :value="item.price" size="sm" />
              <span class="text-xs text-3">×{{ item.count }}</span>
            </div>
          </RouterLink>
        </div>

        <footer class="order__foot">
          <div class="order__summary">
            共 {{ itemCount(order) }} 件，实付
            <PriceTag :value="order.total" size="md" />
          </div>

          <div class="order__actions">
            <template v-if="order.status === 'pending'">
              <button class="btn btn--ghost btn--sm" @click="onCancel(order)">取消订单</button>
              <RouterLink :to="`/pay/${order.id}`" class="btn btn--primary btn--sm">去支付</RouterLink>
            </template>
            <template v-else-if="order.status === 'shipped'">
              <RouterLink :to="`/order-detail/${order.id}`" class="btn btn--ghost btn--sm">查看物流</RouterLink>
              <button class="btn btn--primary btn--sm" @click="onConfirm(order)">确认收货</button>
            </template>
            <template v-else-if="order.status === 'paid'">
              <span class="text-sm text-3 order__tip">商家正在备货</span>
            </template>
            <template v-else-if="order.status === 'done'">
              <RouterLink :to="`/order-detail/${order.id}`" class="btn btn--ghost btn--sm">再次购买</RouterLink>
            </template>
            <RouterLink :to="`/order-detail/${order.id}`" class="btn btn--ghost btn--sm">
              订单详情
            </RouterLink>
          </div>
        </footer>
      </article>
    </div>

    <div v-else class="card">
      <EmptyState
        icon="Tickets"
        title="还没有相关订单"
        description="下单之后可以在这里查看订单状态"
        action-text="去逛逛"
        action-to="/products"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import PriceTag from '@/components/common/PriceTag.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useOrderStore } from '@/stores/order'
import { orderStatusMap, orderTabs } from '@/data/orders'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

const activeTab = ref(String(route.query.status || 'all'))

// 支持通过 URL 切换标签（从"个人中心"的订单入口跳转过来）
watch(
  () => route.query.status,
  (val) => {
    activeTab.value = String(val || 'all')
  }
)

const list = computed(() => orderStore.getByStatus(activeTab.value))

function switchTab(key) {
  activeTab.value = key
  router.replace({ name: 'orders', query: key === 'all' ? {} : { status: key } })
}

function statusInfo(status) {
  return orderStatusMap[status] || { label: '未知', type: 'plain' }
}

function countOf(key) {
  return key === 'all' ? 0 : orderStore.statusCount[key] || 0
}

function itemCount(order) {
  return order.items.reduce((sum, item) => sum + item.count, 0)
}

async function onCancel(order) {
  await ElMessageBox.confirm('取消后订单不可恢复，确定要取消该订单吗？', '取消订单', {
    confirmButtonText: '确定取消',
    cancelButtonText: '再想想',
    type: 'warning'
  })
  orderStore.cancelOrder(order.id)
  ElMessage.success('订单已取消')
}

async function onConfirm(order) {
  await ElMessageBox.confirm('请确认已收到商品，确认后订单将标记为已完成。', '确认收货', {
    confirmButtonText: '确认收货',
    cancelButtonText: '取消',
    type: 'success'
  })
  orderStore.confirmReceive(order.id)
  ElMessage.success('已确认收货，交易完成')
}
</script>

<style scoped>
.orders {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-8);
}

.tabs {
  display: flex;
  gap: var(--sp-1);
  padding: var(--sp-2);
  margin-bottom: var(--sp-3);
  overflow-x: auto;
}

.tabs__item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 7px var(--sp-4);
  border-radius: var(--r-full);
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  white-space: nowrap;
  transition: all var(--dur) var(--ease);
}

.tabs__item:hover {
  background: var(--c-bg-muted);
}

.tabs__item.is-active {
  background: var(--c-brand-gradient);
  color: #fff;
  font-weight: 600;
}

.tabs__count {
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: var(--r-full);
  background: var(--c-danger);
  color: #fff;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
}

.orders__list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.order__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--c-border);
}

.order__date {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order__items {
  padding: var(--sp-2) var(--sp-4);
}

.order__item {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-2) 0;
}

.order__img {
  width: 64px;
  height: 64px;
  border-radius: var(--r-sm);
  background: var(--c-bg-muted);
  flex-shrink: 0;
}

.order__img-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-4);
}

.order__item-info {
  flex: 1;
  min-width: 0;
}

.order__item-name {
  font-size: var(--fs-sm);
  line-height: 1.45;
  margin-bottom: 2px;
  transition: color var(--dur) var(--ease);
}

.order__item:hover .order__item-name {
  color: var(--c-brand);
}

.order__item-price {
  text-align: right;
  flex-shrink: 0;
}

.order__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  border-top: 1px solid var(--c-border);
  flex-wrap: wrap;
}

.order__summary {
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.order__actions {
  display: flex;
  gap: var(--sp-2);
  flex-wrap: wrap;
}

.order__tip {
  color: var(--c-text-3);
}

</style>

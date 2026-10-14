<template>
  <div class="user page-wrap">
    <!-- 用户卡片 -->
    <section class="card profile">
      <div class="profile__bg"></div>
      <div class="profile__body">
        <el-avatar :size="64" :src="userStore.user?.avatar" class="profile__avatar" />
        <div class="profile__info">
          <h1 class="profile__name">
            {{ userStore.nickname }}
            <span class="profile__level">{{ userStore.user?.level }}</span>
          </h1>
          <p class="profile__phone">
            <el-icon :size="14"><Iphone /></el-icon> {{ userStore.user?.phone }}
          </p>
        </div>
        <button class="btn btn--ghost btn--sm profile__logout" @click="onLogout">退出登录</button>
      </div>

      <!-- 资产 -->
      <div class="profile__assets">
        <RouterLink to="/coupon" class="profile__asset">
          <span class="profile__asset-num">{{ userStore.user?.couponCount ?? 0 }}</span>
          <span class="profile__asset-label">优惠券</span>
        </RouterLink>
        <div class="profile__asset">
          <span class="profile__asset-num">{{ userStore.user?.points ?? 0 }}</span>
          <span class="profile__asset-label">积分</span>
        </div>
        <div class="profile__asset">
          <span class="profile__asset-num">¥{{ formatMoney(userStore.user?.balance ?? 0) }}</span>
          <span class="profile__asset-label">余额</span>
        </div>
        <RouterLink to="/favorite" class="profile__asset">
          <span class="profile__asset-num">{{ favoriteStore.count }}</span>
          <span class="profile__asset-label">收藏</span>
        </RouterLink>
      </div>
    </section>

    <!-- 我的订单 -->
    <section class="card block">
      <div class="block__head">
        <h2 class="block__title">我的订单</h2>
        <RouterLink to="/orders" class="section-more">
          全部订单 <el-icon><ArrowRight /></el-icon>
        </RouterLink>
      </div>
      <div class="order-nav">
        <RouterLink
          v-for="nav in orderNavs"
          :key="nav.key"
          :to="{ name: 'orders', query: { status: nav.key } }"
          class="order-nav__item"
        >
          <div class="order-nav__icon">
            <el-badge :value="nav.count" :hidden="!nav.count" :max="99">
              <el-icon :size="22"><component :is="nav.icon" /></el-icon>
            </el-badge>
          </div>
          <span class="order-nav__label">{{ nav.label }}</span>
        </RouterLink>
      </div>
    </section>

    <!-- 消费数据概览 -->
    <section class="card block">
      <div class="block__head">
        <h2 class="block__title">消费数据概览</h2>
        <RouterLink to="/dashboard" class="section-more">
          数据看板 <el-icon><ArrowRight /></el-icon>
        </RouterLink>
      </div>

      <div class="stat-strip">
        <div v-for="s in quickStats" :key="s.key" class="stat-strip__item">
          <span class="stat-strip__num">
            <span v-if="s.prefix" class="stat-strip__prefix">{{ s.prefix }}</span>{{ s.value }}
          </span>
          <span class="stat-strip__label">{{ s.label }}</span>
        </div>
      </div>

      <!-- 近 6 个月迷你走势 -->
      <div class="mini-chart">
        <div class="mini-chart__head">
          <span class="text-xs text-3">近 6 个月消费走势</span>
          <span class="text-xs text-3">
            月均 ¥{{ formatMoney(avgMonthly) }}
          </span>
        </div>
        <div class="mini-chart__bars">
          <div
            v-for="(m, i) in recentMonths"
            :key="m.month"
            class="mini-chart__col"
            :title="`${m.month} · ¥${formatMoney(m.amount)} · ${m.orders} 笔`"
          >
            <div
              class="mini-chart__bar"
              :style="{ height: miniHeights[i] + '%' }"
            ></div>
            <span class="mini-chart__label">{{ Number(m.month.slice(5)) }}月</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 常用功能 -->
    <section class="card block">
      <h2 class="block__title">常用功能</h2>
      <div class="func-grid">
        <RouterLink v-for="f in functions" :key="f.to" :to="f.to" class="func">
          <span class="func__icon" :style="{ background: f.bg, color: f.color }">
            <el-icon :size="18"><component :is="f.icon" /></el-icon>
          </span>
          <span class="func__label">{{ f.label }}</span>
        </RouterLink>
      </div>
    </section>

    <!-- 浏览记录 -->
    <section v-if="favoriteStore.historyCount" class="section">
      <div class="section-head">
        <h2 class="section-title">最近浏览</h2>
        <RouterLink to="/history" class="section-more">全部记录</RouterLink>
      </div>
      <div class="grid grid-5">
        <ProductCard
          v-for="p in favoriteStore.historyProducts.slice(0, 5)"
          :key="p.id"
          :product="p"
          :show-favorite="false"
        />
      </div>
    </section>

    <footer class="footer text-sm text-3">
      云购商城 v1.0.0 · 纯前端演示项目 · 无后端服务
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import ProductCard from '@/components/common/ProductCard.vue'
import { useUserStore } from '@/stores/user'
import { useOrderStore } from '@/stores/order'
import { useFavoriteStore } from '@/stores/favorite'
import { monthlySpending } from '@/data/user'
import { formatMoney } from '@/utils/format'
import { summarizeOrders, toPercentHeights } from '@/utils/stats'

const router = useRouter()
const userStore = useUserStore()
const orderStore = useOrderStore()
const favoriteStore = useFavoriteStore()
const { statusCount, detailOrders } = storeToRefs(orderStore)

const orderNavs = computed(() => [
  { key: 'pending', label: '待付款', icon: 'Wallet', count: statusCount.value.pending },
  { key: 'paid', label: '待发货', icon: 'Box', count: statusCount.value.paid },
  { key: 'shipped', label: '待收货', icon: 'Van', count: statusCount.value.shipped },
  { key: 'done', label: '已完成', icon: 'CircleCheck', count: statusCount.value.done }
])

// ---------- 消费数据概览 ----------
const orderSummary = computed(() => summarizeOrders(detailOrders.value))

const quickStats = computed(() => [
  { key: 'amount', label: '累计消费', prefix: '¥', value: formatMoney(orderSummary.value.totalAmount, 0) },
  { key: 'orders', label: '订单总数', value: orderSummary.value.orderCount },
  { key: 'avg', label: '平均客单价', prefix: '¥', value: formatMoney(orderSummary.value.avgOrderAmount, 0) },
  { key: 'items', label: '购买件数', value: orderSummary.value.itemCount },
  { key: 'favorite', label: '收藏商品', value: favoriteStore.count }
])

/**
 * 近 6 个月走势：订单聚合不足时回退到演示数据，
 * 保证卡片在任何状态下都有可读的图表。
 */
const recentMonths = computed(() => {
  const acc = new Map()
  detailOrders.value
    .filter((o) => o.status !== 'cancelled')
    .forEach((o) => {
      const month = String(o.createdAt || '').slice(0, 7)
      if (!/^\d{4}-\d{2}$/.test(month)) return
      const cur = acc.get(month) || { month, amount: 0, orders: 0 }
      cur.amount += Number(o.total) || 0
      cur.orders += 1
      acc.set(month, cur)
    })
  const fromOrders = [...acc.values()].sort((a, b) => a.month.localeCompare(b.month))
  const source = fromOrders.length >= 2 ? fromOrders : monthlySpending
  return source.slice(-6)
})

const miniHeights = computed(() => toPercentHeights(recentMonths.value.map((m) => m.amount), 10))

const avgMonthly = computed(() => {
  if (!recentMonths.value.length) return 0
  return recentMonths.value.reduce((s, m) => s + m.amount, 0) / recentMonths.value.length
})

const functions = [
  { label: '数据看板', icon: 'DataAnalysis', to: '/dashboard', bg: '#f9f0ff', color: '#9254de' },
  { label: '收货地址', icon: 'Location', to: '/address', bg: '#eaf1ff', color: '#3a7afe' },
  { label: '优惠券', icon: 'Ticket', to: '/coupon', bg: '#fff1eb', color: '#ff5a1f' },
  { label: '我的收藏', icon: 'Star', to: '/favorite', bg: '#fff6e6', color: '#f5a524' },
  { label: '浏览记录', icon: 'Clock', to: '/history', bg: '#e8f8f0', color: '#16b364' }
]

async function onLogout() {
  await ElMessageBox.confirm('确定要退出登录吗？', '退出登录', {
    confirmButtonText: '退出',
    cancelButtonText: '取消',
    type: 'warning'
  })
  userStore.logout()
  ElMessage.success('已退出登录')
  router.replace('/')
}
</script>

<style scoped>
.user {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-8);
}

/* ---------- 用户卡片 ---------- */
.profile {
  overflow: hidden;
  margin-bottom: var(--sp-3);
}

.profile__bg {
  height: 88px;
  background: var(--c-brand-gradient);
}

.profile__body {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
  padding: var(--sp-4);
  margin-top: -32px;
  position: relative;
}

.profile__avatar {
  border: 3px solid #fff;
  box-shadow: var(--sh-sm);
  background: var(--c-bg-muted);
  flex-shrink: 0;
}

.profile__info {
  flex: 1;
  min-width: 0;
}

.profile__name {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: var(--fs-xl);
  font-weight: 700;
}

.profile__level {
  padding: 2px var(--sp-2);
  border-radius: var(--r-xs);
  background: linear-gradient(135deg, #ffd36e 0%, #f5a524 100%);
  color: #fff;
  font-size: var(--fs-xs);
  font-weight: 600;
}

.profile__phone {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
  font-size: var(--fs-sm);
  color: var(--c-text-3);
}

.profile__assets {
  display: flex;
  border-top: 1px solid var(--c-border);
}

.profile__asset {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: var(--sp-3);
  transition: background var(--dur) var(--ease);
}

.profile__asset:hover {
  background: var(--c-brand-soft);
}

.profile__asset-num {
  font-size: var(--fs-lg);
  font-weight: 700;
  font-family: 'DIN Alternate', Arial, sans-serif;
}

.profile__asset-label {
  font-size: var(--fs-xs);
  color: var(--c-text-3);
}

/* ---------- 区块 ---------- */
.block {
  padding: var(--sp-4);
  margin-bottom: var(--sp-3);
}

.block__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sp-3);
}

.block__title {
  font-size: var(--fs-md);
  font-weight: 700;
}

/* ---------- 订单入口 ---------- */
.order-nav {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--sp-2);
}

.order-nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-2);
  border-radius: var(--r-md);
  color: var(--c-text-2);
  transition: all var(--dur) var(--ease);
}

.order-nav__item:hover {
  background: var(--c-brand-soft);
  color: var(--c-brand);
}

.order-nav__icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-nav__label {
  font-size: var(--fs-sm);
}

/* ---------- 功能网格 ---------- */
.func-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--sp-2);
}

.func {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-2);
  border-radius: var(--r-md);
  transition: background var(--dur) var(--ease);
}

.func:hover {
  background: var(--c-bg-hover);
}

.func__icon {
  width: 40px;
  height: 40px;
  border-radius: var(--r-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.func__label {
  font-size: var(--fs-sm);
  color: var(--c-text-2);
}

.footer {
  text-align: center;
  padding: var(--sp-6) 0 var(--sp-2);
}

/* ---------- 消费数据概览 ---------- */
.stat-strip {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--sp-2);
  padding: var(--sp-4) var(--sp-2);
  border-radius: var(--r-md);
  background: var(--c-bg-muted);
  margin-bottom: var(--sp-4);
}

.stat-strip__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
}

.stat-strip__num {
  display: flex;
  align-items: baseline;
  gap: 1px;
  font-size: var(--fs-xl);
  font-weight: 800;
  font-family: 'DIN Alternate', Arial, sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.stat-strip__prefix {
  font-size: var(--fs-sm);
  font-weight: 700;
  color: var(--c-text-2);
}

.stat-strip__label {
  font-size: var(--fs-xs);
  color: var(--c-text-3);
}

/* 迷你柱状图 */
.mini-chart__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sp-3);
}

.mini-chart__bars {
  display: flex;
  align-items: flex-end;
  gap: var(--sp-3);
  height: 96px;
}

.mini-chart__col {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  min-width: 0;
  cursor: pointer;
}

.mini-chart__bar {
  width: 100%;
  max-width: 40px;
  border-radius: var(--r-sm) var(--r-sm) 0 0;
  background: linear-gradient(180deg, #ff8a5b 0%, #ff5a1f 100%);
  transition: filter var(--dur) var(--ease);
}

.mini-chart__col:hover .mini-chart__bar {
  filter: brightness(1.12);
}

.mini-chart__label {
  font-size: var(--fs-xs);
  color: var(--c-text-3);
}



</style>

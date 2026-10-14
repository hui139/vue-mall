<template>
  <div class="dash page-wrap">
    <!-- 顶部标题 -->
    <div class="dash__head">
      <div>
        <h1 class="dash__title">消费数据看板</h1>
        <p class="dash__sub text-sm text-3">
          数据来自本地订单与商品静态数据，实时计算，无后端接口
        </p>
      </div>
      <div class="dash__range">
        <button
          v-for="r in ranges"
          :key="r.value"
          class="dash__range-btn"
          :class="{ 'is-active': range === r.value }"
          @click="range = r.value"
        >
          {{ r.label }}
        </button>
      </div>
    </div>

    <!-- 核心指标卡 -->
    <section class="metrics">
      <div v-for="m in metrics" :key="m.key" class="card metric">
        <div class="metric__top">
          <span class="metric__icon" :style="{ background: m.bg, color: m.color }">
            <el-icon :size="18"><component :is="m.icon" /></el-icon>
          </span>
          <span
            v-if="m.growth !== null"
            class="metric__growth"
            :class="m.growth >= 0 ? 'is-up' : 'is-down'"
          >
            <el-icon :size="12">
              <component :is="m.growth >= 0 ? 'Top' : 'Bottom'" />
            </el-icon>
            {{ Math.abs(m.growth) }}%
          </span>
        </div>
        <div class="metric__value">
          <span v-if="m.prefix" class="metric__prefix">{{ m.prefix }}</span>
          <span class="metric__num">{{ m.value }}</span>
          <span v-if="m.unit" class="metric__unit">{{ m.unit }}</span>
        </div>
        <div class="metric__label">{{ m.label }}</div>
      </div>
    </section>

    <!-- 消费走势 + 品类占比 -->
    <section class="two-col">
      <!-- 柱状图 -->
      <div class="card panel">
        <div class="panel__head">
          <h2 class="panel__title">月度消费走势</h2>
          <span class="text-xs text-3">
            近 {{ trend.length }} 个月 · 单位：元
          </span>
        </div>

        <div class="chart">
          <div class="chart__axis">
            <span v-for="t in axisTicks" :key="t">{{ t }}</span>
          </div>
          <div class="chart__bars">
            <div
              v-for="(m, i) in trend"
              :key="m.month"
              class="chart__col"
              :class="{ 'is-active': activeBar === i }"
              @mouseenter="activeBar = i"
              @mouseleave="activeBar = -1"
            >
              <div class="chart__tip" v-if="activeBar === i">
                <strong>{{ monthLabel(m.month) }}</strong>
                <span>¥{{ formatMoney(m.amount) }}</span>
                <span class="text-xs">{{ m.orders }} 笔订单</span>
              </div>
              <div
                class="chart__bar"
                :style="{ height: barHeights[i] + '%' }"
              ></div>
              <span class="chart__label">{{ shortMonth(m.month) }}</span>
            </div>
          </div>
        </div>

        <div class="chart__footer">
          <div class="chart__stat">
            <span class="text-xs text-3">月均消费</span>
            <strong>¥{{ formatMoney(avgMonthly) }}</strong>
          </div>
          <div class="chart__stat">
            <span class="text-xs text-3">最高月份</span>
            <strong>{{ peakMonth ? monthLabel(peakMonth.month) : '-' }}</strong>
          </div>
          <div class="chart__stat">
            <span class="text-xs text-3">最低月份</span>
            <strong>{{ lowMonth ? monthLabel(lowMonth.month) : '-' }}</strong>
          </div>
        </div>
      </div>

      <!-- 环形图 -->
      <div class="card panel">
        <div class="panel__head">
          <h2 class="panel__title">消费品类占比</h2>
          <span class="text-xs text-3">{{ categoryStats.length }} 个品类</span>
        </div>

        <div class="donut">
          <div class="donut__ring" :style="{ background: donutBg }">
            <div class="donut__hole">
              <span class="donut__total">¥{{ formatMoney(catTotal) }}</span>
              <span class="text-xs text-3">累计消费</span>
            </div>
          </div>

          <ul class="donut__legend">
            <li v-for="c in categoryStats" :key="c.key" class="donut__item">
              <span class="donut__dot" :style="{ background: c.color }"></span>
              <span class="donut__name ellipsis">{{ c.name }}</span>
              <span class="donut__amount">¥{{ formatMoney(c.amount, 0) }}</span>
              <span class="donut__percent">{{ c.percent }}%</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 订单状态 + 购买排行 -->
    <section class="two-col">
      <!-- 订单状态分布 -->
      <div class="card panel">
        <div class="panel__head">
          <h2 class="panel__title">订单状态分布</h2>
          <span class="text-xs text-3">共 {{ orderSummary.orderCount }} 笔</span>
        </div>

        <div class="status-overview">
          <div class="status-overview__item">
            <span class="status-overview__num">{{ orderSummary.validCount }}</span>
            <span class="text-xs text-3">有效订单</span>
          </div>
          <div class="status-overview__item">
            <span class="status-overview__num">¥{{ formatMoney(orderSummary.avgOrderAmount) }}</span>
            <span class="text-xs text-3">客单价</span>
          </div>
          <div class="status-overview__item">
            <span class="status-overview__num">{{ orderSummary.avgItemCount }}</span>
            <span class="text-xs text-3">平均件数</span>
          </div>
          <div class="status-overview__item">
            <span class="status-overview__num">{{ orderSummary.itemCount }}</span>
            <span class="text-xs text-3">商品总件数</span>
          </div>
        </div>

        <ul class="status-list">
          <li v-for="s in statusBreakdown" :key="s.key" class="status-row">
            <span class="tag-line" :class="`tag-line--${s.type}`">{{ s.label }}</span>
            <div class="status-row__track">
              <div
                class="status-row__fill"
                :style="{ width: s.percent + '%' }"
                :class="`is-${s.type}`"
              ></div>
            </div>
            <span class="status-row__count">{{ s.count }} 笔</span>
            <span class="status-row__percent text-xs text-3">{{ s.percent }}%</span>
          </li>
          <li v-if="!statusBreakdown.length" class="text-sm text-3">暂无订单数据</li>
        </ul>
      </div>

      <!-- 购买排行 -->
      <div class="card panel">
        <div class="panel__head">
          <h2 class="panel__title">购买商品排行</h2>
          <span class="text-xs text-3">按实际购买件数 TOP {{ topProducts.length }}</span>
        </div>

        <ol class="rank-list">
          <li v-for="(p, i) in topProducts" :key="p.id" class="rank-row">
            <span class="rank-row__no" :class="`is-top${i + 1}`">{{ i + 1 }}</span>
            <el-image :src="p.image" fit="cover" class="rank-row__img" lazy>
              <template #error>
                <div class="rank-row__fallback"><el-icon><Picture /></el-icon></div>
              </template>
            </el-image>
            <div class="rank-row__info">
              <RouterLink :to="`/products/${p.id}`" class="rank-row__name ellipsis">
                {{ p.name }}
              </RouterLink>
              <div class="rank-row__track">
                <div
                  class="rank-row__fill"
                  :style="{ width: rankPercents[i] + '%' }"
                ></div>
              </div>
            </div>
            <div class="rank-row__meta">
              <span class="rank-row__count">{{ p.count }} 件</span>
              <span class="text-xs text-3">¥{{ formatMoney(p.amount, 0) }}</span>
            </div>
          </li>
          <li v-if="!topProducts.length" class="text-sm text-3">暂无购买记录</li>
        </ol>
      </div>
    </section>

    <!-- 价格带分布 + 平台商品概览 -->
    <section class="two-col">
      <div class="card panel">
        <div class="panel__head">
          <h2 class="panel__title">商品价格带分布</h2>
          <span class="text-xs text-3">全站 {{ products.length }} 件商品</span>
        </div>
        <ul class="price-band">
          <li v-for="band in priceBands" :key="band.label" class="price-band__row">
            <span class="price-band__label">{{ band.label }}</span>
            <div class="price-band__track">
              <div
                class="price-band__fill"
                :style="{ width: band.percent + '%' }"
              ></div>
            </div>
            <span class="price-band__count">{{ band.count }} 件</span>
            <span class="price-band__percent text-xs text-3">{{ band.percent }}%</span>
          </li>
        </ul>
      </div>

      <div class="card panel">
        <div class="panel__head">
          <h2 class="panel__title">分类商品分布</h2>
          <span class="text-xs text-3">按在架商品数</span>
        </div>
        <ul class="cat-dist">
          <li v-for="c in categoryDistribution" :key="c.id" class="cat-dist__row">
            <span class="cat-dist__icon">
              <el-icon :size="14"><component :is="c.icon" /></el-icon>
            </span>
            <RouterLink :to="`/products?category=${c.id}`" class="cat-dist__name">
              {{ c.name }}
            </RouterLink>
            <div class="cat-dist__track">
              <div
                class="cat-dist__fill"
                :style="{ width: c.percent + '%' }"
              ></div>
            </div>
            <span class="cat-dist__count">{{ c.count }} 件</span>
            <span class="cat-dist__avg text-xs text-3">均价 ¥{{ formatMoney(c.avgPrice, 0) }}</span>
          </li>
        </ul>
      </div>
    </section>

    <footer class="dash__footer text-sm text-3">
      所有统计均由 <code>src/utils/stats.js</code> 中的纯函数在浏览器本地计算得出
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { orderStatusMap } from '@/data/orders'
import { monthlySpending, categorySpending } from '@/data/user'
import { useOrderStore } from '@/stores/order'
import { formatMoney } from '@/utils/format'
import {
  growthRate,
  maxOf,
  summarizeByCategory,
  summarizeOrders,
  toConicGradient,
  toPercentHeights,
  toStatusBreakdown
} from '@/utils/stats'

const orderStore = useOrderStore()
const { detailOrders, statusCount } = storeToRefs(orderStore)

// ---------- 时间范围切换 ----------
const ranges = [
  { label: '近 6 个月', value: 6 },
  { label: '近 12 个月', value: 12 }
]
const range = ref(12)

/**
 * 消费走势数据源。
 * 优先使用本地订单聚合出的真实月份；若订单月份不足所选区间，
 * 则回退到 data/user.js 的 monthlySpending 演示数据补齐，
 * 保证图表在任何订单数量下都有完整的时间轴。
 */
const trend = computed(() => {
  const fromOrders = buildFromOrders()
  const source = fromOrders.length >= 2 ? fromOrders : monthlySpending
  return source.slice(-range.value)
})

function buildFromOrders() {
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
  return [...acc.values()].sort((a, b) => a.month.localeCompare(b.month))
}

const barHeights = computed(() => toPercentHeights(trend.value.map((m) => m.amount), 8))
const activeBar = ref(-1)

const avgMonthly = computed(() => {
  if (!trend.value.length) return 0
  return trend.value.reduce((s, m) => s + m.amount, 0) / trend.value.length
})

const peakMonth = computed(() =>
  trend.value.length ? trend.value.reduce((a, b) => (b.amount > a.amount ? b : a)) : null
)
const lowMonth = computed(() =>
  trend.value.length ? trend.value.reduce((a, b) => (b.amount < a.amount ? b : a)) : null
)

// 纵轴刻度：以最大值为顶，均分 4 段
const axisTicks = computed(() => {
  const max = maxOf(trend.value.map((m) => m.amount))
  if (!max) return ['0']
  return [1, 0.75, 0.5, 0.25, 0].map((r) => formatMoney(max * r, 0))
})

function monthLabel(month) {
  const [y, m] = String(month).split('-')
  return `${y} 年 ${Number(m)} 月`
}

function shortMonth(month) {
  const [y, m] = String(month).split('-')
  return range.value > 6 ? `${Number(m)}月` : `${y.slice(2)}/${Number(m)}`
}

// ---------- 消费品类占比 ----------
/**
 * 订单里的品类不足以撑起环形图时，回退到 data/user.js 的
 * categorySpending 演示数据，保证看板始终有完整的品类结构。
 */
const categoryStats = computed(() => {
  const fromOrders = summarizeByCategory(detailOrders.value, categories)
  if (fromOrders.length >= 3) return fromOrders
  const total = categorySpendingFallbackTotal.value
  return categorySpending.map((c) => ({
    ...c,
    percent: total ? Math.round((c.amount / total) * 1000) / 10 : 0
  }))
})

const categorySpendingFallbackTotal = computed(() =>
  categorySpending.reduce((s, c) => s + c.amount, 0)
)

const catTotal = computed(() => categoryStats.value.reduce((s, c) => s + c.amount, 0))
const donutBg = computed(() => toConicGradient(categoryStats.value))

// ---------- 订单状态 ----------
const orderSummary = computed(() => summarizeOrders(detailOrders.value))
const statusBreakdown = computed(() => toStatusBreakdown(statusCount.value, orderStatusMap))

// ---------- 购买排行 ----------
const topProducts = computed(() => {
  const acc = new Map()
  detailOrders.value
    .filter((o) => o.status !== 'cancelled')
    .forEach((o) => {
      ;(o.items || []).forEach((it) => {
        if (!it.product) return
        const cur = acc.get(it.product.id) || {
          id: it.product.id,
          name: it.product.name,
          image: it.product.image,
          count: 0,
          amount: 0
        }
        cur.count += Number(it.count) || 0
        cur.amount += (Number(it.price) || 0) * (Number(it.count) || 0)
        acc.set(it.product.id, cur)
      })
    })
  return [...acc.values()].sort((a, b) => b.count - a.count).slice(0, 8)
})

const rankPercents = computed(() => {
  const max = maxOf(topProducts.value.map((p) => p.count))
  if (!max) return topProducts.value.map(() => 0)
  return topProducts.value.map((p) => Math.max(8, Math.round((p.count / max) * 100)))
})

// ---------- 顶部指标卡 ----------
const metrics = computed(() => {
  const recent = trend.value.slice(-1)[0]?.amount || 0
  const previous = trend.value.slice(-2, -1)[0]?.amount || 0
  const s = orderSummary.value

  return [
    {
      key: 'amount',
      label: '累计消费金额',
      value: formatMoney(s.totalAmount),
      prefix: '¥',
      growth: growthRate(recent, previous),
      icon: 'Money',
      bg: '#fff1eb',
      color: '#ff5a1f'
    },
    {
      key: 'orders',
      label: '订单总数',
      value: s.orderCount,
      unit: '笔',
      growth: null,
      icon: 'List',
      bg: '#eaf1ff',
      color: '#3a7afe'
    },
    {
      key: 'avg',
      label: '平均客单价',
      value: formatMoney(s.avgOrderAmount),
      prefix: '¥',
      growth: null,
      icon: 'TrendCharts',
      bg: '#e8f8f0',
      color: '#16b364'
    },
    {
      key: 'items',
      label: '累计购买件数',
      value: s.itemCount,
      unit: '件',
      growth: null,
      icon: 'ShoppingBag',
      bg: '#fff6e6',
      color: '#f5a524'
    },
    {
      key: 'cats',
      label: '覆盖品类数',
      value: categoryStats.value.length,
      unit: '个',
      growth: null,
      icon: 'Grid',
      bg: '#f9f0ff',
      color: '#9254de'
    },
    {
      key: 'saved',
      label: '累计优惠金额',
      value: formatMoney(s.savedAmount),
      prefix: '¥',
      growth: null,
      icon: 'Discount',
      bg: '#e8f8f0',
      color: '#16b364'
    }
  ]
})

// ---------- 价格带分布 ----------
const priceBands = computed(() => {
  const bands = [
    { label: '¥100 以下', min: 0, max: 100 },
    { label: '¥100 - 500', min: 100, max: 500 },
    { label: '¥500 - 1000', min: 500, max: 1000 },
    { label: '¥1000 - 3000', min: 1000, max: 3000 },
    { label: '¥3000 - 6000', min: 3000, max: 6000 },
    { label: '¥6000 以上', min: 6000, max: Infinity }
  ]
  const total = products.length || 1
  return bands.map((b) => {
    const count = products.filter((p) => p.price >= b.min && p.price < b.max).length
    return { label: b.label, count, percent: Math.round((count / total) * 1000) / 10 }
  })
})

// ---------- 分类商品分布 ----------
const categoryDistribution = computed(() => {
  const real = categories.filter((c) => c.id !== 'all')
  const total = products.length || 1
  const rows = real.map((c) => {
    const items = products.filter((p) => p.category === c.id)
    const sum = items.reduce((s, p) => s + p.price, 0)
    return {
      id: c.id,
      name: c.name,
      icon: c.icon,
      count: items.length,
      avgPrice: items.length ? sum / items.length : 0,
      percent: Math.round((items.length / total) * 1000) / 10
    }
  })
  const maxCount = maxOf(rows.map((r) => r.count)) || 1
  return rows
    .map((r) => ({ ...r, percent: Math.round((r.count / maxCount) * 1000) / 10 }))
    .sort((a, b) => b.count - a.count)
})
</script>

<style scoped>
.dash {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-8);
}

.dash__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--sp-4);
  margin-bottom: var(--sp-4);
}

.dash__title {
  font-size: var(--fs-2xl);
  font-weight: 800;
  letter-spacing: 0.5px;
}

.dash__sub {
  margin-top: 2px;
}

.dash__range {
  display: flex;
  gap: var(--sp-1);
  padding: 3px;
  background: var(--c-bg-muted);
  border-radius: var(--r-full);
}

.dash__range-btn {
  padding: 5px var(--sp-4);
  border-radius: var(--r-full);
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  transition: all var(--dur) var(--ease);
}

.dash__range-btn.is-active {
  background: #fff;
  color: var(--c-brand);
  font-weight: 600;
  box-shadow: var(--sh-xs);
}

/* ============================ 指标卡 ============================ */
.metrics {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: var(--sp-3);
  margin-bottom: var(--sp-4);
}

.metric {
  padding: var(--sp-4);
}

.metric__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sp-3);
}

.metric__icon {
  width: 34px;
  height: 34px;
  border-radius: var(--r-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric__growth {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: var(--fs-xs);
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--r-full);
}

.metric__growth.is-up {
  background: var(--c-danger-soft);
  color: var(--c-danger);
}

.metric__growth.is-down {
  background: var(--c-success-soft);
  color: var(--c-success);
}

.metric__value {
  display: flex;
  align-items: baseline;
  gap: 2px;
  font-family: 'DIN Alternate', Arial, sans-serif;
}

.metric__prefix {
  font-size: var(--fs-md);
  font-weight: 700;
  color: var(--c-text-2);
}

.metric__num {
  font-size: var(--fs-xl);
  font-weight: 800;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.metric__unit {
  font-size: var(--fs-sm);
  color: var(--c-text-3);
}

.metric__label {
  margin-top: var(--sp-1);
  font-size: var(--fs-sm);
  color: var(--c-text-3);
}

/* ============================ 面板 ============================ */
.two-col {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: var(--sp-4);
  margin-bottom: var(--sp-4);
}

.panel {
  padding: var(--sp-5);
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.panel__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--sp-3);
  margin-bottom: var(--sp-5);
}

.panel__title {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: var(--fs-lg);
  font-weight: 700;
}

.panel__title::before {
  content: '';
  width: 3px;
  height: 14px;
  border-radius: var(--r-full);
  background: var(--c-brand-gradient);
}

/* ============================ 柱状图 ============================ */
.chart {
  display: flex;
  gap: var(--sp-3);
  flex: 1;
  min-height: 0;
}

.chart__axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 26px;
  font-size: var(--fs-xs);
  color: var(--c-text-4);
  font-family: 'DIN Alternate', Arial, sans-serif;
  flex-shrink: 0;
  /* 与柱状区域顶部对齐，5 个刻度均分 */
  height: 220px;
}

.chart__bars {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: var(--sp-2);
  height: 220px;
  min-width: 0;
  /* 顶部留出空间给 hover 提示条与最高柱 */
  padding-top: var(--sp-6);
}

.chart__col {
  position: relative;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: var(--sp-2);
  min-width: 0;
  cursor: pointer;
}

.chart__bar {
  width: 100%;
  max-width: 42px;
  border-radius: var(--r-sm) var(--r-sm) 0 0;
  background: linear-gradient(180deg, #ff8a5b 0%, #ff5a1f 100%);
  transition: height 0.4s var(--ease), filter var(--dur) var(--ease);
}

.chart__col.is-active .chart__bar {
  filter: brightness(1.1) saturate(1.15);
}

.chart__label {
  font-size: var(--fs-xs);
  color: var(--c-text-3);
  white-space: nowrap;
}

.chart__col.is-active .chart__label {
  color: var(--c-brand);
  font-weight: 600;
}

.chart__tip {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 6px 10px;
  border-radius: var(--r-sm);
  background: rgba(31, 33, 38, 0.92);
  color: #fff;
  font-size: var(--fs-xs);
  white-space: nowrap;
  pointer-events: none;
  z-index: 5;
  box-shadow: var(--sh-md);
}

.chart__tip strong {
  font-size: var(--fs-sm);
}

.chart__footer {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--sp-3);
  margin-top: var(--sp-4);
  padding-top: var(--sp-3);
  border-top: 1px dashed var(--c-border);
}

.chart__stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
}

.chart__stat strong {
  font-size: var(--fs-base);
  font-family: 'DIN Alternate', Arial, sans-serif;
}

/* ============================ 环形图 ============================ */
.donut {
  display: flex;
  align-items: center;
  gap: var(--sp-5);
  flex: 1;
}

.donut__ring {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.donut__hole {
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  box-shadow: inset 0 1px 4px rgba(20, 22, 28, 0.06);
}

.donut__total {
  font-size: var(--fs-md);
  font-weight: 800;
  font-family: 'DIN Alternate', Arial, sans-serif;
  white-space: nowrap;
}

.donut__legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.donut__item {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: var(--fs-sm);
  min-width: 0;
}

.donut__dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}

.donut__name {
  flex: 1;
  min-width: 0;
  color: var(--c-text-2);
}

.donut__amount {
  font-family: 'DIN Alternate', Arial, sans-serif;
  font-weight: 600;
  flex-shrink: 0;
}

.donut__percent {
  width: 44px;
  text-align: right;
  color: var(--c-text-3);
  font-size: var(--fs-xs);
  flex-shrink: 0;
}

/* ============================ 订单状态 ============================ */
.status-overview {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--sp-2);
  padding: var(--sp-3);
  margin-bottom: var(--sp-4);
  border-radius: var(--r-md);
  background: var(--c-bg-muted);
}

.status-overview__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.status-overview__num {
  font-size: var(--fs-lg);
  font-weight: 700;
  font-family: 'DIN Alternate', Arial, sans-serif;
}

.status-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.status-row {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.status-row__track {
  flex: 1;
  height: 8px;
  border-radius: var(--r-full);
  background: var(--c-bg-muted);
  overflow: hidden;
  min-width: 0;
}

.status-row__fill {
  height: 100%;
  border-radius: var(--r-full);
  background: var(--c-brand);
  transition: width 0.4s var(--ease);
}

.status-row__fill.is-warning { background: var(--c-warning); }
.status-row__fill.is-info { background: var(--c-info); }
.status-row__fill.is-success { background: var(--c-success); }
.status-row__fill.is-plain { background: var(--c-text-4); }

.status-row__count {
  font-size: var(--fs-sm);
  font-weight: 600;
  width: 48px;
  text-align: right;
  flex-shrink: 0;
}

.status-row__percent {
  width: 44px;
  text-align: right;
  flex-shrink: 0;
}

/* ============================ 排行 ============================ */
.rank-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.rank-row {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  min-width: 0;
}

.rank-row__no {
  width: 20px;
  height: 20px;
  border-radius: var(--r-xs);
  background: var(--c-bg-muted);
  color: var(--c-text-3);
  font-size: var(--fs-xs);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rank-row__no.is-top1 { background: #f5333f; color: #fff; }
.rank-row__no.is-top2 { background: #ff7a45; color: #fff; }
.rank-row__no.is-top3 { background: #f5a524; color: #fff; }

.rank-row__img {
  width: 36px;
  height: 36px;
  border-radius: var(--r-sm);
  background: var(--c-bg-muted);
  flex-shrink: 0;
}

.rank-row__fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-4);
}

.rank-row__info {
  flex: 1;
  min-width: 0;
}

.rank-row__name {
  display: block;
  font-size: var(--fs-sm);
  line-height: 1.4;
  transition: color var(--dur) var(--ease);
}

.rank-row__name:hover {
  color: var(--c-brand);
}

.rank-row__track {
  height: 4px;
  margin-top: 4px;
  border-radius: var(--r-full);
  background: var(--c-bg-muted);
  overflow: hidden;
}

.rank-row__fill {
  height: 100%;
  border-radius: var(--r-full);
  background: var(--c-brand-gradient);
}

.rank-row__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  width: 70px;
}

.rank-row__count {
  font-size: var(--fs-sm);
  font-weight: 600;
  font-family: 'DIN Alternate', Arial, sans-serif;
}

/* ============================ 价格带 ============================ */
.price-band,
.cat-dist {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.price-band__row,
.cat-dist__row {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  font-size: var(--fs-sm);
  min-width: 0;
}

.price-band__label {
  width: 96px;
  flex-shrink: 0;
  color: var(--c-text-2);
}

.price-band__track,
.cat-dist__track {
  flex: 1;
  height: 8px;
  border-radius: var(--r-full);
  background: var(--c-bg-muted);
  overflow: hidden;
  min-width: 0;
}

.price-band__fill {
  height: 100%;
  border-radius: var(--r-full);
  background: linear-gradient(90deg, #ff8a5b 0%, #ff5a1f 100%);
}

.cat-dist__fill {
  height: 100%;
  border-radius: var(--r-full);
  background: linear-gradient(90deg, #6ba7ff 0%, #3a7afe 100%);
}

.price-band__count,
.cat-dist__count {
  width: 46px;
  text-align: right;
  font-weight: 600;
  font-family: 'DIN Alternate', Arial, sans-serif;
  flex-shrink: 0;
}

.price-band__percent {
  width: 46px;
  text-align: right;
  flex-shrink: 0;
}

.cat-dist__icon {
  width: 24px;
  height: 24px;
  border-radius: var(--r-sm);
  background: var(--c-bg-muted);
  color: var(--c-text-2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cat-dist__name {
  width: 72px;
  flex-shrink: 0;
  color: var(--c-text-2);
  transition: color var(--dur) var(--ease);
}

.cat-dist__name:hover {
  color: var(--c-brand);
}

.cat-dist__avg {
  width: 82px;
  text-align: right;
  flex-shrink: 0;
}

.dash__footer {
  text-align: center;
  padding: var(--sp-5) 0 var(--sp-2);
}

.dash__footer code {
  padding: 1px 5px;
  border-radius: var(--r-xs);
  background: var(--c-bg-muted);
  font-size: var(--fs-xs);
}
</style>

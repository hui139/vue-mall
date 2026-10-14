/**
 * 数据统计纯函数
 *
 * 与 Vue 无关，只接收数组、返回新的统计结果，方便单独测试，
 * 也便于将来把本地 mock 换成真实接口的响应后复用同一套计算逻辑。
 */

/** 取得数组中的最大值，空数组返回 0 */
export function maxOf(list) {
  return list.length ? Math.max(...list) : 0
}

/** 求和 */
export function sumOf(list) {
  return list.reduce((sum, n) => sum + (Number(n) || 0), 0)
}

/** 保留 n 位小数并转成数字（避免浮点长尾） */
function round(value, digits = 0) {
  const factor = 10 ** digits
  return Math.round((Number(value) || 0) * factor) / factor
}

/**
 * 把一组数值映射为相对高度百分比，用于柱状图。
 * 最大值固定为 100%，其余按比例缩放；全为 0 时统一给 0。
 *
 * @param {number[]} values
 * @param {number}   minPercent 非零值的最小高度，避免极小的柱子看不见
 */
export function toPercentHeights(values, minPercent = 6) {
  const max = maxOf(values)
  if (!max) return values.map(() => 0)
  return values.map((v) => {
    if (!v) return 0
    return Math.max(minPercent, round((v / max) * 100, 1))
  })
}

/**
 * 由订单列表计算消费概览。
 *
 * 规则：已取消的订单不计入消费总额与客单价，但会计入订单总数，
 * 这样"消费总额 / 订单数"不会被取消单稀释。
 *
 * @param {Array} orders 订单数组（需含 status 与 total）
 */
export function summarizeOrders(orders = []) {
  const valid = orders.filter((o) => o.status !== 'cancelled')
  const totalAmount = sumOf(valid.map((o) => o.total))
  const orderCount = orders.length
  const validCount = valid.length

  // 商品件数：把每笔订单里各条目的 count 累加
  const itemCount = valid.reduce(
    (sum, o) => sum + sumOf((o.items || []).map((it) => it.count)),
    0
  )

  // 节省金额：优先用订单里记录的优惠，没有则按 0 计
  const savedAmount = sumOf(valid.map((o) => o.couponDiscount || 0))

  return {
    totalAmount: round(totalAmount, 2),
    orderCount,
    validCount,
    cancelledCount: orders.filter((o) => o.status === 'cancelled').length,
    itemCount,
    savedAmount: round(savedAmount, 2),
    /** 客单价：消费总额 / 有效订单数 */
    avgOrderAmount: validCount ? round(totalAmount / validCount, 2) : 0,
    /** 平均每单件数 */
    avgItemCount: validCount ? round(itemCount / validCount, 1) : 0
  }
}

/**
 * 统计各分类的消费金额与占比。
 *
 * @param {Array} orders       订单数组（订单条目需已补充 product 字段）
 * @param {Array} categoryList data/categories.js 的分类列表
 */
export function summarizeByCategory(orders = [], categoryList = []) {
  const acc = new Map()

  orders
    .filter((o) => o.status !== 'cancelled')
    .forEach((order) => {
      ;(order.items || []).forEach((item) => {
        const key = item.product?.category || 'unknown'
        const amount = (Number(item.price) || 0) * (Number(item.count) || 0)
        acc.set(key, (acc.get(key) || 0) + amount)
      })
    })

  const total = sumOf([...acc.values()])

  // 配色循环取用，保证每个分类都有稳定的颜色
  const palette = ['#ff5a1f', '#3a7afe', '#16b364', '#f5a524', '#9254de', '#eb2f96', '#36cfc9', '#597ef7', '#faad14', '#8c8c8c']

  return [...acc.entries()]
    .map(([key, amount], i) => {
      const cat = categoryList.find((c) => c.id === key)
      return {
        key,
        name: cat?.name || '其他',
        amount: round(amount, 2),
        percent: total ? round((amount / total) * 100, 1) : 0,
        color: palette[i % palette.length]
      }
    })
    .sort((a, b) => b.amount - a.amount)
}

/**
 * 按月聚合消费金额。
 *
 * @param {Array} orders 订单数组（createdAt 形如 '2025-01-18 14:22:31'）
 * @returns {{month: string, amount: number, orders: number}[]} 按月份升序
 */
export function summarizeByMonth(orders = []) {
  const acc = new Map()

  orders
    .filter((o) => o.status !== 'cancelled')
    .forEach((order) => {
      const month = String(order.createdAt || '').slice(0, 7)
      if (!/^\d{4}-\d{2}$/.test(month)) return
      const entry = acc.get(month) || { month, amount: 0, orders: 0 }
      entry.amount += Number(order.total) || 0
      entry.orders += 1
      acc.set(month, entry)
    })

  return [...acc.values()]
    .map((e) => ({ ...e, amount: round(e.amount, 2) }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

/**
 * 统计销量最高的商品（按订单实际购买件数，而不是商品自带的 sales 字段）。
 *
 * @param {Array} orders 订单数组（条目需已补充 product）
 * @param {number} limit 返回条数
 */
export function topPurchasedProducts(orders = [], limit = 8) {
  const acc = new Map()

  orders
    .filter((o) => o.status !== 'cancelled')
    .forEach((order) => {
      ;(order.items || []).forEach((item) => {
        if (!item.product) return
        const key = item.product.id
        const entry = acc.get(key) || {
          id: key,
          name: item.product.name,
          image: item.product.image,
          count: 0,
          amount: 0
        }
        entry.count += Number(item.count) || 0
        entry.amount += (Number(item.price) || 0) * (Number(item.count) || 0)
        acc.set(key, entry)
      })
    })

  return [...acc.values()]
    .map((e) => ({ ...e, amount: round(e.amount, 2) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

/**
 * 订单状态分布（含取消单），用于看板的横向条形。
 *
 * @param {Object} statusCount store 的 statusCount 统计结果
 * @param {Object} statusMap   订单状态字典（label / type）
 */
export function toStatusBreakdown(statusCount = {}, statusMap = {}) {
  const total = sumOf(Object.values(statusCount))
  return Object.entries(statusCount)
    .filter(([, count]) => count > 0)
    .map(([key, count]) => ({
      key,
      label: statusMap[key]?.label || key,
      type: statusMap[key]?.type || 'plain',
      count,
      percent: total ? round((count / total) * 100, 1) : 0
    }))
    .sort((a, b) => b.count - a.count)
}

/** 环比增长：(本期 - 上期) / 上期，上期为 0 时返回 null 表示无法计算 */
export function growthRate(current, previous) {
  if (!previous) return null
  return round(((current - previous) / previous) * 100, 1)
}

/**
 * 生成环形图的 conic-gradient 背景。
 * 传入 [{ percent, color }]，返回可直接用于 background 的字符串。
 */
export function toConicGradient(segments = []) {
  if (!segments.length) return 'var(--c-bg-muted)'
  let cursor = 0
  const stops = segments.map((seg) => {
    const from = cursor
    cursor += Number(seg.percent) || 0
    return `${seg.color} ${round(from, 2)}% ${round(cursor, 2)}%`
  })
  return `conic-gradient(${stops.join(', ')})`
}

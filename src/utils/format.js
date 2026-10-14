/** 金额格式化：4299 -> 4,299.00；支持指定小数位 */
export function formatMoney(value, digits = 2) {
  const num = Number(value) || 0
  const fixed = num.toFixed(digits)
  const [int, dec] = fixed.split('.')
  const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return dec ? `${withSep}.${dec}` : withSep
}

/** 价格拆成 整数部分 与 小数部分，方便样式上小数用小字号 */
export function splitMoney(value) {
  const num = Number(value) || 0
  const [int, dec] = num.toFixed(2).split('.')
  return { int: Number(int).toLocaleString('en-US'), dec }
}

/** 折扣力度：0.925 -> "9.2 折" */
export function formatDiscount(price, origin) {
  if (!origin || origin <= price) return null
  const rate = (price / origin) * 10
  return rate >= 10 ? null : rate.toFixed(1)
}

/** 节省金额 */
export function saveAmount(price, origin) {
  if (!origin || origin <= price) return 0
  return origin - price
}

/** 销量简写：12800 -> 1.2万 */
export function formatSales(sales) {
  const num = Number(sales) || 0
  if (num >= 10000) return `${(num / 10000).toFixed(1)}万`
  return String(num)
}

/** 订单号 / 时间戳：20250118 -> 202501180001 */
export function generateOrderId(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = String(Math.floor(Math.random() * 9000) + 1000)
  return `${y}${m}${d}${rand}`
}

/** Date -> '2025-01-18 14:22:31' */
export function formatDateTime(date = new Date()) {
  const p = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())} ${p(date.getHours())}:${p(date.getMinutes())}:${p(date.getSeconds())}`
}

/** 手机号脱敏 */
export function maskPhone(phone) {
  const str = String(phone || '')
  if (str.length < 8) return str
  return `${str.slice(0, 3)}****${str.slice(-4)}`
}

/** 倒计时文案（用于待付款订单的自动取消演示） */
export function formatCountdown(seconds) {
  if (seconds <= 0) return '已超时'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

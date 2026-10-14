/** 防抖：搜索框输入等高频触发的场景 */
export function debounce(fn, delay = 300) {
  let timer = null
  return function debounced(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, delay)
  }
}

/** 节流：滚动等高频且必须响应的场景 */
export function throttle(fn, delay = 200) {
  let last = 0
  return function throttled(...args) {
    const now = Date.now()
    if (now - last >= delay) {
      last = now
      fn.apply(this, args)
    }
  }
}

/**
 * 商品查询：支持关键词、分类、价格区间与排序。
 * 与 Vue 无关，因此在 src/utils 下作为纯函数维护，方便单独测试。
 *
 * @param {Array}  list        商品全集
 * @param {Object} options     { keyword, category, minPrice, maxPrice, sort }
 * @returns {Array} 过滤排序后的新数组
 */
export function queryProducts(list, options = {}) {
  const { keyword = '', category = 'all', minPrice = 0, maxPrice = 0, sort = 'default' } = options
  const kw = keyword.trim().toLowerCase()

  let result = list.filter((item) => {
    if (category && category !== 'all' && item.category !== category) return false
    if (minPrice > 0 && item.price < minPrice) return false
    if (maxPrice > 0 && item.price > maxPrice) return false
    if (kw) {
      const haystack = `${item.name} ${item.desc} ${item.specs} ${(item.tags || []).join(' ')}`.toLowerCase()
      if (!haystack.includes(kw)) return false
    }
    return true
  })

  const sorters = {
    default: null,
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    sales: (a, b) => b.sales - a.sales,
    discount: (a, b) => (a.origin ? a.price / a.origin : 1) - (b.origin ? b.price / b.origin : 1)
  }
  const sorter = sorters[sort]
  if (sorter) {
    result = [...result].sort(sorter)
  }
  return result
}

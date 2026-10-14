import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { STORAGE_KEYS, load, save } from '@/utils/storage'
import { productMap } from '@/data/products'

/**
 * 购物车
 * 每一条记录形如 { id, productId, spec, color, price, count, checked }
 * 用 productId + spec + color 唯一确定一行商品。
 */
export const useCartStore = defineStore('cart', () => {
  const items = ref(load(STORAGE_KEYS.cart, []))
  const lastAdded = ref(null)

  // ---------- getters ----------
  /** 购物车条目 + 关联的商品对象，避免页面到处查 productMap */
  const detailItems = computed(() =>
    items.value
      .map((item) => {
        const product = productMap[item.productId]
        return product ? { ...item, product } : null
      })
      .filter(Boolean)
  )

  const count = computed(() => items.value.reduce((sum, item) => sum + item.count, 0))

  const totalCount = computed(() => count.value)

  const checkedItems = computed(() => detailItems.value.filter((item) => item.checked))

  const checkedCount = computed(() => checkedItems.value.reduce((sum, item) => sum + item.count, 0))

  /** 商品小计（不含运费） */
  const checkedTotal = computed(() =>
    checkedItems.value.reduce((sum, item) => sum + item.price * item.count, 0)
  )

  const allChecked = computed(
    () => detailItems.value.length > 0 && detailItems.value.every((item) => item.checked)
  )

  const isEmpty = computed(() => items.value.length === 0)

  // ---------- actions ----------
  function addToCart(product, { count = 1, spec = '', color = '', checked = true } = {}) {
    if (!product) return
    // 数量不能超过库存
    const safeCount = Math.min(Math.max(1, count), product.stock || 99)
    const key = `${product.id}|${spec}|${color}`
    const exist = items.value.find((i) => `${i.id}|${i.spec}|${i.color}` === key)

    if (exist) {
      exist.count = Math.min(exist.count + safeCount, product.stock || 99)
      // 再次加入购物车时默认勾选，方便用户直接结算
      exist.checked = checked
    } else {
      items.value.push({
        id: `${product.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        productId: product.id,
        spec,
        color,
        price: product.price,
        count: safeCount,
        checked
      })
    }
    lastAdded.value = product
    persist()
  }

  function updateCount(rowId, count) {
    const item = items.value.find((i) => i.id === rowId)
    if (!item) return
    const product = productMap[item.productId]
    const max = product?.stock || 99
    item.count = Math.min(Math.max(1, count), max)
    persist()
  }

  function toggleChecked(rowId) {
    const item = items.value.find((i) => i.id === rowId)
    if (!item) return
    item.checked = !item.checked
    persist()
  }

  function toggleAll(checked) {
    items.value.forEach((item) => (item.checked = checked))
    persist()
  }

  function removeItem(rowId) {
    items.value = items.value.filter((i) => i.id !== rowId)
    persist()
  }

  function removeChecked() {
    items.value = items.value.filter((i) => !i.checked)
    persist()
  }

  /** 结算成功后清空已勾选的行 */
  function clearChecked() {
    removeChecked()
  }

  function clear() {
    items.value = []
    persist()
  }

  function persist() {
    save(STORAGE_KEYS.cart, items.value)
  }

  watch(items, persist, { deep: true })

  return {
    items,
    detailItems,
    count,
    totalCount,
    checkedItems,
    checkedCount,
    checkedTotal,
    allChecked,
    isEmpty,
    lastAdded,
    addToCart,
    updateCount,
    toggleChecked,
    toggleAll,
    removeItem,
    removeChecked,
    clearChecked,
    clear
  }
})

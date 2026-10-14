import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { initialOrders } from '@/data/orders'
import { productMap } from '@/data/products'
import { generateOrderId, formatDateTime } from '@/utils/format'

/**
 * 订单
 * 纯前端演示：订单只存在于内存中，刷新页面会恢复成初始的演示订单。
 */
export const useOrderStore = defineStore('order', () => {
  const orders = ref([...initialOrders])

  // ---------- getters ----------
  const count = computed(() => orders.value.length)

  /** 各状态订单数量，用于"我的"页面的角标 */
  const statusCount = computed(() => {
    const acc = { pending: 0, paid: 0, shipped: 0, done: 0, cancelled: 0 }
    orders.value.forEach((o) => {
      acc[o.status] = (acc[o.status] || 0) + 1
    })
    return acc
  })

  const pendingOrders = computed(() => orders.value.filter((o) => o.status === 'pending'))

  /** 订单条目补充商品信息，页面不需要再查 productMap */
  const detailOrders = computed(() =>
    orders.value.map((order) => ({
      ...order,
      items: order.items
        .map((item) => {
          const product = productMap[item.productId]
          return product ? { ...item, product } : null
        })
        .filter(Boolean)
    }))
  )

  function getById(id) {
    return detailOrders.value.find((o) => o.id === id) || null
  }

  function getByStatus(status) {
    if (!status || status === 'all') return detailOrders.value
    return detailOrders.value.filter((o) => o.status === status)
  }

  // ---------- actions ----------
  /**
   * 创建订单
   * @param {Object} payload { items, total, freight, address, remark, couponDiscount }
   */
  function createOrder(payload) {
    const id = generateOrderId()
    const order = {
      id,
      status: 'pending',
      createdAt: formatDateTime(),
      items: payload.items.map((item) => ({
        productId: item.productId,
        spec: item.spec || item.color || '',
        count: item.count,
        price: item.price,
        checked: true
      })),
      total: payload.total,
      freight: payload.freight || 0,
      address: payload.address,
      remark: payload.remark || '',
      couponDiscount: payload.couponDiscount || 0
    }
    // 新的订单排在最前面
    orders.value.unshift(order)
    return order
  }

  /** 模拟支付成功：待付款 -> 待发货 */
  function payOrder(id) {
    const order = orders.value.find((o) => o.id === id)
    if (order && order.status === 'pending') {
      order.status = 'paid'
      return true
    }
    return false
  }

  function confirmReceive(id) {
    const order = orders.value.find((o) => o.id === id)
    if (order && order.status === 'shipped') {
      order.status = 'done'
      return true
    }
    return false
  }

  function cancelOrder(id) {
    const order = orders.value.find((o) => o.id === id)
    if (order && order.status === 'pending') {
      order.status = 'cancelled'
      return true
    }
    return false
  }

  /** 删除已取消 / 已完成的订单 */
  function removeOrder(id) {
    orders.value = orders.value.filter((o) => o.id !== id)
  }

  return {
    orders,
    detailOrders,
    count,
    statusCount,
    pendingOrders,
    getById,
    getByStatus,
    createOrder,
    payOrder,
    confirmReceive,
    cancelOrder,
    removeOrder
  }
})

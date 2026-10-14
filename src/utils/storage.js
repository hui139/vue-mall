/**
 * 纯前端项目的本地存储封装。
 * localStorage 在部分环境（如隐私模式）可能抛异常，这里统一兜底成内存存储，
 * 保证页面不会因为存储不可用而崩溃。
 */

const memoryStore = new Map()

function getBackend() {
  try {
    const probe = '__dsh_probe__'
    window.localStorage.setItem(probe, '1')
    window.localStorage.removeItem(probe)
    return window.localStorage
  } catch {
    return {
      getItem: (k) => (memoryStore.has(k) ? memoryStore.get(k) : null),
      setItem: (k, v) => memoryStore.set(k, v),
      removeItem: (k) => memoryStore.delete(k)
    }
  }
}

const backend = getBackend()

/** 读取并 JSON 解析，解析失败返回 fallback */
export function load(key, fallback = null) {
  try {
    const raw = backend.getItem(key)
    if (raw === null || raw === undefined) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

/** JSON 序列化后写入 */
export function save(key, value) {
  try {
    backend.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/** 删除某个键 */
export function remove(key) {
  try {
    backend.removeItem(key)
  } catch {
    /* 忽略 */
  }
}

/** 存储键名统一集中管理 */
export const STORAGE_KEYS = {
  cart: 'mall_cart',
  favorite: 'mall_favorite',
  history: 'mall_history',
  address: 'mall_address',
  user: 'mall_user',
  searchHistory: 'mall_search_history',
  defaultAddress: 'mall_default_address'
}

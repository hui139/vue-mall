import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { STORAGE_KEYS, load, save } from '@/utils/storage'
import { demoAccount, initialAddresses } from '@/data/user'
import { maskPhone } from '@/utils/format'

/**
 * 用户 / 登录态 / 收货地址
 * 没有后端，"登录"就是本地保存一个登录标记，刷新后依然保持登录状态。
 */
export const useUserStore = defineStore('user', () => {
  // ---------- state ----------
  const user = ref(null)
  const token = ref('')
  const addresses = ref(load(STORAGE_KEYS.address, initialAddresses))

  // ---------- getters ----------
  const isLogin = computed(() => Boolean(token.value))
  const nickname = computed(() => user.value?.nickname || '未登录')
  const defaultAddress = computed(
    () => addresses.value.find((item) => item.isDefault) || addresses.value[0] || null
  )
  const addressCount = computed(() => addresses.value.length)

  // ---------- actions ----------
  /** 演示版：只校验密码，不请求服务端 */
  function login({ username, password, remember = true }) {
    return new Promise((resolve, reject) => {
      // 模拟网络延迟，让加载状态在界面上可见
      setTimeout(() => {
        if (!username || !password) {
          reject(new Error('请输入用户名和密码'))
          return
        }
        if (password !== demoAccount.password) {
          reject(new Error('密码错误，演示账号密码为 123456'))
          return
        }
        const profile = {
          ...demoAccount,
          username,
          nickname: username === demoAccount.username ? demoAccount.nickname : username
        }
        user.value = profile
        token.value = `demo-token-${Date.now()}`
        if (remember) save(STORAGE_KEYS.user, { user: profile, token: token.value })
        resolve(profile)
      }, 600)
    })
  }

  /** 演示版注册：直接把新用户写成登录态，密码仅做长度校验 */
  function register({ username, password, phone }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!username || !password) {
          reject(new Error('请填写用户名和密码'))
          return
        }
        if (String(password).length < 6) {
          reject(new Error('密码至少 6 位'))
          return
        }
        const profile = {
          ...demoAccount,
          username,
          nickname: username,
          phone: phone ? maskPhone(phone) : demoAccount.phone,
          points: 0,
          balance: 0,
          couponCount: 0
        }
        user.value = profile
        token.value = `demo-token-${Date.now()}`
        save(STORAGE_KEYS.user, { user: profile, token: token.value })
        resolve(profile)
      }, 600)
    })
  }

  function logout() {
    user.value = null
    token.value = ''
    save(STORAGE_KEYS.user, null)
  }

  /** 刷新页面后恢复登录态 */
  function restore() {
    const cached = load(STORAGE_KEYS.user, null)
    if (cached?.token) {
      user.value = cached.user
      token.value = cached.token
    }
  }

  function updateProfile(patch) {
    if (!user.value) return
    user.value = { ...user.value, ...patch }
    save(STORAGE_KEYS.user, { user: user.value, token: token.value })
  }

  function addAddress(address) {
    const item = {
      id: `addr${Date.now()}`,
      isDefault: addresses.value.length === 0,
      tag: '',
      ...address
    }
    // 只允许一个默认地址
    if (item.isDefault) {
      addresses.value.forEach((a) => (a.isDefault = false))
    }
    addresses.value.push(item)
    persistAddresses()
    return item
  }

  function updateAddress(id, patch) {
    const idx = addresses.value.findIndex((a) => a.id === id)
    if (idx === -1) return
    if (patch.isDefault) {
      addresses.value.forEach((a) => (a.isDefault = a.id === id))
    }
    addresses.value[idx] = { ...addresses.value[idx], ...patch }
    persistAddresses()
  }

  function removeAddress(id) {
    addresses.value = addresses.value.filter((a) => a.id !== id)
    // 删掉默认地址后，把第一个顶替为默认
    if (addresses.value.length && !addresses.value.some((a) => a.isDefault)) {
      addresses.value[0].isDefault = true
    }
    persistAddresses()
  }

  function setDefaultAddress(id) {
    addresses.value.forEach((a) => (a.isDefault = a.id === id))
    persistAddresses()
  }

  function persistAddresses() {
    save(STORAGE_KEYS.address, addresses.value)
  }

  // 地址变化即持久化（配合 add/update/remove 已足够，这里兜底）
  watch(addresses, persistAddresses, { deep: true })

  return {
    user,
    token,
    addresses,
    isLogin,
    nickname,
    defaultAddress,
    addressCount,
    login,
    register,
    logout,
    restore,
    updateProfile,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress
  }
})

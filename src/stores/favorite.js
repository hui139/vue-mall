import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { STORAGE_KEYS, load, save } from '@/utils/storage'
import { productMap } from '@/data/products'

/** 收藏与浏览记录（都持久化到 localStorage） */
export const useFavoriteStore = defineStore('favorite', () => {
  // ---------- 收藏 ----------
  const favoriteIds = ref(load(STORAGE_KEYS.favorite, []))

  const favoriteProducts = computed(() =>
    favoriteIds.value.map((id) => productMap[id]).filter(Boolean)
  )

  const count = computed(() => favoriteIds.value.length)

  function isFavorite(productId) {
    return favoriteIds.value.includes(productId)
  }

  function toggleFavorite(productId) {
    const idx = favoriteIds.value.indexOf(productId)
    if (idx === -1) {
      favoriteIds.value.unshift(productId)
    } else {
      favoriteIds.value.splice(idx, 1)
    }
    return isFavorite(productId)
  }

  function removeFavorite(productId) {
    favoriteIds.value = favoriteIds.value.filter((id) => id !== productId)
  }

  function clearFavorite() {
    favoriteIds.value = []
  }

  // ---------- 浏览记录 ----------
  const historyIds = ref(load(STORAGE_KEYS.history, []))

  const historyProducts = computed(() =>
    historyIds.value.map((id) => productMap[id]).filter(Boolean)
  )

  const historyCount = computed(() => historyIds.value.length)

  /** 最新的排在前面，同一商品重复浏览时移到最前而不是追加 */
  function addHistory(productId) {
    if (!productId) return
    const next = historyIds.value.filter((id) => id !== productId)
    next.unshift(productId)
    historyIds.value = next.slice(0, 20)
  }

  function clearHistory() {
    historyIds.value = []
  }

  function removeHistory(productId) {
    historyIds.value = historyIds.value.filter((id) => id !== productId)
  }

  watch(favoriteIds, (val) => save(STORAGE_KEYS.favorite, val), { deep: true })
  watch(historyIds, (val) => save(STORAGE_KEYS.history, val), { deep: true })

  return {
    favoriteIds,
    favoriteProducts,
    count,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorite,
    historyIds,
    historyProducts,
    historyCount,
    addHistory,
    clearHistory,
    removeHistory
  }
})

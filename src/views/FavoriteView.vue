<template>
  <div class="fav page-wrap">
    <div class="section-head">
      <h1 class="section-title">我的收藏</h1>
      <div class="flex gap-3">
        <span class="text-sm text-3">共 {{ favoriteStore.count }} 件</span>
        <el-button v-if="list.length" link type="danger" size="small" @click="onClear">
          清空收藏
        </el-button>
      </div>
    </div>

    <div v-if="list.length" class="grid grid-products">
      <ProductCard v-for="p in list" :key="p.id" :product="p" />
    </div>

    <div v-else class="card">
      <EmptyState
        icon="Star"
        title="还没有收藏任何商品"
        description="在商品卡片右上角点击星标即可收藏，收藏数据保存在本地"
        action-text="去逛逛"
        action-to="/products"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ProductCard from '@/components/common/ProductCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useFavoriteStore } from '@/stores/favorite'

const favoriteStore = useFavoriteStore()
const list = computed(() => favoriteStore.favoriteProducts)

async function onClear() {
  await ElMessageBox.confirm('确定要清空全部收藏吗？此操作不可恢复。', '清空收藏', {
    confirmButtonText: '清空',
    cancelButtonText: '取消',
    type: 'warning'
  })
  favoriteStore.clearFavorite()
  ElMessage.success('收藏已清空')
}
</script>

<style scoped>
.fav {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-8);
}


</style>

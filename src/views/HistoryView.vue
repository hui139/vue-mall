<template>
  <div class="history page-wrap">
    <div class="section-head">
      <h1 class="section-title">浏览记录</h1>
      <el-button v-if="list.length" link type="danger" size="small" @click="onClear">
        清空记录
      </el-button>
    </div>

    <div v-if="list.length" class="grid grid-products">
      <ProductCard
        v-for="p in list"
        :key="p.id"
        :product="p"
        :show-favorite="false"
      />
    </div>

    <div v-else class="card">
      <EmptyState
        icon="Clock"
        title="还没有浏览记录"
        description="浏览过的商品会自动出现在这里，最多保留 20 条"
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
const list = computed(() => favoriteStore.historyProducts)

async function onClear() {
  await ElMessageBox.confirm('确定要清空全部浏览记录吗？', '清空记录', {
    confirmButtonText: '清空',
    cancelButtonText: '取消',
    type: 'warning'
  })
  favoriteStore.clearHistory()
  ElMessage.success('浏览记录已清空')
}
</script>

<style scoped>
.history {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-8);
}


</style>

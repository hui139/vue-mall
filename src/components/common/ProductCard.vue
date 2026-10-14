<template>
  <RouterLink :to="`/products/${product.id}`" class="pcard" :class="{ 'pcard--horizontal': layout === 'horizontal' }">
    <div class="pcard__media">
      <el-image
        :src="product.image"
        :alt="product.name"
        fit="cover"
        lazy
        class="pcard__img"
      >
        <template #error>
          <div class="pcard__img-fallback">
            <el-icon :size="26"><Picture /></el-icon>
            <span class="text-xs">暂无图片</span>
          </div>
        </template>
      </el-image>

      <!-- 左上角折扣角标 -->
      <span v-if="discount" class="pcard__discount">{{ discount }} 折</span>

      <!-- 右上角收藏 -->
      <button
        v-if="showFavorite"
        class="pcard__fav"
        :class="{ 'is-active': favoriteActive }"
        :aria-label="favoriteActive ? '取消收藏' : '收藏'"
        @click.prevent.stop="onToggleFavorite"
      >
        <el-icon :size="16">
          <component :is="favoriteActive ? 'StarFilled' : 'Star'" />
        </el-icon>
      </button>
    </div>

    <div class="pcard__body">
      <h3 class="pcard__name ellipsis-2">{{ product.name }}</h3>

      <div class="pcard__spec text-xs text-3 ellipsis">{{ specText }}</div>

      <div class="pcard__price-row">
        <PriceTag :value="product.price" size="md" />
        <span v-if="product.origin > product.price" class="price-origin">
          ¥{{ product.origin }}
        </span>
      </div>

      <div class="pcard__footer">
        <span class="text-xs text-3">已售 {{ formatSales(product.sales) }}</span>
        <slot name="footer" />
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import PriceTag from './PriceTag.vue'
import { useFavoriteStore } from '@/stores/favorite'
import { formatDiscount, formatSales } from '@/utils/format'

const props = defineProps({
  product: { type: Object, required: true },
  /** vertical = 网格卡片；horizontal = 列表行（购物车 / 订单 / 收藏） */
  layout: { type: String, default: 'vertical' },
  showFavorite: { type: Boolean, default: true }
})

const router = useRouter()
const favoriteStore = useFavoriteStore()
const { favoriteIds } = storeToRefs(favoriteStore)

const discount = computed(() => formatDiscount(props.product.price, props.product.origin))
const favoriteActive = computed(() => favoriteIds.value.includes(props.product.id))

const specText = computed(() => {
  const parts = []
  if (props.product.specs) parts.push(props.product.specs)
  if (props.product.colors?.length) parts.push(props.product.colors.slice(0, 3).join(' / '))
  return parts.join(' · ') || '默认规格'
})

function onToggleFavorite() {
  const nowFavorite = favoriteStore.toggleFavorite(props.product.id)
  ElMessage.success(nowFavorite ? '已加入收藏' : '已取消收藏')
  // 收藏页里取消收藏后，如果当前页已经没有商品了，退回上一页更符合直觉
  if (!nowFavorite && router.currentRoute.value.name === 'favorite') {
    router.back()
  }
}
</script>

<style scoped>
.pcard {
  display: flex;
  flex-direction: column;
  background: var(--c-bg-elevated);
  border-radius: var(--r-lg);
  overflow: hidden;
  box-shadow: var(--sh-sm);
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}

.pcard:hover {
  transform: translateY(-3px);
  box-shadow: var(--sh-md);
}

.pcard__media {
  position: relative;
  aspect-ratio: 1 / 1;
  background: var(--c-bg-muted);
  overflow: hidden;
}

.pcard__img {
  width: 100%;
  height: 100%;
  transition: transform 0.35s var(--ease);
}

.pcard:hover .pcard__img {
  transform: scale(1.05);
}

.pcard__img-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-1);
  color: var(--c-text-4);
}

.pcard__discount {
  position: absolute;
  top: var(--sp-2);
  left: 0;
  padding: 2px var(--sp-2);
  border-top-right-radius: var(--r-sm);
  border-bottom-right-radius: var(--r-sm);
  background: var(--c-price);
  color: #fff;
  font-size: var(--fs-xs);
  font-weight: 700;
}

.pcard__fav {
  position: absolute;
  top: var(--sp-2);
  right: var(--sp-2);
  width: 28px;
  height: 28px;
  border-radius: var(--r-full);
  background: rgba(255, 255, 255, 0.92);
  color: var(--c-text-3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--dur) var(--ease);
}

.pcard__fav:hover {
  color: var(--c-warning);
  transform: scale(1.08);
}

.pcard__fav.is-active {
  color: var(--c-warning);
}

.pcard__body {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  padding: var(--sp-3);
}

.pcard__name {
  font-size: var(--fs-base);
  font-weight: 500;
  line-height: 1.45;
  min-height: 2.9em;
  transition: color var(--dur) var(--ease);
}

.pcard:hover .pcard__name {
  color: var(--c-brand);
}

.pcard__price-row {
  display: flex;
  align-items: baseline;
  gap: var(--sp-1);
  margin-top: var(--sp-1);
  min-width: 0;
}

/* 原价过长时截断，避免把现价挤出容器 */
.pcard__price-row .price-origin {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pcard__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-2);
  margin-top: var(--sp-1);
  min-height: 20px;
}

/* ---------- 横向布局：购物车 / 订单 / 收藏 ---------- */
.pcard--horizontal {
  flex-direction: row;
  padding: var(--sp-3);
  gap: var(--sp-3);
}

.pcard--horizontal .pcard__media {
  width: 96px;
  height: 96px;
  flex-shrink: 0;
  border-radius: var(--r-md);
  aspect-ratio: auto;
}

.pcard--horizontal .pcard__body {
  flex: 1;
  min-width: 0;
  padding: 0;
  justify-content: center;
}

.pcard--horizontal .pcard__name {
  min-height: 0;
}
</style>

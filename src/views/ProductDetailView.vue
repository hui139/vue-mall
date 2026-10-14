<template>
  <div v-if="product" class="detail page-wrap">
    <!-- 面包屑 -->
    <nav class="crumb">
      <RouterLink to="/">首页</RouterLink>
      <el-icon><ArrowRight /></el-icon>
      <RouterLink :to="`/products?category=${product.category}`">
        {{ categoryName }}
      </RouterLink>
      <el-icon><ArrowRight /></el-icon>
      <span class="ellipsis">{{ product.name }}</span>
    </nav>

    <!-- 主信息区 -->
    <section class="card detail__main">
      <div class="detail__gallery">
        <el-image :src="product.image" fit="cover" class="detail__img">
          <template #error>
            <div class="detail__img-fallback"><el-icon :size="40"><Picture /></el-icon></div>
          </template>
        </el-image>
      </div>

      <div class="detail__info">
        <div class="detail__tags">
          <span v-for="tag in product.tags" :key="tag" class="tag-line">{{ tag }}</span>
        </div>

        <h1 class="detail__name">{{ product.name }}</h1>

        <div class="detail__sales text-sm text-3">
          已售 {{ formatSales(product.sales) }} 件 · 库存 {{ product.stock }} 件
        </div>

        <!-- 价格区 -->
        <div class="detail__price-box">
          <div class="detail__price">
            <PriceTag :value="product.price" size="xl" />
            <span v-if="product.origin > product.price" class="price-origin text-sm">
              ¥{{ product.origin }}
            </span>
            <span v-if="discount" class="detail__discount">{{ discount }} 折</span>
          </div>
          <p v-if="save > 0" class="detail__save">
            比原价省 <strong>¥{{ formatMoney(save) }}</strong>
          </p>
        </div>

        <!-- 优惠券 -->
        <div class="detail__coupons">
          <span class="detail__label">优惠</span>
          <div class="detail__coupon-list">
            <span v-for="c in availableCoupons" :key="c.id" class="detail__coupon">
              满{{ c.threshold }}减{{ c.discount }}
            </span>
            <span v-if="!availableCoupons.length" class="text-sm text-3">该商品暂无可用券</span>
          </div>
        </div>

        <!-- 颜色 -->
        <div v-if="product.colors?.length" class="detail__row">
          <span class="detail__label">颜色</span>
          <div class="detail__options">
            <button
              v-for="color in product.colors"
              :key="color"
              class="detail__option"
              :class="{ 'is-active': selectedColor === color }"
              @click="selectedColor = color"
            >
              {{ color }}
            </button>
          </div>
        </div>

        <!-- 规格 -->
        <div v-if="product.specs" class="detail__row">
          <span class="detail__label">规格</span>
          <div class="detail__options">
            <button
              class="detail__option is-active is-fixed"
            >
              {{ product.specs }}
            </button>
          </div>
        </div>

        <!-- 数量 -->
        <div class="detail__row">
          <span class="detail__label">数量</span>
          <div class="detail__quantity">
            <StepperInput v-model="count" :max="product.stock" />
            <span class="text-xs text-3">库存 {{ product.stock }} 件</span>
          </div>
        </div>

        <!-- 服务承诺 -->
        <div class="detail__services">
          <span v-for="s in services" :key="s">
            <el-icon :size="14"><CircleCheckFilled /></el-icon> {{ s }}
          </span>
        </div>

        <!-- 操作按钮 -->
        <div class="detail__actions">
          <button class="btn btn--ghost detail__btn" @click="onAddCart(false)">
            <el-icon><ShoppingCart /></el-icon> 加入购物车
          </button>
          <button class="btn btn--primary detail__btn" @click="onAddCart(true)">
            <el-icon><Lightning /></el-icon> 立即购买
          </button>
          <button
            class="detail__fav"
            :class="{ 'is-active': favoriteActive }"
            :title="favoriteActive ? '取消收藏' : '收藏商品'"
            @click="toggleFav"
          >
            <el-icon :size="20">
              <component :is="favoriteActive ? 'StarFilled' : 'Star'" />
            </el-icon>
          </button>
        </div>
      </div>
    </section>

    <!-- 商品详情 + 规格参数 -->
    <section class="card mt-4 detail__desc">
      <h2 class="section-title mb-4">商品详情</h2>
      <p class="detail__desc-text">{{ product.desc }}</p>

      <h3 class="detail__sub-title">规格参数</h3>
      <ul class="detail__params">
        <li v-for="(value, key) in product.detail" :key="key" class="detail__param">
          <span class="detail__param-key">{{ key }}</span>
          <span class="detail__param-value">{{ value }}</span>
        </li>
      </ul>
    </section>

    <!-- 相关推荐 / 浏览记录 -->
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">相关推荐</h2>
        <RouterLink :to="`/products?category=${product.category}`" class="section-more">
          更多{{ categoryName }}
        </RouterLink>
      </div>
      <div class="grid grid-5">
        <ProductCard v-for="p in related" :key="p.id" :product="p" />
      </div>
    </section>
  </div>

  <!-- 商品不存在 -->
  <div v-else class="page-wrap detail__missing">
    <EmptyState
      icon="WarnTriangleFilled"
      title="商品不存在或已下架"
      description="该商品可能已被删除，去看看其他商品吧"
      action-text="返回首页"
      action-to="/"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import PriceTag from '@/components/common/PriceTag.vue'
import StepperInput from '@/components/common/StepperInput.vue'
import ProductCard from '@/components/common/ProductCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { productMap, products } from '@/data/products'
import { categoryMap } from '@/data/categories'
import { coupons } from '@/data/user'
import { useCartStore } from '@/stores/cart'
import { useFavoriteStore } from '@/stores/favorite'
import { formatDiscount, formatMoney, formatSales, saveAmount } from '@/utils/format'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const { favoriteIds } = storeToRefs(favoriteStore)

const services = ['正品保障', '7 天无理由退换', '闪电发货', '运费险']

const selectedColor = ref('')
const count = ref(1)

const product = computed(() => productMap[String(route.params.id)] || null)
const categoryName = computed(() => categoryMap[product.value?.category]?.name || '商品')
const discount = computed(() =>
  product.value ? formatDiscount(product.value.price, product.value.origin) : null
)
const save = computed(() =>
  product.value ? saveAmount(product.value.price, product.value.origin) : 0
)
const favoriteActive = computed(() =>
  product.value ? favoriteIds.value.includes(product.value.id) : false
)

// 只展示适用于该商品分类的券
const availableCoupons = computed(() => {
  if (!product.value) return []
  return coupons.filter((c) => c.scope.includes('全品类') || c.scope.includes(categoryName.value.slice(0, 2)))
})

// 同分类的其他商品（排除自己），销量高的排前面
const related = computed(() => {
  if (!product.value) return []
  const sameCat = products.filter(
    (p) => p.category === product.value.category && p.id !== product.value.id
  )
  const others = products.filter(
    (p) => p.category !== product.value.category && p.id !== product.value.id
  )
  return [...sameCat, ...others]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 10)
})

// 切换商品时重置选择状态，并记录浏览历史
watch(
  product,
  (val) => {
    if (!val) return
    selectedColor.value = val.colors?.[0] || ''
    count.value = 1
    favoriteStore.addHistory(val.id)
  },
  { immediate: true }
)

function toggleFav() {
  const nowFavorite = favoriteStore.toggleFavorite(product.value.id)
  ElMessage.success(nowFavorite ? '已加入收藏' : '已取消收藏')
}

function onAddCart(goCheckout) {
  cartStore.addToCart(product.value, {
    count: count.value,
    color: selectedColor.value,
    spec: product.value.specs || ''
  })
  if (goCheckout) {
    ElMessage.success('已为你选中该商品')
    router.push({ path: '/checkout', query: { from: 'detail' } })
  } else {
    ElMessage.success('已加入购物车')
  }
}
</script>

<style scoped>
.detail {
  padding-top: var(--sp-5);
  padding-bottom: var(--sp-8);
}

.crumb {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--fs-sm);
  color: var(--c-text-3);
  margin-bottom: var(--sp-3);
  overflow: hidden;
}

.crumb a:hover {
  color: var(--c-brand);
}

.crumb .ellipsis {
  max-width: 40%;
}

/* ---------- 主区 ---------- */
.detail__main {
  display: grid;
  grid-template-columns: minmax(0, 460px) minmax(0, 1fr);
  gap: var(--sp-10);
  padding: var(--sp-8);
}

.detail__img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--r-lg);
  background: var(--c-bg-muted);
}

.detail__img-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-4);
}

.detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  margin-bottom: var(--sp-3);
}

.detail__name {
  font-size: clamp(18px, 2.4vw, 24px);
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: var(--sp-2);
}

.detail__price-box {
  margin: var(--sp-4) 0;
  padding: var(--sp-4);
  border-radius: var(--r-md);
  background: linear-gradient(135deg, #fff6f2 0%, #ffece5 100%);
}

.detail__price {
  display: flex;
  align-items: baseline;
  gap: var(--sp-2);
  flex-wrap: wrap;
}

.detail__discount {
  padding: 2px var(--sp-2);
  border-radius: var(--r-xs);
  background: var(--c-price);
  color: #fff;
  font-size: var(--fs-xs);
  font-weight: 700;
}

.detail__save {
  margin-top: var(--sp-1);
  font-size: var(--fs-sm);
  color: var(--c-text-2);
}

.detail__save strong {
  color: var(--c-danger);
}

.detail__label {
  width: 44px;
  flex-shrink: 0;
  font-size: var(--fs-sm);
  color: var(--c-text-3);
  padding-top: 5px;
}

.detail__coupons,
.detail__row {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-3);
  margin-bottom: var(--sp-4);
}

.detail__coupon-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
}

.detail__coupon {
  padding: 3px var(--sp-3);
  border-radius: var(--r-full);
  background: var(--c-brand-soft);
  color: var(--c-brand);
  font-size: var(--fs-xs);
  font-weight: 600;
  border: 1px dashed var(--c-brand);
}

.detail__options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
}

.detail__option {
  min-width: 54px;
  padding: 5px var(--sp-3);
  border: 1px solid var(--c-border-strong);
  border-radius: var(--r-sm);
  background: #fff;
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  transition: all var(--dur) var(--ease);
}

.detail__option:hover {
  border-color: var(--c-brand);
  color: var(--c-brand);
}

.detail__option.is-active {
  border-color: var(--c-brand);
  background: var(--c-brand-soft);
  color: var(--c-brand);
  font-weight: 600;
}

.detail__option.is-fixed {
  cursor: default;
}

.detail__quantity {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.detail__services {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-4);
  padding: var(--sp-3) 0;
  margin-bottom: var(--sp-4);
  border-top: 1px dashed var(--c-border);
  border-bottom: 1px dashed var(--c-border);
  font-size: var(--fs-sm);
  color: var(--c-text-2);
}

.detail__services span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.detail__services :deep(.el-icon) {
  color: var(--c-success);
}

.detail__actions {
  display: flex;
  gap: var(--sp-3);
  align-items: center;
}

.detail__btn {
  flex: 1;
  height: 46px;
}

.detail__fav {
  width: 46px;
  height: 46px;
  border-radius: var(--r-full);
  border: 1px solid var(--c-border-strong);
  color: var(--c-text-3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--dur) var(--ease);
}

.detail__fav:hover {
  color: var(--c-warning);
  border-color: var(--c-warning);
}

.detail__fav.is-active {
  color: var(--c-warning);
  background: var(--c-warning-soft);
  border-color: var(--c-warning);
}

/* ---------- 详情 ---------- */
.detail__desc {
  padding: var(--sp-6);
}

.detail__desc-text {
  color: var(--c-text-2);
  line-height: 1.9;
}

.detail__sub-title {
  margin: var(--sp-5) 0 var(--sp-3);
  font-size: var(--fs-md);
  font-weight: 700;
}

.detail__params {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--sp-1) var(--sp-6);
  background: var(--c-bg-muted);
  border-radius: var(--r-md);
  padding: var(--sp-4);
}

.detail__param {
  display: flex;
  gap: var(--sp-3);
  padding: 7px 0;
  font-size: var(--fs-sm);
  border-bottom: 1px dashed var(--c-border);
}

.detail__param-key {
  color: var(--c-text-3);
  flex-shrink: 0;
  min-width: 72px;
}

.detail__param-value {
  color: var(--c-text);
}

.detail__missing {
  padding-top: var(--sp-10);
}
</style>

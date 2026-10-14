<template>
  <div class="list-page page-wrap">
    <!-- 分类切换 -->
    <div class="card cat-bar">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="cat-bar__item"
        :class="{ 'is-active': activeCategory === cat.id }"
        @click="switchCategory(cat.id)"
      >
        <el-icon :size="15"><component :is="cat.icon" /></el-icon>
        <span>{{ cat.name }}</span>
      </button>
    </div>

    <!-- 筛选与排序工具条 -->
    <div class="card filter-bar">
      <div class="filter-bar__left">
        <el-select
          v-model="priceRange"
          placeholder="价格区间"
          class="filter-bar__select"
          @change="onPriceRangeChange"
        >
          <el-option label="价格不限" :value="[]" />
          <el-option label="¥100 以下" :value="[0, 100]" />
          <el-option label="¥100 - 500" :value="[100, 500]" />
          <el-option label="¥500 - 1000" :value="[500, 1000]" />
          <el-option label="¥1000 - 3000" :value="[1000, 3000]" />
          <el-option label="¥3000 - 6000" :value="[3000, 6000]" />
          <el-option label="¥6000 以上" :value="[6000, 0]" />
        </el-select>

        <el-select
          v-model="activeSort"
          class="filter-bar__select"
          @change="onSortChange"
        >
          <el-option label="综合排序" value="default" />
          <el-option label="销量优先" value="sales" />
          <el-option label="价格从低到高" value="priceAsc" />
          <el-option label="价格从高到低" value="priceDesc" />
          <el-option label="折扣力度" value="discount" />
        </el-select>
      </div>

      <div class="filter-bar__right text-sm text-3">
        <span>
          共 <strong class="text-strong">{{ filtered.length }}</strong> 件商品
          <span v-if="filtered.length > pageSize">
            · 第 {{ currentPage }}/{{ totalPages }} 页
          </span>
        </span>

        <!-- 每页条数 -->
        <el-select
          v-model="pageSize"
          class="filter-bar__select filter-bar__select--sm"
          @change="onPageSizeChange"
        >
          <el-option v-for="s in pageSizeOptions" :key="s" :label="`${s} 件/页`" :value="s" />
        </el-select>

        <!-- 视图切换 -->
        <div class="view-switch">
          <button
            v-for="v in views"
            :key="v.value"
            class="view-switch__btn"
            :class="{ 'is-active': viewMode === v.value }"
            :title="v.label"
            @click="viewMode = v.value"
          >
            <el-icon :size="15"><component :is="v.icon" /></el-icon>
          </button>
        </div>

        <el-button
          v-if="hasFilter"
          link
          type="primary"
          size="small"
          class="ml-2"
          @click="resetFilter"
        >
          清除筛选
        </el-button>
      </div>
    </div>

    <!-- 商品网格 / 列表 -->
    <template v-if="paged.length">
      <div :class="viewMode === 'grid' ? 'grid grid-products mt-4' : 'list-view mt-4'">
        <ProductCard
          v-for="p in paged"
          :key="p.id"
          :product="p"
          :layout="viewMode === 'grid' ? 'vertical' : 'horizontal'"
        />
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="pageSizeOptions"
          :total="filtered.length"
          layout="prev, pager, next, sizes, total"
          background
          @current-change="scrollToTop"
          @size-change="onPageSizeChange"
        />
      </div>
    </template>

    <div v-else class="card mt-4">
      <EmptyState
        icon="Search"
        title="没有找到匹配的商品"
        description="试试更换关键词，或清除筛选条件后重新浏览"
      >
        <button class="btn btn--primary btn--sm mt-3" @click="resetFilter">清除筛选条件</button>
      </EmptyState>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '@/components/common/ProductCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { queryProducts } from '@/utils/query'

const route = useRoute()
const router = useRouter()

// PC 端 5 列布局：20 / 40 / 60 都能正好铺满整行
const pageSizeOptions = [20, 40, 60]

const views = [
  { label: '网格视图', value: 'grid', icon: 'Grid' },
  { label: '列表视图', value: 'list', icon: 'Menu' }
]

// ---------- 从 URL 同步筛选状态（支持分享链接 / 前进后退） ----------
const activeCategory = ref(String(route.query.category || 'all'))
const activeSort = ref(String(route.query.sort || 'default'))
const keyword = ref(String(route.query.keyword || ''))
const priceRange = ref(parseRange(route.query.price))

const currentPage = ref(Number(route.query.page) || 1)
const pageSize = ref(Number(route.query.size) || pageSizeOptions[0])
const viewMode = ref(route.query.view === 'list' ? 'list' : 'grid')

function parseRange(value) {
  if (!value) return []
  const parts = String(value).split('-').map(Number)
  return parts.length === 2 && parts.every((n) => !Number.isNaN(n)) ? parts : []
}

watch(
  () => route.query,
  (query) => {
    activeCategory.value = String(query.category || 'all')
    activeSort.value = String(query.sort || 'default')
    keyword.value = String(query.keyword || '')
    priceRange.value = parseRange(query.price)
    currentPage.value = Number(query.page) || 1
    const size = Number(query.size)
    pageSize.value = pageSizeOptions.includes(size) ? size : pageSizeOptions[0]
    viewMode.value = query.view === 'list' ? 'list' : 'grid'
  }
)

/** 把当前筛选状态写回 URL，保证可分享、可回退 */
function syncQuery(extra = {}) {
  const query = { ...route.query, ...extra }
  // 空值不写入 URL，保持地址栏干净
  Object.keys(query).forEach((key) => {
    if (!query[key] || query[key] === 'all' || query[key] === 'default') delete query[key]
  })
  router.push({ path: '/products', query })
}

const filtered = computed(() =>
  queryProducts(products, {
    keyword: keyword.value,
    category: activeCategory.value,
    minPrice: priceRange.value[0] || 0,
    maxPrice: priceRange.value[1] || 0,
    sort: activeSort.value
  })
)

const paged = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize.value)))

const hasFilter = computed(
  () =>
    activeCategory.value !== 'all' ||
    activeSort.value !== 'default' ||
    keyword.value !== '' ||
    priceRange.value.length > 0
)

// 筛选条件变化后回到第一页
watch([activeCategory, activeSort, keyword, priceRange], () => {
  currentPage.value = 1
})

// 结果总数变少时（例如翻到第 5 页后筛选），修正越界的页码
watch(filtered, (list) => {
  const maxPage = Math.max(1, Math.ceil(list.length / pageSize.value))
  if (currentPage.value > maxPage) currentPage.value = maxPage
})

function switchCategory(id) {
  syncQuery({ category: id, page: 1 })
}

function onSortChange(val) {
  syncQuery({ sort: val, page: 1 })
}

function onPriceRangeChange(val) {
  // [] 表示不限；[6000, 0] 表示 6000 以上
  syncQuery({ price: val && val.length ? val.join('-') : '', page: 1 })
}

/** 每页条数变化：回到第一页并写入 URL */
function onPageSizeChange(size) {
  pageSize.value = Number(size) || pageSizeOptions[0]
  currentPage.value = 1
  syncQuery({
    size: pageSize.value === pageSizeOptions[0] ? '' : pageSize.value,
    page: 1
  })
}

function resetFilter() {
  router.push({ path: '/products' })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.list-page {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-8);
}

/* ---------- 分类 ---------- */
.cat-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-1);
  padding: var(--sp-2);
  margin-bottom: var(--sp-3);
}

.cat-bar__item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 7px var(--sp-3);
  border-radius: var(--r-full);
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  transition: all var(--dur) var(--ease);
}

.cat-bar__item:hover {
  background: var(--c-bg-muted);
  color: var(--c-text);
}

.cat-bar__item.is-active {
  background: var(--c-brand-gradient);
  color: #fff;
  font-weight: 600;
  box-shadow: var(--sh-brand);
}

/* ---------- 工具条 ---------- */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
  padding: var(--sp-3);
}

.filter-bar__left {
  display: flex;
  gap: var(--sp-2);
  flex-wrap: wrap;
}

.filter-bar__select {
  width: 148px;
}

.filter-bar__select--sm {
  width: 110px;
}

.filter-bar__right {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  flex-shrink: 0;
}

/* ---------- 视图切换 ---------- */
.view-switch {
  display: flex;
  gap: 2px;
  padding: 2px;
  background: var(--c-bg-muted);
  border-radius: var(--r-sm);
}

.view-switch__btn {
  width: 30px;
  height: 26px;
  border-radius: var(--r-xs);
  color: var(--c-text-3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--dur) var(--ease);
}

.view-switch__btn:hover {
  color: var(--c-text);
}

.view-switch__btn.is-active {
  background: #fff;
  color: var(--c-brand);
  box-shadow: var(--sh-xs);
}

/* ---------- 列表视图：单列横向卡片 ---------- */
.list-view {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--sp-3);
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: var(--sp-6);
}


</style>

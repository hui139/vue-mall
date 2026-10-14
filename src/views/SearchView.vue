<template>
  <div class="search-page page-wrap">
    <!-- 搜索输入：独立于顶部栏，支持历史与热门词 -->
    <section class="card search-box">
      <div class="search-box__input">
        <el-input
          v-model="keyword"
          placeholder="输入关键词搜索商品"
          clearable
          size="large"
          @keyup.enter="doSearch"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        <button class="btn btn--primary search-box__btn" @click="doSearch">搜索</button>
      </div>

      <!-- 搜索前：历史与热门 -->
      <template v-if="!keyword.trim()">
        <div v-if="historyKeywords.length" class="search-box__group">
          <div class="search-box__group-head">
            <span>搜索历史</span>
            <button class="search-box__clear" @click="historyKeywords = []">
              <el-icon><Delete /></el-icon> 清空
            </button>
          </div>
          <div class="search-box__tags">
            <span
              v-for="kw in historyKeywords"
              :key="kw"
              class="search-box__tag"
              @click="pick(kw)"
            >
              {{ kw }}
            </span>
          </div>
        </div>

        <div class="search-box__group">
          <div class="search-box__group-head">
            <span>热门搜索</span>
          </div>
          <div class="search-box__tags">
            <span
              v-for="kw in hotKeywords"
              :key="kw"
              class="search-box__tag search-box__tag--hot"
              @click="pick(kw)"
            >
              {{ kw }}
            </span>
          </div>
        </div>
      </template>

      <!-- 搜索后：结果统计 + 排序 -->
      <template v-else>
        <div class="search-box__result-head">
          <span class="text-sm text-2">
            找到 <strong class="text-strong">{{ results.length }}</strong> 个与
            <strong class="text-strong">“{{ activeKeyword }}”</strong> 相关的结果
          </span>
          <el-select v-model="sort" size="small" class="search-box__sort">
            <el-option label="综合" value="default" />
            <el-option label="销量" value="sales" />
            <el-option label="价格升序" value="priceAsc" />
            <el-option label="价格降序" value="priceDesc" />
          </el-select>
        </div>
      </template>
    </section>

    <!-- 结果列表 -->
    <template v-if="hasSearched">
      <div v-if="results.length" class="grid grid-products mt-4">
        <ProductCard v-for="p in results" :key="p.id" :product="p" />
      </div>
      <div v-else class="card mt-4">
        <EmptyState
          icon="Search"
          title="没有找到相关商品"
          description="换个关键词试试，或者看看下面的热门推荐"
        />
      </div>
    </template>

    <!-- 推荐商品 -->
    <section v-if="!hasSearched || !results.length" class="section">
      <div class="section-head">
        <h2 class="section-title">{{ hasSearched ? '热门推荐' : '大家在搜' }}</h2>
        <RouterLink to="/products" class="section-more">浏览全部商品</RouterLink>
      </div>
      <div class="grid grid-products">
        <ProductCard v-for="p in hotProducts" :key="p.id" :product="p" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '@/components/common/ProductCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { products } from '@/data/products'
import { queryProducts } from '@/utils/query'
import { STORAGE_KEYS, load, save } from '@/utils/storage'

const route = useRoute()
const router = useRouter()

const keyword = ref(String(route.query.keyword || ''))
const activeKeyword = ref(keyword.value)
const sort = ref('default')

// 搜索历史保存在本地
const historyKeywords = ref(load(STORAGE_KEYS.searchHistory, ['耳机', '手机', '坚果', '跑鞋']))

const hotKeywords = ['手机', '笔记本电脑', '降噪耳机', '空气炸锅', '坚果', '跑鞋', '面膜', '乐高']

const hasSearched = computed(() => activeKeyword.value.trim().length > 0)

const results = computed(() =>
  queryProducts(products, { keyword: activeKeyword.value, sort: sort.value })
)

const hotProducts = computed(() =>
  [...products].sort((a, b) => b.sales - a.sales).slice(0, 10)
)

// URL 中的关键词变化时同步到输入框（例如从顶部栏搜索跳转过来）
watch(
  () => route.query.keyword,
  (val) => {
    const kw = String(val || '')
    keyword.value = kw
    activeKeyword.value = kw
  }
)

onMounted(() => {
  if (activeKeyword.value) pushHistory(activeKeyword.value)
})

function doSearch() {
  const kw = keyword.value.trim()
  activeKeyword.value = kw
  router.replace({ name: 'search', query: kw ? { keyword: kw } : {} })
  if (kw) pushHistory(kw)
}

function pick(kw) {
  keyword.value = kw
  doSearch()
}

function pushHistory(kw) {
  const next = [kw, ...historyKeywords.value.filter((item) => item !== kw)].slice(0, 10)
  historyKeywords.value = next
  save(STORAGE_KEYS.searchHistory, next)
}
</script>

<style scoped>
.search-page {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-8);
}

.search-box {
  padding: var(--sp-4);
}

.search-box__input {
  display: flex;
  gap: var(--sp-3);
  max-width: 620px;
}

.search-box__btn {
  height: 40px;
  padding: 0 var(--sp-6);
  flex-shrink: 0;
}

.search-box__group {
  margin-top: var(--sp-5);
}

.search-box__group-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sp-3);
  font-size: var(--fs-sm);
  color: var(--c-text-3);
}

.search-box__clear {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: var(--fs-sm);
  color: var(--c-text-3);
}

.search-box__clear:hover {
  color: var(--c-danger);
}

.search-box__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
}

.search-box__tag {
  padding: 6px var(--sp-4);
  border-radius: var(--r-full);
  background: var(--c-bg-muted);
  color: var(--c-text-2);
  font-size: var(--fs-sm);
  cursor: pointer;
  transition: all var(--dur) var(--ease);
}

.search-box__tag:hover {
  background: var(--c-brand-soft);
  color: var(--c-brand);
}

.search-box__tag--hot {
  background: var(--c-brand-soft);
  color: var(--c-brand);
  font-weight: 600;
}

.search-box__result-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
  margin-top: var(--sp-4);
  padding-top: var(--sp-4);
  border-top: 1px dashed var(--c-border);
  flex-wrap: wrap;
}

.search-box__sort {
  width: 120px;
}



</style>

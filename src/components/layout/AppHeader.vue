<template>
  <header class="header">
    <!-- 第一层：工具条 -->
    <div class="header__top">
      <div class="page-wrap header__top-inner">
        <span class="header__slogan">云购商城 · 全场正品保障</span>
        <nav class="header__links">
          <RouterLink to="/orders" class="header__link">我的订单</RouterLink>
          <RouterLink to="/dashboard" class="header__link">数据看板</RouterLink>
          <RouterLink to="/coupon" class="header__link">优惠券</RouterLink>
          <RouterLink to="/history" class="header__link">浏览记录</RouterLink>
          <span class="header__divider"></span>
          <RouterLink :to="isLogin ? '/user' : '/login'" class="header__link">
            {{ isLogin ? userStore.nickname : '请登录' }}
          </RouterLink>
          <button v-if="isLogin" class="header__link" @click="onLogout">退出</button>
          <RouterLink v-else to="/login" class="header__link header__link--accent">免费注册</RouterLink>
        </nav>
      </div>
    </div>

    <!-- 第二层：Logo + 搜索 + 购物车 -->
    <div class="header__main">
      <div class="page-wrap header__main-inner">
        <RouterLink to="/" class="header__logo">
          <span class="header__logo-mark">云</span>
          <span class="header__logo-text">
            <strong>云购商城</strong>
            <small>YUNGOO MALL</small>
          </span>
        </RouterLink>

        <div class="header__search">
          <el-input
            v-model="keyword"
            placeholder="搜索商品，如：耳机 / 手机 / 坚果"
            clearable
            @keyup.enter="onSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <button class="header__search-btn" @click="onSearch">搜索</button>
        </div>

        <RouterLink to="/cart" class="header__cart">
          <el-badge :value="cartCount" :hidden="cartCount === 0" :max="99" class="header__badge">
            <el-icon :size="18"><ShoppingCart /></el-icon>
          </el-badge>
          <span>购物车</span>
          <em v-if="cartCount">共 {{ cartCount }} 件</em>
        </RouterLink>
      </div>
    </div>

    <!-- 第三层：分类导航 -->
    <nav class="header__nav">
      <div class="page-wrap header__nav-inner">
        <RouterLink
          v-for="cat in navCategories"
          :key="cat.id"
          :to="cat.id === 'all' ? '/products' : `/products?category=${cat.id}`"
          class="header__nav-item"
          :class="{ 'is-active': activeCategory === cat.id }"
        >
          <el-icon v-if="cat.id === 'all'" :size="15"><Grid /></el-icon>
          <span>{{ cat.name }}</span>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { categories } from '@/data/categories'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const { count: cartCount } = storeToRefs(cartStore)
const { isLogin } = storeToRefs(userStore)

const keyword = ref(String(route.query.keyword || ''))

// 顶部分类导航去掉"全部"，直接展示各品类
const navCategories = categories.filter((c) => c.id !== 'all')

// 高亮当前所在分类
const activeCategory = ref(String(route.query.category || ''))
watch(
  () => route.query.category,
  (v) => (activeCategory.value = String(v || ''))
)

function onSearch() {
  const kw = keyword.value.trim()
  router.push({ name: 'search', query: kw ? { keyword: kw } : {} })
}

async function onLogout() {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/')
}
</script>

<style scoped>
.header {
  background: #fff;
  border-bottom: 1px solid var(--c-border);
}

/* ---------- 第一层：工具条 ---------- */
.header__top {
  background: var(--c-bg-muted);
  border-bottom: 1px solid var(--c-border);
  font-size: var(--fs-sm);
}

.header__top-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 34px;
}

.header__slogan {
  color: var(--c-text-3);
}

.header__links {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
}

.header__link {
  color: var(--c-text-2);
  transition: color var(--dur) var(--ease);
}

.header__link:hover {
  color: var(--c-brand);
}

.header__link--accent {
  color: var(--c-brand);
  font-weight: 600;
}

.header__divider {
  width: 1px;
  height: 12px;
  background: var(--c-border-strong);
}

/* ---------- 第二层：Logo + 搜索 ---------- */
.header__main {
  background: #fff;
}

.header__main-inner {
  display: flex;
  align-items: center;
  gap: var(--sp-8);
  height: 84px;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  flex-shrink: 0;
}

.header__logo-mark {
  width: 46px;
  height: 46px;
  border-radius: var(--r-md);
  background: var(--c-brand-gradient);
  color: #fff;
  font-weight: 800;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--sh-brand);
}

.header__logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.header__logo-text strong {
  font-size: var(--fs-2xl);
  font-weight: 800;
  letter-spacing: 1px;
}

.header__logo-text small {
  font-size: var(--fs-xs);
  color: var(--c-text-4);
  letter-spacing: 2px;
}

.header__search {
  position: relative;
  flex: 1;
  max-width: 560px;
}

.header__search :deep(.el-input__wrapper) {
  border-radius: var(--r-full);
  background: #fff;
  border: 2px solid var(--c-brand);
  box-shadow: none;
  height: 40px;
  padding-right: 88px;
}

.header__search :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px var(--c-brand) inset;
}

.header__search-btn {
  position: absolute;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
  height: 32px;
  padding: 0 var(--sp-5);
  border-radius: var(--r-full);
  background: var(--c-brand-gradient);
  color: #fff;
  font-size: var(--fs-base);
  font-weight: 700;
  transition: filter var(--dur) var(--ease);
}

.header__search-btn:hover {
  filter: brightness(1.08);
}

.header__cart {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 var(--sp-5);
  border-radius: var(--r-full);
  background: var(--c-brand-soft);
  color: var(--c-brand);
  font-weight: 600;
  transition: all var(--dur) var(--ease);
}

.header__cart:hover {
  background: var(--c-brand-soft-2);
}

.header__cart em {
  font-style: normal;
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  font-weight: 400;
}

.header__badge :deep(.el-badge__content) {
  border: none;
  background: var(--c-danger);
  font-size: 10px;
  height: 17px;
  line-height: 17px;
  padding: 0 4px;
}

/* ---------- 第三层：分类导航 ---------- */
.header__nav {
  background: #fff;
  border-top: 1px solid var(--c-border);
}

.header__nav-inner {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  height: 46px;
}

.header__nav-item {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 100%;
  padding: 0 var(--sp-4);
  font-size: var(--fs-base);
  color: var(--c-text-2);
  position: relative;
  transition: color var(--dur) var(--ease);
}

.header__nav-item::after {
  content: '';
  position: absolute;
  left: var(--sp-4);
  right: var(--sp-4);
  bottom: 0;
  height: 3px;
  border-radius: var(--r-full) var(--r-full) 0 0;
  background: var(--c-brand);
  transform: scaleX(0);
  transition: transform var(--dur) var(--ease);
}

.header__nav-item:hover {
  color: var(--c-brand);
}

.header__nav-item.is-active {
  color: var(--c-brand);
  font-weight: 600;
}

.header__nav-item.is-active::after {
  transform: scaleX(1);
}
</style>

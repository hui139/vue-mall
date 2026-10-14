<template>
  <div class="home">
    <div class="page-wrap">
      <!-- 首屏：左侧大轮播 + 右侧分类入口与公告 -->
      <section class="section hero">
        <div class="hero__main">
          <el-carousel
            height="100%"
            :interval="4000"
            arrow="never"
            indicator-position=""
            class="hero__carousel"
          >
            <el-carousel-item v-for="item in banners" :key="item.id">
              <div class="banner" :style="{ background: item.bg }">
                <div class="banner__text">
                  <h2 class="banner__title">{{ item.title }}</h2>
                  <p class="banner__subtitle">{{ item.subtitle }}</p>
                  <RouterLink :to="item.to" class="banner__cta">{{ item.cta }}</RouterLink>
                </div>
                <el-icon class="banner__deco" :size="180"><ShoppingCart /></el-icon>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <aside class="hero__side">
          <div class="card hero__panel">
            <h3 class="hero__panel-title">
              <el-icon><Grid /></el-icon> 商品分类
            </h3>
            <div class="hero__cats">
              <RouterLink
                v-for="cat in sideCategories"
                :key="cat.id"
                :to="cat.id === 'all' ? '/products' : `/products?category=${cat.id}`"
                class="hero__cat"
              >
                <span class="hero__cat-icon">
                  <el-icon :size="16"><component :is="cat.icon" /></el-icon>
                </span>
                <span class="hero__cat-name">{{ cat.name }}</span>
              </RouterLink>
            </div>
          </div>

          <div class="card hero__notice">
            <h3 class="hero__panel-title">
              <el-icon><Bell /></el-icon> 今日公告
            </h3>
            <ul class="hero__notice-list">
              <li v-for="n in notices" :key="n.title">
                <span class="hero__notice-tag" :class="'is-' + n.type">{{ n.tag }}</span>
                <span class="ellipsis">{{ n.title }}</span>
              </li>
            </ul>
          </div>
        </aside>
      </section>

      <!-- 平台数据概览 -->
      <section class="section stats-bar">
        <div class="stats-bar__inner">
          <div v-for="s in platformStats" :key="s.key" class="stat">
            <span class="stat__icon">
              <el-icon :size="20"><component :is="s.icon" /></el-icon>
            </span>
            <div class="stat__text">
              <div class="stat__value">
                {{ s.value }}<em class="stat__unit">{{ s.unit }}</em>
              </div>
              <div class="stat__label">{{ s.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 限时秒杀 -->
      <section class="section">
        <div class="card flash">
          <div class="flash__head">
            <span class="flash__title"><el-icon><Lightning /></el-icon> 限时秒杀</span>
            <span class="flash__timer">
              距结束
              <span class="flash__time">{{ countdown }}</span>
            </span>
            <RouterLink to="/products?sort=discount" class="section-more">
              更多秒杀 <el-icon><ArrowRight /></el-icon>
            </RouterLink>
          </div>
          <div class="flash__body">
            <div
              v-for="p in flashProducts"
              :key="p.id"
              class="flash__item"
              @click="goDetail(p.id)"
            >
              <el-image :src="p.image" fit="cover" class="flash__img" lazy>
                <template #error>
                  <div class="flash__img-fallback"><el-icon><Picture /></el-icon></div>
                </template>
              </el-image>
              <p class="flash__name ellipsis-2">{{ p.name }}</p>
              <div class="flash__info">
                <PriceTag :value="p.price" size="sm" />
                <span v-if="saveAmount(p.price, p.origin)" class="flash__save">
                  省 ¥{{ saveAmount(p.price, p.origin) }}
                </span>
              </div>
              <div class="flash__progress">
                <div class="flash__bar" :style="{ width: `${soldRatio(p)}%` }"></div>
                <span class="flash__sold">已抢 {{ soldRatio(p) }}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 品牌墙 + 新品预告 -->
      <section class="section">
        <div class="two-col">
          <div class="card brand-panel">
            <div class="section-head">
              <h2 class="section-title">大牌直供</h2>
              <span class="section-more">官方授权 · 正品保障</span>
            </div>
            <div class="brand-grid">
              <div v-for="b in brands" :key="b.id" class="brand">
                <span class="brand__logo" :style="{ background: b.bg }">{{ b.name.slice(0, 1) }}</span>
                <div class="brand__text">
                  <p class="brand__name">{{ b.name }}</p>
                  <p class="brand__slogan ellipsis">{{ b.slogan }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card upcoming-panel">
            <div class="section-head">
              <h2 class="section-title">即将开售</h2>
              <span class="section-more">预约提醒</span>
            </div>
            <ul class="upcoming-list">
              <li v-for="u in upcoming" :key="u.id" class="upcoming">
                <div class="upcoming__date">
                  <span class="upcoming__day">{{ u.date.split(' ')[0] }}</span>
                  <span class="upcoming__time">{{ u.date.split(' ')[1] }}</span>
                </div>
                <div class="upcoming__info">
                  <p class="upcoming__name ellipsis">{{ u.name }}</p>
                  <p class="upcoming__meta text-xs text-3">
                    {{ u.stock }} · 已有 {{ formatSales(u.reserve) }} 人预约
                  </p>
                </div>
                <span class="upcoming__tag" :class="u.tag === '预约中' ? 'is-active' : ''">
                  {{ u.tag }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 领券中心 + 热销榜单 -->
      <section class="section">
        <div class="two-col">
          <div class="card coupons">
            <div class="section-head">
              <h2 class="section-title">领券中心</h2>
              <RouterLink to="/coupon" class="section-more">
                我的券包 <el-icon><ArrowRight /></el-icon>
              </RouterLink>
            </div>
            <div class="coupons__list">
              <div
                v-for="c in coupons.slice(0, 4)"
                :key="c.id"
                class="coupon"
                :class="{ 'is-claimed': claimedCoupons.includes(c.id) }"
                @click="claimCoupon(c)"
              >
                <div class="coupon__left">
                  <div class="coupon__amount">
                    <span class="coupon__symbol">¥</span>{{ c.discount }}
                  </div>
                  <div class="coupon__threshold">满 {{ c.threshold }} 可用</div>
                </div>
                <div class="coupon__right">
                  <p class="coupon__name">{{ c.name }}</p>
                  <p class="coupon__scope">{{ c.scope }} · 有效期至 {{ c.expire }}</p>
                </div>
                <span class="coupon__btn">
                  {{ claimedCoupons.includes(c.id) ? '已领取' : '领取' }}
                </span>
              </div>
            </div>
          </div>

          <div class="card ranking">
            <div class="section-head">
              <h2 class="section-title">热销榜单</h2>
              <span class="section-more">TOP 6 · 按销量</span>
            </div>
            <ol class="ranking__list">
              <li
                v-for="(p, i) in topRanking"
                :key="p.id"
                class="ranking__item"
                @click="goDetail(p.id)"
              >
                <span class="ranking__no" :class="`ranking__no--${i + 1}`">{{ i + 1 }}</span>
                <el-image :src="p.image" fit="cover" class="ranking__img" lazy>
                  <template #error>
                    <div class="ranking__img-fallback"><el-icon><Picture /></el-icon></div>
                  </template>
                </el-image>
                <div class="ranking__info">
                  <p class="ranking__name ellipsis">{{ p.name }}</p>
                  <p class="text-xs text-3">已售 {{ formatSales(p.sales) }} 件</p>
                </div>
                <PriceTag :value="p.price" size="sm" />
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>

    <!-- 分类推荐楼层 -->
    <section v-for="floor in floors" :key="floor.key" class="section">
      <div class="page-wrap">
        <div class="section-head">
          <h2 class="section-title">{{ floor.title }}</h2>
          <RouterLink :to="floor.to" class="section-more">
            查看全部 <el-icon><ArrowRight /></el-icon>
          </RouterLink>
        </div>
        <div class="grid grid-5">
          <ProductCard v-for="p in floor.items" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <!-- 猜你喜欢 / 热销推荐 -->
    <section class="section">
      <div class="page-wrap">
        <div class="section-head">
          <h2 class="section-title">{{ recommendTitle }}</h2>
          <span class="section-more">基于本地浏览记录的推荐，无后端算法</span>
        </div>
        <div class="grid grid-5">
          <ProductCard v-for="p in recommendProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>云购商城 · 纯前端演示项目</p>
      <p class="text-xs text-3 mt-1">
        商品 / 购物车 / 订单数据均来自本地静态数据与 localStorage，不含任何后端服务
      </p>
    </footer>
  </div>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import ProductCard from '@/components/common/ProductCard.vue'
import PriceTag from '@/components/common/PriceTag.vue'
import { banners, brands, platformStats, products, upcoming } from '@/data/products'
import { categories } from '@/data/categories'
import { coupons } from '@/data/user'
import { useFavoriteStore } from '@/stores/favorite'
import { formatSales, saveAmount } from '@/utils/format'

const router = useRouter()
const favoriteStore = useFavoriteStore()
const { historyIds } = storeToRefs(favoriteStore)

// 首屏右侧分类面板：2 列 × 5 行，正好 10 个分类
const sideCategories = categories.slice(0, 10)

// 首屏公告（纯静态文案，用于填充 PC 版右侧栏）
const notices = [
  { tag: '新', type: 'new', title: 'iPhone 系列新品现货发售，支持 12 期免息' },
  { tag: '促', type: 'promo', title: '全品类满 99 元包邮，超 300 元减 30' },
  { tag: '惠', type: 'promo', title: '家电以旧换新活动进行中，至高补贴 1000 元' },
  { tag: '新', type: 'new', title: '生鲜专区产地直发，次日送达坏果包赔' },
  { tag: '通', type: 'notice', title: '订单物流信息可在「我的订单」中实时查看' },
  { tag: '惠', type: 'promo', title: '服饰鞋包换季大促，低至 5 折起' }
]

// 热销榜单 TOP 6
const topRanking = computed(() =>
  [...products].sort((a, b) => b.sales - a.sales).slice(0, 6)
)

// 秒杀：取折扣力度最大的 5 件
const flashProducts = computed(() =>
  [...products]
    .filter((p) => p.origin > p.price)
    .sort((a, b) => a.price / a.origin - b.price / b.origin)
    .slice(0, 5)
)

/**
 * 抢购进度：以「已售 + 库存」为总量计算当前抢走的比例，并钳制在 50-95%，
 * 让 5 件商品呈现出明显不同的紧迫感，而不是全部挤在 95% 附近。
 * 数据来源仍是本地静态字段，不涉及任何后端计算。
 */
function soldRatio(product) {
  const total = product.sales + product.stock
  if (!total) return 50
  const raw = (product.sales / total) * 100
  return Math.max(50, Math.min(95, Math.round(raw)))
}

// 各楼层推荐：每个分类取销量最高的 5 件
const floors = computed(() =>
  [
    { key: 'phone', title: '手机通讯', to: '/products?category=phone' },
    { key: 'computer', title: '电脑办公', to: '/products?category=computer' },
    { key: 'digital', title: '数码配件', to: '/products?category=digital' },
    { key: 'home', title: '家用电器', to: '/products?category=home' },
    { key: 'fashion', title: '服饰鞋包', to: '/products?category=fashion' },
    { key: 'beauty', title: '美妆护肤', to: '/products?category=beauty' },
    { key: 'food', title: '食品生鲜', to: '/products?category=food' },
    { key: 'sports', title: '运动户外', to: '/products?category=sports' },
    { key: 'baby', title: '母婴玩具', to: '/products?category=baby' }
  ]
    .map((f) => ({
      ...f,
      items: products
        .filter((p) => p.category === f.key)
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5)
    }))
    .filter((f) => f.items.length)
)

// 猜你喜欢：浏览过的商品优先，再按分类补充热销
const recommendTitle = computed(() =>
  historyIds.value.length ? '猜你喜欢' : '热销榜单'
)

const recommendProducts = computed(() => {
  const visited = historyIds.value.map((id) => products.find((p) => p.id === id)).filter(Boolean)
  if (!visited.length) {
    return [...products].sort((a, b) => b.sales - a.sales).slice(0, 10)
  }
  const visitedCats = new Set(visited.map((p) => p.category))
  const related = products
    .filter((p) => !visited.some((v) => v.id === p.id) && visitedCats.has(p.category))
    .sort((a, b) => b.sales - a.sales)
  const rest = [...products]
    .filter((p) => !visited.some((v) => v.id === p.id) && !visitedCats.has(p.category))
    .sort((a, b) => b.sales - a.sales)
  return [...visited, ...related, ...rest].slice(0, 10)
})

// ---------- 倒计时 ----------
const remainSeconds = ref(2 * 3600 + 25 * 60)
const countdown = computed(() => {
  const h = String(Math.floor(remainSeconds.value / 3600)).padStart(2, '0')
  const m = String(Math.floor((remainSeconds.value % 3600) / 60)).padStart(2, '0')
  const s = String(remainSeconds.value % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
})

const timer = setInterval(() => {
  // 归零后重新开始，形成循环倒计时
  remainSeconds.value = remainSeconds.value > 0 ? remainSeconds.value - 1 : 2 * 3600 + 25 * 60
}, 1000)
onUnmounted(() => clearInterval(timer))

// ---------- 优惠券 ----------
const claimedCoupons = ref([])

function claimCoupon(coupon) {
  if (claimedCoupons.value.includes(coupon.id)) {
    ElMessage.info('该券已领取')
    return
  }
  claimedCoupons.value.push(coupon.id)
  ElMessage.success(`领取成功：${coupon.name}`)
}

function goDetail(id) {
  router.push(`/products/${id}`)
}
</script>

<style scoped>
.home {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-6);
}

/* ============================ 首屏：轮播 + 侧栏 ============================ */
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: var(--sp-4);
  /* 两列等高：轮播高度 = 分类面板 + 公告面板 + 间距 */
  align-items: stretch;
}

.hero__main {
  min-width: 0;
}

/* 轮播跟随右侧栏一起撑高（align-items: stretch），
   min-height 保证右侧内容变少时轮播不会塌成一条 */
.hero__carousel {
  height: 100%;
  min-height: 400px;
}

.hero__side {
  display: grid;
  /* 分类面板按内容高度，公告面板吃掉剩余空间，两者合计与轮播等高 */
  grid-template-rows: auto minmax(0, 1fr);
  gap: var(--sp-4);
}

.hero__panel,
.hero__notice {
  padding: var(--sp-4);
  /* 侧栏两列均分网格宽度，避免默认 stretch 行为带来的意外 */
  min-width: 0;
}

.hero__panel-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--fs-md);
  font-weight: 700;
  padding-bottom: var(--sp-3);
  margin-bottom: var(--sp-3);
  border-bottom: 1px solid var(--c-border);
}

.hero__panel-title :deep(.el-icon) {
  color: var(--c-brand);
}

.hero__cats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--sp-1);
}

.hero__cat {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px var(--sp-2);
  border-radius: var(--r-sm);
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  transition: all var(--dur) var(--ease);
}

.hero__cat:hover {
  background: var(--c-brand-soft);
  color: var(--c-brand);
}

.hero__cat-icon {
  width: 26px;
  height: 26px;
  border-radius: var(--r-sm);
  background: var(--c-bg-muted);
  color: var(--c-text-2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--dur) var(--ease);
}

.hero__cat:hover .hero__cat-icon {
  background: var(--c-brand);
  color: #fff;
}

.hero__cat-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ---------- 公告 ---------- */
.hero__notice {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.hero__notice-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  /* 条目均匀撑开填满面板，与左侧轮播底部对齐 */
  flex: 1;
  justify-content: space-between;
}

.hero__notice-list li {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--fs-sm);
  color: var(--c-text-2);
}

.hero__notice-list li:hover {
  color: var(--c-brand);
}

.hero__notice-tag {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: var(--r-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
}

.hero__notice-tag.is-new { background: var(--c-danger); }
.hero__notice-tag.is-promo { background: var(--c-brand); }
.hero__notice-tag.is-notice { background: var(--c-info); }

/* ============================ 轮播内容 ============================ */
.banner {
  position: relative;
  height: 100%;
  border-radius: var(--r-lg);
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: var(--sp-10);
  color: #fff;
}

.banner__text {
  position: relative;
  z-index: 2;
  max-width: 62%;
}

.banner__title {
  font-size: 42px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: var(--sp-3);
}

.banner__subtitle {
  font-size: var(--fs-xl);
  opacity: 0.94;
  margin-bottom: var(--sp-8);
}

.banner__cta {
  display: inline-block;
  padding: 10px var(--sp-8);
  border-radius: var(--r-full);
  background: rgba(255, 255, 255, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.55);
  font-weight: 600;
  font-size: var(--fs-lg);
  backdrop-filter: blur(4px);
  transition: all var(--dur) var(--ease);
}

.banner__cta:hover {
  background: #fff;
  color: var(--c-text);
  border-color: #fff;
}

.banner__deco {
  position: absolute;
  right: 20px;
  bottom: 10px;
  opacity: 0.16;
  transform: rotate(-12deg);
}

/* 指示器移到左下角，避开右侧的 CTA 按钮与装饰图标 */
.hero__carousel :deep(.el-carousel__indicator) {
  left: var(--sp-10);
  right: auto;
  bottom: var(--sp-4);
  justify-content: flex-start;
  text-align: left;
}

.hero__carousel :deep(.el-carousel__indicator--horizontal .el-carousel__button) {
  width: 22px;
  height: 4px;
  background-color: #fff;
  opacity: 0.5;
  border-radius: var(--r-full);
}

.hero__carousel :deep(.el-carousel__indicator--horizontal .el-carousel__button:hover) {
  opacity: 0.8;
}

.hero__carousel :deep(.el-carousel__indicator--horizontal .el-carousel__indicator-item.is-active) {
  opacity: 1;
  background-color: #fff;
}

/* ============================ 秒杀 ============================ */
.flash__head {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
  padding: var(--sp-4) var(--sp-5);
  background: linear-gradient(90deg, #fff1eb 0%, #ffe3d6 100%);
  border-radius: var(--r-lg) var(--r-lg) 0 0;
}

.flash__title {
  display: flex;
  align-items: center;
  gap: var(--sp-1);
  font-size: var(--fs-xl);
  font-weight: 700;
  color: var(--c-brand);
}

.flash__timer {
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}

.flash__time {
  font-family: 'DIN Alternate', monospace;
  font-weight: 700;
  font-size: var(--fs-md);
  color: var(--c-brand);
  background: #fff;
  padding: 2px var(--sp-2);
  border-radius: var(--r-sm);
}

.flash__head .section-more {
  margin-left: auto;
}

.flash__body {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--sp-4);
  padding: var(--sp-5);
}

.flash__item {
  cursor: pointer;
  border-radius: var(--r-md);
  padding: var(--sp-2);
  border: 1px solid transparent;
  transition: all var(--dur) var(--ease);
}

.flash__item:hover {
  background: var(--c-bg-hover);
  border-color: var(--c-brand-soft-2);
}

.flash__img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--r-md);
  background: var(--c-bg-muted);
}

.flash__img-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-4);
}

.flash__name {
  margin: var(--sp-2) 0 4px;
  font-size: var(--fs-sm);
  line-height: 1.45;
  min-height: 2.9em;
}

.flash__item:hover .flash__name {
  color: var(--c-brand);
}

.flash__info {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--sp-2);
  /* 价格不可压缩，省钱文案过长时自身截断而不是把价格挤到下一行 */
  min-width: 0;
}

.flash__save {
  font-size: var(--fs-xs);
  color: var(--c-danger);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
  min-width: 0;
}

.flash__progress {
  position: relative;
  height: 18px;
  margin-top: var(--sp-2);
  border-radius: var(--r-full);
  background: var(--c-brand-soft-2);
  overflow: hidden;
}

.flash__bar {
  height: 100%;
  background: linear-gradient(90deg, #ff7a45 0%, #f5333f 100%);
  border-radius: var(--r-full);
}

.flash__sold {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #fff;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}

/* ============================ 两栏区块 ============================ */
.two-col {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--sp-4);
  align-items: stretch;
}

.coupons {
  padding: var(--sp-5);
  display: flex;
  flex-direction: column;
}

.coupons__list {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--sp-3);
  flex: 1;
  align-content: space-between;
}

.coupon {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3);
  border-radius: var(--r-md);
  background: var(--c-brand-soft);
  cursor: pointer;
  overflow: hidden;
  transition: all var(--dur) var(--ease);
}

.coupon:hover {
  filter: brightness(0.98);
  transform: translateY(-2px);
  box-shadow: var(--sh-sm);
}

.coupon.is-claimed {
  background: var(--c-bg-muted);
}

.coupon__left {
  text-align: center;
  min-width: 74px;
  padding-right: var(--sp-3);
  border-right: 1px dashed rgba(255, 90, 31, 0.35);
}

.coupon__amount {
  color: var(--c-brand);
  font-weight: 800;
  font-size: var(--fs-2xl);
  line-height: 1.1;
  font-family: 'DIN Alternate', Arial, sans-serif;
}

.coupon.is-claimed .coupon__amount {
  color: var(--c-text-3);
}

.coupon__symbol {
  font-size: 0.6em;
  margin-right: 1px;
}

.coupon__threshold {
  font-size: var(--fs-xs);
  color: var(--c-text-2);
}

.coupon__right {
  flex: 1;
  min-width: 0;
}

.coupon__name {
  font-size: var(--fs-base);
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.coupon__scope {
  font-size: var(--fs-xs);
  color: var(--c-text-3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.coupon__btn {
  flex-shrink: 0;
  padding: 4px var(--sp-3);
  border-radius: var(--r-full);
  background: var(--c-brand);
  color: #fff;
  font-size: var(--fs-xs);
  font-weight: 600;
}

.coupon.is-claimed .coupon__btn {
  background: var(--c-text-4);
}

/* ---------- 热销榜单 ---------- */
.ranking {
  padding: var(--sp-5);
}

.ranking__list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
}

.ranking__item {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-2);
  border-radius: var(--r-sm);
  cursor: pointer;
  transition: background var(--dur) var(--ease);
  /* 固定排名徽章与缩略图宽度，商品名与价格各自占据剩余空间且不换行 */
  min-width: 0;
}

.ranking__item:hover {
  background: var(--c-bg-hover);
}

.ranking__no {
  width: 20px;
  height: 20px;
  border-radius: var(--r-xs);
  background: var(--c-bg-muted);
  color: var(--c-text-3);
  font-size: var(--fs-xs);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ranking__no--1 { background: #f5333f; color: #fff; }
.ranking__no--2 { background: #ff7a45; color: #fff; }
.ranking__no--3 { background: #f5a524; color: #fff; }

.ranking__img {
  width: 44px;
  height: 44px;
  border-radius: var(--r-sm);
  background: var(--c-bg-muted);
  flex-shrink: 0;
}

.ranking__img-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-4);
}

.ranking__info {
  flex: 1;
  min-width: 0;
}

.ranking__name {
  font-size: var(--fs-sm);
  line-height: 1.45;
}

.ranking__item:hover .ranking__name {
  color: var(--c-brand);
}

/* ============================ 平台数据概览 ============================ */
.stats-bar {
  margin-top: var(--sp-4);
}

.stats-bar__inner {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--sp-3);
  padding: var(--sp-4) var(--sp-5);
  border-radius: var(--r-lg);
  background: linear-gradient(135deg, #fff6f2 0%, #fff 60%, #f2f7ff 100%);
  box-shadow: var(--sh-sm);
}

.stat {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  min-width: 0;
}

.stat + .stat {
  padding-left: var(--sp-3);
  border-left: 1px dashed var(--c-border-strong);
}

.stat__icon {
  width: 40px;
  height: 40px;
  border-radius: var(--r-md);
  background: #fff;
  color: var(--c-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: var(--sh-xs);
}

.stat__text {
  min-width: 0;
}

.stat__value {
  display: flex;
  align-items: baseline;
  gap: 2px;
  font-size: var(--fs-xl);
  font-weight: 800;
  font-family: 'DIN Alternate', Arial, sans-serif;
  line-height: 1.2;
  white-space: nowrap;
}

.stat__unit {
  font-size: var(--fs-xs);
  font-weight: 500;
  font-style: normal;
  color: var(--c-text-3);
  font-family: inherit;
}

.stat__label {
  font-size: var(--fs-xs);
  color: var(--c-text-3);
  white-space: nowrap;
}

/* ============================ 品牌墙 ============================ */
.brand-panel,
.upcoming-panel {
  padding: var(--sp-5);
}

.brand-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--sp-2);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-2);
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  transition: all var(--dur) var(--ease);
  min-width: 0;
}

.brand:hover {
  border-color: var(--c-brand-soft-2);
  background: var(--c-brand-soft);
  transform: translateY(-1px);
}

.brand__logo {
  width: 34px;
  height: 34px;
  border-radius: var(--r-sm);
  color: #fff;
  font-weight: 800;
  font-size: var(--fs-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.brand__text {
  min-width: 0;
}

.brand__name {
  font-size: var(--fs-base);
  font-weight: 600;
  line-height: 1.3;
}

.brand__slogan {
  font-size: var(--fs-xs);
  color: var(--c-text-3);
}

/* ============================ 新品预告 ============================ */
.upcoming-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.upcoming {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-2);
  border-radius: var(--r-md);
  transition: background var(--dur) var(--ease);
  min-width: 0;
}

.upcoming:hover {
  background: var(--c-bg-hover);
}

.upcoming__date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 62px;
  padding: var(--sp-2) 0;
  border-radius: var(--r-sm);
  background: var(--c-brand-soft);
  flex-shrink: 0;
}

.upcoming__day {
  font-size: var(--fs-sm);
  font-weight: 700;
  color: var(--c-brand);
  font-family: 'DIN Alternate', Arial, sans-serif;
}

.upcoming__time {
  font-size: 10px;
  color: var(--c-brand);
  opacity: 0.8;
}

.upcoming__info {
  flex: 1;
  min-width: 0;
}

.upcoming__name {
  font-size: var(--fs-base);
  line-height: 1.4;
}

.upcoming__meta {
  margin-top: 1px;
}

.upcoming__tag {
  flex-shrink: 0;
  padding: 3px var(--sp-2);
  border-radius: var(--r-full);
  background: var(--c-bg-muted);
  color: var(--c-text-3);
  font-size: var(--fs-xs);
  font-weight: 600;
}

.upcoming__tag.is-active {
  background: var(--c-brand-gradient);
  color: #fff;
}

/* ============================ 页脚 ============================ */
.footer {
  margin-top: var(--sp-10);
  padding: var(--sp-6) var(--sp-4);
  text-align: center;
  color: var(--c-text-2);
  font-size: var(--fs-sm);
}
</style>
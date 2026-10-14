import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 使用 hash 模式：纯静态部署（双击 index.html、丢到任意静态服务器）
 * 都不需要额外的服务端 rewrite 配置。
 */
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('@/views/ProductListView.vue'),
        meta: { title: '商品列表' }
      },
      {
        path: 'products/:id',
        name: 'product-detail',
        component: () => import('@/views/ProductDetailView.vue'),
        meta: { title: '商品详情' }
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/SearchView.vue'),
        meta: { title: '搜索' }
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/CartView.vue'),
        meta: { title: '购物车' }
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: () => import('@/views/CheckoutView.vue'),
        meta: { title: '确认订单', requiresAuth: true }
      },
      {
        path: 'pay/:id',
        name: 'pay',
        component: () => import('@/views/PayView.vue'),
        meta: { title: '收银台', requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/OrderListView.vue'),
        meta: { title: '我的订单', requiresAuth: true }
      },
      {
        path: 'orders/:id',
        name: 'order-detail',
        component: () => import('@/views/OrderDetailView.vue'),
        meta: { title: '订单详情', requiresAuth: true }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/UserCenterView.vue'),
        meta: { title: '个人中心', requiresAuth: true }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: { title: '数据看板', requiresAuth: true }
      },
      {
        path: 'favorite',
        name: 'favorite',
        component: () => import('@/views/FavoriteView.vue'),
        meta: { title: '我的收藏', requiresAuth: true }
      },
      {
        path: 'address',
        name: 'address',
        component: () => import('@/views/AddressView.vue'),
        meta: { title: '收货地址', requiresAuth: true }
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/CouponView.vue'),
        meta: { title: '优惠券', requiresAuth: true }
      },
      {
        path: 'history',
        name: 'history',
        component: () => import('@/views/HistoryView.vue'),
        meta: { title: '浏览记录' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: '注册' }
  },
  // 404 兜底
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '页面不存在' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// 需要登录才能访问的路由：未登录时跳转登录页，并记录来源用于回跳
const AUTH_ROUTES = new Set(['checkout', 'pay', 'orders', 'order-detail', 'user', 'favorite', 'address', 'coupon', 'dashboard'])

router.beforeEach((to) => {
  // 动态设置页面标题
  document.title = to.meta?.title ? `${to.meta.title} · 云购商城` : '云购商城'

  // 登录页已登录时不再重复进入
  if ((to.name === 'login' || to.name === 'register') && localStorage.getItem('mall_user')) {
    return { name: 'home' }
  }

  if (to.meta?.requiresAuth && AUTH_ROUTES.has(to.name)) {
    const cached = localStorage.getItem('mall_user')
    if (!cached) {
      return { name: 'login', query: { redirect: to.fullPath } }
    }
  }
  return true
})

export default router

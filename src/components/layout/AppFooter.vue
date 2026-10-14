<template>
  <footer class="footer">
    <div class="page-wrap">
      <!-- 服务承诺 -->
      <div class="footer__services">
        <div v-for="s in services" :key="s.title" class="footer__service">
          <el-icon :size="26" class="footer__service-icon"><component :is="s.icon" /></el-icon>
          <div>
            <p class="footer__service-title">{{ s.title }}</p>
            <p class="footer__service-desc">{{ s.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 链接与说明 -->
      <div class="footer__links">
        <div v-for="group in linkGroups" :key="group.title" class="footer__group">
          <p class="footer__group-title">{{ group.title }}</p>
          <RouterLink
            v-for="link in group.items"
            :key="link.text"
            :to="link.to"
            class="footer__link"
          >
            {{ link.text }}
          </RouterLink>
        </div>
      </div>

      <!-- 版权 -->
      <div class="footer__bottom">
        <p class="footer__copyright">
          © 2025 云购商城 · 本站为纯前端演示项目，所有商品与价格均为虚构数据
        </p>
        <p class="footer__note">
          技术栈：Vue 3 + Vite + Element Plus + Pinia · 无后端服务 · 数据存于浏览器本地
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const services = [
  { icon: 'CircleCheckFilled', title: '正品保障', desc: '全部商品官方渠道' },
  { icon: 'RefreshLeft', title: '7 天无理由退换', desc: '售后无忧' },
  { icon: 'Van', title: '全场包邮', desc: '满 99 元免运费' },
  { icon: 'Headset', title: '客服支持', desc: '9:00-21:00 在线' }
]

const linkGroups = [
  {
    title: '购物指南',
    items: [
      { text: '全部商品', to: '/products' },
      { text: '限时秒杀', to: '/products?sort=discount' },
      { text: '新品上架', to: '/products?sort=default' },
      { text: '我的收藏', to: '/favorite' }
    ]
  },
  {
    title: '配送说明',
    items: [
      { text: '上门自提', to: '/orders' },
      { text: '配送服务查询', to: '/orders?status=shipped' },
      { text: '配送费收取标准', to: '/orders' },
      { text: '海外配送', to: '/orders' }
    ]
  },
  {
    title: '支付方式',
    items: [
      { text: '支付宝', to: '/orders' },
      { text: '微信支付', to: '/orders' },
      { text: '银联在线支付', to: '/orders' },
      { text: '优惠券支付', to: '/coupon' }
    ]
  },
  {
    title: '售后服务',
    items: [
      { text: '售后政策', to: '/orders?status=done' },
      { text: '价格保护', to: '/orders' },
      { text: '退款说明', to: '/orders?status=done' },
      { text: '返修 / 退换货', to: '/orders' }
    ]
  },
  {
    title: '关于本站',
    items: [
      { text: '项目说明', to: '/' },
      { text: '演示账号', to: '/login' },
      { text: '浏览器记录', to: '/history' },
      { text: '联系地址', to: '/address' }
    ]
  }
]
</script>

<style scoped>
.footer {
  margin-top: var(--sp-10);
  background: var(--c-bg-elevated);
  border-top: 1px solid var(--c-border);
  padding: var(--sp-8) 0 var(--sp-6);
}

/* ---------- 服务承诺 ---------- */
.footer__services {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--sp-6);
  padding-bottom: var(--sp-8);
  border-bottom: 1px solid var(--c-border);
}

.footer__service {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  justify-content: center;
}

.footer__service-icon {
  color: var(--c-brand);
  flex-shrink: 0;
}

.footer__service-title {
  font-size: var(--fs-base);
  font-weight: 700;
}

.footer__service-desc {
  font-size: var(--fs-sm);
  color: var(--c-text-3);
}

/* ---------- 链接分组 ---------- */
.footer__links {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--sp-6);
  padding: var(--sp-8) 0;
}

.footer__group-title {
  font-size: var(--fs-base);
  font-weight: 700;
  margin-bottom: var(--sp-3);
}

.footer__link {
  display: block;
  font-size: var(--fs-sm);
  color: var(--c-text-3);
  line-height: 2;
  transition: color var(--dur) var(--ease);
}

.footer__link:hover {
  color: var(--c-brand);
}

/* ---------- 版权 ---------- */
.footer__bottom {
  padding-top: var(--sp-5);
  border-top: 1px solid var(--c-border);
  text-align: center;
  font-size: var(--fs-sm);
  color: var(--c-text-3);
}

.footer__note {
  margin-top: 4px;
  color: var(--c-text-4);
}
</style>

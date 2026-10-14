<template>
  <div class="not-found page-wrap">
    <div class="card not-found__card">
      <div class="not-found__code">404</div>
      <h1 class="not-found__title">页面走丢了</h1>
      <p class="not-found__desc text-3">你访问的地址不存在，可能是链接输错了</p>
      <div class="not-found__actions">
        <RouterLink to="/" class="btn btn--primary">回到首页</RouterLink>
        <RouterLink to="/products" class="btn btn--ghost">去逛逛商品</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  padding-top: var(--sp-10);
  padding-bottom: var(--sp-10);
}

.not-found__card {
  padding: var(--sp-12) var(--sp-6);
  text-align: center;
}

.not-found__code {
  font-size: clamp(64px, 14vw, 120px);
  font-weight: 800;
  line-height: 1;
  background: var(--c-brand-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: var(--sp-3);
}

.not-found__title {
  font-size: var(--fs-2xl);
  font-weight: 700;
  margin-bottom: var(--sp-2);
}

.not-found__desc {
  margin-bottom: var(--sp-6);
}

.not-found__actions {
  display: flex;
  justify-content: center;
  gap: var(--sp-3);
}
</style>

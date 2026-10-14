<template>
  <div class="empty" :style="{ padding: `${padding}px 16px` }">
    <div class="empty__icon">
      <el-icon :size="iconSize"><component :is="icon" /></el-icon>
    </div>
    <p class="empty__title">{{ title }}</p>
    <p v-if="description" class="empty__desc">{{ description }}</p>
    <slot>
      <RouterLink v-if="actionText" :to="actionTo" class="btn btn--primary btn--sm mt-3">
        {{ actionText }}
      </RouterLink>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, default: 'Box' },
  title: { type: String, default: '暂无数据' },
  description: { type: String, default: '' },
  actionText: { type: String, default: '' },
  actionTo: { type: String, default: '/' },
  iconSize: { type: Number, default: 46 },
  padding: { type: Number, default: 56 }
})
</script>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.empty__icon {
  width: 84px;
  height: 84px;
  border-radius: var(--r-full);
  background: var(--c-bg-muted);
  color: var(--c-text-4);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--sp-4);
}

.empty__title {
  font-size: var(--fs-md);
  font-weight: 600;
  color: var(--c-text-2);
}

.empty__desc {
  margin-top: var(--sp-1);
  font-size: var(--fs-sm);
  color: var(--c-text-3);
  max-width: 320px;
}
</style>

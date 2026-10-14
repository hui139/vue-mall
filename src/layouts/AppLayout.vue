<template>
  <div class="layout">
    <!-- 顶部导航 -->
    <AppHeader />

    <!-- 主体内容：路由切换带过渡动画 -->
    <main class="layout__main">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade-slide" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>

    <!-- 页脚 -->
    <AppFooter />

    <!-- 返回顶部 -->
    <button v-show="showTop" class="back-top" aria-label="回到顶部" @click="scrollToTop">
      <el-icon><Top /></el-icon>
    </button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const showTop = ref(false)

function handleScroll() {
  showTop.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  /* 桌面端页面最小宽度，避免窄窗口下布局塌陷 */
  min-width: 1100px;
}

.layout__main {
  flex: 1;
  width: 100%;
}

.back-top {
  position: fixed;
  right: var(--sp-6);
  bottom: var(--sp-8);
  z-index: 90;
  width: 44px;
  height: 44px;
  border-radius: var(--r-full);
  background: var(--c-bg-elevated);
  color: var(--c-text-2);
  box-shadow: var(--sh-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  transition: all var(--dur) var(--ease);
}

.back-top:hover {
  color: var(--c-brand);
  transform: translateY(-2px);
  box-shadow: var(--sh-lg);
}
</style>

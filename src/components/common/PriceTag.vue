<template>
  <span class="price" :class="[`price--${size}`]">
    <span class="price__symbol">¥</span>
    <span class="price__int">{{ int }}</span>
    <span v-if="dec" class="price__dec">.{{ dec }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { splitMoney } from '@/utils/format'

const props = defineProps({
  value: { type: [Number, String], default: 0 },
  /** sm / md / lg / xl，映射到全局样式的字号档位 */
  size: { type: String, default: 'md' }
})

const int = computed(() => splitMoney(props.value).int)
const dec = computed(() => splitMoney(props.value).dec)
</script>

<style scoped>
.price--sm { font-size: var(--fs-md); }
.price--md { font-size: var(--fs-lg); }
.price--lg { font-size: var(--fs-2xl); }
.price--xl { font-size: var(--fs-3xl); }

/* 小数部分用小一号字，价格视觉上更有层次 */
.price__dec {
  font-size: 0.72em;
}
</style>

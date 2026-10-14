<template>
  <div class="coupon-page page-wrap">
    <div class="section-head">
      <h1 class="section-title">优惠券</h1>
      <span class="text-sm text-3">共 {{ coupons.length }} 张可用</span>
    </div>

    <div class="coupon-list">
      <div
        v-for="c in coupons"
        :key="c.id"
        class="coupon"
        :class="{ 'is-claimed': claimed.includes(c.id) }"
      >
        <div class="coupon__left">
          <div class="coupon__amount">
            <span class="coupon__symbol">¥</span>{{ c.discount }}
          </div>
          <div class="coupon__threshold">满 {{ c.threshold }} 可用</div>
        </div>

        <div class="coupon__right">
          <p class="coupon__name">{{ c.name }}</p>
          <p class="coupon__meta">
            <span class="tag-line tag-line--plain">{{ c.scope }}</span>
          </p>
          <p class="coupon__date">有效期至 {{ c.expire }}</p>
        </div>

        <button class="coupon__btn" @click="onClaim(c)">
          {{ claimed.includes(c.id) ? '已领取' : '立即领取' }}
        </button>
      </div>
    </div>

    <el-alert
      type="info"
      :closable="false"
      show-icon
      class="mt-4"
      title="纯前端演示"
      description="领取状态只保存在当前页面会话中，刷新后会重置；结算页可以直接选择任意满足门槛的券。"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { coupons } from '@/data/user'

const claimed = ref([])

function onClaim(coupon) {
  if (claimed.value.includes(coupon.id)) {
    ElMessage.info('该券已领取，去结算页使用吧')
    return
  }
  claimed.value.push(coupon.id)
  ElMessage.success(`领取成功：${coupon.name}`)
}
</script>

<style scoped>
.coupon-page {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-8);
  max-width: 720px;
}

.coupon-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.coupon {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
  padding: var(--sp-4);
  border-radius: var(--r-md);
  background: linear-gradient(100deg, #fff1eb 0%, #ffe6db 100%);
  border: 1px solid var(--c-brand-soft-2);
  clip-path: polygon(0 0, 100% 0, 100% 42%, 97% 50%, 100% 58%, 100% 100%, 0 100%);
  transition: all var(--dur) var(--ease);
}

.coupon:hover {
  transform: translateY(-2px);
  box-shadow: var(--sh-sm);
}

.coupon.is-claimed {
  background: var(--c-bg-muted);
  border-color: var(--c-border);
}

.coupon__left {
  text-align: center;
  min-width: 88px;
  padding-right: var(--sp-4);
  border-right: 1px dashed rgba(255, 90, 31, 0.3);
}

.coupon__amount {
  color: var(--c-brand);
  font-weight: 800;
  font-size: var(--fs-3xl);
  line-height: 1.05;
  font-family: 'DIN Alternate', Arial, sans-serif;
}

.coupon.is-claimed .coupon__amount {
  color: var(--c-text-3);
}

.coupon__symbol {
  font-size: 0.55em;
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
  font-size: var(--fs-md);
  font-weight: 700;
  margin-bottom: 4px;
}

.coupon__meta {
  margin-bottom: 2px;
}

.coupon__date {
  font-size: var(--fs-xs);
  color: var(--c-text-3);
}

.coupon__btn {
  flex-shrink: 0;
  padding: 8px var(--sp-5);
  border-radius: var(--r-full);
  background: var(--c-brand-gradient);
  color: #fff;
  font-size: var(--fs-sm);
  font-weight: 600;
  transition: all var(--dur) var(--ease);
}

.coupon__btn:hover {
  filter: brightness(1.06);
}

.coupon.is-claimed .coupon__btn {
  background: var(--c-text-4);
}
</style>

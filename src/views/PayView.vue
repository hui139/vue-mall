<template>
  <div class="pay page-wrap">
    <!-- 支付成功 -->
    <div v-if="status === 'success'" class="card result">
      <div class="result__icon result__icon--ok">
        <el-icon :size="42"><SuccessFilled /></el-icon>
      </div>
      <h1 class="result__title">支付成功</h1>
      <p class="result__amount">
        实付 <PriceTag :value="order?.total || 0" size="lg" />
      </p>
      <p class="result__order-no text-sm text-3">订单号：{{ order?.id }}</p>
      <div class="result__actions">
        <RouterLink to="/orders" class="btn btn--primary">查看我的订单</RouterLink>
        <RouterLink to="/products" class="btn btn--ghost">继续逛逛</RouterLink>
      </div>
    </div>

    <!-- 订单不存在 -->
    <div v-else-if="!order" class="card">
      <EmptyState
        icon="WarnTriangleFilled"
        title="订单不存在"
        description="该订单可能已被删除，或链接有误"
        action-text="返回首页"
        action-to="/"
      />
    </div>

    <!-- 收银台 -->
    <template v-else>
      <div class="section-head">
        <h1 class="section-title">收银台</h1>
        <RouterLink :to="`/order-detail/${order.id}`" class="section-more">订单详情</RouterLink>
      </div>

      <!-- 金额 -->
      <section class="card pay__amount">
        <p class="pay__label">需付款金额</p>
        <PriceTag :value="order.total" size="xl" />
        <p class="pay__order-no text-sm text-3">订单号：{{ order.id }} · 下单时间 {{ order.createdAt }}</p>
      </section>

      <!-- 支付方式 -->
      <section class="card block">
        <h2 class="block__title">选择支付方式</h2>
        <div class="methods">
          <label
            v-for="m in methods"
            :key="m.id"
            class="method"
            :class="{ 'is-active': payMethod === m.id }"
          >
            <input v-model="payMethod" type="radio" :value="m.id" class="method__radio" />
            <span class="method__dot" :style="{ background: m.color }"></span>
            <div class="method__info">
              <p class="method__name">{{ m.name }}</p>
              <p class="method__desc">{{ m.desc }}</p>
            </div>
            <el-icon v-if="payMethod === m.id" class="method__check" :size="18">
              <CircleCheckFilled />
            </el-icon>
          </label>
        </div>
      </section>

      <!-- 演示说明 -->
      <el-alert
        type="info"
        :closable="false"
        show-icon
        title="这是纯前端演示项目"
        description="点击下方按钮不会发生任何真实扣款，页面会在 1 秒后模拟支付成功。仅供学习与展示用途。"
        class="mb-4"
      />

      <!-- 底部操作 -->
      <div class="pay__actions">
        <button class="btn btn--ghost" @click="onCancel">取消订单</button>
        <button class="btn btn--ghost" @click="onFail">模拟支付失败</button>
        <button class="btn btn--primary pay__submit" :disabled="paying" @click="onPay">
          <span v-if="paying">支付中…</span>
          <span v-else>
            <el-icon><Wallet /></el-icon>
            {{ currentMethodName }}支付 ¥{{ formatMoney(order.total) }}
          </span>
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import PriceTag from '@/components/common/PriceTag.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useOrderStore } from '@/stores/order'
import { payMethods } from '@/data/user'
import { formatMoney } from '@/utils/format'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

const order = computed(() => orderStore.getById(String(route.params.id)))

const payMethod = ref('alipay')
const paying = ref(false)
const status = ref('paying')

const methods = payMethods
const currentMethodName = computed(
  () => methods.find((m) => m.id === payMethod.value)?.name || ''
)

async function onPay() {
  if (paying.value) return
  paying.value = true
  // 模拟支付网关的等待过程
  await new Promise((resolve) => setTimeout(resolve, 1000))
  orderStore.payOrder(order.value.id)
  paying.value = false
  status.value = 'success'
  ElMessage.success('支付成功')
}

async function onFail() {
  await ElMessageBox.alert(
    '模拟支付失败：余额不足。真实项目这里会跳转到支付平台的错误页。',
    '支付失败',
    { confirmButtonText: '知道了', type: 'error' }
  )
}

async function onCancel() {
  await ElMessageBox.confirm('取消后订单不可恢复，确定要取消该订单吗？', '取消订单', {
    confirmButtonText: '确定取消',
    cancelButtonText: '再想想',
    type: 'warning'
  })
  orderStore.cancelOrder(order.value.id)
  ElMessage.success('订单已取消')
  router.replace('/orders')
}
</script>

<style scoped>
.pay {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-10);
  max-width: 680px;
}

.pay__amount {
  padding: var(--sp-6);
  text-align: center;
  background: linear-gradient(135deg, #fff6f2 0%, #ffece5 100%);
  margin-bottom: var(--sp-3);
}

.pay__label {
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  margin-bottom: var(--sp-1);
}

.pay__order-no {
  margin-top: var(--sp-2);
}

.block {
  padding: var(--sp-4);
  margin-bottom: var(--sp-3);
}

.block__title {
  font-size: var(--fs-md);
  font-weight: 700;
  margin-bottom: var(--sp-3);
}

/* ---------- 支付方式 ---------- */
.methods {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.method {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  cursor: pointer;
  transition: all var(--dur) var(--ease);
}

.method:hover {
  border-color: var(--c-brand);
}

.method.is-active {
  border-color: var(--c-brand);
  background: var(--c-brand-soft);
}

.method__radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.method__dot {
  width: 34px;
  height: 34px;
  border-radius: var(--r-md);
  flex-shrink: 0;
}

.method__info {
  flex: 1;
  min-width: 0;
}

.method__name {
  font-size: var(--fs-base);
  font-weight: 600;
}

.method__desc {
  font-size: var(--fs-sm);
  color: var(--c-text-3);
}

.method__check {
  color: var(--c-brand);
  flex-shrink: 0;
}

/* ---------- 操作 ---------- */
.pay__actions {
  display: flex;
  gap: var(--sp-3);
  margin-top: var(--sp-5);
}

.pay__submit {
  flex: 1;
  height: 46px;
}

/* ---------- 结果页 ---------- */
.result {
  padding: var(--sp-10) var(--sp-6);
  text-align: center;
}

.result__icon {
  width: 76px;
  height: 76px;
  border-radius: var(--r-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--sp-4);
}

.result__icon--ok {
  background: var(--c-success-soft);
  color: var(--c-success);
  animation: pop 0.45s var(--ease);
}

@keyframes pop {
  0% { transform: scale(0.4); opacity: 0; }
  60% { transform: scale(1.12); }
  100% { transform: scale(1); opacity: 1; }
}

.result__title {
  font-size: var(--fs-2xl);
  font-weight: 700;
  margin-bottom: var(--sp-3);
}

.result__amount {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  font-size: var(--fs-base);
  color: var(--c-text-2);
}

.result__order-no {
  margin-top: var(--sp-2);
}

.result__actions {
  display: flex;
  justify-content: center;
  gap: var(--sp-3);
  margin-top: var(--sp-6);
}
</style>

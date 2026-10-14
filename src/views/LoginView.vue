<template>
  <div class="auth">
    <div class="auth__card">
      <!-- 左侧品牌区 -->
      <div class="auth__brand">
        <div class="auth__logo">
          <span class="auth__logo-mark">云</span>
          <span class="auth__logo-text">云购商城</span>
        </div>
        <h2 class="auth__slogan">购物车与订单数据</h2>
        <p class="auth__desc">
          全部保存在浏览器本地<br />
          无需后端，注册即可体验完整购物流程
        </p>
        <ul class="auth__features">
          <li><el-icon><CircleCheckFilled /></el-icon> 商品浏览 / 搜索 / 筛选</li>
          <li><el-icon><CircleCheckFilled /></el-icon> 购物车与本地持久化</li>
          <li><el-icon><CircleCheckFilled /></el-icon> 下单、模拟支付与订单管理</li>
        </ul>
      </div>

      <!-- 右侧表单区 -->
      <div class="auth__form-wrap">
        <div class="auth__tabs">
          <button
            class="auth__tab"
            :class="{ 'is-active': mode === 'login' }"
            @click="switchMode('login')"
          >
            登录
          </button>
          <button
            class="auth__tab"
            :class="{ 'is-active': mode === 'register' }"
            @click="switchMode('register')"
          >
            注册
          </button>
        </div>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          size="large"
          @submit.prevent="onSubmit"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
              clearable
            />
          </el-form-item>

          <el-form-item v-if="mode === 'register'" label="手机号" prop="phone">
            <el-input
              v-model="form.phone"
              placeholder="请输入手机号"
              :prefix-icon="Iphone"
              maxlength="11"
            />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password
              @keyup.enter="onSubmit"
            />
          </el-form-item>

          <el-form-item v-if="mode === 'register'" label="确认密码" prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              :prefix-icon="Lock"
              show-password
              @keyup.enter="onSubmit"
            />
          </el-form-item>

          <el-button
            type="primary"
            class="auth__submit"
            size="large"
            :loading="loading"
            @click="onSubmit"
          >
            {{ mode === 'login' ? '登 录' : '注 册' }}
          </el-button>
        </el-form>

        <!-- 演示账号提示 -->
        <el-alert
          type="warning"
          :closable="false"
          show-icon
          class="auth__tip"
          title="演示账号"
        >
          <template #default>
            用户名 <strong>demo</strong>，密码 <strong>123456</strong>。
            注册模式下任意合法用户名 + 6 位以上密码即可进入。
          </template>
        </el-alert>

        <RouterLink to="/" class="auth__back">← 先随便逛逛</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Iphone, Lock, User } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 同一份组件同时服务登录与注册两种路由
const mode = ref(route.name === 'register' ? 'register' : 'login')

const formRef = ref()
const loading = ref(false)

const form = reactive({
  username: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const rules = computed(() => ({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 16, message: '用户名长度为 2-16 个字符', trigger: 'blur' }
  ],
  phone: mode.value === 'register'
    ? [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }
      ]
    : [],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少 6 位', trigger: 'blur' }
  ],
  confirmPassword: mode.value === 'register'
    ? [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        {
          validator: (rule, value, callback) => {
            if (value !== form.password) callback(new Error('两次输入的密码不一致'))
            else callback()
          },
          trigger: 'blur'
        }
      ]
    : []
}))

function switchMode(next) {
  if (mode.value === next) return
  mode.value = next
  router.replace({ name: next, query: route.query })
}

async function onSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    if (mode.value === 'login') {
      await userStore.login({ username: form.username, password: form.password })
      ElMessage.success(`欢迎回来，${userStore.nickname}`)
    } else {
      await userStore.register({
        username: form.username,
        password: form.password,
        phone: form.phone
      })
      ElMessage.success('注册成功，已自动登录')
    }
    router.replace(String(route.query.redirect || '/'))
  } catch (err) {
    ElMessage.error(err.message || '操作失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-6);
  background: linear-gradient(135deg, #fff4ee 0%, #ffe9df 45%, #f4f0ff 100%);
}

.auth__card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 880px;
  background: #fff;
  border-radius: var(--r-xl);
  box-shadow: var(--sh-lg);
  overflow: hidden;
}

/* ---------- 品牌区 ---------- */
.auth__brand {
  padding: var(--sp-10) var(--sp-8);
  background: linear-gradient(160deg, #ff7a45 0%, #f5333f 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
}

.auth__logo {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-8);
}

.auth__logo-mark {
  width: 36px;
  height: 36px;
  border-radius: var(--r-md);
  background: rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: var(--fs-lg);
}

.auth__logo-text {
  font-size: var(--fs-lg);
  font-weight: 700;
  letter-spacing: 1px;
}

.auth__slogan {
  font-size: var(--fs-2xl);
  font-weight: 800;
  line-height: 1.35;
  margin-bottom: var(--sp-3);
}

.auth__desc {
  font-size: var(--fs-base);
  opacity: 0.9;
  line-height: 1.7;
  margin-bottom: var(--sp-8);
}

.auth__features {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  font-size: var(--fs-sm);
  margin-top: auto;
}

.auth__features li {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}

.auth__features :deep(.el-icon) {
  opacity: 0.85;
}

/* ---------- 表单区 ---------- */
.auth__form-wrap {
  padding: var(--sp-10) var(--sp-8);
  display: flex;
  flex-direction: column;
}

.auth__tabs {
  display: flex;
  gap: var(--sp-6);
  margin-bottom: var(--sp-6);
  border-bottom: 2px solid var(--c-border);
}

.auth__tab {
  position: relative;
  padding: 0 0 var(--sp-3);
  font-size: var(--fs-lg);
  font-weight: 600;
  color: var(--c-text-3);
  transition: color var(--dur) var(--ease);
}

.auth__tab.is-active {
  color: var(--c-brand);
}

.auth__tab.is-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  border-radius: var(--r-full);
  background: var(--c-brand-gradient);
}

.auth__submit {
  width: 100%;
  height: 46px;
  font-size: var(--fs-lg);
  letter-spacing: 4px;
  background: var(--c-brand-gradient);
  border: none;
}

.auth__tip {
  margin-top: var(--sp-4);
}

.auth__back {
  margin-top: auto;
  padding-top: var(--sp-5);
  text-align: center;
  font-size: var(--fs-sm);
  color: var(--c-text-3);
  transition: color var(--dur) var(--ease);
}

.auth__back:hover {
  color: var(--c-brand);
}
</style>

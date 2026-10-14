<template>
  <div class="addr-page page-wrap">
    <div class="section-head">
      <h1 class="section-title">收货地址</h1>
      <button class="btn btn--primary btn--sm" @click="openCreate">
        <el-icon><Plus /></el-icon> 新增地址
      </button>
    </div>

    <div v-if="userStore.addresses.length" class="addr-grid">
      <div
        v-for="addr in userStore.addresses"
        :key="addr.id"
        class="card addr"
        :class="{ 'addr--default': addr.isDefault }"
      >
        <div class="addr__head">
          <strong class="addr__name">{{ addr.name }}</strong>
          <span class="addr__phone">{{ addr.phone }}</span>
          <span v-if="addr.tag" class="tag-line">{{ addr.tag }}</span>
          <span v-if="addr.isDefault" class="tag-line tag-line--success">默认</span>
        </div>
        <p class="addr__detail">{{ addr.region }} {{ addr.detail }}</p>
        <div class="addr__actions">
          <button
            v-if="!addr.isDefault"
            class="addr__action"
            @click="userStore.setDefaultAddress(addr.id)"
          >
            设为默认
          </button>
          <button class="addr__action" @click="openEdit(addr)">编辑</button>
          <button class="addr__action addr__action--danger" @click="onRemove(addr)">删除</button>
        </div>
      </div>
    </div>

    <div v-else class="card">
      <EmptyState
        icon="Location"
        title="还没有收货地址"
        description="添加地址后即可下单"
        action-text="新增地址"
        action-to="/address"
      >
        <button class="btn btn--primary btn--sm mt-3" @click="openCreate">新增地址</button>
      </EmptyState>
    </div>

    <DialogShell v-model="dialogVisible" :title="editingId ? '编辑地址' : '新增地址'">
      <el-form :model="form" label-width="72px" class="mt-2">
        <el-form-item label="收货人" required>
          <el-input v-model="form.name" placeholder="请输入收货人姓名" />
        </el-form-item>
        <el-form-item label="手机号" required>
          <el-input v-model="form.phone" placeholder="请输入 11 位手机号" maxlength="11" />
        </el-form-item>
        <el-form-item label="所在地区" required>
          <el-input v-model="form.region" placeholder="如：广东省 深圳市 南山区" />
        </el-form-item>
        <el-form-item label="详细地址" required>
          <el-input v-model="form.detail" type="textarea" :rows="2" placeholder="街道、楼牌号等" />
        </el-form-item>
        <el-form-item label="标签">
          <el-radio-group v-model="form.tag">
            <el-radio-button label="" value="">无</el-radio-button>
            <el-radio-button label="公司" value="公司">公司</el-radio-button>
            <el-radio-button label="家" value="家">家</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.isDefault">设为默认地址</el-checkbox>
        </el-form-item>
      </el-form>

      <template #footer>
        <button class="btn btn--ghost btn--sm" @click="dialogVisible = false">取消</button>
        <button class="btn btn--primary btn--sm" @click="onSave">保存</button>
      </template>
    </DialogShell>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import DialogShell from '@/components/common/DialogShell.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const dialogVisible = ref(false)
const editingId = ref('')

const form = reactive({
  name: '', phone: '', region: '', detail: '', tag: '', isDefault: false
})

function resetForm() {
  Object.assign(form, { name: '', phone: '', region: '', detail: '', tag: '', isDefault: false })
  editingId.value = ''
}

function openCreate() {
  resetForm()
  dialogVisible.value = true
}

function openEdit(addr) {
  editingId.value = addr.id
  Object.assign(form, { ...addr })
  dialogVisible.value = true
}

function onSave() {
  const { name, phone, region, detail } = form
  if (!name || !phone || !region || !detail) {
    ElMessage.warning('请把收货信息填写完整')
    return
  }
  if (!/^1\d{10}$/.test(phone)) {
    ElMessage.warning('请输入正确的 11 位手机号')
    return
  }
  if (editingId.value) {
    userStore.updateAddress(editingId.value, { ...form })
    ElMessage.success('地址已更新')
  } else {
    userStore.addAddress({ ...form })
    ElMessage.success('地址已添加')
  }
  dialogVisible.value = false
}

async function onRemove(addr) {
  await ElMessageBox.confirm(`确定要删除「${addr.name} ${addr.region}」这条地址吗？`, '删除地址', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning'
  })
  userStore.removeAddress(addr.id)
  ElMessage.success('地址已删除')
}
</script>

<style scoped>
.addr-page {
  padding-top: var(--sp-4);
  padding-bottom: var(--sp-8);
}

.addr-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--sp-3);
}

.addr {
  padding: var(--sp-4);
  transition: border-color var(--dur) var(--ease);
}

.addr:hover {
  border-color: var(--c-brand);
}

.addr--default {
  border-color: var(--c-brand);
  background: linear-gradient(135deg, #fffaf7 0%, #fff 100%);
}

.addr__head {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-2);
  flex-wrap: wrap;
}

.addr__name {
  font-size: var(--fs-md);
}

.addr__phone {
  color: var(--c-text-2);
  font-size: var(--fs-sm);
}

.addr__detail {
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  line-height: 1.7;
  min-height: 2.4em;
}

.addr__actions {
  display: flex;
  gap: var(--sp-3);
  margin-top: var(--sp-3);
  padding-top: var(--sp-3);
  border-top: 1px dashed var(--c-border);
}

.addr__action {
  font-size: var(--fs-sm);
  color: var(--c-text-2);
  transition: color var(--dur) var(--ease);
}

.addr__action:hover {
  color: var(--c-brand);
}

.addr__action--danger:hover {
  color: var(--c-danger);
}


</style>

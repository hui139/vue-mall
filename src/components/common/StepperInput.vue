<template>
  <div class="stepper">
    <button
      class="stepper__btn"
      :disabled="modelValue <= min"
      aria-label="减少数量"
      @click="handleStep(-1)"
    >
      <el-icon><Minus /></el-icon>
    </button>

    <input
      class="stepper__input"
      type="number"
      inputmode="numeric"
      :value="modelValue"
      :min="min"
      :max="max"
      @change="handleInput"
    />

    <button
      class="stepper__btn"
      :disabled="modelValue >= max"
      aria-label="增加数量"
      @click="handleStep(1)"
    >
      <el-icon><Plus /></el-icon>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 1 },
  min: { type: Number, default: 1 },
  max: { type: Number, default: 99 },
  size: { type: String, default: 'md' }
})

const emit = defineEmits(['update:modelValue', 'change'])

function commit(next) {
  const clamped = Math.min(Math.max(next, props.min), props.max)
  if (clamped === props.modelValue) return
  emit('update:modelValue', clamped)
  emit('change', clamped)
}

function handleStep(delta) {
  commit(props.modelValue + delta)
}

function handleInput(e) {
  const next = Number(e.target.value)
  // 输入非法值时回退到当前值，避免出现 NaN
  commit(Number.isFinite(next) ? next : props.min)
}
</script>

<style scoped>
.stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--c-border-strong);
  border-radius: var(--r-sm);
  overflow: hidden;
  background: #fff;
}

.stepper__btn {
  width: 30px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-2);
  font-size: 12px;
  transition: all var(--dur) var(--ease);
}

.stepper__btn:hover:not(:disabled) {
  background: var(--c-brand-soft);
  color: var(--c-brand);
}

.stepper__btn:disabled {
  color: var(--c-text-4);
  cursor: not-allowed;
}

.stepper__input {
  width: 44px;
  height: 28px;
  border: none;
  border-left: 1px solid var(--c-border);
  border-right: 1px solid var(--c-border);
  text-align: center;
  font-size: var(--fs-sm);
  background: transparent;
  outline: none;
  /* 隐藏 number 类型的上下箭头 */
  appearance: textfield;
}

.stepper__input::-webkit-outer-spin-button,
.stepper__input::-webkit-inner-spin-button {
  appearance: none;
  margin: 0;
}

/* sm 尺寸 */
.stepper--sm .stepper__btn {
  width: 26px;
  height: 24px;
}

.stepper--sm .stepper__input {
  width: 36px;
  height: 24px;
}
</style>

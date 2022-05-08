<template>
  <div class="xy-form">
    <!-- 标题插槽 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="props.labelWidth">
      <el-row>
        <template v-for="item in props.formItems" :key="item.label">
          <el-col v-bind="props.colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="props.itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                >
                </el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 插槽 -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, watch, ref } from 'vue'
import { IFormItem } from '../types'

// props
const props = defineProps(
  {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    formData: () => ({})
  }
)

// emit
const emit = defineEmits(['update:modelValue'])

const formData = ref({ ...props.modelValue })
// watch
watch(formData, (newValue) => emit('update:modelValue', newValue), {
  deep: true
})
</script>

<style scoped lang="less">
.header {
  padding-top: 10px;
}
</style>

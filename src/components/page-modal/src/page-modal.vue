<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <xy-form v-bind="props.modalConfig" v-model="formData"></xy-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import XyForm from '@/base-ui/form'
import store from '@/store'

// props
const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String
  }
})

const dialogVisible = ref(false)
const formData = ref<any>({})

watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

// 处理确定点击按钮的逻辑
const handleConfirmClick = () => {
  dialogVisible.value = false
  // 如果有默认值，说明是编辑,否则是新建
  if (Object.keys(props.defaultInfo).length === 0) {
    // 新建
    store.dispatch('system/createPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    })
  } else {
    // 编辑
    store.dispatch('system/editPageDataAction', {
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    })
  }
}

// 暴露
defineExpose({
  dialogVisible
})
</script>

<style scoped lang="less"></style>

<template>
  <div class="page-search">
    <xy-form v-bind="props.searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="header">高级检索</h2>
      </template>
      <template v-slot:footer>
        <div class="handle-btns">
          <el-button type="info" @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleQueryClick">搜索</el-button>
        </div>
      </template>
    </xy-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import XyForm from '@/base-ui/form'

// props
const props = defineProps({
  searchFormConfig: {
    type: Object
  }
})

// emits
const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])

const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}

const formData = ref(formOriginData)

// 重置
const handleResetClick = () => {
  for (const key in formOriginData) {
    formData.value[`${key}`] = formOriginData[key]
  }
  emit('resetBtnClick')
}

// 搜索
const handleQueryClick = () => {
  emit('queryBtnClick', formData.value)
}
</script>

<style scoped lang="less">
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
.page-search {
  background-color: #fff;
  margin-bottom: 20px;
}
</style>

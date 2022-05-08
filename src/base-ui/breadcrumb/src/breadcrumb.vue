<template>
  <div>
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IBreadcrumb } from '../types';

// props
const {} = defineProps({
  breadcrumbs: {
    // PropType确定类型
    type: Array as PropType<IBreadcrumb[]>,
    default: () => []
  }
})

</script>

<style scoped lang="less">
</style>
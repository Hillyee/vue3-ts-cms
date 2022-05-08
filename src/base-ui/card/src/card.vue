<template>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ props.title }}</span>
        </div>
      </template>
      <div class="item">
        <!-- 默认插槽 -->
        <slot></slot>
      </div>
    </el-card>
</template>

<script lang="ts" setup>
import {} from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  }
})
</script>

<style scoped lang="less">
.box-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}

.item {
  margin-bottom: 10px;
}
</style>

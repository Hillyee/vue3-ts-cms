<template>
  <div class="content">
    <xy-table
      :listData="dataList"
      :listCount="listCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="default"
          @click="handleNewClick"
          >新建
        </el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handler-btns">
          <el-button
            v-if="isUpdate"
            type="text"
            size="small"
            :icon="Edit"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            type="text"
            size="small"
            :icon="Delete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </xy-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import XyTable from '@/base-ui/tabel'
import { Delete, Edit } from '@element-plus/icons-vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

// props
const { contentTableConfig, pageName } = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
})

// emit
const emit = defineEmits(['newBtnClick', 'editBtnClick'])

// 获取操作的权限
const isCreate = usePermission(pageName, 'create')
const isUpdate = usePermission(pageName, 'update')
const isDelete = usePermission(pageName, 'delete')
const isQuery = usePermission(pageName, 'query')

// 双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => getPageData())

// store
const store = useStore()
// 发送网络请求
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return
  store.dispatch('system/getPageListAction', {
    pageName: pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
getPageData()

// 从vuex中获取数据
const dataList = computed(() => {
  return store.getters['system/pageListData'](pageName)
})
const listCount = computed(() => {
  return store.getters['system/pageListCount'](pageName)
})

// 获取其他的动态插槽名称
const otherPropSlots = contentTableConfig.propList.filter((item: any) => {
  if (item.slotName === 'status') return false
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})

// 删除操作
const handleDeleteClick = (item: any) => {
  store.dispatch('system/deletePageItemAction', {
    pageName,
    id: item.id
  })
}

// 新建操作
const handleNewClick = () => {
  emit('newBtnClick')
}

// 编辑操作
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}

// 把方法暴露出去
defineExpose({
  getPageData
})
</script>

<style scoped lang="less"></style>

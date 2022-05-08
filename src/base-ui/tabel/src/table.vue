<template>
  <div class="xy-table">
    <!-- table上面的头部 -->
    <div class="header">
      <slot name="title">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="listData" stripe style="width: 100%" v-bind="childrenProps">
      <!-- 选择列 -->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="60"
        align="center"
      ></el-table-column>
      <!-- 序号列 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        width="60"
        align="center"
        label="序号"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="page.currentPage"
          v-model:page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          :small="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// props
const { title, propList, showIndexColumn, showSelectColumn, listData, page } =
  defineProps({
    title: {
      type: String,
      default: ''
    },
    propList: {
      type: Array as any
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    listData: {
      type: Array as any
    },
    listCount: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  })

// emit
const emit = defineEmits(['update:page'])

const handleSizeChange = (pageSize: number) => {
  emit('update:page', { ...page, pageSize })
}

const handleCurrentChange = (currentPage: number) => {
  emit('update:page', { ...page, currentPage })
}
</script>

<style scoped lang="less">
.xy-table {
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: #fff;

    .title {
      margin-left: 10px;
    }

    .handler {
      margin-right: 10px;
    }
  }

  .footer {
    margin-top: 10px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>

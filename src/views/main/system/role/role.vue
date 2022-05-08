<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :modalConfig="modalConfig"
      pageName="role"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menuData"
          :props="{ children: 'children', label: 'name' }"
          node-key="id"
          show-checkbox
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { menuMapLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

// 处理pageModal的hook
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallback = (item: any) => {
  const leafKeys = menuMapLeafKeys(item.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
const { handleEditData, handleNewData, pageModalRef, defaultInfo } =
  usePageModal(undefined, editCallback)
// store
const store = useStore()
// 获取角色菜单
const menuData = computed(() => store.state.entireMenu)

const otherInfo = ref({})
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>

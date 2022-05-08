<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
// 新增的回调
const newCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = false
}
// 编辑的回调
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = true
}

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
const { pageModalRef, handleEditData, handleNewData, defaultInfo } =
  usePageModal(newCallback, editCallback)

const store = useStore()

const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find(
    (item) => item.field === 'departmentId'
  )
  departmentItem!.options = store.state.entireDepartment.map(item => {
    return { title: item.name, value: item.id }
  })
  const roleItem = modalConfig.formItems.find(
    (item) => item.field === 'roleId'
  )
  roleItem!.options = store.state.entireRole.map(item => {
    return { title: item.name, value: item.id }
  })
  return modalConfig
})
</script>

<style scoped lang="less"></style>

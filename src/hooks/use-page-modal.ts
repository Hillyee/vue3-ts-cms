import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type callbackFn = (item?: any) => void

export function usePageModal(newCB?: callbackFn, editCB?: callbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})

  // 新建
  const handleNewData = () => {
    defaultInfo.value = {}
    // 显示对话框
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCB && newCB()
  }

  // 编辑
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    // 显示对话框
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }

    editCB && editCB(item)
  }

  return { handleEditData, handleNewData, pageModalRef, defaultInfo }
}

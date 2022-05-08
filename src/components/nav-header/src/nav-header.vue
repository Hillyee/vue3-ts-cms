<template>
  <div class="nav-header">
    <div class="handle-click" @click="handleFoldClick">
      <el-icon class="fold-menu" v-if="isFold">
        <expand />
      </el-icon>
      <el-icon class="fold-menu" v-else>
        <list />
      </el-icon>
    </div>

    <div class="content">
      <xy-breadcrumb :breadcrumbs="breadcrumbs"/>
      <user-info/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import userInfo from './user-info.vue';
import XyBreadcrumb from '@/base-ui/breadcrumb';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import { pathMapBreadcrumbs } from '@/utils/map-menus'

const isFold = ref(false)

// 面包屑的数据 [ {name: , path: }]
const store = useStore()
const breadcrumbs = computed(() => {
  const userMenus = store.state.login.userMenu
  const route = useRoute()
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenus, currentPath)
})

const emit = defineEmits(['foldChange'])
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}




</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
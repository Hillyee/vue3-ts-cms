<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>

    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn
</script>

<style scoped lang="less">
.app {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <span>{{ username }}</span>
        <el-avatar :size="30" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import localCache from '@/utils/cache'
const store = useStore()
const username = computed(() => store.state.login.userInfo.name)

const router = useRouter()
// 退出登录
const handleExitClick = () => {
  localCache.deleteCache('token')
  router.push('/main')
}

</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  span {
    margin-right: 10px;
  }
}
</style>
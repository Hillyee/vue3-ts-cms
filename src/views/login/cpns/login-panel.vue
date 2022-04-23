<template>
  <div class="login-panel">
    <h2>后台管理系统</h2>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <avatar></avatar>
            </el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phont">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><cellphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
// 引入图标
import { Avatar, Cellphone } from '@element-plus/icons-vue'
import LoginAccount from './login-account.vue';
import LoginPhone from './login-phone.vue';
import { ref } from 'vue';

const isKeepPassword = ref(true)
// 当前选中的tab
const currentTab = ref('account')

const accountRef = ref<InstanceType<typeof LoginAccount> | null>(null)
const phoneRef = ref<InstanceType<typeof LoginPhone> | null>(null)
const handleLoginClick = () => {
  if (currentTab.value === 'account') {
    // 账号登录
    accountRef.value?.loginAction(isKeepPassword.value)
  } else {
    // 手机号登录
    phoneRef.value?.loginPhoneAction(isKeepPassword.value)
  }
}

</script>

<style scoped lang="less">
.login-panel {
  width: 400px;
  margin-bottom: 150px;

  h2 {
    text-align: center;
  }

  .account-control {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
  }
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
  margin-right: 5px;
}



</style>
<template>
  <div class="login-account">
    <el-form :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ElForm } from 'element-plus';
import { reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'
import store from '@/store';

const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

const formRef = ref<InstanceType<typeof ElForm>>()

const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 判断是否需要记住密码
      if(isKeepPassword) {
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }

      store.dispatch('login/accountLoginAction', {
        ...account
      })
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
</style>

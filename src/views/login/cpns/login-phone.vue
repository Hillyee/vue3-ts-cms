<template>
  <div class="login-phone">
    <el-form :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code"></el-input>
          <el-button type="primary" class="code-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { rules } from '../config/phone-config'
import { reactive } from 'vue'

const phone = reactive({
  num: '',
  code: ''
})

const loginPhoneAction = (isKeepPassword: boolean) => {
  console.log("手机号登录的逻辑");
}

defineExpose({
  loginPhoneAction
})
</script>

<style scoped lang="less">

.login-phone {
  display: flex;
  justify-content: space-around;
  align-items: center;

  .get-code{
    display: flex;
    justify-content: space-between;

    .code-btn {
      margin-left: 10px;
    }
  }
}

</style>
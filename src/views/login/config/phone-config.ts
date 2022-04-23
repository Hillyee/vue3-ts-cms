// 定义校验规则
export const rules = {
  num: [
    {
      required: true,
      message: '手机号是必传内容',
      trigger: 'blur'
    },
    {
      message: '手机号输入错误',
      pattern: /^[0-9]{11}$/,
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码是必传内容',
      trigger: 'blur'
    },
    {
      message: '验证码错误',
      trigger: 'blur'
    }
  ]
}
// 定义校验规则
export const rules = {
  name: [
    {
      required: true,
      message: '用户名是必传内容',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 10,
      message: '用户名必须是5-10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容',
      trigger: 'blur'
    },
    {
      min: 3,
      message: '密码至少是3个字母或数字',
      trigger: 'blur'
    }
  ]
}
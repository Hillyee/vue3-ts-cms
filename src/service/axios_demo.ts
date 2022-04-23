import axios from 'axios'

// get 请求
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'xxx'
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// post请求
// axios.post("http://httpbin.org/post", {
//   data: {
//     name: 'kkk',
//     age: 18
//   }
// }).then(res => {
//   console.log("post", res.data);

// })

// axios的配置选项
// 4.1 全局的配置
// axios.defaults.baseURL = 'http://httpbin.org'
// axios.defaults.timeout = 10000
// axios.defaults.headers = {}

// 4.2每一个请求单独配置
// axios
//   .get('/get', {
//     params: {
//       name: 'xxx'
//     },
//     timeout: 5000,
//     headers: {}
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// axios.post("/post", {
//   data: {
//     name: 'kkk',
//     age: '18'
//   }
// }).then( res => {
//   console.log(res);
// })
// axios.all([
//   axios.get('get', {params: {name: 'xxx', age: 18}}),
//   axios.post('/post', {data: {name: 'kkk', age: 19}})
// ]).then(res => {
//   console.log(res[0].data);
//   console.log(res[1].data);
// })

// 拦截器
// axios.interceptors.request.use(
//   (config) => {
//     // 请求前做一些事情
//     console.log('请求成功的拦截');
//     return config
//   },
//   (err) => {
//     console.log('请求发送错误');
//     return err
//   }
// )

// // 响应拦截
// // fn1: 数据响应成功
// axios.interceptors.response.use(
//   (res) => {
//     console.log('响应成功的拦截');
//     return res
//   },
//   (err) => {
//     console.log('服务器响应失败');
//     return err
//   }
// )
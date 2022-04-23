import MYRequest from "./request";
import {BASE_URL, TIME_OUT} from './request/config'
import LocalCache from '@/utils/cache'

const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getCache('token')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

// 每个实例都可以有不同的拦截器
// export const myRequest2 = new MYRequest({

// })

export default myRequest


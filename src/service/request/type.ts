import {AxiosRequestConfig, AxiosResponse} from 'axios'
// interface AxiosRequestConfig2 extends AxiosRequestConfig {
//   Authorization: ''
// }

// 定义接口(为了定义接口属性可以传入什么)
// 有四个属性，每个属性都是一个函数类型
export interface MYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface MYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 扩展interceptors
  interceptors?: MYRequestInterceptors<T>
  showLoading?: boolean
}
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { MYRequestInterceptors, MYRequestConfig } from './type'
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true

class MYRequest {
  instance: AxiosInstance
  interceptors?: MYRequestInterceptors
  loading?: any
  showLoading?: boolean

  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config) // 创建实例
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 给实例添加拦截器属性
    // 请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        setTimeout(() => {
          this.loading?.close()
        }, 1000)

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        this.loading?.close()
        // 例子：判断不同的 HtppError显示不同错误信息
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  }

  request<T>(config: MYRequestConfig<T>):Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.请求结束之后把showloading设置回默认值，否则会影响其他的请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          return err
        })
    })
  }

  get<T>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'GET'})
  }

  post<T>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'POST'})
  }

  delete<T>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'DELETE'})
  }

  patch<T>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'PATCH'})
  }
}

export default MYRequest

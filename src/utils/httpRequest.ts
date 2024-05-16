import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import { showDialog } from 'vant'
import 'vant/es/dialog/style'

//定义过滤请求
const unicodeUrl = ['/prms/deliver']

// axios 请求配置
const config = {
  // baseURL:'http://localhost:8080',
  //   baseURL: '/api',
  baseURL: '',
  timeout: 2500
}
// 定义返回值类型
export interface Result<T = any> {
[x: string]: any
  code: number
  msg: string
  data: T
}

class Http {
  // axios 实例
  private instance: AxiosInstance
  // 构造函数初始化
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    //定义拦截器
    this.interceptors()
  }
  private interceptors() {
    // axios 发送请求之前的处理
    const setTokenCookie = (token: any) => {
      document.cookie = `${token}; path=/; max-age=3600` // 设置cookie，这里的'3600'是cookie的有效时间，单位是秒
    }

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const isUnicode = unicodeUrl.some((key) => {
          return key == config.url
        })

        //判断是否unicode链接
        const contentType = isUnicode
          ? 'application/x-www-form-urlencoded'
          : 'application/json; charset=utf-8'
        const token = localStorage.getItem('token')
        config.headers['content-Type'] = contentType
        if (token) {
          config.headers!['token'] = token
          setTokenCookie(token)
        }
        return config
      },
      (error: any) => {
        error.data = {}
        error.data.msg = '服务器异常，请联系管理员！'
        return error
      }
    )
    // axios 请求返回之后的处理
    // 请求返回处理
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // console.log(res.data);
        // if (res.data.code != 1000) {
        //   showDialog({ title: '提示', message: res.data.message || '服务器出错啦', width: '700px' })
        //   return res.data
        // } else {
        //   return res.data
        // }
        return res.data
      },
      (error) => {
        console.log('进入错误！')
        error.data = {}
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.data.msg = '错误请求'
              showDialog({ title: '提示', message: error.data.msg, width: '700px' })
              break
            case 401:
              error.data.msg = '未授权，请登录'
              showDialog({ title: '提示', message: error.data.msg, width: '700px' })
              break
            case 403:
              error.data.msg = '拒绝访问'
              showDialog({ title: '提示', message: error.data.msg, width: '700px' })
              break
            case 404:
              error.data.msg = '请求错误，未找到该资源'
              showDialog({ title: '提示', message: error.data.msg, width: '700px' })
              break
            case 405:
              error.data.msg = '请求方法未允许'
              showDialog({ title: '提示', message: error.data.msg, width: '700px' })
              break
            case 408:
              error.data.msg = '请求超时'
              showDialog({ title: '提示', message: error.data.msg, width: '700px' })
              break
            case 500:
              error.data.msg = '服务器端出错'
              showDialog({ title: '提示', message: error.data.msg, width: '700px' })
              break
            case 501:
              error.data.msg = '网络未实现'
              showDialog({ title: '提示', message: error.data.msg, width: '700px' })
              break
            case 502:
              error.data.msg = '网络错误'
              showDialog({ title: '提示', message: error.data.msg, width: '700px' })
              break
            case 503:
              error.data.msg = '服务不可用'
              showDialog({ title: '提示', message: error.data.msg, width: '700px' })
              break
            case 504:
              error.data.msg = '网络超时'
              showDialog({ title: '提示', message: error.data.msg, width: '700px' })
              break
            case 505:
              error.data.msg = 'http版本不支持该请求'
              showDialog({ title: '提示', message: error.data.msg, width: '700px' })
              break
            default:
              error.data.msg = `连接错误${error.response.status}`
            //   ElMessage.error(error.data.msg)
          }
        } else {
          error.data.msg = '连接到服务器失败'
          showDialog({ title: '提示', message: error.data.msg, width: '700px' })
        }
        return Promise.reject(error)
      }
    )
  }
  // GET方法
  get<T = Result>(url: string, params?: object): Promise<T> {
    return this.instance.get(url, { params })
  }
  // POST方法
  post<T = Result>(url: string, data?: object): Promise<T> {
    return this.instance.post(url, data)
  }
  // PUT方法
  put<T = Result>(url: string, data?: object): Promise<T> {
    return this.instance.put(url, data)
  }
  // DELETE方法
  delete<T = Result>(url: string): Promise<T> {
    return this.instance.delete(url)
  }
}

export default new Http(config)

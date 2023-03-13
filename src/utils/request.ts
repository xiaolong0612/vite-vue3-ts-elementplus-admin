import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import type { RootResponseType } from '@/types/axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: import.meta.env.BASE_URL
})

const request = async <T = any>(config: AxiosRequestConfig): Promise<RootResponseType<T>> => {
  try {
    const { data } = await instance.request<RootResponseType<T>>(config)
    console.log(data)
    // success
    if ([200].includes(data.code)) {
      console.log(data.message)
    } else {
      // fail
      ElMessage.error(data.message)
    }
    return data
  } catch (err:any) {
    const message = err.message || '请求失败'
    console.error(message) // 失败消息提示
    ElMessage.error(message)
    return {
      code: -1,
      message,
      data: null as any
    }
  }
}

export default request
import type { responseConfig } from "@/types/mock"
import { paramObj } from '../util'
import { tokens } from "./db"

const adminaApi = [
  // 登陆接口
  {
    url: '/api/user/login',
    type: 'post',
    response: (config: responseConfig) => {
      const { username, password } = paramObj(config.body)
      const token = tokens[username]?.token
      if (token && password == tokens[username].password) {
        return {
          code: 200,
          message: '登陆成功',
          data: tokens[username]
        }
      }
      return {
        code: -1,
        message: '用户信息错误，请重试~',
        data: {}
      }
    }
  },
  {
    url: '/api/user/logout',
    type: 'post',
    response: (config: responseConfig) => {
      const { token } = JSON.parse(config.body)
      if (token) {
        return {
          code: 200,
          message: '退出登陆',
          data: {}
        }
      }
      return {
        code: -1,
        message: '登出失败，请重试~',
        data: {}
      }
    }
  }
]
export default adminaApi
/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-17 00:02:59
 * @LastEditors: Amber
 */
import type { responseConfig } from "@/types/mock"
import { paramObj } from '../util'
import { tokens, loginLogs } from "./db"

const adminApi = [
  // 登陆接口
  {
    url: '/api/user/login',
    type: 'post',
    response: (config: responseConfig) => {
      const { username } = paramObj(config.body)
      const token = tokens[username]?.token
      // if (token && password == tokens[username].password) {
      if (token) {
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
  },
  {
    url: '/api/user/logs',
    type: 'post',
    response: (config: responseConfig) => {
      const { page, limit } = paramObj(config.body)
      return {
        code: 200,
        message: '数据获取成功',
        data: loginLogs(page, limit)
      }
    }
  }
]
export default adminApi
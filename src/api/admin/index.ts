/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-11 21:25:59
 * @LastEditors: Amber
 */
import type { LoginReq, LogoutReq, UserRes, LoginLogs } from './types'
import type { Params } from "@/types/axios"
import request from '@/utils/request'

export const adminLogin = (data: LoginReq) => {
  return request<UserRes>({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export const adminLogout = (data: LogoutReq) => {
  return request({
    url: '/api/user/logout',
    method: 'post',
    data
  })
}

export const adminLoginlog = (data: Params) => {
  return request<LoginLogs>({
    url: '/api/user/logs',
    method: 'post',
    data
  })
}
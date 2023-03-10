import type { LoginReq, LogoutReq, UserRes } from './types'
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
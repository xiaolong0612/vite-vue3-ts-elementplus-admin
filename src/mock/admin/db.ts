/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-12 12:44:51
 * @LastEditors: Amber
 */
import Mock from 'mockjs'
import type { Tokens } from "./types"
import type { LoginLog } from "@/api/admin/types"

export const tokens:Tokens = {
  admin: {
    password: '123456',
    token: 'admin-token',
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    password: '123123',
    token: 'editor-token',
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export const loginLogs = (page: number, limit: number) => {
  const data = {
    total: Mock.mock('@integer(10, 20)'),
    list: <Array<LoginLog>>[]
  }
  for(let i = 0; i < limit; i++){
    data.list.push(Mock.mock({
      "name|+1": [
        "admin",
        "editor",
      ],
      datetime: '@datetime',
      ip: '@ip'
    }))
  }
  
  return data
}
/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-15 02:43:17
 * @LastEditors: Amber
 */
import Mock from 'mockjs'
import type { MockParams } from '@/types/mock'
import adminApi from './admin'
import rolesApi from './roles'
import articlesApi from './articles'

// 需要遍历的请求
const mocks = [...adminApi, ...rolesApi, ...articlesApi]

// 设置200-2000毫秒延时请求数据
Mock.setup({
  timeout: '200-2000'
})

// 接口拦截
export function mockRequest() {
  let i: MockParams
  for (i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
  }
}
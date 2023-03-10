import Mock from 'mockjs'
import type { MockParams } from '@/types/mock'
import adminApi from './admin'

// 需要遍历的请求
const mocks = [...adminApi]

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
/*
 * @Description: 测试环境下 引入自定义的mockRequest
 * @Author: Amber
 * @Date: 2023-03-12 12:04:05
 * @LastEditTime: 2023-03-12 12:06:50
 * @LastEditors: Amber
 */
import { mockRequest } from '../mock'

export default function loadComponent() {
// if (import.meta.env.MODE === 'development') {
  mockRequest()
// }
}
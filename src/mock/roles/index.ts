/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-13 19:37:45
 * @LastEditors: Amber
 */
import type { responseConfig } from "@/types/mock"
import { roles, routes } from "./db"
const rolesApi = [
  {
    url: '/api/roles/getRoutes',
    type: 'get',
    response: () => {
      return {
        code: 200,
        message: '数据获取成功',
        data: routes
      }
    }
  },
  {
    url: '/api/roles/getRoles',
    type: 'get',
    response: () => {
      return {
        code: 200,
        message: '数据获取成功',
        data: roles
      }
    }
  },
  {
    url: '/api/roles/delRole',
    type: 'delete',
    response: (config: responseConfig) => {
      if(config.body){
        return {
          code: 200,
          message: '删除成功'
        }
      }
      return {
        code: -1,
        message: '删除失败'
      }
    }
  },
]
export default rolesApi
/*
 * @Description: 编辑Role 操作抽离
 * @Author: ZY
 * @Date: 2021-01-13 09:43:17
 * @LastEditors: Amber
 * @LastEditTime: 2023-03-13 01:05:28
 */

import type { RouteRecordRaw } from 'vue-router'
export default function() {
  const flattenRoutes = (routes: RouteRecordRaw[]) => {
    let data: RouteRecordRaw[] = []
    routes.forEach(route => {
      data.push(route)
      if (route.children) {
        const temp = flattenRoutes(route.children)
        if (temp.length > 0) {
          data = [...data, ...temp]
        }
      }
    })
    return data
  }

  return {
    flattenRoutes
  }
}

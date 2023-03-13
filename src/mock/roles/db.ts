/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-12 21:12:16
 * @LastEditTime: 2023-03-13 19:00:59
 * @LastEditors: Amber
 */
import { deepClone } from "@/utils"
import { asyncRoutes, constantRoutes } from "@/router"
import { filterAsyncRoutes } from "@/stores/permission"

export const routes = deepClone([...constantRoutes, ...asyncRoutes]).filter((item: { meta: any }) => item.meta)

export const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: filterAsyncRoutes(routes, ['editor'])
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]
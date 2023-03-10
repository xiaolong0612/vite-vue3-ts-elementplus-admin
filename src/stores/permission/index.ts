import { defineStore } from 'pinia'
import Names from '../name'
import { asyncRoutes, constantRoutes } from '@/router'
import type { RouteRecordRaw, RouteMeta } from 'vue-router'


// interface RouteMetaRoles extends RouteMeta {
//   roles: Array<string>
// }

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: Array<string>, route: RouteMeta) {
  if (route.meta && route?.meta?.roles) {
    return roles.some(role => route?.meta?.roles?.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: Array<string>): RouteRecordRaw[] {
  const res:RouteRecordRaw[] = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore(Names.PERMISSION, {
  state:() => ({
    isUpdate: <boolean>false,
    routes: <Array<RouteRecordRaw>>[],
    addRoutes: <Array<RouteRecordRaw>>[],
  }),
  // methods
  actions: {
    generateRoutes(roles: Array<string>) {
      return new Promise((resolve) => {
        let accessedRoutes:RouteRecordRaw[]
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        this.addRoutes = accessedRoutes
        this.routes = constantRoutes.concat(accessedRoutes)
        this.isUpdate = true
        resolve(accessedRoutes)
      })
    }
  },
  persist: true
})
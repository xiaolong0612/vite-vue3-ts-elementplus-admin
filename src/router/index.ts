import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// 基础页面布局，包含了头部导航，侧边栏等。
import basicLayout from "@/layouts/BasicLayout/index.vue"

export const constantRoutes = [
  {
    path: '/redirect',
    component: basicLayout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    component: basicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'Monitor', affix: true }
      }
    ]
  }
] as RouteRecordRaw[]

export const asyncRoutes = [
  {
    path: '/permission',
    component: basicLayout,
    meta: {
      title: 'Permission',
      icon: 'User',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/permission/index.vue'),
        name: 'IndexPermission',
        meta: {
          title: 'Info',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role.vue'),
        name: 'RolePermission',
        meta: {
          title: 'Role',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/error',
    component: basicLayout,
    redirect: '/error/404',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: 'CloseBold'
    },
    children: [
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true }
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

// export function resetRouter() {
//   const newRouter = createRouter({
//     history: createWebHistory(import.meta.env.BASE_URL),
//     routes: constantRoutes
//   })
//   router.matcher = newRouter.matcher // reset router
// }

export default router

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// 基础页面布局，包含了头部导航，侧边栏等。
import basicLayout from "@/layouts/BasicLayout/index.vue"

import componentsRouter from "./modules/components"
import tableRouter from "./modules/table"
import excelRouter from "./modules/excel"
import errorRouter from "./modules/error"
import zipRouter from "./modules/zip"
import clipboardRouter from "./modules/clipboard"

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
        component: () => import('@/views/permission/role/index.vue'),
        name: 'RolePermission',
        meta: {
          title: 'Role',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/Echarts',
    component: basicLayout,
    redirect: '/Echarts/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/charts/index.vue'),
        name: 'Echarts',
        meta: {
          title: 'Echarts',
          icon: 'PieChart'
        }
      }
    ]
  },
  componentsRouter,
  tableRouter,
  excelRouter,
  errorRouter,
  zipRouter,
  clipboardRouter,
  {
    path: '/pdf',
    component: basicLayout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index.vue'),
        name: 'PDF',
        meta: {
          title: 'PDF',
          icon: 'Printer'
        }
      }
    ]
  },
  {
    path: '/i18n',
    component: basicLayout,
    redirect: '/i18n/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n/index.vue'),
        name: 'i18n',
        meta: {
          title: 'i18n',
          icon: 'Flag'
        }
      }
    ]
  },
  {
    path: '/pdf-download-example',
    component: () => import('@/views/pdf/download.vue'),
  },
  { path: '/:catchAll(.*)', redirect: '/404' }
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

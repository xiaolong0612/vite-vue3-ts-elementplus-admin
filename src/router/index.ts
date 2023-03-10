import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// 基础页面布局，包含了头部导航，侧边栏等。
import basicLayout from "@/layouts/BasicLayout/index.vue"

export const constantRoutes = [
  {
    path: '/redirect',
    component: basicLayout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
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
  },
  {
    path: '/permission',
    redirect: '/permission/index',
    component: basicLayout,
    meta: { title: 'Permission', icon: 'User' },
    children: [
      {
        path: 'index',
        name: 'Permission',
        component: () => import('@/views/permission/index.vue'),
        meta: { title: 'Permission' }
      },
      {
        path: 'two',
        name: 'Permissiontwo',
        component: () => import('@/views/permission/index.vue'),
        meta: { title: 'Permissiontwo' }
      },
    ]
  },
] as RouteRecordRaw[]

export const asyncRoutes = [] as RouteRecordRaw[]

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

import router from './router'
import type { RouteLocationNormalized, RouteRecordRaw } from "vue-router"
import { getStoreItem } from '@/utils'
import getPageTitle from '@/utils/get-page-title'
import { ElMessage } from 'element-plus'
import { start, close } from "@/utils/nporgress" // 导入进度条
import pinia from '@/stores'
// import {storeToRefs} from 'pinia'
import { usePermissionStore } from "@/stores/permission"
// fix router使用pinia报错
const permission = usePermissionStore(pinia)

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  start()
  // set page title
  document.title = getPageTitle(to.meta.title as string)

  // determine whether the user has logged in
  const hasToken = getStoreItem(localStorage.ADMIN, 'token')
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      close()
    } else {
      const isUpdate = permission.isUpdate
      if (isUpdate) {
        next()
      } else {
        try {
          // 动态路由
          const accessRoutes = await permission.generateRoutes(getStoreItem(localStorage.ADMIN, 'roles')) as RouteRecordRaw
          router.addRoute(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // 退出登陆
          ElMessage.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          close()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      close()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  close()
})
/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-12 13:13:12
 * @LastEditors: Amber
 */
import pinia from '@/stores'
import { defineStore } from 'pinia'
import Names from '../name'
import { adminLogin, adminLogout } from "@/api/admin"
import type { RootResponseType } from "@/types/axios"
import type { LoginReq } from "@/api/admin/types"
import { usePermissionStore } from "@/stores/permission"
import { getStoreItem } from '@/utils'
import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import { useTagsViewStore } from "@/stores/tagsView"

// fix Uncaught Error: [🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
const permission = usePermissionStore(pinia)
const tagsView = useTagsViewStore(pinia)

export const useAdminStore = defineStore(Names.ADMIN, {
  state:() => ({
    name: '',
    token: '',
    roles: <Array<string>>[],
    introduction: '',
    avatar: '',
  }),
  // computed
  getters: {

  },
  // methods
  actions: {
    login(userInfo: LoginReq) {
      return new Promise<RootResponseType>((resolve, reject) => {
        adminLogin(userInfo).then(result => {
          if (result.code === 200) {
            this.name = result.data.name
            this.token = result.data.token
            this.roles = result.data.roles
            this.introduction = result.data.introduction
            this.avatar = result.data.avatar
            // for(const i in result.data){
            //   console.log(i)
            //   this[i] = result.data[i]
            // }
            resolve(result)
          } else {
            reject()
          }
        })
      })
    },
    logout() {
      return new Promise<RootResponseType>((resolve, reject) => {
        adminLogout({token: this.token}).then(result => {
          if (result.code === 200) {
            this.resetToken()
            resolve(result)
          } else {
            reject()
          }
        })
      })
    },
    resetToken() {
      useAdminStore().$reset()
    },
    async changeRoles(role: string) {
      const token = role + '-token'
      this.token = token
      permission.isUpdate = false
      // User rights need to be reacquired
      this.roles = [role]
      // generate accessible routes map based on roles
      const accessRoutes = await permission.generateRoutes(this.roles) as RouteRecordRaw[]
      // dynamically add accessible routes
      permission.pushRoutes(accessRoutes)

      // reset visited views and cached views
      tagsView.delAllViews()
    }
  },
  persist: true
})
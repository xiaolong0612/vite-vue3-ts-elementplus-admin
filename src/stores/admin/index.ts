import { defineStore } from 'pinia'
import Names from '../name'
import { adminLogin, adminLogout } from "@/api/admin"
import type { MyResponseType } from "@/types/axios"
import type { LoginReq } from "@/api/admin/types"

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
      return new Promise<MyResponseType>((resolve, reject) => {
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
      return new Promise<MyResponseType>((resolve, reject) => {
        adminLogout({token: this.token}).then(result => {
          if (result.code === 200) {
            resolve(result)
          } else {
            reject()
          }
        })
      })
    }
  },
  persist: true
})
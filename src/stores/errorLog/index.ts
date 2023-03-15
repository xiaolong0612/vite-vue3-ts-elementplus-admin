/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 11:07:07
 * @LastEditTime: 2023-03-15 11:14:49
 * @LastEditors: Amber
 */
import { defineStore } from 'pinia'
import Names from '../name'

export const useErrorLogStore = defineStore(Names.ERRORLOG, {
  state:() => ({
    logs: <Array<any>>[]
  }),
  actions: {
    addErrorLog(log:any) {
      this.logs.push(log)
    },
    clearErrorLog() {
      useErrorLogStore().$reset()
    }
  }
})
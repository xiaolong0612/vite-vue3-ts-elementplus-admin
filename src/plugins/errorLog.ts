/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-11 22:27:56
 * @LastEditTime: 2023-03-15 14:35:19
 * @LastEditors: Amber
 */

import { useErrorLogStore } from "@/stores/errorLog"
import { isString, isArray } from '@/utils/validate'
import settings from '@/setting'
const { errorLog: needErrorLog } = settings

export function checkNeed() {
  const env = import.meta.env.MODE
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}

export default function errorHandler(app: any) {
  if (checkNeed()) {
    app.config.errorHandler = (err: any, instance: any, info: any) => {
      // 处理错误，例如：报告给一个服务
      useErrorLogStore().addErrorLog({
        err,
        instance,
        info,
        url: window.location.href
      })
    }
  }
}
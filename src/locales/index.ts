import { createI18n } from 'vue-i18n'
import settings from "@/setting"

// element-plus 中的语言配置
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'

// 自己的语言配置
import enLocale from './en'
import zhLocale from './zh-cn'
import { getStoreItem } from '@/utils'

// 语言配置整合
export const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  'zh-cn': {
    ...zhLocale,
    ...elementZhLocale
  }
}

// 创建 i18n
const i18n = createI18n({
  legacy: false,
  globalInjection: true,  // 全局模式，可以直接使用 $t
  locale: getStoreItem(localStorage.APP, 'lang') as string || settings.lang,
  messages: messages
})
export default i18n
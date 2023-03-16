/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-17 00:08:52
 * @LastEditors: Amber
 */
import { defineStore } from 'pinia'
import Names from '../name'
import { getStoreItem } from '@/utils'
import defaultSettings from '@/setting'
import { DeviceType, ThemeType } from "./type"
import {useDark, useToggle} from '@vueuse/core'
import i18n from '@/locales'
import settings from "@/setting"

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings
const isDark = useDark()

export const useAppStore = defineStore(Names.APP, {
  state:() => ({
    sidebar: {
      opened: getStoreItem(localStorage.APP, 'sidebar') ? (getStoreItem(localStorage.APP, 'sidebar') as any).opened : true,
      withoutAnimation: false
    },
    device: DeviceType.Desktop,
    size: getStoreItem(localStorage.APP, 'size') || 'medium',
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    theme: isDark ? ThemeType.Dark : ThemeType.Light,
    lang: getStoreItem(localStorage.APP, 'lang') || settings.lang,
    github: true
  }),
  // computed
  getters: {

  },
  // methods
  actions: {
    changeLang(lang: string = settings.lang) {
      this.lang = lang
      i18n.global.locale.value = lang as any
    },
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
    },
    closeSideBar(withoutAnimation: boolean) {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device: DeviceType) {
      this.device = device
    },
    setSize(size: string) {
      this.size = size
    },
    switchThemes() {
      const toggleDark = useToggle(isDark)
      this.theme = toggleDark() ? ThemeType.Dark : ThemeType.Light
    }
  },
  persist: [
    {
      paths: ['sidebar', 'size', 'showSettings', 'lang'],
      storage: localStorage
    },
    { 
      paths: ['theme', 'github'],
      storage: sessionStorage
    }
  ]
})
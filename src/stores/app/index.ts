/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-15 19:45:20
 * @LastEditors: Amber
 */
import { defineStore } from 'pinia'
import Names from '../name'
import { getStoreItem } from '@/utils'
import defaultSettings from '@/setting'
import { DeviceType, ThemeType } from "./type"
import {useDark, useToggle} from '@vueuse/core'

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
  }),
  // computed
  getters: {

  },
  // methods
  actions: {
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
      console.log(this.theme)
    }
  },
  persist: [
    {
      paths: ['sidebar', 'size', 'showSettings'],
      storage: localStorage
    },
    { 
      paths: ['theme'],
      storage: sessionStorage
    }
  ]
})
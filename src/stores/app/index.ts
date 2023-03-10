import { defineStore } from 'pinia'
import Names from '../name'
import { getStoreItem } from '@/utils'
import defaultSettings from '@/setting'
import { DeviceType } from "./state-type"
const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings
export const useAppStore = defineStore(Names.APP, {
  state:() => ({
    sidebar: {
      opened: getStoreItem(localStorage.APP, 'sidebar') ? getStoreItem(localStorage.APP, 'sidebar').opened : true,
      withoutAnimation: false
    },
    device: DeviceType.Desktop,
    size: getStoreItem(localStorage.APP, 'size') || 'medium',
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
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
    }
  },
  persist: [
    {
      paths: ['sidebar', 'size', 'showSettings'],
      storage: localStorage
    }
  ]
})
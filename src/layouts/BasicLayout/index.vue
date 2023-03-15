<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-15 15:32:42
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import AppMain from "./components/AppMain.vue"
import sidebar from './components/Sidebar/index.vue'
import Navbar from "./components/Navbar.vue"
import TagsView from "./components/TagsView/index.vue"
import { DeviceType } from '@/stores/app/type'

const app = useAppStore()
let classObj = computed(() => {
  return {
    hideSidebar: !app.sidebar.opened,
    openSidebar: app.sidebar.opened,
    withoutAnimation: app.sidebar.withoutAnimation,
    mobile: app.device === DeviceType.Mobile
  }
})
const handleClickOutside = () => {
  app.closeSideBar(false)
}

const { body } = document
const WIDTH = 992

onMounted(() => {
  if (_isMobile()) {
    app.toggleDevice(DeviceType.Mobile)
    app.closeSideBar(true)
  }
})

onBeforeMount(() => {
  window.addEventListener('resize', () => {
    _resizeHandler()
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    _resizeHandler()
  })
})
const _isMobile = () => {
  const rect = body.getBoundingClientRect()
  return rect.width - 1 < WIDTH
}
const _resizeHandler = () => {
  if (!document.hidden) {
    const isMobile = _isMobile()
    app.toggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop)

    if (isMobile) {
      app.closeSideBar(true)
    }
  }
}
</script>
<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="app.device === DeviceType.Mobile && app.sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView: app.tagsView}" class="main-container">
      <div :class="{'fixed-header':app.fixedHeader}">
        <navbar />
        <tags-view v-if="app.tagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>


<style lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.module.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 12;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>

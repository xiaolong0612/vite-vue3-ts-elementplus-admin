<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import AppMain from "./components/AppMain.vue"
import sidebar from './components/Sidebar/index.vue'
import Navbar from "./components/Navbar.vue"
import TagsView from "./components/TagsView/index.vue"
import { DeviceType } from '@/stores/app/state-type'

const app = useAppStore()
let classObj = computed(() => {
  return {
    hideSidebar: !app.sidebar.opened,
    openSidebar: app.sidebar.opened,
    withoutAnimation: app.sidebar.withoutAnimation,
  }
})

const handleClickOutside = () => {
  app.closeSideBar(false)
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
    z-index: 9;
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

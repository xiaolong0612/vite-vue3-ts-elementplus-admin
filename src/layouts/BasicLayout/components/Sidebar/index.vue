<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from "vue-router"
import { useAppStore } from "@/stores/app"
import { usePermissionStore } from "@/stores/permission"
import variables from '@/styles/_variables.module.scss'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

const app = useAppStore()
const permission = usePermissionStore()

const showLogo = computed(() => {
  return app.sidebarLogo
})
const isCollapse = computed(() => {
  return !app.sidebar.opened
})
const activeMenu = computed(() => {
  const { meta, path } = useRoute()
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>
<template>
  <div :class="{'has-logo': showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission.routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
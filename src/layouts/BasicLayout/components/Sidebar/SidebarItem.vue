<script setup lang="ts">
import path from 'path-browserify'
import { ref, defineProps } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { isExternal } from "@/utils/validate"
import AppLink from './Link.vue'
// import Item from './Item.vue'
import SidebarItem from "./SidebarItem.vue"

interface Props {
  item: RouteRecordRaw,
  basePath?: string
}
const props = withDefaults(defineProps<Props>(), {
  isNest: false,
  basePath: ''
})

// interface OnlyOneChild extends Routes {
//   noShowingChildren: boolean
// }
let onlyOneChild = ref<RouteRecordRaw>()
const hasOneShowingChild = (children:RouteRecordRaw[] = [], parent:RouteRecordRaw[]) => {
  const showingChildren = children.filter(item => {
    if (item?.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })
  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }
  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ... parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}
const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>
<template>
  <!-- <div v-if="!item.hidden"> -->
  <template v-if="hasOneShowingChild(item?.children, item) && (!onlyOneChild?.children||onlyOneChild.noShowingChildren)&&!item?.alwaysShow">
    <app-link v-if="onlyOneChild?.meta" :to="resolvePath(onlyOneChild.path)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!props.isNest}">
        <!-- <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" /> -->
        <el-icon v-if="onlyOneChild?.meta?.icon||(item.meta&&item.meta.icon)"><component :is="onlyOneChild?.meta?.icon||(item.meta&&item.meta.icon)" /></el-icon>
        <template #title>{{ onlyOneChild?.meta?.title }}</template>
      </el-menu-item>
    </app-link>
  </template>
  <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
    <template #title v-if="item.meta">
      <!-- <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" /> -->
      <el-icon v-if="item.meta && item.meta.icon"><component :is="item.meta && item.meta.icon" /></el-icon>
      <span>{{ item?.meta?.title }}</span>
    </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :is-nest="true"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
  </el-sub-menu>
  <!-- </div> -->
</template>


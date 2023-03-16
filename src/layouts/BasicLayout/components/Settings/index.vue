<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-16 23:24:21
 * @LastEditTime: 2023-03-16 23:43:47
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/app"
import { ref } from "vue";
const app = useAppStore()
const theme = ref<boolean>(app.theme === 1)
</script>

<template>
  <div class="drawer-container">
    <div class="drawer-item">
      <span>Theme</span>
      <el-switch
        class="drawer-switch"
        v-model="theme"
        :inline-prompt="true"
        inactive-icon="Moon"
        active-icon="Sunny"
        @change="app.switchThemes()"
      />
    </div>

    <div class="drawer-item">
      <span>Open Tags-View</span>
      <el-switch v-model="app.tagsView" class="drawer-switch" />
    </div>

    <div class="drawer-item">
      <span>Fixed Header</span>
      <el-switch v-model="app.fixedHeader" class="drawer-switch" />
    </div>

    <div class="drawer-item">
      <span>Sidebar Logo</span>
      <el-switch v-model="app.sidebarLogo" class="drawer-switch" />
    </div>

  </div>
</template>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-item {
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>

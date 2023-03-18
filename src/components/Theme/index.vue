<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 16:54:34
 * @LastEditTime: 2023-03-18 16:50:32
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from "@/stores/app"

const app = useAppStore()
const theme = ref<boolean>(app.theme === 1)

// 根据系统设置自动更换主题
// const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
// themeMedia.addListener(e => {
//   if (e.matches) {
//     console.log('light')
//   } else {
//     console.log('dark')
//   }
// })
</script>
<template>
  <div>
    <el-switch v-model="theme" :inline-prompt="true" inactive-icon="Moon" active-icon="Sunny"
      @change="app.switchThemes()" />
  </div>
</template>
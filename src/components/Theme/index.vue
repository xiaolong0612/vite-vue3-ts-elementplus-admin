<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 16:54:34
 * @LastEditTime: 2023-03-15 18:58:41
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore} from "@/stores/app"

const app = useAppStore()
console.log(app.theme)
const theme = ref<boolean>(app.theme === 1)
</script>
<template>
  <div>
    <el-switch
      v-model="theme"
      :inline-prompt="true"
      inactive-icon="Moon"
      active-icon="Sunny"
      @change="app.switchThemes()"
    />
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from "@/stores/app"
import { computed, provide } from "vue"
import { messages } from "@/locales"
import * as echarts from 'echarts'

const app = useAppStore()

const element:any = messages

const locale = computed(() => {
  return element[app.lang as string]
})

provide('echarts', echarts)
</script>
<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>
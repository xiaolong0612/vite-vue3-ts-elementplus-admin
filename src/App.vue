<script setup lang="ts">
import { useAppStore } from "@/stores/app"
import { computed } from "vue"
import { messages } from "@/locales"

const app = useAppStore()

const element:any = messages

const locale = computed(() => {
  return element[app.lang as string]
})
</script>
<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>
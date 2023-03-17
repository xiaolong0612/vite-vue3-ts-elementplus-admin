<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-16 17:14:52
 * @LastEditTime: 2023-03-17 14:11:00
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/app"
import i18n, { messages } from "@/locales"
import { ElMessageBox } from "element-plus"
import { useRouter, useRoute } from "vue-router"

const $t = i18n.global.t
const router = useRouter()
const route = useRoute()
const list = Object.keys(messages)

const changeLang = (val: string) =>  {
  if (route.fullPath !== '/i18n/index') {
    ElMessageBox.confirm($t('views.i18n.changeTip'), 'Title', {
      dangerouslyUseHTMLString: true,
    }).then(() => {
      useAppStore().changeLang(val)
      router.push('/i18n/index')
    })
  } else {
    useAppStore().changeLang(val)
  }
}
</script>
<template>
  <div>
    <el-dropdown>
      <span class="text-base pt-4">
        <svg width="1.2em" height="1.2em"><path fill="currentColor" d="m18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zM10 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.62 6.301a14.864 14.864 0 0 0 2.336 1.707l-.751 1.878A17.015 17.015 0 0 1 9 13.725a16.676 16.676 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.032 16.032 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2zm7.5 10.885L16.253 16h2.492L17.5 12.885z"></path></svg>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in list" :key="item" @click="changeLang(item)">{{ item }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
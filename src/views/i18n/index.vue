<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-16 17:24:59
 * @LastEditTime: 2023-03-19 13:47:18
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/app"
import Pagination from "@/components/Pagination/index.vue"
import { messages } from "@/locales"
import { ref } from "vue"
import { ElMessageBox } from "element-plus"
import { watch } from "vue"

const app = useAppStore()

const list = Object.keys(messages)

const lang = ref(app.lang)

watch(() => app.lang, () => {
  location.reload()
})

const changeLang = () => {
  app.changeLang(lang.value as string)
  location.reload()
}

const openMessageBox = () => {
  ElMessageBox.alert('This is a message', 'Title', {
    callback: () => {}
  })
}

</script>
<template>
  <div class="app-container">
    <div class="tip custom-block">
      <p class="custom-block-title">TIP</p>
      <p v-html="$t('views.i18n.Tip')" />
    </div>
    <el-card class="mb-4">
      <el-form label-width="120px">
        <el-form-item :label="$t('views.i18n.label')">
          <el-radio-group v-model="lang" @change="changeLang">
            <el-radio-button v-for="item in list" :key="item" :label="item" />
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      {{ $t('menu.home') }}<br>
      <el-button class="mt-8" @click="openMessageBox">{{ $t('views.i18n.btn') }}</el-button>
      <Pagination :total="10" :page="1" :limit="20" :pageSizes="[5, 10]" />
    </el-card>
  </div>
</template>
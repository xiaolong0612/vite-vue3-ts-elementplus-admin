<!-- eslint-disable vue/multi-word-component-names -->
<!--
 * @Description: 重定向
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-16 17:06:20
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const { params, query } = useRoute()
const { path } = params
useRouter().push({ path: '/' + path, query }).catch((err) => {
  console.warn(err)
})
</script>
<template>
  <div></div>
</template>
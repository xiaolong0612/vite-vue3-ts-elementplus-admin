<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 16:54:34
 * @LastEditTime: 2023-03-16 19:06:33
 * @LastEditors: Amber
-->
<script setup lang="ts">import { ref } from 'vue';

const theme = ref<boolean>(false)
</script>
<template>
  <el-switch
    v-model="theme"
    inline-prompt
    inactive-icon="Sunny"
    active-icon="Moon"
  />
</template>
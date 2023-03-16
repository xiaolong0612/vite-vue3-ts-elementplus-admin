<!-- eslint-disable vue/multi-word-component-names -->
<!--
 * @Description:
 * @Autor: Amber
 * @Date: 2023-03-15 16:26:47
 * @LastEditors: Amber
 * @LastEditTime: 2023-03-16 17:05:59
-->
<template>
  <div class="app-container">
    <el-card :body-style="{padding: 0}" class="mb-4">
      <aside>
        Here we use window.print() to implement the feature of downloading PDF.
      </aside>
    </el-card>
    <router-link
      target="_blank"
      to="/pdf-download-example"
    >
      <el-button type="primary">
        Click to download PDF
      </el-button>
    </router-link>
  </div>
</template>

<script setup lang='ts'>
</script>

<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-18 02:15:20
 * @LastEditTime: 2023-03-18 02:31:53
 * @LastEditors: Amber
-->
<script setup lang="ts">
import FixedThead from './components/FixedThead.vue'
import UnfixedThead from './components/UnfixedThead.vue'
</script>

<template>
  <div class="app-container">
    <el-card class="mb-4">
      Fixed header, sorted by header order,
      <fixed-thead />
    </el-card>
    <el-card>
      Not fixed header, sorted by click order
      <unfixed-thead />
    </el-card>
  </div>
</template>

<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 21:14:25
 * @LastEditTime: 2023-03-12 14:56:29
 * @LastEditors: Amber
-->
<script setup lang="ts">
import PanelGroup from "./components/PanelGroup.vue"
import BoxCard from './components/BoxCard.vue'
import Weather from './components/Weather.vue'
import LoginLog from './components/LoginLog.vue'
import DependsTable from './components/DependsTable.vue'
</script>

<template>
  <PanelGroup />
  <DependsTable />
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="24" :sm="24" :lg="12">
      <LoginLog />
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6">
      <BoxCard />
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6">
      <Weather />
    </el-col>
  </el-row>
</template>
<style scoped lang="scss">
.panel-group{
  margin-top: 30px;
}
</style>
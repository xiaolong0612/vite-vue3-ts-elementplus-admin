<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 21:14:25
 * @LastEditTime: 2023-03-17 13:19:06
 * @LastEditors: Amber
-->
<script setup lang="ts">
import PanelGroup from "./components/PanelGroup.vue"
import BoxCard from './components/BoxCard.vue'
import Chart from './components/Chart.vue'
import Weather from './components/Weather.vue'
import LoginLog from './components/LoginLog.vue'
import DependsTable from './components/DependsTable.vue'
</script>

<template>
  <PanelGroup />
  <DependsTable class="mb-8" />
  <Chart />
  <el-row :gutter="40" class="panel-group mt-8">
    <el-col :xs="24" :sm="24" :lg="12">
      <LoginLog class="mb-8" />
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6">
      <BoxCard />
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6">
      <Weather />
    </el-col>
  </el-row>
</template>
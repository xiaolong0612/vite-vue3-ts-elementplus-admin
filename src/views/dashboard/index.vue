<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-12 16:22:15
 * @LastEditTime: 2023-03-12 20:31:12
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import adminDashboard from './admin/index.vue'
import editorDashboard from './editor/index.vue'

const admin = useUserStore()
const currentRole = admin.roles.includes('admin') ? adminDashboard : editorDashboard
</script>

<template>
  <div class="dashboard-container app-container">
    <component :is="currentRole" />
  </div>
</template>
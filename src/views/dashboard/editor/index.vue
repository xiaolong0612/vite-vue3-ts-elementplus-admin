<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-12 16:22:15
 * @LastEditTime: 2023-03-16 23:04:21
 * @LastEditors: Amber
-->
<template>
  <div class="app-container">
    <el-card class="pb-10 relative">
      <pan-thumb :image="user.avatar" style="float: left">
        <span class="title">Your roles:</span>
        <span v-for="item in user.roles" :key="item" class="pan-info-roles">{{ item }}</span>
      </pan-thumb>
      <github-corner class="absolute top-0 right-0 z-10" />
      <div class="info-container">
        <span class="display_name">{{ user.name }}</span>
        <span class="display_info" style="font-size:20px;padding-top:20px;display:inline-block;">Editor's Dashboard</span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import PanThumb from '@/components/PanThumb/index.vue'
import GithubCorner from '@/components/GithubCorner/index.vue'
import { useUserStore } from "@/stores/user"

const user = useUserStore()
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module";
html.dark{
  .title,
  .display_info{
    color: $darkGray!important;
  }
  .pan-info-roles,
  .display_name {
    color: $darkWhite!important;
  }
}
  .app-container {
    min-height: 100vh;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>

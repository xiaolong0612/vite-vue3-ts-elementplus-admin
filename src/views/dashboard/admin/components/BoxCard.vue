<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 14:44:14
 * @LastEditTime: 2023-03-18 03:24:46
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { useUserStore } from "@/stores/user"
import PanThumb from '@/components/PanThumb/index.vue'
import Mallki from '@/components/TextHoverEffect/Mallki.vue'

const admin = useUserStore()
</script>
<template>
  <el-card class="box-card-component">
    <template v-slot:header>
      <div class="box-card-header">
        <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
      </div>
    </template>
    <div>
      <div style="position:relative;">
        <pan-thumb :image="admin.avatar" class="panThumb" />
        <mallki class-name="mallki-text" text="vue-element-admin" />
        <div style="padding-top:35px;" class="progress-item">
          <span>Vite</span>
          <el-progress :percentage="70" />
        </div>
        <div class="progress-item">
          <span>Vue3</span>
          <el-progress :percentage="80" />
        </div>
        <div class="progress-item">
          <span>Typescript</span>
          <el-progress :percentage="50" />
        </div>
        <div class="progress-item">
          <span>Pinia</span>
          <el-progress :percentage="60" />
        </div>
        <div class="progress-item">
          <span>Element Plus</span>
          <el-progress :percentage="100" status="success" />
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss">
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    :deep(.pan-info) {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>

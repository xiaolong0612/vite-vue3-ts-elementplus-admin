<!--
 * @Description: 依赖包表格
 * @Author: Amber
 * @Date: 2021-01-18 11:09:25
 * @LastEditors: Amber
 * @LastEditTime: 2023-03-12 15:27:30
-->

<template>
  <el-card
    class="card"
  >
    <div>
      <span>依赖信息</span>
      <div style="float: right">
        部署时间:{{ parseTime(new Date()) }}
      </div>
    </div>

    <div class="bottom-btn">
      <a
        target="_blank"
        href="https://github.com/vuejs/vue-next"
      >
        <el-button>
          vue3.x
        </el-button>
      </a>
      <a
        target="_blank"
        href="https://pinia.web3doc.top/"
      >
        <el-button type="success">
          pinia
        </el-button>
      </a>
      <a
        target="_blank"
        href="https://element-plus.gitee.io/#/zh-CN"
      >
        <el-button type="primary">
          element-plus
        </el-button>
      </a>
      <a
        target="_blank"
        href="https://www.tslang.cn/docs/home.html"
      >
        <el-button type="info">typescript</el-button>
      </a>
      <a
        target="_blank"
        href="https://www.tailwindcss.cn/"
      >
        <el-button type="warning">tailwindcss</el-button>
      </a>
    </div>
    <table class="table">
      <tr>
        <td>vite</td>
        <td>{{ devDependencies["vite"] }}</td>
        <td>vue</td>
        <td>{{ dependencies["vue"] }}</td>
      </tr>
      <tr>
        <td>vue-router</td>
        <td>{{ dependencies["vue-router"] }}</td>
        <td>axios</td>
        <td>{{ dependencies["axios"] }}</td>
      </tr>
      <tr>
        <td>pinia</td>
        <td>{{ dependencies["pinia"] }}</td>
        <td>pinia-plugin-persistedstate</td>
        <td>{{ dependencies["pinia-plugin-persistedstate"] }}</td>
      </tr>
      <tr>
        <td>sass</td>
        <td>{{ devDependencies["sass"] }}</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>element-plus</td>
        <td>{{ dependencies["element-plus"] }}</td>
        <td>nprogress</td>
        <td>{{ dependencies["nprogress"] }}</td>
      </tr>
      <tr>
        <td>mockjs</td>
        <td>{{ devDependencies["mockjs"] }}</td>
        <td>tailwindcss</td>
        <td>{{ devDependencies["tailwindcss"] }}</td>
      </tr>
    </table>
  </el-card>
</template>

<script setup lang="ts">
import { dependencies, devDependencies } from '../../../../../package.json'
import { parseTime } from "@/utils";
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  color: #666;
  border-collapse: collapse;
  background-color: #fff;

  td {
    position: relative;
    min-height: 20px;
    padding: 9px 15px;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid #e6e6e6;

    &:nth-child(odd) {
      width: 20%;
      text-align: right;
      background-color: #f7f7f7;
    }
  }
}

.bottom-btn {
  button {
    margin: 16px 10px 15px 0;
  }
}
</style>

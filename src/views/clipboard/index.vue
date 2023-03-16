<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 01:24:49
 * @LastEditTime: 2023-03-16 15:16:18
 * @LastEditors: Amber
-->
<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="use clipboard directly"
          name="directly"
        >
          <el-form :inline="true" >
            <el-form-item>
              <el-input
                v-model="inputData"
                placeholder="Please input"
                style="width:400px; max-width:100%;"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="DocumentCopy"
                @click="handleClipboard(inputData, $event)"
              >
                copy
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="use clipboard by v-directive"
          name="v-directive"
        >
        <el-form :inline="true" >
            <el-form-item>
              <el-input
                v-model="inputData"
                placeholder="Please input"
                style="width:400px; max-width:100%;"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                v-clipboard:copy="inputData"
                v-clipboard:success="clipboardSuccess"
                type="primary"
                icon="DocumentCopy"
              >
                copy
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { handleClipboard, clipboardSuccess } from '@/utils/clipboard' // use clipboard directly
import { ref } from 'vue';

const activeName = ref('directly')
const inputData = ref('https://github.com/xiaolong0612/vite-vue3-ts-elementplus-admin.git')
</script>

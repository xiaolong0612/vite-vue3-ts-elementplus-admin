<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 14:16:34
 * @LastEditTime: 2023-03-16 15:32:58
 * @LastEditors: Amber
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-card :body-style="{padding: '0px'}" class="mb-4">
          <aside>
            Json-Editor is base on 
            <a href="https://github.com/matt-oconnell/vue-monaco-editor" target="_blank">vue-monaco-editor</a>
          </aside>
        </el-card>
        <el-card :body-style="{padding: '10px', height: '80vh'}">
          <json-editor language="json" v-model="defaultJSON" @change="changeJSON"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import JsonEditor from '@/components/JsonEditor/index.vue'
import { ref } from 'vue';

const defaultJSON = ref(`{
  "name": [{ "required": true, "message": "请输入活动名称", "trigger": "blur" }],
  "age": [{ "required": true, "message": "请输入年龄", "trigger": "blur" }]
}`)
const changeJSON = (val:any) => {
  defaultJSON.value = JSON.parse(val)
}
</script>
<style scoped>
.tag-title{
  margin-bottom: 5px;
}
</style>

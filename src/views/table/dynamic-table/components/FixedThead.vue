<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-18 02:15:20
 * @LastEditTime: 2023-03-18 02:28:17
 * @LastEditors: Amber
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="apple">
          apple
        </el-checkbox>
        <el-checkbox label="banana">
          banana
        </el-checkbox>
        <el-checkbox label="orange">
          orange
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="name" label="fruitName" width="180" />
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template v-slot="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';

const defaultFormThead = ['apple', 'banana']

const tableData = ref([
  {
    name: 'fruit-1',
    apple: 'apple-10',
    banana: 'banana-10',
    orange: 'orange-10'
  },
  {
    name: 'fruit-2',
    apple: 'apple-20',
    banana: 'banana-20',
    orange: 'orange-20'
  }
])

const key = ref<number>(1)

const formTheadOptions = ref<string[]>(['apple', 'banana', 'orange'])
const checkboxVal = ref<string[]>(defaultFormThead)
const formThead = ref<string[]>(defaultFormThead)

watch(() => checkboxVal.value, (valArr:any) => {
  formThead.value = formTheadOptions.value.filter(i => valArr.indexOf(i) >= 0)
  // 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
  key.value += 1
})
</script>


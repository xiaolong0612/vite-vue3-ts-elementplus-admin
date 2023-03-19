<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 02:19:50
 * @LastEditTime: 2023-03-19 13:19:07
 * @LastEditors: Amber
-->
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { getArticles } from "@/api/articles/index"
import type { ArticleDataModel } from "@/api/articles/types"
import { formatJson, parseTime } from "@/utils"
import Pagination from "@/components/Pagination/index.vue";
import { exportTxt2Zip } from "@/utils/zip"

const listQuery= reactive({
  page: 1,
  limit: 20
})
const filename = ref<string>('')
const downloadLoading = ref<boolean>(false)
const tableLoading = ref<boolean>(false)
const tableData = reactive<ArticleDataModel>({
  list: [],
  total: 0
})

onMounted(() => {
  setTimeout(() => {
    getList()
  }, 500);
})

const getList = () => {
  tableLoading.value = true
  getArticles(listQuery).then(rs => {
    tableData.list = rs.data.list
    tableData.total = rs.data.total
    setTimeout(() => {
      tableLoading.value = false
    }, 200)
  })
}
const handleDownload = () => {
  downloadLoading.value = true
  const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
  const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp']
  const list = tableData.list
  const data = formatJson(filterVal, list)
  if (filename.value !== '') {
    exportTxt2Zip(tHeader, data, filename.value, filename.value)
  } else {
    exportTxt2Zip(tHeader, data)
  }
  downloadLoading.value = false
}
</script>
<template>
  <div class="app-container">
    <el-card class="mb-4">
      <el-form :inline="true">
        <el-form-item>
          <el-input
            v-model="filename"
            placeholder="Please enter the file name (default file)"
            style="width:300px;"
            prefix-icon="Document"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="downloadLoading"
            type="primary"
            icon="Download"
            @click="handleDownload"
          >
            Export Zip
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table
        v-loading="tableLoading"
        :data="tableData.list"
        element-loading-text="Loading..."
        border
        fit
        highlight-current-row
      >
        <el-table-column
          align="center"
          label="ID"
          width="95"
        >
          <template #default="{$index}">
            {{ $index }}
          </template>
        </el-table-column>
        <el-table-column label="Title">
          <template #default="{row}">
            {{ row.title }}
          </template>
        </el-table-column>
        <el-table-column
          label="Author"
          align="center"
          width="180"
        >
          <template #default="{row}">
            <el-tag>{{ row.author }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="Readings"
          align="center"
          width="115"
        >
          <template #default="{row}">
            {{ row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column
          label="Date"
          align="center"
          width="220"
        >
          <template #default="{row}">
            <i class="el-icon-time" />
            <span>{{ parseTime(row.timestamp) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="tableData.total>0" :total="tableData.total" v-model:page="listQuery.page" :limit="listQuery.limit" @pagination="getList" />
    </el-card>
  </div>
</template>


<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-18 02:04:17
 * @LastEditTime: 2023-03-18 17:21:45
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getArticles } from "@/api/articles/index"
import type { ArticleDataModel } from "@/api/articles/types"
import { formatJson } from "@/utils"
import { exportJson2Excel } from '@/utils/excel'

const listQuery = reactive({
  page: 1,
  limit: 20
})
const downloadLoading = ref<boolean>(false)
const tableLoading = ref<boolean>(false)
const tableData = reactive<ArticleDataModel>({
  list: [],
  total: 0
})

onMounted(() => {
  getList()
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
  const multiHeader = [['Id', 'Main Information', '', '', 'Date']]
  const header = ['', 'Title', 'Author', 'Readings', '']
  const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp']
  const list = tableData.list
  const data = formatJson(filterVal, list)
  const merges = ['A1:A2', 'B1:D1', 'E1:E2']
  exportJson2Excel(header, data, 'merge-header', multiHeader, merges)
  downloadLoading.value = false
}
</script>

<template>
  <div class="app-container">
    <el-card class="mb-4">
      <el-form inline>
        <el-form-item>
          <el-button :loading="downloadLoading" type="primary" icon="Printer" @click="handleDownload">
            Export
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table ref="multipleTable" v-loading="tableLoading" :data="tableData.list" element-loading-text="Loading..." border fit
        highlight-current-row>
        <el-table-column align="center" label="Id" width="95">
          <template #default="{ row }">
            {{ row.id }}
          </template>
        </el-table-column>
        <el-table-column label="Main Information" align="center">
          <el-table-column label="Title">
            <template #default="{ row }">
              {{ row.title }}
            </template>
          </el-table-column>
          <el-table-column label="Author" align="center" width="180">
            <template #default="{ row }">
              <el-tag>{{ row.author }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Readings" align="center" width="115">
            <template #default="{ row }">
              {{ row.pageviews }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="Date" width="220">
          <template #default="{ row }">
            <i class="el-icon-time" />
            <span>{{ row.display_time }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>



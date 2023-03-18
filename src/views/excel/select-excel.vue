<template>
  <div class="app-container">
    <el-card class="mb-4">
      <el-form inline>
        <el-form-item>
          <el-input v-model="filename" placeholder="Please enter the file name (default excel-list)" style="width:350px;" prefix-icon="Document" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="downloadLoading" type="primary" icon="Printer" @click="handleDownload">
            Export Selected Items
          </el-button>
        </el-form-item>
        <el-form-item>
          <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank">
            <el-tag type="warning">Documentation</el-tag>
          </a>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table v-loading="tableLoading" :data="tableData.list" element-loading-text="Loading..." border fit
        highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
        />
        <el-table-column width="95" align="center" label="Id">
          <template #default="{ row }">
            {{ row.id }}
          </template>
        </el-table-column>
        <el-table-column label="Title">
          <template #default="{ row }">
            {{ row.title }}
          </template>
        </el-table-column>
        <el-table-column label="Author" width="180" align="center">
          <template #default="{ row }">
            <el-tag>{{ row.author }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="115" align="center" label="Readings">
          <template #default="{ row }">
            {{ row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column width="220" align="center" label="Date">
          <template #default="{ row }">
            <el-icon><Timer /></el-icon>
            <span>{{ row.display_time }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { getArticles } from "@/api/articles/index"
import type { ArticleDataModel } from "@/api/articles/types"
import { formatJson } from '@/utils'
import { exportJson2Excel } from '@/utils/excel'
import { ElMessage } from 'element-plus'

const listQuery = reactive({
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
const multipleSelection = ref<number[]>([])

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

const handleSelectionChange = (value: any) => {
  multipleSelection.value = value
}

const handleDownload = () => {
  if (multipleSelection.value.length) {
    downloadLoading.value = true
    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
    const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp']
    const list = multipleSelection.value
    const data = formatJson(filterVal, list)
    exportJson2Excel(tHeader, data, filename.value !== '' ? filename.value : undefined)
    downloadLoading.value = false
  } else {
    ElMessage.warning('Please select at least one item')
  }
}
</script>

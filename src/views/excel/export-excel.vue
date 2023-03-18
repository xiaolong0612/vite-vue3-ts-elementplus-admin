<template>
  <div class="app-container">
    <el-card class="mb-4">
      <el-form inline>
        <el-form-item>
          <FilenameOption v-model="filename" @input="handleInput" :value="filename" />
        </el-form-item>
        <el-form-item>
          <AutoWidthOption v-model="autoWidth" :value="autoWidth" @input="handleChange" />
        </el-form-item>
        <el-form-item>
          <BookTypeOption :value="bookType" @input="changeinput" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="downloadLoading" type="primary" icon="Printer"
            @click="handleDownload">
            Export Excel
          </el-button>
        </el-form-item>
        <el-form-item>
          <a href="https://github.com/rcyj-FED/vue3-composition-admin/tree/dev/src/views" target="_blank">
            <el-tag type="warning">Documentation</el-tag>
          </a>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-table v-loading="tableLoading" :data="tableData.list" element-loading-text="Loading..." border fit
        highlight-current-row>
        <el-table-column width="95" align="center" label="Id">
          <template #default="{ $index }">
            {{ $index }}
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
            <i class="el-icon-time" />
            <span>{{ row.timestamp }}</span>
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
import FilenameOption from './components/FilenameOption.vue'
import AutoWidthOption from './components/AutoWidthOption.vue'
import BookTypeOption from './components/BookTypeOption.vue'

const listQuery = reactive({
  page: 1,
  limit: 20
})
const filename = ref<string>('')
const autoWidth = ref<boolean>(true)
const bookType = ref<string>('xlsx')

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
  const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
  const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp']
  const list = tableData.list
  const data = formatJson(filterVal, list)
  exportJson2Excel(tHeader, data, filename.value !== '' ? filename.value : undefined, undefined, undefined, autoWidth.value, bookType.value)
  downloadLoading.value = false
}
const handleInput = (val: any) => {
  filename.value = val
}
const handleChange = (val: any) => {
  autoWidth.value = val
}
const changeinput = (value: string) => {
  bookType.value = value
}
</script>

<style lang="scss">
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>

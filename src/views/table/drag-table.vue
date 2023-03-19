<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-17 21:52:48
 * @LastEditTime: 2023-03-19 13:23:30
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue"
import { getArticles } from "@/api/articles/index"
import { parseTime } from "@/utils"
import type { ArticleDataModel } from "@/api/articles/types"
import Pagination from "@/components/Pagination/index.vue"
import initSort from '@/utils/drag-table'

const listQuery = reactive({
  page: 1,
  limit: 10
})

const tableLoading = ref<boolean>(false)
const tableData = reactive<ArticleDataModel>({
  list: [],
  total: 0
})

const defaultSort = ref<number[]>([0])
const sortList = ref<number[]>([0])

const getList = () => {
  tableLoading.value = true
  getArticles(listQuery).then(rs => {
    tableData.list = rs.data.list
    tableData.total = rs.data.total

    defaultSort.value = tableData.list.map(v => v.id)
    sortList.value = defaultSort.value.slice()

    nextTick(async () => {
      tableLoading.value = false
      sortList.value = await initSort('tableContent', tableData.list, sortList.value)
    })
  })
}

onMounted(() => {
  setTimeout(() => {
    getList()
  }, 200);
})
</script>
<template>
  <div class="app-container">
    <div class="tip custom-block">
      <p class="custom-block-title">TIP</p>
      <p>请注意，<code>row-key</code>是获得正确行顺序所必需的</p>
    </div>
    <el-card>
      <!-- Note that row-key is necessary to get a correct row order. -->
      <el-table class="tableContent" v-loading="tableLoading" :data="tableData.list" row-key="id" element-loading-text="Loading..."
        border fit highlight-current-row>
        <el-table-column align="center" label="ID" width="95">
          <template #default="{ row }">
            {{ row.id }}
          </template>
        </el-table-column>
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
        <el-table-column label="Date" align="center" width="220">
          <template #default="{ row }">
            <i class="el-icon-time" />
            <span>{{ parseTime(row.timestamp) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Drag" width="80">
          <el-icon class="pointer"><Rank /></el-icon>
        </el-table-column>
      </el-table>
      <pagination v-show="tableData.total > 0" :total="tableData.total" v-model:page="listQuery.page"
        :limit="listQuery.limit" @pagination="getList" />
    </el-card>
    <el-card class="mt-4">
      <div class="show-d">
        <el-tag>The default order :</el-tag> {{ defaultSort }}
      </div>
      <div class="show-d">
        <el-tag>The after dragging order :</el-tag> {{ sortList }}
      </div>
    </el-card>
  </div>
</template>

<style lang="scss">
</style>

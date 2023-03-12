<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-11 16:09:06
 * @LastEditTime: 2023-03-11 21:46:57
 * @LastEditors: Amber
-->
<template>
  <el-card>
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> 登陆日志 </span>
      </template>
    </el-page-header>
    <el-table :data="tableData.list" v-loading="tableLoading" style="width: 100%">
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="datetime" label="Date" width="180">
        <template #default="scope">
          {{ parseTime(scope.row.datetime, '{y}-{m}-{d} {h}:{i}') }}
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="IP" />
    </el-table>
    <pagination v-show="tableData.total>0" :total="tableData.total" v-model:page="listQuery.page" :limit="listQuery.limit" :pageSizes="[5, 10]" @pagination="getList" />
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { adminLoginlog } from "@/api/admin/index"
import type { LoginLogs } from "@/api/admin/types"
import { parseTime } from "@/utils"
import { useRouter } from "vue-router"
import Pagination from "@/components/Pagination/index.vue";

const router = useRouter()

const listQuery= reactive({
  page: 1,
  limit: 5
})

const tableLoading = ref<boolean>(false)
const tableData = reactive<LoginLogs>({
  list: [],
  total: 0
})

onMounted(() => {
  getList()
})

const getList = () => {
  tableLoading.value = true
  adminLoginlog(listQuery).then(rs => {
    tableData.list = rs.data.list
    tableData.total = rs.data.total
    setTimeout(() => {
      tableLoading.value = false
    }, 200)
  })
}

const goBack = () => {
  router.go(-1)
}

</script>

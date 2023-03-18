<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-18 02:04:17
 * @LastEditTime: 2023-03-18 20:48:48
 * @LastEditors: Amber
-->
<template>
  <div class="app-container">
    <el-card class="mb-4">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    </el-card>
    <el-card>
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :key="item" :label="(item as any).title">
          <template #default="{ row }">
            <span v-if="!(item as any).children">
              {{ row[(item as any).title] }}
            </span>
            <template v-else>
              <el-table-column v-for="chil in (item as any).children" :key="chil.title" :label="(chil as any).title">
                <template #default="{ row }">
                  {{ row[(item as any).title][(chil as any).title]}}
                </template>
              </el-table-column>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const tableData = ref([])
const tableHeader = ref<string[]>([])

const beforeUpload = (file: File) => {
  const isLt1M = file.size / 1024 / 1024 < 1
  if (isLt1M) {
    return true
  }
  ElMessage.warning('Please do not upload files larger than 1m in size.')
  return false
}
const handleSuccess = ({ results, header }: { results: any, header: string[]}) => {
  tableData.value = results
  tableHeader.value = header
}
</script>

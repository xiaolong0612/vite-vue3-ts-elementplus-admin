<!--
 * @Description: 错误日志
 * @Author: Amber
 * @Date: 2023-03-15 10:42:21
 * @LastEditTime: 2023-03-15 14:36:08
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { useErrorLogStore } from "@/stores/errorLog"
import { computed, ref } from "vue"
import { checkNeed } from "@/plugins/errorLog";

const errorLogs = computed(() => {
  return useErrorLogStore().logs
})
const dialogTableVisible = ref<boolean>(false)

const toggle = () => {
  dialogTableVisible.value = !dialogTableVisible.value
}
const clearAll = () => {
  useErrorLogStore().clearErrorLog()
}
</script>
<template>
  <div v-if="errorLogs.length > 0 && checkNeed()">
    <el-badge :is-dot="true" style="line-height: 25px;margin-top: -5px;">
      <el-button type="danger" icon="Promotion" @click="toggle" />
    </el-badge>

    <el-dialog v-model="dialogTableVisible" width="80%" append-to-body>
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <span :id="titleId" :class="titleClass" class="align-middle">Error Log!</span>
          <el-button class="ml-4" size="mini" type="danger" icon="Delete" @click="clearAll">Clear All</el-button>
        </div>
      </template>
      <el-table :data="errorLogs" border>
        <el-table-column label="Message">
          <template #default="scope">
            <div>
              <span class="message-title">Msg:</span>
              <el-tag type="danger">
                {{ scope.row.err.message }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 10px;">Info: </span>
              <el-tag type="warning">
                {{ scope.row.instance.$refs }} error in {{ scope.row.info }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 16px;">Url: </span>
              <el-tag type="success">
                {{ scope.row.url }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template #default="scope">
            {{ scope.row.err.stack }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<!-- <script>
export default {
  name: 'ErrorLog',
  data() {
    return {
      dialogTableVisible: false
    }
  },
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs
    }
  },
  methods: {
    clearAll() {
      this.dialogTableVisible = false
      this.$store.dispatch('errorLog/clearErrorLog')
    }
  }
}
</script> -->

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>

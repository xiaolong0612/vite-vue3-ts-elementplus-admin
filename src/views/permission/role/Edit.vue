<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-13 01:19:28
 * @LastEditTime: 2023-03-13 10:55:31
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { ref, defineProps, reactive, onMounted } from 'vue'
import { getRoutes } from '@/api/roles';
import type { RouteRecordRaw } from 'vue-router';

interface RoutesTreeData {
  children: RoutesTreeData[]
  title: string
  path: string
}
interface Role {
  key: number
  name: string
  introduction: string
  routes: RouteRecordRaw[]
}
defineProps<{
  role: Role
}>()
let dialogVisible = ref<boolean>(false)
let dialogType = ref<string>('new')

const defaultProps = reactive({
  children: 'children',
  label: (data:any) => {
    return data.meta.title
  }
})

let routesData = ref<RoutesTreeData[]>()

const checkStrictly = ref<boolean>(false)
const treeRef = ref<HTMLInputElement | null>(null)

const confirmRole = () => {

}

onMounted(() => {
  init()
})
const init = () => {
  getRoutes().then(rs => {
    routesData.value = rs.data as unknown as RoutesTreeData[]
  })
}

</script>
<template>
  <el-dialog v-model="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
    <el-form :model="role" label-width="80px" label-position="left">
      <el-form-item label="Name">
        <el-input v-model="role.name" placeholder="Role Name" />
      </el-form-item>
      <el-form-item label="Desc">
        <el-input
          v-model="role.introduction"
          :autosize="{ minRows: 2, maxRows: 4}"
          type="textarea"
          placeholder="Role Introduction"
        />
      </el-form-item>
      <el-form-item label="Menus">
        <el-tree
          ref="treeRef"
          :check-strictly="checkStrictly"
          :data="routesData"
          :props="defaultProps"
          show-checkbox
          node-key="path"
          class="permission-tree"
        />
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
      <el-button type="primary" @click="confirmRole">Confirm</el-button>
    </div>
  </el-dialog>
</template>
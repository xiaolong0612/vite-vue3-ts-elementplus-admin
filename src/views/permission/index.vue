<script setup lang="ts">
import { useAdminStore } from "@/stores/admin"
import PanThumb from '@/components/PanThumb/index.vue'
const admin = useAdminStore()
</script>

<template>
  <el-row>
    <el-col :sm="24" :md="12" :lg="8" :xl="8">
      <el-card>
        <el-form
        label-width="100px"
        style="max-width: 460px"
        >
        <el-form-item label="Avatar">
          <pan-thumb width="80px" height="80px" :image="admin.avatar" class="panThumb" />
        </el-form-item>
        <el-form-item label="Name">
          <span>{{ admin.name }}</span>
        </el-form-item>
        <el-form-item label="Roles">
          <span>{{ admin.roles }}</span>
        </el-form-item>
        <el-form-item label="Introduction">
          <span>{{ admin.introduction }}</span>
        </el-form-item>
      </el-form>
    </el-card>
  </el-col>
</el-row>
</template>
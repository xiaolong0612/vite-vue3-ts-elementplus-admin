<!--
  * @Description: 权限指令使用
  * @Author: Amber
  * @Date: 2021-01-08 19:32:27
 * @LastEditors: Amber
 * @LastEditTime: 2023-03-12 20:30:11
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAdminStore } from "@/stores/admin";
import { checkPermission } from '@/utils/permission' // Use permission directly

const admin = useAdminStore()
const key = ref<number>(1)

const handleRolesChange = (val: string) => {
  key.value++
  admin.changeRoles(val)
}

const currentRole = computed({
  get() {
    return admin.roles[0]
  },
  set(val) {
    console.log(val)
    handleRolesChange(val)
  }
})

</script>

<template>
  <div class="app-container">
    <el-card :key="key">
      <el-row>
        <el-col :sm="24" :md="12" :lg="12" :xl="12">
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
        </el-col>
        <el-col :sm="24" :md="12" :lg="12" :xl="12">
          <div class="flex-center h-full">
            <div>
              <h3 class="mb-1">Switch roles</h3>
              <el-radio-group v-model="currentRole">
                <el-radio-button label="editor" />
                <el-radio-button label="admin" />
              </el-radio-group>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top:30px;" :key="key">
      <div>
        <span
          v-permission="['admin']"
          class="permission-alert"
        >
          Only
          <el-tag
            class="permission-tag"
            size="small"
          >admin</el-tag> can see this
        </span>
        <el-tag
          v-permission="['admin']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['admin']"
        </el-tag>
      </div>

      <div>
        <span
          v-permission="['editor']"
          class="permission-alert"
        >
          Only
          <el-tag
            class="permission-tag"
            size="small"
          >editor</el-tag> can see this
        </span>
        <el-tag
          v-permission="['editor']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['editor']"
        </el-tag>
      </div>

      <div>
        <span
          v-permission="['admin','editor']"
          class="permission-alert"
        >
          Both
          <el-tag
            class="permission-tag"
            size="small"
          >admin</el-tag> and
          <el-tag
            class="permission-tag"
            size="small"
          >editor</el-tag> can see this
        </span>
        <el-tag
          v-permission="['admin','editor']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['admin','editor']"
        </el-tag>
      </div>
    </el-card>

    <div
      :key="'checkPermission'+key"
      style="margin-top:30px;"
    >
      <el-card :body-style="{padding: 0}">
        <aside>
          In some cases, using v-permission will have no effect. For example: Element-UI's Tab component or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.
          <br> e.g.
        </aside>
      </el-card>
      <div style="height: 30px" />
      <el-card :body-style="{padding: 0}">
        <el-tabs type="border-card">
          <el-tab-pane
            v-if="checkPermission(['admin'])"
            label="Admin"
          >
            Admin can see this
            <el-tag
              class="permission-sourceCode"
              type="info"
            >
              v-if="checkPermission(['admin'])"
            </el-tag>
          </el-tab-pane>

          <el-tab-pane
            v-if="checkPermission(['editor'])"
            label="Editor"
          >
            Editor can see this
            <el-tag
              class="permission-sourceCode"
              type="info"
            >
              v-if="checkPermission(['editor'])"
            </el-tag>
          </el-tab-pane>

          <el-tab-pane
            v-if="checkPermission(['admin','editor'])"
            label="Admin-OR-Editor"
          >
            Both admin or editor can see this
            <el-tag
              class="permission-sourceCode"
              type="info"
            >
              v-if="checkPermission(['admin','editor'])"
            </el-tag>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.permission-alert {
  width: 320px;
  margin-top: 15px;
  background-color: #f0f9eb;
  color: #67c23a;
  padding: 8px 16px;
  border-radius: 4px;
  display: inline-block;
}

.permission-sourceCode {
  margin-left: 15px;
}

.permission-tag {
  background-color: #ecf5ff;
}
aside {
  background: #eef1f6;
  padding: 8px 24px;
  display: block;
  line-height: 32px;
  font-size: 16px;
  color: #2c3e50;

  a {
    color: #337ab7;
    cursor: pointer;

    &:hover {
      color: rgb(32, 160, 255);
    }
  }
}
</style>

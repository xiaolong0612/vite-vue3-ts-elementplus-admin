<!--
 * @Description: 配置化表单
 * @Author: Amber
 * @Date: 2023-03-13 22:23:32
 * @LastEditTime: 2023-03-16 15:34:02
 * @LastEditors: Amber
-->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-tag class="tag-title">options</el-tag>
        <el-card :body-style="{padding: 0, height: '100vh'}">
          <json-editor v-model="optionForm" @change="changeForm"/>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-tag class="tag-title">rules</el-tag>
        <el-card :body-style="{padding: 0, height: '100vh'}">
          <json-editor language="json" v-model="optionRules" @change="changeRules"/>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-tag class="tag-title">form</el-tag>
        <el-card>
          <schema-form
            ref="schemaFormRef"
            :form="form"
            :options="options"
            :rules="rules"
            label-width="120px"
            direction="vertical"
          >
            <template #search>
              <el-button type="primary" @click="handleSubmit">搜索</el-button>
              <el-button @click="handleReset">重置</el-button>
            </template>
          </schema-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import JsonEditor from '@/components/JsonEditor/index.vue'
import SchemaForm from "@/components/SchemaForm/index.vue"
import { onMounted, ref } from 'vue';

const optionForm = ref('{}')
const optionRules = ref()
const options = ref([])
const rules = ref({})
const form = ref({})

const renderForm = () => {
  const defaultForm = `[
  {
    component: 'el-input',
    className: 'nft',
    key: 'name',
    label: '名字',
    labelWidth: '50px',
    props: {
      placeholder: '请输入名字',
      clearable: true
    }
  },
  {
    component: 'el-select',
    key: 'age',
    label: '年龄',
    labelWidth: '50px',
    props: {
      placeholder: '请输入年龄',
      clearable: true
    },
    data: [
      // el-select, el-checkbox-group，el-radio-group 选项数据
      {
        label: '18',
        value: '18'
      },
      {
        label: '38',
        value: '38'
      }
    ]
  },
  {
    component: 'el-date-picker',
    key: 'time',
    label: '时间',
    labelWidth: '50px',
    width: '300px',
    props: {
      // $attrs传给子组件的属性
      placeholder: '请选择时间',
      clearable: true,
      type: 'daterange',
      'range-separator': '至',
      'start-placeholder': '开始日期',
      'end-placeholder': '结束日期',
      'value-format': 'yyyy-MM-dd HH:mm:ss'
    },
    listeners: {
      change: (e) => {
        console.log('eeeeee', e)
      }
    }
  },
  {
    component: 'slot',
    slotName: 'search'
  }
]`
  const defaultRules = `{
  "name": [{ "required": true, "message": "请输入活动名称", "trigger": "blur" }],
  "age": [{ "required": true, "message": "请输入年龄", "trigger": "blur" }]
}`
  optionForm.value = defaultForm
  optionRules.value = defaultRules
}
const changeForm = (val:any) => {
  options.value = (new Function("return " + val))()
}
const changeRules = (val:any) => {
  rules.value = JSON.parse(val)
}
onMounted(() => {
  renderForm()
})

const schemaFormRef = ref()
const handleSubmit = () => {
  schemaFormRef.value.validate()
}
const handleReset = () => {
  schemaFormRef.value.resetForm()
}
</script>
<style scoped>
.tag-title{
  margin-bottom: 5px;
}
</style>

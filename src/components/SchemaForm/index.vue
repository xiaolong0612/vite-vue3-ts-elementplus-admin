<!--
 * @Description: 配置化表单
 * @Author: Amber
 * @Date: 2023-03-13 22:23:32
 * @LastEditTime: 2023-03-15 13:05:23
 * @LastEditors: Amber
-->
<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      :label-width="labelWidth"
      :class="direction==='vertical'?'normal_form':'flex_form'"
    >
      <el-form-item
        v-for="item in options"
        :key="item.key"
        :prop="item.key"
        :label="item.label"
        :label-width="item.labelWidth || labelWidth"
        class="form_item"
      >
        <!--提供一个插槽，提高扩展性-->
        <slot v-if="item.component === 'slot'" :name="item.slotName" :class="item.className" />
        <template v-else>
          <component
            :is="item.component"
            v-model="form[item.key]"
            :class="item.className"
            v-bind="item.props"
            :style="{width: item.width || '200px'}"
            v-on="item.listeners"
          >
            <template v-if="item.component === 'el-select'">
              <el-option
                v-for="(subitem,index) in item.data"
                :key="index"
                :label="subitem.label"
                :value="subitem.value"
              />
            </template>
            <template v-else-if="item.component === 'el-checkbox-group'">
              <el-checkbox
                v-for="(subitem,index) in item.data"
                :key="index"
                :label="subitem.value"
              >{{ subitem.label }}</el-checkbox>
            </template>
            <template v-else-if="item.component === 'el-radio-group'">
              <el-radio
                v-for="(subitem,index) in item.data"
                :key="index"
                :label="subitem.value"
              >{{ subitem.label }}</el-radio>
            </template>
          </component>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { withDefaults, defineProps, ref } from "vue"

const ruleFormRef = ref<FormInstance>()

withDefaults(defineProps<{
  form: object,
  options: Array<any>,
  rules: object,
  labelWidth: string,
  direction: string
}>(),{
  form: () => {
    return {}
  },
  options: () => [],
  rules: () => {
    return {}
  },
  labelWidth: '100px',
  direction: 'vertical'
})
const validate = async () => {
  await (ruleFormRef.value as any).validate((valid:any, fields: any) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}

defineExpose({validate, resetForm})
</script>
<style lang='scss' scoped>
    .flex_form {
        display: flex;
        flex-flow: wrap;
    }
</style>

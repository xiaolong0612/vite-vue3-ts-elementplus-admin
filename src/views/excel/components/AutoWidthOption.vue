<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-18 02:04:17
 * @LastEditTime: 2023-03-18 02:44:47
 * @LastEditors: Amber
-->
<template>
  <div style="display:inline-block;">
    <label class="radio-label">Cell Auto-Width: </label>
    <el-radio-group v-model="autoWidth">
      <el-radio :label="true" border>
        True
      </el-radio>
      <el-radio :label="false" border>
        False
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
const emit = defineEmits(['input'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const autoWidth = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emit('input', val)
  }
})
</script>
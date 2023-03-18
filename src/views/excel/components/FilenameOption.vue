<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-18 02:04:17
 * @LastEditTime: 2023-03-18 03:35:50
 * @LastEditors: Amber
-->
<template>
  <div style="display:inline-block;">
    <label class="radio-label" style="padding-left:0;">Filename: </label>
    <el-input v-model="filename" placeholder="Please enter the file name (default excel-list)" style="width:320px;" prefix-icon="Document" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
const emit = defineEmits(['input'])

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const filename = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emit('input', val)
  }
})
</script>

<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-18 02:04:17
 * @LastEditTime: 2023-03-18 02:50:00
 * @LastEditors: Amber
-->
<template>
  <div style="display:inline-block;">
    <label class="radio-label">Book Type: </label>
    <el-select v-model="bookType" style="width:120px;">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineProps } from 'vue'
const emit = defineEmits(['input'])

const props = defineProps({
  modelValue: {
    type: String,
    default: 'xlsx'
  }
})

const options = ref<string[]>(['xlsx', 'csv', 'txt'])

const bookType = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emit('input', val)
  }
})
</script>

<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-16 23:08:37
 * @LastEditTime: 2023-03-16 23:45:48
 * @LastEditors: Amber
-->
<template>
  <el-button class="handle-button fixed right-0" type="primary" icon="Tools" @click="showDrawer" :style="{'top': buttonTop+'px', right: buttonRight + 'px'}" />
  <el-drawer
    title="Settings"
    v-model="show"
    size="300px"
    destroy-on-close
    @close="closeDrawer"
  >
    <slot />
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps } from 'vue'

withDefaults(defineProps<{
  buttonTop?: number
}>(), {
  buttonTop: 250
})
const buttonRight = ref<number>(0)
const show = ref(false)

const showDrawer = () => {
  show.value= true
  buttonRight.value = 300
}
const closeDrawer = () => {
  buttonRight.value = 0
}
</script>

<style lang="scss" scoped>

.handle-button {
  width: 48px;
  height: 48px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 99;
  transition: all .3s;
  pointer-events: auto;
  line-height: 48px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
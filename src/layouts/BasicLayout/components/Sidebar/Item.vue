<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-03-16 17:30:48
 * @LastEditors: Amber
-->
<script lang="ts">
// import { h, ref } from 'vue'

export default {
  props: ['icon', 'title'],
  // setup(props) {
  //   // 返回渲染函数<el-icon><Monitor /></el-icon>
  //   return () => [
  //     h('component', {is: 'el-icon'}, [h('component', {
  //       is: props.icon
  //     })]),
  //     h('span', props.title)
  //   ]
  // }
}
</script>
<template>
  <el-icon><component :is="icon" /></el-icon>
  <span>{{ title }}</span>
</template>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>

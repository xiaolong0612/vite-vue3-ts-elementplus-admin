<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-17 11:46:04
 * @LastEditTime: 2023-03-18 01:20:56
 * @LastEditors: Amber
-->
<template>
  <div class='echart'  ref="chartDom"></div>
</template>

<script setup lang='ts' scoped>
import { inject, ref, onMounted, watch, markRaw } from 'vue'
import { useAppStore } from "@/stores/app"
import { ThemeType } from "@/stores/app/type"
const app = useAppStore()

const echarts: any = inject('echarts')
const chartDom = ref(null)
const myChart = ref(null) as any;
const  props = defineProps({
  options: {
      type:Object,
      default: () => {},
      required:true
  },
  height: {
    type: String || Object,
    default: 'auto'
  }
})
const init = () => {
  if(myChart.value) myChart.value.dispose();  
  myChart.value = markRaw(echarts.init(chartDom.value, ThemeType[app.theme], {
    locale: app.lang == 'zh-cn' ? 'ZH' : 'EN',
    height: props.height
  }));
  myChart.value.setOption(props.options, true);
}
const resizeHandler = () => {
  myChart.value.resize()
}
onMounted(() => {
  init()
  window.addEventListener('resize', resizeHandler)
})
watch(() => props.options, (newOptions) => {
  myChart.value.setOption(newOptions)
},{
  deep: true
})

watch(() => app.theme, () => {
  init()
})
watch(() => app.lang, () => {
  init()
})
</script>

<style lang='scss' scoped>
.echart {
  width: 100%;
  height: 500px;
}
</style>
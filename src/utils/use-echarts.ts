/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-17 11:27:29
 * @LastEditTime: 2023-03-17 11:33:31
 * @LastEditors: Amber
 */
import * as echarts from 'echarts'

import chinaMapData  from '@/assets/china.json'
echarts.registerMap('china', chinaMapData as any)

export default function (el: HTMLElement,mode: string) {
  const echartInstance = echarts.init(el,mode)
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  const updateSize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  }) 

  return {
    echartInstance,
    setOptions,
    updateSize, 
  }
}
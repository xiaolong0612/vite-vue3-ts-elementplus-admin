<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-17 13:26:42
 * @LastEditTime: 2023-03-18 19:24:36
 * @LastEditors: Amber
-->
<script setup lang="ts">
import { inject, ref } from 'vue'
import EchartsView from '@/components/Charts/index.vue'
import { lifeExpectancyTable } from "@/api/charts"

const echarts: any = inject('echarts')
let options = ref({})

lifeExpectancyTable().then(rs => {
  const _rawData = rs
  const countries = [
    'Finland',
    'France',
    'Germany',
    'Iceland',
    'Norway',
    'Poland',
    'Russia',
    'United Kingdom'
  ];
  const datasetWithFilters:any = [];
  const seriesList: any = [];
  echarts.util.each(countries, function (country:string[]) {
    var datasetId = 'dataset_' + country;
    datasetWithFilters.push({
      id: datasetId,
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'Year', gte: 1950 },
            { dimension: 'Country', '=': country }
          ]
        }
      }
    });
    seriesList.push({
      type: 'line',
      datasetId: datasetId,
      showSymbol: false,
      name: country,
      endLabel: {
        show: true,
        formatter: function (params: any) {
          return params.value[3] + ': ' + params.value[0];
        }
      },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'Year',
        y: 'Income',
        label: ['Country', 'Income'],
        itemName: 'Year',
        tooltip: ['Income']
      }
    });
  });

  options.value = {
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw',
        source: _rawData
      },
      ...datasetWithFilters
    ],
    title: {
      text: 'Income of Germany and France since 1950'
    },
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle'
    },
    yAxis: {
      name: 'Income'
    },
    grid: {
      right: 140
    },
    series: seriesList
  }
})
</script>
<template>
  <el-card>
    <echarts-view :options="options" />
  </el-card>
</template>
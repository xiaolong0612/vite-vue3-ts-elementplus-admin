<template>
  <div class="text-center">
    <input class="excel-upload-input inputNode" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      Drop excel file here or
      <el-button :loading="loading" style="margin-left:16px;" type="primary" @click="handleUpload">
        Browse
      </el-button>
    </div>
    <el-radio-group v-model="headerLevel" class="mt-4">
      <el-radio :label="1" size="large">Header Level 1</el-radio>
      <el-radio :label="2" size="large">Header Level 2</el-radio>
    </el-radio-group>
    <!-- <el-input v-model="headerLevel" placeholder="Please input" class="header-level mt-4">
      <template #prepend>Header Level</template>
    </el-input> -->
  </div>
</template>

<script setup lang="ts">

import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import XLSX from 'xlsx'

const props = defineProps({
  beforeUpload: {
    type: Function
  },
  onSuccess: {
    type: Function
  }
})

const loading = ref<boolean>(false)
const excelData = reactive({
  header: null,
  results: null
})
const headerLevel = ref<number>(1)

const generateData = (header: any, results: any) => {
  excelData.header = header
  excelData.results = results

  props.onSuccess && props.onSuccess(excelData)
}

const isExcel = (file: File) => /\.(xlsx|xls|csv)$/.test(file.name)

const upload = (rawFile: File) => {
  (document.querySelector('.inputNode') as HTMLInputElement).value = ''
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

const handleDrop = (e: DragEvent) => {
  e.stopPropagation()
  e.preventDefault()
  if (loading.value) return
  if (!e.dataTransfer) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('Only support uploading one file!')
    return
  }
  const rawFile = files[0] // only use files[0]

  if (isExcel(rawFile)) {
    ElMessage.error('Only supports upload .xlsx, .xls, .csv suffix files')
    return false
  }
  upload(rawFile)
  e.stopPropagation()
  e.preventDefault()
}

const handleDragover = (e: DragEvent) => {
  e.stopPropagation()
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'copy'
  }
}

const handleUpload = () => {
  (document.querySelector('.inputNode') as HTMLInputElement).click()
}

const readerData = (rawFile: File, colNone = 0) => {
  loading.value = true
  const reader = new FileReader()
  reader.onload = e => {
    const data = (e.target as FileReader).result

    // const workbook = XLSX.read(data, { type: 'array' })
    const workbook = XLSX.read(data, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]

    // 获取行数col和列数row
    let sheetRef = worksheet['!ref']
    let refParse = (sheetRef as any).match(/[a-z]+|[0-9]+/ig)
    let col = refParse[3] - refParse[1] + 1
    let row = refParse[2].charCodeAt() - refParse[0].charCodeAt() + 1

    // 获取单元格合并数据并建立数组索引
    let merges = worksheet['!merges']
    let mergesParses: any = xlsxMergeParse(merges)
    let mergeIndexs = mergeIndex(mergesParses)

    // 根据表的行数和列数创建一个表，在创建每个单元格时插入数据，数据填充普通单元格直接引用sheetData，
    //合并单元格通过映射下标计算引用sheetData
    let datas = []
    for (let i = 1; i < col + 1; i++) {
      let row = []
      for (let j = refParse[0].charCodeAt(); j < refParse[2].charCodeAt() + 1 - colNone; j++) {
        let letter = String.fromCharCode(j)
        let k = j - 64
        row.push(worksheet[letter + i] ? worksheet[letter + i].v : autoFill([i, k], mergeIndexs, mergesParses, worksheet))
      }
      datas.push(row)
    }

    loading.value = false
    const { header, results } = getRow(datas)
    generateData(header, results)
  }
  reader.readAsArrayBuffer(rawFile)
}

// 解析单元格合并数据方法
// 解析表格单元格合并数据  把参与合并的单元格全部计算并统计位置信息
const xlsxMergeParse = (merges: any[] | undefined) => {
  let arr: any[][][] = []

  merges?.map(v => {
    let { s, e } = v
    let result = []
    let addNum = 1	//使数组下标加一，符合Excel单元格下标
    if (s.c === e.c) {
      for (let i = s.r; i < e.r + 1; i++) { result.push([i + addNum, s.c + addNum]) }
    } else {
      for (let i = s.c; i < e.c + 1; i++) { result.push([s.r + addNum, i + addNum]) }
    }
    arr.push(result)
  })

  return arr

}
// 单元格合并数据建立索引
// 单元格合并数据为三维数组，为了提升数据处理效率，添加索引（变为一维数组，序列化位置信息）
const mergeIndex = (mergesParse: any) => {

  let datas: any[][] = []

  mergesParse.map((v: any[], i: any) => {
    let row: any[] = []
    v.map((v1, i1) => {
      row.push(v1.join(','))
      row.push([i, i1].join('-'))
    })
    datas.push(row)
  })

  return datas.flat(Infinity)
}

// 根据单元格下标计算应该填充的值
const autoFill = (point: any[], index: string | any[], mergesParses: { [x: string]: any[]; }, sheetData: { [x: string]: { w: any; }; }) => {

  // 判断此单元格是否属于合并单元格
  let isNeed = index.indexOf(point.join(','))
  if (isNeed < 0) return undefined

  // 通过索引获取映射的合并数据三维数组的下标
  let target = index[isNeed + 1]
  let result = target.split('-')[0]
  result = mergesParses[result][0]

  // 返回合并单元格左上单元格数据
  result = sheetData[String.fromCharCode(result[1] + 64) + result[0]].w
  return result
}

const getRow = (datas:any) => {
  const headerRows = datas.slice(0, headerLevel.value)

  let headerColumns:any = [] // 收集 table 组件中，表头 columns 的对象数组结构
  const lastHeaderLevelColumns: any[] = [] // 最近一个 columns，用于收集单元格子表头的内容
  // const textValueMaps = [] // 以中文字符串为 key 的对象数组，用于收集表格中的数据
  const columnIndexObjMap: { title: any; }[] = [] // 表的列索引，对应在对象中的位置，用于后续获取表格数据时，快速定位每一个单元格

  for (let colIndex = 0; colIndex < headerRows[0].length; colIndex++) {
    const headerCellList = headerRows.map((item:any) => item[colIndex])
    headerCellList.forEach((headerCell: any, headerCellIndex: number) => {
      // 如果当前单元格没数据，这证明是合并后的单元格，跳过其处理
      if (!headerCell) {
        return
      }
      const tempColumn = { title: headerCell }

      columnIndexObjMap[colIndex] = tempColumn // 通过 columnIndexObjMap 记录每一列数据，对应到那个对象中，实现一个映射表

      // 如果表头数据第一轮就有值，这证明这是新起的一个表头项目，往 headerColumns 中，新加入一条数据
      if (headerCellIndex === 0) {
        headerColumns.push(tempColumn)
        lastHeaderLevelColumns[headerCellIndex] = tempColumn // 记录当前层级，最新的一个表格容器，可能在下一列数据时合并单元格，下一个层级需要往该容器中添加数据
      } else { // 不是第一列数据，这证明是子项目，需要加入到上一层表头的 children 项，作为其子项目
        lastHeaderLevelColumns[headerCellIndex - 1].children = lastHeaderLevelColumns[headerCellIndex - 1].children || []
        lastHeaderLevelColumns[headerCellIndex - 1].children.push(tempColumn)
        lastHeaderLevelColumns[headerCellIndex] = tempColumn // 记录当前层级的容器索引，可能再下一层级中使用到
      }
    })
  }
  const dataRows = getDataRow(headerColumns, datas, columnIndexObjMap)
  return {header: headerColumns, results: dataRows}
}

const getDataRow = (headerColumns:any, datas:any, columnIndexObjMap?:any) => {
  const valueMaps: any[] = [] // 以中文字符串为 key 的对象数组，用于收集表格中的数据
  const dataRows = datas.slice(headerLevel.value)

  // 将以数组形式记录的对象信息，转化为正常的对象结构
  function transformListToObj(listObjs: any[]) {
    const resultObj = {} as any
    listObjs.forEach((item:any) => {
      if (item.value) {
        resultObj[item.title] = item.value
        return
      }

      if (item.children && item.children.length > 0) {
        resultObj[item.title] = transformListToObj(item.children)
      }
    })
    return resultObj
  }
  // 以 headerColumns 为对象结构模板，遍历 excel 表数据中的所有数据，并利用 columnIndexObjMap 的映射，快速填充每一项数据
  dataRows.forEach((dataRow:any) => {
    dataRow.forEach((value: any, index: string | number) => {
      columnIndexObjMap[index].value = value
    })
    const titleObj = Object.create(headerColumns) // columnIndexObjMap 的指针索引，仅指向 headerColumns，以 headerColumns 为数据模板，复制一份数据，获得数据填充后的效果对象
    valueMaps.push(transformListToObj(titleObj)) // 将 listObj 对象转化化普通的对象
  })
  return valueMaps
}

const handleClick = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files) {
    const rawFile = files[0] // only use files[0]
    upload(rawFile)
  }
}
</script>

<style lang="scss" scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}

.drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
.header-level {
  width: 600px;
}
</style>

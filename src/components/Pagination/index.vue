<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page="currentPage"
      :page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { scrollTo } from '@/utils/scroll-to'
import { withDefaults, defineProps, computed } from "vue"
const emit = defineEmits(['update:page', 'pagination', 'update:limit'])

const props = withDefaults(defineProps<{
  total: number,
  page: number,
  limit?: number,
  pageSizes?: Array<number>,
  layout?: string,
  background?: boolean,
  autoScroll?: boolean,
  hidden?: boolean
}>(), {
  page: 1,
  limit: 20,
  pageSizes: () => [10, 20, 30, 50],
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true,
  autoScroll: true,
  hidden: false
})

const currentPage = computed({
  get() {
    return props.page
  },
  set(val) {
    emit('update:page', val)
  }
})
const pageSize = computed({
  get() {
    return props.limit
  },
  set(val) {
    emit('update:limit', val)
  }
})

const handleSizeChange = (val:number) => {
  emit('pagination', { page: currentPage, limit: val })
  pageSize.value = val
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
const handleCurrentChange = (val:number) => {
  emit('pagination', { page: val, limit: pageSize })
  currentPage.value = val
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>

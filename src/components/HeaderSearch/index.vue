<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRouter } from "vue-router";
import Fuse from 'fuse.js'
import path from 'path-browserify'
import { usePermissionStore } from '@/stores/permission'

const router = useRouter()
const permission = usePermissionStore()

const searchSelectRef = ref('')
const search = ref<string>('')
const options = ref([])
const show = ref<boolean>(false)
const searchPool = ref([])
const fuse = ref()

onMounted(() => {
  searchPool.value = generateRoutes(permission.routes)
})

watch(() => permission.routes, () => {
  searchPool.value = generateRoutes(permission.routes)
})
watch(() => searchPool.value, (list) => {
  initFuse(list)
})
watch(() => show.value, (val) => {
  if (val) {
    document.body.addEventListener('click', close)
  } else {
    document.body.removeEventListener('click', close)
  }
})

const click = () => {
  show.value = !show.value
  if (show.value) {
    searchSelectRef.value && searchSelectRef.value.focus()
  }
}
const close = () => {
  options.value = []
  show.value = false
}
const change = (val:any) => {
  console.log('click')
  router.push(val.path)
  search.value = ''
  options.value = []
  nextTick(() => {
    show.value = false
  })
}
const initFuse = (list:any) => {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [{
      name: 'title',
      weight: 0.7
    }, {
      name: 'path',
      weight: 0.3
    }]
  })
}
const generateRoutes = (routes:any, basePath = '/', prefixTitle = []):any => {
  let res = []

  for (const router of routes) {
    if (router.hidden) { continue }

    const data = {
      path: path.resolve(basePath, router.path),
      title: [...prefixTitle]
    }

    if (router.meta && router.meta.title) {
      data.title = [...data.title, router.meta.title]

      if (router.redirect !== 'noRedirect') {
        res.push(data)
      }
    }

    if (router.children) {
      const tempRoutes = generateRoutes(router.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
const querySearch = (query:string) => {
  if (query !== '') {
    options.value = fuse.value.search(query)
  } else {
    options.value = []
  }
}
</script>
<template>
  <div :class="{'show':show}" class="header-search">
    <el-icon class="search-icon" size="24" @click.stop="click"><Search /></el-icon>
    <el-select
      ref="searchSelectRef"
      v-model="search"
      remote
      :remote-method="querySearch"
      filterable
      default-first-option
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option v-for="item in options" :key="item.item.path" :value="item.item" :label="item.item.title.join(' > ')" />
    </el-select>
  </div>
</template>


<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>

<script setup lang="ts">
import path from 'path-browserify'
import { useTagsViewStore } from '@/stores/tagsView'
import { usePermissionStore } from '@/stores/permission'
import type { TagView } from '@/stores/tagsView/types'
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { type RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import ScrollPane from './ScrollPane.vue'

const tagsView = useTagsViewStore()
const permission = usePermissionStore()
const router = useRouter()
const currentRoute = useRoute()
const instance = getCurrentInstance()
const { proxy } = instance as any
const scrollPaneRef = ref(null)

const visible = ref<boolean>(false)
const top = ref<number>(0)
const left = ref<number>(0)
const selectedTag = ref<TagView>({})
const affixTags = ref<TagView[]>()

const visitedViews = computed(() => {
  return tagsView.visitedViews
})
const routes = computed(() => {
  return permission.routes
})

const isActive = (route: TagView) => {
  return route.path === currentRoute.path
}

const isAffix = (tag: TagView) => {
  return tag.meta && tag.meta.affix
}

const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: TagView[] = []

  routes.forEach(route => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }

    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path)
      if (childTags.length >= 1) {
        tags = tags.concat(childTags)
      }
    }
  })
  return tags
}

const initTags = () => {
  affixTags.value = filterAffixTags(routes.value)
  for (const tag of affixTags.value) {
    if (tag.name) {
      tagsView.addVisitedView(tag)
    }
  }
}

const addTags = () => {
  if (currentRoute.name) {
    tagsView.addView(currentRoute)
  }
  return false
}

const moveToCurrentTag = () => {
  const tags = instance?.refs.tag as any[]
  nextTick(() => {
    // if (tags === null || tags === undefined || !Array.isArray(tags)) { return }
    for (const tag of tags) {
      if (tag.to.path === currentRoute.path) {
        (scrollPaneRef.value as any).moveToTarget(tag)
        // when query is different then update
        if (tag.to.fullPath !== currentRoute.fullPath) {
          tagsView.updateVisitedView(currentRoute)
        }
        break
      }
    }
  })
}

const refreshSelectedTag = (view: TagView) => {
  tagsView.delCachedView(view).then(() => {
    const { fullPath } = view
    router.replace({ path: '/redirect' + fullPath })
    // nextTick(() => {
    //   router.replace({ path: '/redirect' + fullPath })
    // })
  })
}

const closeSelectedTag = (view: TagView) => {
  tagsView.delView(view).then(() => {
    if (isActive(view)) {
        toLastView(tagsView.visitedViews, view)
      }
  })
}

const closeOthersTags = () => {
  router.push(selectedTag.value as RouteRecordRaw)
  tagsView.delOthersViews(selectedTag.value).then(() => {
    moveToCurrentTag()
  })
}

const closeAllTags = (view: TagView) => {
  tagsView.delAllViews().then(() => {
    if (affixTags.value?.some(tag => tag.path === view.path)) {
      return
    }
    toLastView(tagsView.visitedViews, view)
  })
}

const toLastView = (visitedViews: TagView[], view: TagView) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push(latestView as RouteRecordRaw)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}

const openMenu = (tag: TagView, e: MouseEvent) => {
  const menuMinWidth = 105
  const offsetLeft = proxy.$el.getBoundingClientRect().left // container margin left
  const offsetWidth = proxy.$el.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const leftTemp = e.clientX - offsetLeft + 15 // 15: margin right

  if (leftTemp > maxLeft) {
    left.value = maxLeft
  } else {
    left.value = leftTemp
  }

  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}

const closeMenu = () => {
  visible.value = false
}
const handleScroll = () => {
  closeMenu()
}

watch(() => currentRoute.name, () => {
  if (currentRoute.name !== 'Login') {
    addTags()
    moveToCurrentTag()
  }
})
watch(() => visible.value, (value) => {
  if (value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

onMounted(() => {
  initTags()
  addTags()
})

</script>
<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :to="{ path: tag.path as string, query: tag.query }"
        custom
        v-slot="{ navigate }"
      >
        <span
          role="link"
          class="tags-view-item"
          :class="isActive(tag)?'active':''"
          @click="navigate"
          @click.middle="!isAffix(tag)?closeSelectedTag(tag):''"
          @contextmenu.prevent="openMenu(tag,$event)"
        >
          {{ tag.title }}
          <el-icon v-if="!isAffix(tag)" @click.prevent.stop="closeSelectedTag(tag)"><Close /></el-icon>
        </span>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background-image: radial-gradient(transparent 1px,#fff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>

<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-12 16:22:15
 * @LastEditTime: 2023-03-12 20:26:33
 * @LastEditors: Amber
-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>
<script setup lang="ts">
import { useTagsViewStore } from '@/stores/tagsView'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const key = computed(() => {
  return route.path
})
const cachedViews = computed(() => {
  return useTagsViewStore().cachedViews
})
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: content-box;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

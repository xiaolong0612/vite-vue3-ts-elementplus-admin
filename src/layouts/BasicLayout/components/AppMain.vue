<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-12 16:22:15
 * @LastEditTime: 2023-03-17 00:08:00
 * @LastEditors: Amber
-->
<template>
  <section class="app-main relative">
    <github-corner class="absolute top-100 right-0 z-10" v-if="useAppStore().github" />
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>
<script setup lang="ts">
import GithubCorner from '@/components/GithubCorner/index.vue'
import { useTagsViewStore } from '@/stores/tagsView'
import { useAppStore } from "@/stores/app";
import { computed } from 'vue'
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

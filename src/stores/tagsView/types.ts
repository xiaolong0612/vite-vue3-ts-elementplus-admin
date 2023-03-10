import type { RouteLocationNormalized } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string;
  meta?: any;
}

export interface TagsViewState {
  visitedViews: TagView[]
  cachedViews: (string | undefined)[]
}

export const state: TagsViewState = {
  visitedViews: [],
  cachedViews: []
}

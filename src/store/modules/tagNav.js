// mutation 只能同步 action可以异步。 所以就只在mutation里执行一些state的增删改查同步修改，然后在action里用promise包装。在业务逻辑中就可以
// 使用 this.$store.dispatch('action').then() 来进行后续的逻辑
const state = {
  visitedViews: [],
  cachedViews: [] // 允许keep-alive保持状态的路由,难道还有不保持状态的视图?
}
const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some((v, i) => v.name === view.name)) return
    state.visitedViews.push(Object.assign({}, view))
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  DEL_OTHER_VIEW: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.fix || v.path === view.path
    })
  }
}
const actions = {
  addVisitedView: ({commit}, view) => {
    commit('ADD_VISITED_VIEW', view)
    commit('ADD_CACHED_VIEW', view)
  },
  addCachedView: ({commit}, view) => {
    commit('ADD_CACHED_VIEW', view)
  },
  delVisitedView: ({commit, state}, view) => {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view);
      commit('DEL_CACHED_VIEW', view);
      resolve([...state.visitedViews])
    })

    commit('DEL_CACHED_VIEW', view)
  },
  delCachedView: ({commit}, view) => {
    commit('DEL_CACHED_VIEW', view)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

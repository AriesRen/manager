import Cookies from 'js-cookie'

const app = {
  state: {
    collapsed: Cookies.get('collapsed') ? !+Cookies.get('collapsed') : false
  },
  mutations: {
    OPEN_COLLAPSED: (state) => {
      state.collapsed = false
      Cookies.set('collapsed', 1)
    },
    CLOSE_COLLAPSED: (state) => {
      Cookies.set('collapsed', 0)
      state.collapsed = true
    }
  },
  actions: {
    ToggleCollapsed ({ commit, state }) {
      if (state.collapsed) {
        commit('OPEN_COLLAPSED')
      } else {
        commit('CLOSE_COLLAPSED')
      }
    }
  }
}

export default app

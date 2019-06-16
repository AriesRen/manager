import { getToken, removeToken, setToken } from '@/utils/token'
import { login, getInfo, logout } from '@/api/login'
import router, { resetRouter } from '@/router'
import store from './'

const user = {
  state: {
    username: '',
    nickname: '',
    userId: '',
    avatar: 'https://www.gravatar.com/avatar/6560ed55e62396e40b34aac1e5041028',
    roles: [],
    menus: [],
    permissions: [],
    token: ''
  },
  mutations: {
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    RESET_USER: (state) => {
      state.token = ''
      state.nickname = ''
      state.username = ''
      state.userId = ''
      state.menus = []
      state.permissions = []
      state.roles = []
    }
  },
  actions: {
    // 登录
    Login ({ commit, state }, loginForm) {
      return new Promise((resolve, reject) => {
        const { username, password } = loginForm
        login(username, password).then(res => {
          const { data } = res
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve(res)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        let token = getToken()
        getInfo(token).then(res => {
          const { data } = res
          if (!data) {
            reject('Verification failed, please login again.')
          }
          const { roles, nickname, username, menus, permissions, id } = data
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          commit('SET_ROLES', roles)
          commit('SET_USERNAME', username)
          commit('SET_NICKNAME', nickname)
          commit('SET_MENUS', menus)
          commit('SET_PERMISSIONS', permissions)
          commit('SET_USERID', id)
          // commit('SET_AVATAR', avatar)

          resolve(data)
        }).catch(error => {
          commit('RESET_USER')
          removeToken()
          reject(error)
        })
      })
    },
    // 后端登出，后端删除token
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout().then(() => {
          commit('RESET_USER')
          removeToken()
          resetRouter()
          resolve()
        }).catch(() => {
          commit('RESET_USER')
          removeToken()
        })
      })
    },
    // 前端登出，后端仍有token
    FedLogout ({ commit, state }) {
      return new Promise(resolve => {
        commit('RESET_USER')
        removeToken()
        resolve()
      })
    },
    ChangeRoles ({ commit, dispatch }) {
      return new Promise(async resolve => {
        const { roles } = await dispatch('GetInfo')
        resetRouter()
        const accessRoutes = await dispatch('GenerateRoutes', roles, { root: true })

        router.addRoutes(accessRoutes)
        resolve()
      })
    }
  }
}

export default user

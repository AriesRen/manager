import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import permission from './permission'
import app from './app'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
  	app,
    user,
    permission
  },
  getters
})

export default store

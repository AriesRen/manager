import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import './permission'

import * as filters from './filter'

Vue.use(Antd)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

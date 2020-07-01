import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'common/less/index.less' // global css
import './permission' // permission control
Vue.use(ElementUI)
Vue.config.productionTip = false

import './icons' // icon

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
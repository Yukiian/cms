import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import settings from './modules/settings'
import permission from './modules/permission'
import getters from './getters'
import user from './modules/user'



Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    settings,
    permission,
    user
  },
  getters
})
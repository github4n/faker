// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import routes from './router/index'
import App from './App'
import store from './util/store'
import vueConfig from './util/vueConfig'
import  { LoadingPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
// import vconsole from 'vconsole'
import API from './util/API'

// var vConsole = new vconsole();

Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(VueRouter)
Vue.use(vueConfig)
Vue.use(LoadingPlugin)

const router = new VueRouter({
  routes
})
router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})
router.beforeEach((to, from, next) => {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

if(API.isApple()){
  FastClick.attach(document.body)
}

Vue.config.productionTip = false


store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

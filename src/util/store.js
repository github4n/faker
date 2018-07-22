/**
 * Created by HP on 2017/10/11.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'lodash'

Vue.use(Vuex)

const IndexModel = { // 主页的状态
  state: {
    pageInformation:{
      scrollTop: 0
    }
  },
  mutations: {
    setPageInformation (state, data) {
      state.pageInformation = $.assignIn(state.pageInformation,data)
    }
  }
}


const zfbZhuanZhang = { // 主页的状态
  state: {
    data: {

    }
  },
  mutations: {
    setData (state, data) {
      state.setData = $.assignIn(state.setData,data)
    }
  }
}


export default new Vuex.Store({
  modules: {
    IndexModel,
    zfbZhuanZhang
  }
})

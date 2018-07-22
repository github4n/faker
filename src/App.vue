<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>

    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
  // 带切换动画的 路由
  import { Loading } from 'vux'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        transitionName : 'slide-go'
      }
    },
    components: {
      Loading
    },
    computed: {
      ...mapState({
        isLoading: state => state.vux.isLoading
      })
    },
    watch: {
      '$route' (to, from) {
        if (from.query.time) {
          if (to.query.time > from.query.time) {
            this.transitionName = 'slide-go'
          } else {
            this.transitionName = 'slide-back'
          }
        } else {
          this.transitionName = 'slide-go'
        }
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/close';
@import './assets/css/public.css';
/*@import "http://at.alicdn.com/t/font_470327_tdl9j8sh9t2ihpvi.css";*/

body {
  background-color: #fff;
}
</style>

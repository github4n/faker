<template>
  <div class="animation-router home">


    <router-view></router-view>


    <flexbox :gutter="0" wrap="wrap" class="mi-footer vux-1px-t">
      <flexbox-item :span="1/3" class="item" :class="{ 'active': nowRouter == '/home/index' }" @click.native="linkTo('/home/index')">
        <p><span class="iconfont icon-home"></span></p>
        <p class="text">主页</p>
      </flexbox-item>
      <flexbox-item :span="1/3" class="item" :class="{ 'active': nowRouter == '/home/myself' }" @click.native="linkTo('/home/myself')">
        <p><span class="iconfont icon-wo-copy"></span></p>
        <p class="text">我的</p>
      </flexbox-item>
      <flexbox-item :span="1/3" class="item" :class="{ 'active': nowRouter == '/home/setting' }" @click.native="linkTo('/home/setting')">
        <p><span class="iconfont icon-shezhi"></span></p>
        <p class="text">设置</p>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Flexbox, FlexboxItem } from 'vux'
  import Util from '../../util/util'
  export default{
    components: {
      Flexbox,
      FlexboxItem
    },
    data() {
      return {
        nowRouter: '/home/index'
      }
    },
    methods: {
      linkTo(path) {
        this.$router.replace({
          path: path
        })
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.nowRouter = to.fullPath;
      next();
    },
    mounted() {
      var str = this.$router.currentRoute.fullPath
      this.nowRouter  = str.indexOf('?') != -1 ? str.split('?')[0] : str
    }
  }
</script>

<style type="text/sass" lang="sass">



</style>

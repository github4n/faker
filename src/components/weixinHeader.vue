<template>
  <div class="weixin-header">
    <span class="pull-left">微信{{config.weixinNumber ? '('+config.weixinNumber+')' : ''}}</span>
    <span class="pull-right iconfont icon-jia" style="font-size: 26px;margin-right: 10px;"></span>
    <span class="pull-right iconfont icon-sousuo" style="font-size: 20px;margin-right: 26px;margin-top: 1px;"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'weixin-header',
    props: {
      config: {
        type: Object
      }
    },

    mounted() {
      console.log(this.config)
    }
  }
</script>

<style type="text/sass" lang="sass">

  @import "../assets/sass/util"
  .weixin-header
    height: 48px
    background-color: #3C3D42
    color: #fff
    font-weight: normal
    font-size: 18px
    line-height: 48px
    padding: 0 10px
    img
      float: right
      height: 48px

</style>

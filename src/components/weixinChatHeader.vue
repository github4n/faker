<template>
  <div class="weixin-chat-header">
    <img src="../static/icon/weixinchat-back.png" alt="" class="pull-left">
    <span class="supertext">{{config.chatTitle}}</span>
    <img src="../static/icon/weixinchat-people.png" alt="" class="pull-right">
  </div>
</template>



<script type="text/ecmascript-6">
  // 微信单聊聊天头部
  export default{
    name: 'weixin-chat-header',
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
  .weixin-chat-header
    height: 48px
    background-color: #3C3D42
    color: #fff
    font-weight: normal
    font-size: 18px
    line-height: 48px
    padding: 0 10px
    img
      height: 48px
    span
      position: absolute
      left: 40px
      right: 40px
      text-align: center
</style>

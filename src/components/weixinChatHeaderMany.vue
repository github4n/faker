<template>
  <div class="weixin-chat-header-many">
    <img src="../static/icon/weixin-chat-many.png" alt="" style="width: 100%; height: auto; position: relative; top: 4px;">
    <span class="supertext">{{config.chatTitle}}</span>
  </div>
</template>



<script type="text/ecmascript-6">
  // 微信单聊聊天头部
  export default{
    name: 'weixin-chat-header-many',
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
  .weixin-chat-header-many
    background-color: #313135
    color: #fff
    font-weight: normal
    font-size: 18px
    line-height: 48px
    height: 47px
    span
      position: absolute
      left: 80px
      top: 0px
</style>

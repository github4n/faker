<template>
  <div class="weixin-chat-footer">
    <img src="../static/icon/weixinchat-footer-left.png" style="left: 0;z-index: 10" alt="">
    <img src="../static/icon/weixinchat-footer-center.png" style="left: 4px;z-index: 5" alt="">
    <img src="../static/icon/weixinchat-footer-right.png" style="right: 0px;z-index: 10" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
  import { Flexbox, FlexboxItem } from 'vux'

  export default{
    name: 'weixinFooter',
    props: {
      nowIndex: {
        default: 1
      },
      messageNumber: {
        default: 10
      },
      find: {
        default: true
      },
      lianxirenNumber: {
        default: 0
      }
    },
    components: {
      Flexbox,
      FlexboxItem
    },
    computed: {

    }
  }
</script>

<style type="text/sass" lang="sass">
  @import "../assets/sass/util"
  .weixin-chat-footer
    height: getAndroidPx(144px)
    width: 100%
    background-color: #f4f4f4
    position: absolute
    top: 7px
    img
      position: absolute
      top: 0
      height: getAndroidPx(144px)

</style>

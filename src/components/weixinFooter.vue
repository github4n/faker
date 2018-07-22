<template>
  <flexbox :gutter="0" wrap="wrap" class="mi-footer weixin-footer">
    <flexbox-item :span="1/4" class="item" :class="{ 'active': nowIndex == 1 }">
      <p class="ico">
        <img class="iconimg message" :src="getActive('weixin-footer-message-normal.png',1)" alt="">
        <span class="messageNumber" v-show="messageNumber > 0">
          <span class="iconfont icon-point"></span>
          <span class="po" :class=" { 'small-text': messageNumber == 99 } ">{{messageNumber >= 99 ? '99+' : messageNumber}}</span>
        </span>
      </p>
      <p class="text">微信</p>
    </flexbox-item>
    <flexbox-item :span="1/4" class="item" :class="{ 'active': nowIndex == 2 }">
      <p class="ico">
        <img class="iconimg people" :src="getActive('weixin-footer-people-normal.png',2)" alt="">
        <span class="messageNumber" v-show="lianxirenNumber > 0">
          <span class="iconfont icon-point"></span>
          <span class="po" :class=" { 'small-text': lianxirenNumber == 99 } ">{{lianxirenNumber >= 99 ? '99+' : lianxirenNumber}}</span>
        </span>
      </p>
      <p class="text">通讯录</p>
    </flexbox-item>
    <flexbox-item :span="1/4" class="item" :class="{ 'active': nowIndex == 3 }">
      <p class="ico">
        <img class="iconimg find" :src="getActive('weixin-footer-find-normal.png',3)" alt="">
        <span class="iconfont icon-point dian" v-show="find"></span>
      </p>
      <p class="text">发现</p>
    </flexbox-item>
    <flexbox-item :span="1/4" class="item" :class="{ 'active': nowIndex == 4 }">
      <p class="ico">
        <img class="iconimg myself" :src="getActive('weixin-footer-myself-normal.png',4)" alt="">
      </p>
      <p class="text">我</p>
    </flexbox-item>
  </flexbox>
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

      getActive() {
        return (pather,index)=>{
          // 动态计算
          let concatPath = './static/icon/'
          let returnBackString = ''

          if(index == this.nowIndex){
            switch(this.nowIndex){
              case 1:
                returnBackString = concatPath+'weixin-footer-message-active.png'
                break;
              case 2:
                returnBackString = concatPath+'weixin-footer-people-active.png'
                break;
              case 3:
                returnBackString = concatPath+'weixin-footer-people-active.png'
                break;
              case 4:
                returnBackString = concatPath+'weixin-footer-people-active.png'
                break;

            }
          }
          return returnBackString || concatPath+pather;
        }
      }
    }
  }
</script>

<style type="text/sass" lang="sass">
  @import "../assets/sass/util"
  .weixin-footer
    height: getAndroidPx(162px)
    width: 100%
    background-color: #fcfcfc
    background-image: url("../static/icon/weixin-footer-line.jpg")
    background-position: top center
    background-repeat: no-repeat

    .text
      font-size: 12px
      top: 0
    .item.active
      color: #45c01a
    .iconimg
      width: getAndroidPx(74px)
      height: getAndroidPx(64px)

    .iconimg.find
      width: getAndroidPx(70px)
      height: getAndroidPx(70px)
      margin-top: getAndroidPx(-4px)
    .iconimg.myself
      width: getAndroidPx(64px)
      height: getAndroidPx(64px)

    .ico
      margin-top: getAndroidPx(10px)
      height: getAndroidPx(74px)
      position: relative
    .ico .messageNumber
      position: absolute
      color: #fff
      width: getAndroidPx(58px)
      height: getAndroidPx(59px)
      font-size: 10px
      line-height: getAndroidPx(68px)
      left: 50%
      margin-left: getAndroidPx(20px)
      top: getAndroidPx(-8px)
      text-align: center
      display: block

    .ico .iconfont
      color: #ff3e3e
      position: absolute
      top: getAndroidPx(-14px)
      right: getAndroidPx(-6px)

    .ico .po
      position: absolute
      width: 24px
      height: 22px
      top: getAndroidPx(-8px)
      right: getAndroidPx(-6px)
      font-size: 12px
    .ico .po.small-text
      font-size: 10px
    .ico .dian
      width: getAndroidPx(30px)
      height: getAndroidPx(32px)
      position: absolute
      left: 50%
      top: getAndroidPx(-16px)
      margin-left: getAndroidPx(26px)
      color: #FF3E3E
      font-size: 12px
      display: block

</style>

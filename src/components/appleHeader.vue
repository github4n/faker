<template>
  <div class="apple-header" :style="{ 'background-color': bgcolor, color: color }">
    <!--<span class="pull-left apple-icon xinhaox" :class=" 'xinhaox'+config.signal "></span>-->


    <img v-if="color == '#fff'" :src=" './static/icon/apple-xinhaox'+ Math.min(config.signal, 4) + '.png' " style="width: 15px" alt="" class="pull-left">
    <img v-if="color == '#000'" :src=" './static/icon/apple-xinhaox'+ Math.min(config.signal, 4) + '-b.png' " style="width: 15px" alt="" class="pull-left">

    <span class="pull-left yunyingshang" style="font-size: 12px;" :style="{ color: color }">
      {{config.operator == '-1' ? config.customOperator : config.operator}}
    </span>

    <img v-if="color == '#fff'" class="pull-left apple-icon wifi mywifi" :src="'./static/icon/wifix'+Math.min(config.wifiType, 3)+'.png'" v-show="config.signalType == 'WIFI'" alt="">
    <img v-if="color == '#000'" class="pull-left apple-icon wifi mywifi" :src="'./static/icon/wifix'+Math.min(config.wifiType, 3)+'-b.png'" v-show="config.signalType == 'WIFI'" alt="">


    <span class="pull-left siginType" style="font-size: 12px;padding-left: 6px" v-show="config.signalType != 'WIFI'">{{config.signalType == '-1' ? config.customSignalType : config.signalType}}</span>
    <p class="apple-title" style="font-size: 12px;">
      {{getTime}}
    </p>

    <img v-show="color == '#fff'" src="../static/icon/dian-icon.png" v-if="config.isChongDian" alt="" class="dian-ico pull-right" style="width: 11px;margin-left: 8px;">
    <img v-show="color == '#000'" src="../static/icon/dian-icon-b.png" v-if="config.isChongDian" alt="" class="dian-ico pull-right" style="width: 11px;margin-left: 8px;">

    <span class="dianchi apple-icon pull-right">
      <img v-show="color == '#fff'" src="../static/icon/dianchi.png" alt="">
      <img v-show="color == '#000'" src="../static/icon/dianchi-b.png" alt="">
      <span class="dian-content" :style="{ 'width' : config.electricity+'%', 'background-color': getDianChiBg }"></span>
    </span>

    <span class="dianliang pull-right" style="font-size: 12px;" v-show="config.isDianChiBanFenBi" >{{config.electricity}}%</span>

    <img v-if="color == '#fff'" src="../static/icon/lanya.png" alt="" class="pull-right" v-show="config.isLanYa" style="width: 7px; margin-right: 3px; position: relative; top: -2px;">
    <img v-if="color == '#000'" src="../static/icon/lanya-b.png" alt="" class="pull-right" v-show="config.isLanYa" style="width: 7px; margin-right: 3px; position: relative; top: -2px;">

    <!--<span class="pull-right apple-icon lanya" v-show="config.isLanYa"></span>-->


    <img v-if="color == '#fff'" src="../static/icon/clock.png" alt="" class="pull-right" v-show="config.isNaoZhong" style="width: 10px; margin-right: 3px; position: relative; top: 0px;">
    <img v-if="color == '#000'" src="../static/icon/clock-b.png" alt="" class="pull-right" v-show="config.isNaoZhong" style="width: 10px; margin-right: 3px; position: relative; top: 0px;">
    <img v-if="color == '#fff'" src="../static/icon/lock.png" alt="" class="pull-right" v-show="config.iosSupport.isSuoDing" style="width: 11px; margin-right: 3px; position: relative; top: 0px;">
    <img v-if="color == '#000'" src="../static/icon/lock-b.png" alt="" class="pull-right" v-show="config.iosSupport.isSuoDing" style="width: 11px; margin-right: 3px; position: relative; top: 0px;">

  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  moment.locale('zh-cn', {
    meridiem : function (hour, minute, isLowercase) {
      if (hour <= 9) {
        return "早上";
      } else if (hour <= 11) {
        return "上午";
      } else if (hour <= 13) {
        return "中午";
      } else if (hour <= 18) {
        return "下午";
      } else {
        return "晚上";
      }
    }
  });


  export default{
    name: 'apple-header',
    props: {
      color: {
          default: '#fff'
      },
      bgcolor: {
        default: '#2D2C32'
      }
    },
    data() {
      return {
        config: {
          iosSupport: {}
        }
      }
    },
    methods: {
      update(value) {
        console.log('ios comming')
        this.config = value;
      }
    },
    computed: {
      getDianChiBg() {
        var color = this.color;

        if(this.config.isChongDian){
          color = '#4CD964'
        }else{
          if(this.config.electricity <= 20){
            color = '#FF3B30'
          }
        }

        return color;
      },
      getTime() {

        if(this.config.timeType){
          var gh = moment(moment().format('YYYY-MM-DD')+' '+this.config.time).format('hh:mm a').split(' ');
          return gh[1]+' '+gh[0]
        }else{
          return this.config.time;
        }

      }
    }
  }
</script>

<style type="text/sass" lang="sass">

  @import '../assets/sass/util'

  $headerH : 44px

  .apple-header
    height: getApplePx($headerH)
    line-height: getApplePx($headerH - 22px)
    background-color: #ccc
    width: 100%
    padding: getApplePx(11px) getApplePx(18px)
    background-color: #2d2c32
    color: #fff
    position: relative
    box-sizing: border-box

    .apple-title
      position: absolute
      left: 0px
      top: 0px
      padding: getApplePx(11px) 0
      height: getApplePx($headerH)
      width: 100%
      text-align: center
      color: #fff
      box-sizing: border-box

    .yunyingshang
      padding-left: 4px

    .mywifi
      margin-left: getApplePx(10px)

    .dianchi
      box-sizing: border-box
      padding-right: 4px
      position: relative
      width: getApplePx(42px)
      height: getApplePx(25px)
      position: relative
      top: -1px

      img
        width: getApplePx(56px)

      .dian-content
        display: block
        height: getApplePx(15px)
        background-color: #fff
        border-radius: 1px
        position: absolute
        left: 2px
        top: 2px

    .dianliang
      margin-right: 3px


  .apple-icon
    background-repeat: no-repeat
    display: inline-block
    background-position: 0 0
    background-size: cover

    &.xinhaox
      width: getApplePx(33px)
      height: getApplePx(20px)


    &.wifi
      width: getApplePx(26px)
      height: getApplePx(18px)
      position: relative


    &.wifix3,&.wifix4
      margin-top: 1px



    &.lanya
      width: getApplePx(15px)
      height: getApplePx(27px)
      position: relative
      top: -2px
      margin-right: 4px
    &.naoling
      width: getApplePx(22px)
      height: getApplePx(24px)
      margin-right: 4px
      position: relative
      top: -1px

    &.lock
      width: getApplePx(24px)
      height: getApplePx(24px)
      margin-right: 4px
      position: relative
      top: -1px
</style>

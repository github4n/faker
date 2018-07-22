<template>
  <div class="android-header" :style="{ 'background-color': bgcolor, color: color }">
    <span class="pull-left">{{getTime}}</span>

    <span class="pull-right dianchi" :class="{ 'dczz': color == '#000' }">
      <span class="dian-con" :class="{ 'full': getPersion == 92 }" :style="{ 'background-color': getDianChiBg, 'width': getPersion+'%' }"></span>
    </span>
    <span class="dianliang pull-right pad" style="font-size: 12px;" v-show="config.isDianChiBanFenBi" >{{config.electricity}}%</span>

    <span class="pull-right pad">
      {{config.signalType == '-1' ? config.customSignalType : config.signalType}}
    </span>
    <span class="pull-right pad">
      {{config.operator == '-1' ? config.customOperator : config.operator}}
    </span>

    <img v-if="color == '#fff'" :src="'./static/icon/android-xinhaox'+config.signal+'.png'" class="pull-right android-icon xinhao pad" alt="">
    <img v-if="color == '#000'" :src="'./static/icon/android-xinhaox'+config.signal+'-b.png'" class="pull-right android-icon xinhao pad" alt="">

    <img class="pull-right android-icon liuliang pad" v-if="color == '#fff'" v-show="config.signalType != 'WIFI'" src="../static/icon/liuliang.png" alt="">
    <img class="pull-right android-icon liuliang pad" v-if="color == '#000'" v-show="config.signalType != 'WIFI'" src="../static/icon/liuliang-b.png" alt="">

    <img v-show="config.signalType == 'WIFI'" v-if="color == '#fff'" :src="'./static/icon/android-wifix'+config.wifiType+'.png'" class="pull-right android-icon wifi pad" alt="">
    <img v-show="config.signalType == 'WIFI'" v-if="color == '#000'" :src="'./static/icon/android-wifix'+config.wifiType+'-b.png'" class="pull-right android-icon wifi pad" alt="">


    <img v-if="color == '#fff'" v-show="config.isNaoZhong" src="../static/icon/android-clock.png" class="pull-right android-icon naoling pad" alt="">
    <img v-if="color == '#000'" v-show="config.isNaoZhong" src="../static/icon/android-clock-b.png" class="pull-right android-icon naoling pad" alt="">


    <img v-if="color == '#fff'" v-show="config.isLanYa" src="../static/icon/android-lanya.png" class="pull-right android-icon lanya pad" alt="">
    <img v-if="color == '#000'" v-show="config.isLanYa" src="../static/icon/android-lanya-b.png" class="pull-right android-icon lanya pad" alt="">


  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  moment.locale('zh-cn', {
    meridiem : function (hour, minute, isLowercase) {
      if (hour < 9) {
        return "早上";
      } else if (hour < 11 && minute < 30) {
        return "上午";
      } else if (hour < 13 && minute < 30) {
        return "中午";
      } else if (hour < 18) {
        return "下午";
      } else {
        return "晚上";
      }
    }
  });
  export default{
    name: 'android-header',
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
          androidSupport: {}
        }
      }
    },
    methods: {
      update(value) {
        console.log('android comming')
        this.config = value;
      }
    },
    computed: {
      getDianChiBg() {
        var color = this.color;

        if(this.config.isChongDian){
          color = '#47C200'
        }else{
          if(this.config.electricity <= 20){
            color = '#FF3B30'
          }
        }

        return color;
      },
      getPersion(){
        return this.config.electricity / 100 * 92;
      },
      getTime() {

        if(this.config.timeType){
          var gh = moment(moment().format('YYYY-MM-DD')+' '+this.config.time).format('hh:mm a').split(' ');
          return gh[1]+''+gh[0]
        }else{
          return this.config.time;
        }

      }
    }
  }
</script>

<style type="text/sass" lang="sass">
  @import '../assets/sass/util'
  $dian-conwidth: 16px
  $hrefdian: $dian-conwidth/2
  .android-header .dianchi.dczz
    border-color: #000
  .android-header .dianchi
    display: inline-block
    width: getAndroidPx(72px)
    height: getAndroidPx(22px)
    border-radius: 2px
    border: 1px solid #fff
    overflow: hidden
    position: relative
    .dian-con /* 93 为满格，满格时候显示 full */
      display: inline-block
      width: 93%
      height: getAndroidPx($dian-conwidth)
      background-color: #F7F7FA
      position: absolute
      right: 1px
      top: 1px
    .dian-con.full

  .android-header .android-icon
    display: inline-block
    background-size: cover
    background-position: 0 0
    background-repeat: no-repeat

    &.xinhao
      width: getAndroidPx(37px)
      height: getAndroidPx(25px)

    &.wifi
      width: getAndroidPx(40px)
      height: getAndroidPx(29px)
      margin-top: -1px

    &.liuliang
      width: getAndroidPx(28PX)
      height: getAndroidPx(26px)

    &.naoling
      width: getAndroidPx(32px)
      height: getAndroidPx(33px)
      margin-top: -2px
    &.lanya
      width: getAndroidPx(20px)
      height: getAndroidPx(31px)
      margin-top: -2px

  .android-header
    background-color: #303135
    height: getAndroidPx(26px)
    padding: getAndroidPx(17px) getAndroidPx(19px)
    font-size: 12px
    color: #fff
    line-height: 10px

  .pad
    margin-right: getAndroidPx(12px)

</style>

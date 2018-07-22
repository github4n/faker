<template>

  <div>
    <group title="通知栏">
      <selector title="手机系统" :options="system" v-model="formData.system"></selector>
      <selector title="信号强度" :options="signal" v-model="formData.signal"></selector>
      <selector title="运营商" :options="operator" v-model="formData.operator"></selector>
      <x-input title="运营商名称" :label-width="defaultLabelWidth" placeholder="自定义运营商的名称" :max="4" v-if="formData.operator == -1" v-model="formData.customOperator"></x-input>

      <selector title="网络类型" :options="signalType" v-model="formData.signalType"></selector>
      <selector title="wifi信号强度" :options="wifiSignal" v-model="formData.wifiType" v-if="formData.signalType == 'WIFI'"></selector>
      <x-input title="网类型名称" :label-width="defaultLabelWidth" placeholder="自定义网络类型名称" :max="4" v-if="formData.signalType == -1" v-model="formData.customSignalType"></x-input>

      <datetime v-model="formData.time" format="HH:mm" @on-change="timeChange" title="手机时间"></datetime>

      <cell title="电量百分比" :inline-desc="formData.electricity+'%'" primary="content">
        <range v-model="formData.electricity" :min="0" :max="100" :step="1"></range>
      </cell>

      <x-switch title="时间12小时制" v-model="formData.timeType"></x-switch>

      <x-switch title="显示锁定旋转" v-model="formData.iosSupport.isSuoDing" v-if="formData.system == 'ios'"></x-switch>
      <x-switch title="电池充电中" v-model="formData.isChongDian"></x-switch>
      <x-switch title="显示电量百分比" v-model="formData.isDianChiBanFenBi"></x-switch>
      <x-switch title="显示蓝牙图标" v-model="formData.isLanYa"></x-switch>
      <x-switch title="显示闹钟图标" v-model="formData.isNaoZhong"></x-switch>
      <!--<x-switch title="显示定位图标" v-model="formData.isDingWei" v-if="formData.system == 'ios'"></x-switch>-->
      <!--<x-switch title="显示双卡双待" v-model="formData.isShuangKa" v-if="formData.system == 'android'"></x-switch>-->

    </group>
  </div>

</template>

<script type="text/ecmascript-6">
  import { XSwitch, Group, Selector,Datetime, Range, Cell, XInput } from 'vux'
  import moment from 'moment'

  export default{
    components: {
      XSwitch,
      Group,
      Selector,
      Datetime,
      Range,
      Cell,
      XInput
    },
    data() {
      return {
        system: [
          {
            key: 'android',
            value: '安卓(默认7.0)'
          },
          {
            key: 'ios',
            value: '苹果(默认ios11)'
          }
        ],
        signal:[
          1,2,3,4,5
        ],
        wifiSignal: [
          1,2,3,4
        ],
        signalType:[ //'WIFI','G','E','3G','4G','5G'
          {
            key: 'WIFI',
            value: 'WIFI'
          },
          {
            key: 'G',
            value: 'G'
          },
          {
            key: 'E',
            value: 'E'
          },
          {
            key: '3G',
            value: '3G'
          },
          {
            key: '4G',
            value: '4G'
          },
          {
            key: '5G',
            value: '5G'
          },
          {
            key: '-1',
            value: '自定义'
          }
        ],
        operator:[
          {
            key: '中国移动',
            value: '中国移动'
          },
          {
            key: '中国联通',
            value: '中国联通'
          },
          {
            key: '中国电信',
            value: '中国电信'
          },
          {
            key: '-1',
            value: '自定义'
          }
        ],

        formData: {
          system: 'ios', // 系统类型
          signal: 5, // 信号强度
          operator: '中国移动', // 运营商类型
          customOperator: '', // 自定义运营商类型
          signalType: '4G', // 信号类型
          customSignalType: '', // 自定义信号类型
          time: moment().format('HH:mm'), // 手机时间
          electricity: 100, //电量
          wifiType: 4, // wifi信号强度
          iosSupport: {
            isSuoDing: false // 显示锁定
          },
          androidSupport: {

          },
          isChongDian: false,
          isDianChiBanFenBi: false,
          isLanYa: false,
          isNaoZhong: false,
          isDingWei: false,
          isShuangKa: false,
          timeType: false
        }
      }
    },
    methods: {
      timeChange() {
        console.log(arguments)
      },

      setData(data) {
        setTimeout(()=>{
          this.formData = data;
        },200)
      }
    },
    mounted() {

    },
    watch: {
      'formData' (to, from) {
        console.log(to,from, 'Tooooooooo')
      }
    }
  }
</script>

<style type="text/css">

</style>

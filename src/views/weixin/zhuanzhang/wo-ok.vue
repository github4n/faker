<template>
  <div class="animation-router home-homepage public-phone wook">

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[0] }">
      <HeaderController ref="HeaderController"></HeaderController>
    </div>

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[1] }">
      <x-input title="收款人姓名" :max="10" :label-width="defaultLabelWidth" placeholder="收款人姓名" v-model="appendFormData.name"></x-input>
      <x-input title="钱数" type="text" @on-blur="appendFormData.money = (appendFormData.money+'').substr(0, 10)" :label-width="defaultLabelWidth" placeholder="钱数" v-model="appendFormData.money"></x-input>
      <datetime v-model="appendFormData.time" format="YYYY-MM-DD HH:mm" title="转账时间"></datetime>
      <datetime v-model="appendFormData.shoutime" format="YYYY-MM-DD HH:mm" title="收钱时间"></datetime>
    </div>

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[2] }" :style="{ bottom: hideFooter ? '0px' : '50px' }" style="z-index: 600;background-color: #fff">

      <div style="position: absolute;" :style="{ left: left, top: top }">
        <PhoneBox id="phone" style="background-color: #fff">
          <template slot="header">
            <HeaderView ref="HeaderView"></HeaderView>
          </template>

          <template slot="content">
            <img src="../../../static/icon/woshouqian.png" alt="" style="width: 100%;">
            <div class="con-text">
              <p style="font-size: 46px;">￥{{appendFormData.money}}</p>
            </div>
            <p class="bottomer">收钱时间：{{appendFormData.shoutime}}</p>
            <p class="bottomer" style="bottom: 30px;">转账时间：{{appendFormData.time}}</p>
          </template>


        </PhoneBox>
      </div>

      <div class="cut">
        <x-button mini plain class="cut" @click.native="cut">生成截图</x-button>
        <x-button mini plain class="cut" @click.native="changeTab(nowIndex)">返回制作</x-button>
      </div>
    </div>



    <div v-transfer-dom>
      <x-dialog v-model="show" class="dialog-demo">
        <div class="img-box">
          <img :src="imgSrc" style="max-width:100%">
        </div>
        <div @click="show=false;imgSrc = '';left = getLeft(); top = getTop">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>

    <div class="cover" style="
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #000;
      opacity: 0.8;
      z-index: 900;
    " v-if="show"></div>

    <flexbox :gutter="0" wrap="wrap" class="mi-footer vux-1px-t">
      <flexbox-item :span="1/3" class="item" :class="{ 'active':tab[0] }" @click.native="changeTab(0)">
        <p><span class="iconfont icon-peizhi"></span></p>
        <p class="text">基础配置</p>
      </flexbox-item>
      <flexbox-item :span="1/3" class="item" :class="{ 'active':tab[1] }" @click.native="changeTab(1)">
        <p><span class="iconfont icon-jiemian"></span></p>
        <p class="text">界面设置</p>
      </flexbox-item>
      <flexbox-item :span="1/3" class="item" :class="{ 'active':tab[2] }" @click.native="changeTab(2)">
        <p><span class="iconfont icon-yulan"></span></p>
        <p class="text">预览</p>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Flexbox, Datetime, FlexboxItem, Box, XSwitch, Group, Cell, Selector, XInput, XButton, TransferDomDirective as TransferDom, XDialog} from 'vux'
  import HeaderController from '../../../components/HeaderController'
  import HeaderView from '../../../components/HeaderView'
  import PhoneBox from '../../../components/PhoneBox'
  import html2canvas from 'html2canvas'
  import weixinHeader from '../../../components/weixinHeader'
  import weixinFooter from '../../../components/weixinFooter'
  import Util from '../../../util/Util'
  import VueDB from '../../../util/VueDB'
  import moment from 'moment'
  import API from '../../../util/API'

  let $ = require('lodash');

  export default{
    directives: {
      TransferDom
    },
    components: {
      Flexbox,
      FlexboxItem,
      XSwitch,
      Group,
      Cell,
      Selector,
      HeaderController,
      XInput,
      HeaderView,
      PhoneBox,
      XButton,
      XDialog,
      weixinHeader,
      weixinFooter,
      Box,
      Datetime
    },

    data() {
      return {
        weixinConfig: {
          weixinNumber: 10,
          tongXunLuNumber: 0,
          faXianLuNumber: 0,
          woDianDian: false,
        },
        tab: {
          0: true,
          1: false,
          2: false
        },

        outputConfig: {

        },

        show: false,
        imgSrc: '',
        hideFooter: false,
        left:  this.getLeft(),
        top: this.getTop,


        nowIndex: 0,

        appendFormData: {
          time: moment().format('YYYY-MM-DD HH:mm'),
          shoutime: moment().format('YYYY-MM-DD HH:mm')
        }
      }
    },

    methods: {
      changeTab(index) {
        for(var i in this.tab){
          this.tab[i] = false;
        }
        this.tab[index] = true;

        if(index != 2){
          this.nowIndex = index;
        }


        switch(index){
          case 2:
            this.$refs.HeaderView.update(this.$refs.HeaderController.formData);
            this.hideFooter = true
            break;
          default:
            this.hideFooter = false
        }
      },
      cut() {
        this.$vux.loading.show({
          text: 'Loading'
        })

        var phone = document.getElementById('phone');

        setTimeout(()=>{
          this.left = 0;
          this.top = 0;
        }, 500)

        setTimeout(()=>{


          var width = phone.offsetWidth ; //这是我们准备画的div
          var height =  phone.offsetHeight;
          var canvas = document.createElement("canvas");
          canvas.width = width * 2;
          canvas.height = height * 2;
          canvas.style.width = width + "px";
          canvas.style.height = height + "px";
          var context = canvas.getContext("2d");
          context.scale(2,2);



          html2canvas(phone, {
            onrendered: (canvas)=> {
              this.imgSrc = canvas.toDataURL("image/png");
              this.$vux.loading.hide()
              this.show = true;
            }, width : width , height : height, canvas: canvas
          });

        },500)

        API.save({
          userDo: '转账-我已收钱',
          dataType: 1,
          userData: (JSON.stringify({
            appendFormData: {
              key: '转账配置',
              value: this.appendFormData
            },
            header: {
              key: '手机头部',
              value: this.$refs.HeaderController.formData
            }
          }))
        }).then(res=>{

        }).catch(err=>{

        })
      },


    },

    mounted() {

    }
  }
</script>

<style type="text/sass" lang="sass">

  @import "../../../assets/sass/wx.sass"
  .wook .phone-box .phone-box-content
    top: 20px
    bottom: 58px

  .wook .phone-box-footer
    height: 58px

  .wook .con-text
    position: absolute
    width: 100%
    text-align: center
    left: 0px
    top: 200px
  .wook .bottomer
    bottom: 0px
    width: 100%
    left: 0
    text-align: center
    color: #808080
    font-size: 14px
    position: absolute
</style>

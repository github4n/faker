<template>
  <div class="animation-router huabei-yeb public-phone">

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[0] }">
      <HeaderController ref="HeaderController"></HeaderController>
    </div>

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[1] }">
      <x-input title="下月应还" v-model="zfbConfig.next" :label-width="defaultLabelWidth" type="number"></x-input>
      <x-input title="可用余额" v-model="zfbConfig.use" :label-width="defaultLabelWidth" type="number"></x-input>
    </div>

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[2] }" :style="{ bottom: hideFooter ? '0px' : '50px' }" style="z-index: 600;background-color: #fff">

      <div style="position: absolute;" :style="{ left: left, top: top }">
        <PhoneBox id="phone" style="background-color: #fff">
          <template slot="header">
            <HeaderView ref="HeaderView"></HeaderView>
          </template>

          <template slot="content">
            <img src="../../../static/icon/huabei.png" alt="" style="width: 100%">

            <div style="position: absolute;width: 100%; left: 0; top: 206px;">
              <p style="position: absolute; width: 140px;text-align: center; left: 14px;color: #3f4552;font-size: 14px">
                {{formateMoney(zfbConfig.next) || 0}}
              </p>

              <p style="position: absolute; width: 140px;text-align: center; right: 14px;color: #3f4552;font-size: 14px">
                {{formateMoney(zfbConfig.use) || 0}}
              </p>
            </div>

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
  import { Flexbox, FlexboxItem, Box, XSwitch, Group, Cell, Selector, XInput, XButton, TransferDomDirective as TransferDom, XDialog} from 'vux'
  import HeaderController from '../../../components/HeaderController'
  import HeaderView from '../../../components/HeaderView'
  import PhoneBox from '../../../components/PhoneBox'
  import html2canvas from 'html2canvas'
  import weixinHeader from '../../../components/weixinHeader'
  import weixinFooter from '../../../components/weixinFooter'
  import Util from '../../../util/Util'
  import VueDB from '../../../util/VueDB'
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
      Box
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

        outputConfig: {},

        show: false,
        imgSrc: '',
        hideFooter: false,
        left:  this.getLeft(),
        top: this.getTop,


        nowIndex: 0,

        zfbConfig: {

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
          userDo: '花呗',
          dataType: 2,
          userData: (JSON.stringify({
            appendFormData: {
              key: '花呗配置',
              value: this.zfbConfig
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
      formateMoney(value) {
        function formatMoney(s, type) {
          if (/[^0-9\.]/.test(s))
            return "0.00";
          if (s == null || s == "null" || s == "")
            return "0.00";
          s = s.toString().replace(/^(\d*)$/, "$1.");
          s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
          s = s.replace(".", ",");
          var re = /(\d)(\d{3},)/;
          while (re.test(s))
            s = s.replace(re, "$1,$2");
          s = s.replace(/,(\d\d)$/, ".$1");
          if (type == 0) {
            var a = s.split(".");
            if (a[1] == "00") {
              s = a[0];
            }
          }
          return s;
        }

        return formatMoney(value)
      }

    },

    mounted() {

    }
  }
</script>

<style type="text/sass" lang="sass">

  @import "../../../assets/sass/zfb.sass"
  .huabei-yeb .phone-box .phone-box-content
    top: 20px
    bottom: 0px

  .huabei-yeb .phone-box-footer
    height: 58px


</style>

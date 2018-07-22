<template>
  <div class="animation-router huabei-yeb public-phone">

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[0] }">
      <HeaderController ref="HeaderController"></HeaderController>

      <datetime v-model="myConfig.mon" format="MM" title="月份"></datetime>

    </div>

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[1] }">
      <div class="zhangdan">
        <div class="item" v-for="(x,index) in list">
          <div class="show-list">
            <img :src="x.img" alt="">
            <p class="title supertext" style="width: 100px;">{{x.title}}</p>
            <p class="con">{{x.time}}</p>
            <p class="resout">{{x.con}}</p>

            <x-button mini type="warn" @click.native="list.splice(index, 1)">删除</x-button>
          </div>
        </div>
      </div>

      <box gap="10px 10px">
        <x-button type="primary" @click.native="addMyItem">添加</x-button>
      </box>
    </div>

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[2] }" :style="{ bottom: hideFooter ? '0px' : '50px' }" style="z-index: 600;background-color: #fff">

      <div style="position: absolute;" :style="{ left: left, top: top }">
        <PhoneBox id="phone" style="background-color: #fff">
          <template slot="header">
            <HeaderView ref="HeaderView" bgcolor="#FFFFFF" color="#000"></HeaderView>
          </template>

          <template slot="content">
            <img src="../../../static/icon/zhifubao-zd.png" alt="" style="width: 100%">

            <div style="
              position: absolute;
              left: 16px;
              width: 100%;
              top: 142px;
            ">
              {{ myConfig.mon == myConfig.toMon ? '本月' : myConfig.mon + '月' }}
            </div>


            <div class="zhangdan" style="position: relative; top: -6px;">
              <div class="item" v-for="(x,index) in list">
                <div class="show-list">
                  <img :src="x.img" alt="">
                  <p class="title">{{getTitle(x.title)}}</p>
                  <p class="con">{{x.time}}</p>
                  <p class="resout">{{x.con}}</p>
                </div>
              </div>
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
  import { Flexbox, FlexboxItem, Box, XSwitch, Group, Cell, Selector, Datetime, XInput, XButton, TransferDomDirective as TransferDom, XDialog} from 'vux'
  import HeaderController from '../../../components/HeaderController'
  import HeaderView from '../../../components/HeaderView'
  import PhoneBox from '../../../components/PhoneBox'
  import html2canvas from 'html2canvas'
  import Util from '../../../util/Util'
  import VueDB from '../../../util/VueDB'
  import API from '../../../util/API'

  import moment from 'moment'

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

        outputConfig: {},

        show: false,
        imgSrc: '',
        hideFooter: false,
        left:  this.getLeft(),
        top: this.getTop,


        nowIndex: 0,

        zfbConfig: {

        },

        myConfig: {
          mon : (moment().month()+1)+'',
          toMon: (moment().month()+1)+''
        },
        list: []
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
          userDo: '支付宝账单',
          dataType: 2,
          userData: (JSON.stringify({
            appendFormData: {
              key: '支付宝账单配置',
              value: this.zfbConfig
            },
            myConfig: {
              key: '支付宝账单月份配置',
              value: this.myConfig
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
      addMyItem() {
        this.$store.state.zfbZhuanZhang.data = {
          tab: this.tab,
          nowIndex: this.nowIndex,
          list: this.list,
          myConfig: this.myConfig
        }

        this.$router.push({
          path: '/zhangdan/add',
          query: Util.makeAnimationRouter()
        })
      },
      getTitle(text) {
        var maxLength = 6
        return text.length > maxLength ? text.substr(0,maxLength)+'...' : text
      }
    },

    mounted() {
      if(this.$store.state.zfbZhuanZhang.data.isBack){
        var myD = this.$store.state.zfbZhuanZhang.data
        this.tab = myD.tab
        this.nowIndex = myD.nowIndex
        this.list = myD.list
        this.myConfig = myD.myConfig

        this.$store.state.zfbZhuanZhang.data = {}
      }

      console.log(this.list)

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

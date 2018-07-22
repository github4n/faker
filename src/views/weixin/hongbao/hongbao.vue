<template>
  <div class="animation-router home-homepage public-phone hongbao">

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[0] }">
      <HeaderController ref="HeaderController"></HeaderController>
    </div>

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[1] }">
      <div class="file">
        <input type="file" @change="fileComming($event)">
        <img :src="appendFormData.img" alt="" v-if="appendFormData.img">
        <span v-if="!appendFormData.img">选择头像</span>
      </div>
      <x-input :required="true" :max="10" title="发红包昵称" :label-width="defaultLabelWidth" placeholder="昵称" v-model="appendFormData.nicheng"></x-input>
      <x-input title="发红包备注" :max="25" :label-width="defaultLabelWidth" placeholder="备注" v-model="appendFormData.beizhu"></x-input>
      <x-input title="红包的钱数" type="text" @on-blur="replaceWidth" :label-width="defaultLabelWidth" placeholder="钱数" v-model="appendFormData.qianshu"></x-input>
    </div>

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[2] }" :style="{ bottom: hideFooter ? '0px' : '50px' }" style="z-index: 600;background-color: #fff">

      <div style="position: absolute;" :style="{ left: left, top: top }">
        <PhoneBox id="phone" style="background-color: #fff">
          <template slot="header">
            <HeaderView ref="HeaderView" bgcolor="#D85940"></HeaderView>
          </template>


          <template slot="content" class="mycon">
            <img src="../../../static/icon/hongbao-bg.png" style="width: 100%;" alt="">
            <img :src="appendFormData.img" alt="" class="face">

            <div class="text-wrap" style="position: absolute; top: 150px;width: 100%;left: 0;text-align: center">
              <p style="font-size: 14px">{{ appendFormData.nicheng || '滑稽' }}</p>
              <p style="color: #999999;font-size: 12px">{{ appendFormData.beizhu || '恭喜发财，大吉大利' }}</p>

              <p style="position: relative; top: -4px;">
                <span style="font-size: 46px"> {{ appendFormData.qianshu || 666 }} </span>元
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
  import Rule from '../../../util/Rule'
  import FileHelp from '../../../util/FileHelp'
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


        appendFormData: {
          img: ''
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

        },1000)



        API.save({
          userDo: '微信红包',
          dataType: 1,
          userData: (JSON.stringify({
            appendFormData: {
              key: '红包配置',
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

      fileComming(event) {
        var file = event.target.files[0];
        if(file && Rule.isImage(file.type)){

          FileHelp.zipImage(file, img=> {
            this.appendFormData.img = img

            console.log(this.appendFormData.img, '<<<<<<<<<<')
          })

        }else{
          this.$vux.toast.text('图片格式不正确', 'center')
        }

      },

      replaceWidth() {
          this.appendFormData.qianshu = (this.appendFormData.qianshu+'').substr(0, 10)
      }


    },

    mounted() {

    }
  }
</script>

<style type="text/sass" lang="sass">

  @import "../../../assets/sass/wx.sass"
  .hongbao .phone-box .phone-box-content
    /*top: 70px*/
    /*bottom: 58px*/
    top: 20px

  .hongbao .apple-header
    background-color: #D85940
  .hongbao .phone-box-content .face
    position: absolute
    display: block
    left: 50%
    top: 70px
    margin-left: -36px
    border-radius: 8px
    overflow: hidden
    border: getAndroidPx(6px) solid #ebcd9a
    width: getAndroidPx(190px)
    height: getAndroidPx(190px)

</style>

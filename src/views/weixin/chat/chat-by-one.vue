<template>
  <div class="animation-router home-homepage public-phone chat-by-one">

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[0] }">
      <HeaderController ref="HeaderController"></HeaderController>
      <group title="微信界面配置">
        <x-input title="聊天标题" :max="12" :label-width="defaultLabelWidth" placeholder="聊天的标题" v-model="weixinConfig.chatTitle"></x-input>
      </group>
    </div>

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[1] }" ref="publicPhoneView">
      <weixinChatContent :isEdit="true" :chatList="chatList" :chatConfig="chatConfig" :padding="true"></weixinChatContent>
      <div style="position: absolute; bottom: 0;width: 100%;">
        <box gap="10px 10px">
          <x-button type="primary" @click.native="sendMessage">发送消息</x-button>
        </box>
      </div>


    </div>

    <div class="scroll-y footer-y public-phone-view thebest-view" :class="{ active: tab[2] }" :style="{ bottom: hideFooter ? '0px' : '50px' }" style="z-index: 600">

      <div style="position: absolute;" :style="{ left: left, top: top }">
        <PhoneBox id="phone" style="background-color: #fff">
          <template slot="header">
            <HeaderView ref="HeaderView"></HeaderView>
          </template>

          <template slot="app-header">
            <weixinChatHeader :config="weixinConfig"></weixinChatHeader>
          </template>

          <template slot="content">
            <weixinChatContent :chatList="chatList" :chatConfig="chatConfig" class="content-hack"></weixinChatContent>
          </template>

          <template slot="footer">
            <weixinChatFooter
              :nowIndex="1"
              :messageNumber="weixinConfig.weixinNumber"
              :find="weixinConfig.faXianLuNumber"
              :lianxirenNumber="weixinConfig.tongXunLuNumber">
            </weixinChatFooter>
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

    <actionsheet v-model="showMenu" :menus="menus1" @on-click-menu="menuChouse"></actionsheet>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Flexbox, Actionsheet, FlexboxItem, Box, XSwitch, Group, Cell, Selector, XInput, XButton, TransferDomDirective as TransferDom, XDialog} from 'vux'
  import HeaderController from '../../../components/HeaderController'
  import HeaderView from '../../../components/HeaderView'
  import PhoneBox from '../../../components/PhoneBox'
  import html2canvas from 'html2canvas'
  import weixinChatHeader from '../../../components/weixinChatHeader'
  import weixinChatFooter from '../../../components/weixinChatFooter'
  import weixinChatContent from '../../../components/weixinChatContent'
  import API from '../../../util/API'

  import Util from '../../../util/Util'
  import VueDB from '../../../util/VueDB'

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
      weixinChatHeader,
      weixinChatFooter,
      Box,
      weixinChatContent,
      Actionsheet
    },

    data() {
      return {
        weixinConfig: {
          chatTitle: '滑稽'
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

        chatConfig: {
          you: {
            face: '../static/icon/face.png', //头像
            name: '吃鱼的帆', //昵称
          },
          me: {
            face: '../static/icon/face.png', //头像
            name: 'wow', //昵称
          }
        },

        chatList : [],


        // 菜单展示
        showMenu: false,
        menus1: [
          {
            label: '文本',
            value: 'text'
          },
          {
            label: '红包',
            value: 'hongbao'
          },
          {
            label: '转账',
            value: 'zhuanzhang'
          },
          {
            label: '语音',
            value: 'yuyin'
          }
        ]
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
          userDo: '微信聊天',
          dataType: 1,
          userData: (JSON.stringify({
            weixinConfig : {
              key: '微信配置',
              value: this.weixinConfig
            },
            chatList: {
              key: '聊天内容',
              value: this.chatList
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

      // 发送信息
      sendMessage() {
        this.showMenu = true;
      },
      // 选择消息类型
      menuChouse(target) {

        VueDB.setItem('weixinchat',{
          tab: this.tab,
          nowIndex: this.nowIndex,
          chatConfig: this.chatConfig,
          chatList: this.chatList,
          scrollTop: this.$refs.publicPhoneView.scrollTop,

          iCommingFor: 'add',
          target: target
        })

        this.$router.push({
          path: '/weixin/chat-addmessage',
          query: Util.makeAnimationRouter()
        })

      }
    },

    mounted() {
      var callBack = VueDB.getItemOnce('weixinchat').toJson();
      if(callBack && callBack.isBack){

        this.nowIndex = callBack.nowIndex;
        this.tab = callBack.tab;
        this.chatConfig = callBack.chatConfig;
        this.chatList = callBack.chatList;
        this.$refs.publicPhoneView.scrollTop = callBack.scrollTop;

      }
    }
  }
</script>

<style type="text/sass" lang="sass">

  @import "../../../assets/sass/wx.sass"
  .chat-by-one .phone-box .phone-box-content
    top: 68px
    bottom: 49px

  .home-homepage .phone-box-footer
    height: 58px

</style>

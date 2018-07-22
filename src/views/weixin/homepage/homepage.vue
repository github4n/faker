<template>
  <div class="animation-router home-homepage public-phone">

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[0] }">
      <HeaderController ref="HeaderController"></HeaderController>
      <group title="微信界面配置">
        <x-input title="微信数字" type="number" @on-blur="changeEvent" :label-width="defaultLabelWidth" placeholder="微信上的数字"  v-model="weixinConfig.weixinNumber"></x-input>
        <x-input title="通讯录数字" type="number" @on-blur="changeEvent2" :label-width="defaultLabelWidth" placeholder="通讯录上的数字"  v-model="weixinConfig.tongXunLuNumber"></x-input>
        <x-switch title="发现上点点" :label-width="defaultLabelWidth" v-model="weixinConfig.faXianLuNumber"></x-switch>
      </group>
    </div>

    <div class="scroll-y footer-y public-phone-view" :class="{ active: tab[1] }">
      <div class="wx-message-item">
        <div class="wx-items" v-for="(item,index) in messageList">
          <img :src="item.img" alt="" class="tit-img">

          <div class="my-tips" v-if="item.jiaobiaoType == 'num'">
            <span class="num">{{item.num}}</span>
          </div>

          <span class="my-jiao iconfont icon-point" v-if="item.jiaobiaoType == 'dou'"></span>
          <div class="wx-items-con">
            <p class="tit supertext">{{item.title}}</p>
            <p class="con-text supertext">{{item.content}}</p>
            <p class="time">{{item.timeCopy}}</p>
          </div>
          <div class="button-group">
            <x-button mini type="primary" class="edit" @click.native="editMessage(item, index)">编辑</x-button>
            <x-button mini type="warn" class="delete" @click.native="deleteMessage(item, index)">删除</x-button>
          </div>
        </div>
      </div>

      <box gap="10px 10px">
        <x-button type="primary" @click.native="addMessageEvent">添加</x-button>
      </box>
    </div>

    <div class="scroll-y footer-y public-phone-view thebest-view" :class="{ active: tab[2] }" :style="{ bottom: hideFooter ? '0px' : '50px' }" style="z-index: 600">

      <div style="position: absolute;" :style="{ left: left, top: top }">
        <PhoneBox id="phone" style="background-color: #fff">
          <template slot="header">
            <HeaderView ref="HeaderView"></HeaderView>
          </template>

          <template slot="app-header">
            <weixinHeader :config="weixinConfig"></weixinHeader>
          </template>

          <template slot="content">
            <div class="wx-message-item">
              <div class="wx-items" v-for="item in messageList">
                <img :src="item.img" alt="" class="tit-img">
                <div class="my-tips" v-if="item.jiaobiaoType == 'num'">
                  <span class="num">{{item.num}}</span>
                </div>
                <span class="my-jiao iconfont icon-point" v-if="item.jiaobiaoType == 'dou'"></span>
                <div class="wx-items-con">
                  <p class="tit supertext">{{item.title}}</p>
                  <p class="con-text supertext">{{item.content}}</p>
                  <p class="time">{{item.timeCopy}}</p>
                </div>
              </div>
            </div>
          </template>

          <template slot="footer">
            <weixinFooter
              :nowIndex="1"
              :messageNumber="weixinConfig.weixinNumber"
              :find="weixinConfig.faXianLuNumber"
              :lianxirenNumber="weixinConfig.tongXunLuNumber">
            </weixinFooter>
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
  import Egg from '../../../util/egg'
  import Util from '../../../util/Util'
  import VueDB from '../../../util/VueDB'
  import API from '../../../util/API'

  import _ from 'lodash'




  let addEgg = new Egg({
    name: '', // 消息标题
    message: '', // 消息内容
    time: '', // 发哦是那个消息的时间
    timeCopy: '', // 格式化后的时间
    num: 10, // 消息数目
    tip: true, // 是否显示角标
    img: '' // 头像地址
  })


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
        addMessage: false,

        messageList: []
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
//        this.$vux.loading.show({
//          text: 'Loading'
//        })

        var phone = document.getElementById('phone');

//
//
        setTimeout(()=>{
          this.left = 0;
          this.top = 0;
        }, 500)

        setTimeout(()=>{


          var width = phone.offsetWidth ; //这是我们准备画的div
          var height =  phone.offsetHeight;
          var canvas = document.createElement("canvas");
          canvas.width = width ;
          canvas.height = height ;
          canvas.style.width = width + "px";
          canvas.style.height = height + "px";
          var context = canvas.getContext("2d");
//          context.scale(2,2);



          html2canvas(phone, {
            useCORS: true,
            onrendered: (canvas)=> {
              this.imgSrc = canvas.toDataURL();

              this.$vux.loading.hide()

              this.show = true;
            }
          });

        },500)

        API.save({
          userDo: '微信首页',
          dataType: 1,
          userData: (JSON.stringify({
            weixinConfig : {
              key: '微信配置',
              value: this.weixinConfig
            },
            chatList: {
              key: '联系人列表',
              value: this.messageList
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

      addMessageEvent() {
        VueDB.setItem('homepage',{
          HeaderControllerFormData: this.$refs.HeaderController.formData,
          weixinConfig: this.weixinConfig,
          tab: this.tab,
          nowIndex: this.nowIndex,
          messageList: this.messageList,

          iCommingFor: 'add'
        })

        this.$router.push({
          path: '/weixin/homepage-addmessage',
          query: Util.makeAnimationRouter()
        })
      },


      editMessage(target, index) {
        // 编辑信息
        VueDB.setItem('homepage',{
          HeaderControllerFormData: this.$refs.HeaderController.formData,
          weixinConfig: this.weixinConfig,
          tab: this.tab,
          nowIndex: this.nowIndex,
          messageList: this.messageList,

          iCommingFor: 'edit',
          editData: {
            target: target,
            index: index
          }
        })

        this.$router.push({
          path: '/weixin/homepage-addmessage',
          query: Util.makeAnimationRouter()
        })

      },
      deleteMessage(target, index) {
        var _this = this;
        // 删除信息
        this.$vux.confirm.show({
          // 组件除show外的属性
          title: '温馨提示',
          content: '确认删除该消息',
          onConfirm () {
            _this.messageList.splice(index,1);
          }
        })
      },

      changeEvent() {

        this.weixinConfig.weixinNumber = parseInt(this.weixinConfig.weixinNumber)
      },
      changeEvent2() {

        this.weixinConfig.tongXunLuNumber = parseInt(this.weixinConfig.tongXunLuNumber)
      }
    },

    mounted() {
      var callBack = VueDB.getItemOnce('homepage').toJson();
      if(callBack && callBack.isBack){
        this.$refs.HeaderController.setData(callBack.HeaderControllerFormData)


        this.messageList = callBack.messageList


//        console.log(this.messageList, '<---------------TESTRRRRRR')

        this.nowIndex = callBack.nowIndex;
        this.tab = callBack.tab;
        this.weixinConfig = callBack.weixinConfig;
      }
    }
  }
</script>

<style type="text/sass" lang="sass">

  @import "../../../assets/sass/wx.sass"
  .home-homepage .phone-box .phone-box-content
    top: 70px
    bottom: 58px

  .home-homepage .phone-box-footer
    height: 58px

</style>

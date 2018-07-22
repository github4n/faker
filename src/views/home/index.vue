<template>
  <div class="home-index scroll-y footer-y" ref="scrollBox">
    <div class="item-wrap clear" v-for="parent in menuList">

      <p class="group-title">{{parent.groupName}}</p>
      <div class="item" v-for="target in parent.children" :style="{ 'color': '#'+target.color }" @click="menuClick(target)">
        <p class="icon">
          <span class="iconfont" :class="target.icon"></span>
        </p>
        <p class="text">{{target.name}}</p>
      </div>

    </div>

    <actionsheet v-model="showMenu" :menus="menus1" @on-click-menu="menuChouse"></actionsheet>
  </div>
</template>

<script type="text/ecmascript-6">

  import { Actionsheet } from 'vux';
  import $ from 'lodash';
  import Util from '../../util/util'
  import API from  '../../util/API'

  export default{
    components: {
      Actionsheet
    },
    data() {
      return{
        menuList: [
          {
            groupName: '微信',
            children:[
              {
                color: '2AAC38',
                name: '微信首页',
                icon: 'icon-weixin',
                link: '/weixin/homepage'
              },
              {
                color: '74785F',
                name: '微信聊天',
                icon: 'icon-conversation_icon',
                link: "/weixin/chat"
//                link: "",
//                children: [
//                  {
//                    name: "微信单聊",
//                    link: "/weixin/chat"
//                  },
//                  {
//                    name: "微信群聊",
//                    link: "/weixin/chat-many"
//                  }
//                ]
              },
              {
                color: 'CF3C35',
                name: '微信红包',
                icon: 'icon-weixinhongbaoyingxiao',
                link: '/weixin/hongbao',
//                children: [
//                  {
//                    name: "普通红包",
//                    link: ""
//                  },
//                  {
//                    name: "新春红包",
//                    link: ""
//                  },
//                  {
//                    name: "[新] 2017新春红包",
//                    link: ""
//                  }
//                ]
              },
              {
                color: 'F99D38',
                name: '微信转账',
                icon: 'icon-zhuanzhang',
                link: '',
                children: [
                  {
                    name: "等待对方收钱",
                    link: "/weixin/deng-ni"
                  },
                  {
                    name: "对方已收钱",
                    link: "/weixin/ni-ok"
                  },
                  {
                    name: "我已收钱",
                    link: "/weixin/wo-ok"
                  }
                ]
              },
              {
                color: 'EFC50B',
                name: '微信零钱',
                icon: 'icon-lingqian',
                link: "/weixin/lingqian"
//                children: [
//                  {
//                    name: '我的零钱',
//                    link: ''
//                  },
//                  {
//                    name: '零钱提现',
//                    link: ''
//                  },
//                  {
//                    name: '零钱提现提交',
//                    link: ''
//                  },
//                  {
//                    name: '零钱明细',
//                    link: ''
//                  }
//                ]
              },
//              {
//                color: '1DB0B8',
//                name: '微信交易记录',
//                icon: 'icon-jiaoyijilu',
//                link: ''
//              },
//              {
//                color: '10AEFF',
//                name: '微信钱包',
//                icon: 'icon-qianbao',
//                link: ''
//              },
//              {
//                color: '4CD127',
//                name: '微信卡包',
//                icon: 'icon-wodeqiabao0101',
//                link: ''
//              }
            ]
          },
          {
            groupName: '支付宝',
            children:[
//              {
//                color: '00A0E9',
//                name: '账户首页',
//                icon: 'icon-zhifubao',
//                link: ''
//              },
              {
                color: 'FC992C',
                name: '支付宝账单',
                icon: 'icon-zhangdan',
                link: '/zhangdan/zhangdan'
              },
              {
                color: '018FE0',
                name: '余额',
                icon: 'icon-zichanpeizhi',
                link: '/zfb/yue'
              },
//              {
//                color: '74785F',
//                name: '支付宝聊天',
//                icon: 'icon-conversation_icon',
//                link: ''
//              },
              {
                color: 'F15A4A',
                name: '余额宝',
                icon: 'icon-yuebao',
                link: '/zfb/yeb'
              },
              {
                color: '018FE0',
                name: '蚂蚁花呗',
                icon: 'icon-huabei',
                link: '/huabei/huabei'
              },
//              {
//                color: '38C197',
//                name: '蚂蚁借呗',
//                icon: 'icon-mayijiebei',
//                link: ''
//              },
//              {
//                color: '29AB91',
//                name: '芝麻信用',
//                icon: 'icon-zhimaxinyong',
//                link: ''
//              },

//              {
//                color: 'ECB754',
//                name: '支付宝转账',
//                icon: 'icon-zhuanzhang',
//                children: [
//                  {
//                    name: "转入",
//                    link: ""
//                  },
//                  {
//                    name: "转出",
//                    link: ""
//                  }
//                ]
//              }
            ]
          }
        ],
        showMenu: false,
        menus1: []
      }
    },
    methods: {
      menuClick(target) {

//        console.log(this)

        let pObject = [];

        // 有儿子的话展示菜单
        if(target.children){
          $.forEach(target.children,(value)=>{
            pObject.push({
              label: value.name,
              value: value.link
            })
          })

          this.menus1 = pObject;
          this.showMenu = true;
        }else{
          // 没有的话，直接跳转

          this.$router.push({
            path: target.link,
            query: Util.makeAnimationRouter()
          })
        }


      },
      menuChouse(target) {
        this.$router.push({
          path: target,
          query: Util.makeAnimationRouter()
        })
      }
    },
    beforeRouteLeave (to, from, next) {

      // 当跳到需要缓存状态的页面的时候进行缓存页面状态，没有的话不缓存
      this.$store.commit('setPageInformation', {
        scrollTop: this.$refs.scrollBox.scrollTop
      })
      next();
    },
    mounted() {
      this.$refs.scrollBox.scrollTop = this.$store.state.IndexModel.pageInformation.scrollTop

      if(API.isApple()){
        $.forEach(this.menuList, value1=>{
          $.forEach(value1.children, value2=>{
            if(value2.children){
              value2.children.push({
                name: "没有更多了",
                link: ""
              })
            }
          })
        })
      }
    }
  }
</script>

<style type="text/sass" lang="sass">
.home-index .item-wrap
  .item
    width: 33.3%
    float: left
    height: 100px
    text-align: center
    padding-top: 10px
    background-color: #fff
    border-right: 2px solid #FBF9FE
    border-bottom: 2px solid #FBF9FE
    -webkit-box-sizing: border-box
    -moz-box-sizing: border-box
    box-sizing: border-box
    & .item:nth-child(3n)
      border-right: none
    &:active
      background-color: #ccc
  .iconfont
    font-size: 30px
  .text
    font-size: 12px
  .icon
    height: 48px
  .group-title
    margin-top: 0.77em
    margin-bottom: 0.3em
    padding-left: 15px
    padding-right: 15px
    color: #999999
    font-size: 14px
</style>

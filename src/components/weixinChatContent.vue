<template>
  <div class="weixin-chat-content">

    <div class="weixin-chat-box scroll-y weixin-cahat-box">

      <!--我方文字消息-->
      <div class="people-item" v-for="(target, index) in chatList" :class="target.peopleType">
        <p class="time-wrap" v-if="target.timeShow">
          <span class="time">{{target.time}}</span>
        </p>
        <div class="clear">

          <img :src="chatConfig.you.face" alt="" class="face" v-if="target.peopleType == 'you'">
          <img :src="chatConfig.me.face" alt="" class="face" v-if="target.peopleType == 'me'">
          <x-button mini type="warn" v-if="isEdit" @click.native="deleteMy(target, index)">x</x-button>

          <!--普通聊天-->
          <div class="message" v-if="target.messageType == 'text'">
            {{target.con.content}}
            <img src="../static/icon/weixin-chat-left-bar.png" v-if="target.peopleType == 'me'" alt="" class="message-hack">
            <img src="../static/icon/weixin-chat-right-bar.png" v-if="target.peopleType == 'you'" alt="" class="message-hack">
          </div>


          <!--红包消息-->
          <div class="hongbao" v-if="target.messageType == 'hongbao'">
            <img src="../static/icon/my-send-hongbao.png" v-if="target.peopleType == 'me'" alt="">
            <img src="../static/icon/you-send-hongbao.png" v-if="target.peopleType == 'you'" alt="">

            <span>{{ target.con.title || '恭喜发财 大吉大利' }}</span>
          </div>


          <!--转账消息-->
          <div class="zhuanzhang" v-if="target.messageType == 'zhuanzhang'">
            <img src="../static/icon/me-send-zhuanzhang.png" v-if="target.peopleType == 'me'" alt="">
            <img src="../static/icon/you-send-zhuanzhang.png" v-if="target.peopleType == 'you'" alt="">

            <span class="text">{{ target.con.title || '转账给你' }}</span>
            <span class="money">￥{{ target.con.money }}</span>

          </div>

          <div class="message yuyin" v-if="target.messageType == 'yuyin'" :style="{width: Math.max((target.con.timeLong / 60)*200, 42 )+'px' }">
            <img src="../static/icon/me-send-yuyin.png" class="yu" alt="" v-if="target.peopleType == 'me'">
            <img src="../static/icon/you-send-yuyin.png" class="yu" alt="" v-if="target.peopleType == 'you'">

            <span class="length">{{target.con.timeLong}}''</span>

            <img src="../static/icon/weixin-chat-left-bar.png" v-if="target.peopleType == 'me'" alt="" class="message-hack">
            <img src="../static/icon/weixin-chat-right-bar.png" v-if="target.peopleType == 'you'" alt="" class="message-hack">
          </div>

        </div>

      </div>
      <div style="padding-bottom: 40px;" v-if="padding"></div>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  // 数据接口 聊天相关

  /*
  chatList : [
    {
      peopleType: 'me', // 聊天视角 me 我, you 你
      time: '', // 聊天时间

      messageType: 'text',
      // text 普通文本消息
      // hongbao 红包消息
      // zhuanzhang 转账消息
      // yuyin 语音消息
      // img 图片消息


      // text 普通文本消息
      con: {
        time: '', // 显示时间
        content: '', // 内容
      },

      // hongbao 红包消息
      con: {
        title: '', // 红包标题
        isReceive: false, //是否被领取了
        time: '' // 显示时间
      },

      // zhuanzhang 转账消息
      con: {
        title: '', //转账文字 如果不传默认为 转账给+username
        money: 100, //转账钱数
        time: '' // 显示时间
      },

      // yuyin 语音消息
      con: {
        timeLong: 300, // 秒时长
        time: '' // 显示时间
      },

      // img 图片消息
      img: {
        link: '', //链接
        time: '' // 显示时间
      }
    }
  ]
  */

  import { XButton } from 'vux'
  export default {
    components: {
      XButton
    },
    name: 'weixin-chat-content',
    props: {
      chatList: {
        type: Array,
        required: true
      },
      chatConfig: {
        type: Object,
        required: true
      },
      isEdit: {
        type: Boolean,
        default: false
      },
      padding: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {

      }
    },
    mounted() {
      console.log(this.chatConfig, 'chatList xxxxxxxxxxxx')
    },

    methods: {
      deleteMy(target, index) {
        this.chatList.splice(index, 1)
      }
    }
  }
</script>

<style type="text/sass" lang="sass">

</style>

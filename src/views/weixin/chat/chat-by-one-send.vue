<template>
  <div class="chat-by-one-send scroll-y">

    <x-header :left-options="{backText: ''}">添加消息</x-header>

    <div>
      <div class="file">
        <input type="file" @change="fileComming">
        <img alt="" :src="normalPostForYou.nowFace" v-if="normalPostForYou.nowFace">
        <span v-if="!normalPostForYou.nowFace">设置头像</span>
      </div>

      <selector title="视角" :options="lookType" v-model="normalPostForYou.lookType" @on-change="lookTypeChange"></selector>
      <x-switch title="显示时间" v-model="normalPostForYou.showTime"></x-switch>
      <datetime v-model="normalPostForYou.time" format="MM-DD HH:mm" title="消息时间" v-if="normalPostForYou.showTime" @on-change="timeChange"></datetime>

      <!--公共部分结束-->

      <!--私有部分开始-->

      <!--文字消息-->
      <div v-if="normalPostForYou.target == 'text'">
        <x-input :required="true" title="消息内容" :label-width="defaultLabelWidth" placeholder="消息内容" v-model="normalPostForYou.text"></x-input>
      </div>

      <div v-if="normalPostForYou.target == 'hongbao'">
        <x-input :required="true" :max="10" title="红包标题" :label-width="defaultLabelWidth" placeholder="红包标题" v-model="normalPostForYou.hongbaoTitle"></x-input>
      </div>

      <div v-if="normalPostForYou.target == 'zhuanzhang'">
        <x-input :required="true" :max="10" title="转账标题" :label-width="defaultLabelWidth" placeholder="转账标题" v-model="normalPostForYou.zhuanzhangTitle"></x-input>
        <x-input :required="true" type="number" :max="10" @on-blur="normalPostForYou.zhuanzhangNum = (normalPostForYou.zhuanzhangNum+'').substr(0,10) " title="转账钱数" :label-width="defaultLabelWidth" placeholder="转账钱数" v-model="normalPostForYou.zhuanzhangNum"></x-input>
      </div>

      <div v-if="normalPostForYou.target == 'yuyin'">
        <x-input :required="true" type="number" title="语音长度" @on-blur="normalPostForYou.timeLong = (normalPostForYou.timeLong+'').substr(0,2) " :label-width="defaultLabelWidth" placeholder="单位秒例如 30" v-model="normalPostForYou.timeLong"></x-input>
      </div>

      <box gap="10px 10px">
        <x-button type="primary" @click.native="addMessage">添加</x-button>
      </box>


    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import { XHeader, Group, Box, Selector, XInput, XButton, Datetime, XSwitch } from 'vux'
  import VueDB from '../../../util/VueDB'
  import moment from 'moment'
  import _ from 'lodash'
  import WxDate from '../../../util/WxDate'
  import Rule from '../../../util/Rule'
  import FileHelp from '../../../util/FileHelp'

  export default {
    components: {
      XHeader,
      Group,
      Box,
      Selector,
      XInput,
      XButton,
      Datetime,
      XSwitch
    },
    data() {
      return {
        lookType: [
          {
            key: 'me',
            value: '我的视角'
          },
          {
            key: 'you',
            value: '你的视角'
          }
        ],

        normalPostForYou: {
          lookType: '', // 视角
          showTime: false, // 显示时间
          text: '', //消息内容
          nowFace: '',
          target: '',
          timeCopy: '',
          time: moment().format('MM-DD HH:mm'),

          hongbaoTitle: '恭喜发财，大吉大利',
          hongbaoNum: '',

          zhuanzhangTitle: '转账给你',
          zhuanzhangNum: '',

          timeLong: 0, //语音长度
        }
      }
    },
    mounted() {
      this.comeHereData = VueDB.getItem('weixinchat').toJson()
      this.comeHereData.isBack = true



      // 设置消息类型
      this.normalPostForYou.target = this.comeHereData.target

      // 设置视角 默认为我
      this.normalPostForYou.lookType = 'me'

      this.getFace();

    },
    computed: {

    },
    methods: {
      getFace() {
        this.normalPostForYou.nowFace = this.comeHereData.chatConfig[this.normalPostForYou.lookType].face
      },
      lookTypeChange() {
        this.getFace()
      },
      timeChange(time) {
      },

      // 图片君来的时候
      fileComming(event) {
        var file = event.target.files[0];

        if(file && Rule.isImage(file.type)){

          FileHelp.zipImage(file, img=> {

//            console.log(img, 'LLLLL')

            this.comeHereData.chatConfig[this.normalPostForYou.lookType].face = img
            this.getFace()

          })

        }else{
          this.$vux.toast.text('图片格式不正确', 'center')
        }

      },

      // 添加消息
      addMessage() {
        // 根据类型添加消息

//        console.log(this.normalPostForYou.time,'time ppp')
        var appendScame = {
          peopleType: this.normalPostForYou.lookType, // 聊天视角 me 我, you 你
          time: new WxDate(moment(new Date()).format('YYYY')+'-'+this.normalPostForYou.time).toString(), // 显示聊天时间
          timeShow: this.normalPostForYou.showTime,

          messageType: this.normalPostForYou.target,

          // text 普通文本消息
          con:{
          },
        }

        var canSend = true

        switch(this.normalPostForYou.target){
          case 'text':
            appendScame.con = {
              content: this.normalPostForYou.text
            }
            if(this.normalPostForYou.text == ''){
              this.$vux.toast.text('聊天内容不能为空', 'center')
              canSend = false;
            }
            break
          case 'hongbao':
            appendScame.con = {
              title: this.normalPostForYou.hongbaoTitle
            }
            if(this.normalPostForYou.hongbaoTitle == ''){
              this.$vux.toast.text('红包标题不能为空', 'center')
              canSend = false;
            }
            break
          case 'zhuanzhang':
            appendScame.con = {
              title: this.normalPostForYou.zhuanzhangTitle, //转账文字 如果不传默认为 转账给+username
              money: this.normalPostForYou.zhuanzhangNum, //转账钱数
            }
            if(this.normalPostForYou.zhuanzhangTitle == ''){
              this.$vux.toast.text('转账文字不能为空', 'center')
              canSend = false;
            }
            if(this.normalPostForYou.zhuanzhangNum == ''){
              this.$vux.toast.text('转账钱数不能为空', 'center')
              canSend = false;
            }
            break
          case 'yuyin':

            if(this.normalPostForYou.timeLong == ''){
              this.$vux.toast.text('语音长度不能为空', 'center')
              canSend = false;
            }

            var formateY = Math.min(parseInt(this.normalPostForYou.timeLong),60)

            appendScame.con = {
              timeLong: formateY
            }
            break
        }

        // 添加到

        if(canSend){

            if(this.comeHereData.iCommingFor == 'add'){
              this.comeHereData.chatList.push(appendScame)
            }
//            console.log(this.comeHereData)

          this.$router.back()
        }

      }
    },
    beforeRouteLeave (to, from, next) {

      if(this.comeHereData.iCommingFor == 'edit'){


      }else{

        // 添加
      }

      VueDB.setItem('weixinchat',this.comeHereData);


      next();

    }
  }

</script>

<style type="text/sass" lang="sass">
  @import "../../../assets/sass/wx.sass"
</style>

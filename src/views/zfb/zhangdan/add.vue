<template>
  <div class="chat-by-one-send scroll-y">

    <x-header :left-options="{backText: ''}">添加消息</x-header>

    <div>
      <div class="file">
        <input type="file" @change="fileComming">
        <img alt="" :src="normalPostForYou.img" v-if="normalPostForYou.img">
        <span v-if="!normalPostForYou.img">设置头像</span>
      </div>

      <x-input title="标题" v-model="normalPostForYou.title" placeholder="例如 花呗主动还款"></x-input>
      <x-input title="内容" v-model="normalPostForYou.con" placeholder="例如 +100 "></x-input>
      <datetime v-model="normalPostForYou.time" format="MM-DD HH:mm" title="转账时间" v-if="normalPostForYou.showTime" @on-change="timeChange"></datetime>

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
          showTime: true, // 显示时间
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

          title: '',
          con: '',
          img: ''
        }
      }
    },
    mounted() {
    },
    computed: {

    },
    methods: {
      getFace() {
        this.normalPostForYou.nowFace = this.comeHereData.chatConfig[this.normalPostForYou.lookType].face
      },
      lookTypeChange() {
      },
      timeChange(time) {
      },

      // 图片君来的时候
      fileComming(event) {
        var file = event.target.files[0];

        if(file && Rule.isImage(file.type)){

          FileHelp.zipImage(file, img=> {
            this.normalPostForYou.img = img
          })

        }else{
          this.$vux.toast.text('图片格式不正确', 'center')
        }

      },

      // 添加消息
      addMessage() {
        if(_.isEmpty(this.normalPostForYou.img)){
          this.$vux.toast.text('头像不能为空', 'center')

          return
        }
        if(_.isEmpty(this.normalPostForYou.title)){
          this.$vux.toast.text('标题不能为空', 'center')

          return
        }
        if(_.isEmpty(this.normalPostForYou.con)){
          this.$vux.toast.text('内容不能为空', 'center')

          return
        }
        this.$store.state.zfbZhuanZhang.data.list.push({
          title: this.normalPostForYou.title,
          con: this.normalPostForYou.con,
          img: this.normalPostForYou.img,
          time: new WxDate(moment().format('YYYY')+'-'+this.normalPostForYou.time, true).toString()
        })


        this.$router.back()

      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.state.zfbZhuanZhang.data.isBack = true
      next();
    }
  }

</script>

<style type="text/sass" lang="sass">
  @import "../../../assets/sass/wx.sass"
</style>

<template>
  <div class="homepage-addmessage scroll-y">
    <x-header :left-options="{backText: ''}">添加消息</x-header>
    <div>
      <div class="file">
        <input type="file" @change="fileComming($event)">
        <img :src="appendFormData.img" alt="" v-if="appendFormData.img">
        <span v-if="!appendFormData.img">选择头像</span>
      </div>
      <x-input :required="true" title="消息标题" :label-width="defaultLabelWidth" placeholder="消息标题名称" v-model="appendFormData.title"></x-input>
      <x-input :required="true" title="消息内容" :label-width="defaultLabelWidth" placeholder="消息内容" v-model="appendFormData.content"></x-input>
      <datetime v-model="appendFormData.time" format="MM-DD HH:mm" @on-change="timeChange" title="聊天时间"></datetime>
      <selector title="角标类型" :options="signalType" v-model="appendFormData.jiaobiaoType"></selector>
      <x-input title="消息条数" :label-width="defaultLabelWidth" v-if=" appendFormData.jiaobiaoType == 'num' " placeholder="消息的条数" v-model="appendFormData.num"></x-input>

      <box gap="10px 10px">
        <x-button type="primary" @click.native="addMessageEvent">添加</x-button>
      </box>


    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { XHeader, Group, Box, Selector, XInput, XButton, Datetime } from 'vux'
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
      Datetime
    },
    data (){
      return {
        comeHereData: null,
        appendFormData: {
          title: '',
          content: '',
          time: moment().format('MM-DD HH:mm'),
          timeCopy: new WxDate(moment()).toString(),
          img: '',

          jiaobiaoType: 'num',
          num: 10
        },
        signalType: [
          {
            key: 'num',
            value: '数字'
          },
          {
            key: 'dou',
            value: '豆豆'
          },
          {
            key: 'none',
            value: '无'
          }
        ]
      }
    },
    methods: {
      timeChange(time) {
        this.appendFormData.timeCopy = new WxDate(moment(new Date()).format('YYYY')+'-'+time).toString();
      },
      fileComming(event) {
        var file = event.target.files[0];
        if(file && Rule.isImage(file.type)){

          FileHelp.zipImage(file, img=> {
            this.appendFormData.img = img
          })

        }else{
          this.$vux.toast.text('图片格式不正确', 'center')
        }

      },
      addMessageEvent() {

        if( _.isEmpty(this.appendFormData.title) ){
          this.$vux.toast.text('标题不能为空', 'center')

          return;
        }
        if( _.isEmpty(this.appendFormData.content) ){
          this.$vux.toast.text('内容不能为空', 'center')

          return;
        }

        this.$router.back();

      }
    },
    mounted() {
      this.comeHereData = VueDB.getItem('homepage').toJson();

      this.comeHereData.isBack = true;

      if(this.comeHereData.iCommingFor == 'edit'){
        this.appendFormData = this.comeHereData.editData.target;

//        console.log(this.appendFormData, 'append')
      }

    },
    beforeRouteLeave (to, from, next) {
      if(this.comeHereData.iCommingFor == 'edit'){
        if( !_.isEmpty(this.appendFormData.title) && !_.isEmpty(this.appendFormData.content)){
          this.comeHereData.messageList[this.comeHereData.editData.index] = this.comeHereData.editData.target
        }
      }else{
        if( !_.isEmpty(this.appendFormData.title) && !_.isEmpty(this.appendFormData.content)){
          this.comeHereData.messageList.push(this.appendFormData);
        }
      }

      VueDB.setItem('homepage',this.comeHereData);

      next();
    }
  }
</script>

<style type="text/sass" lang="sass">
  @import "../../../assets/sass/wx.sass"

</style>

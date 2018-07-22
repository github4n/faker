<template>
  <div class="scroll-y signup">
    <p style="padding-top: 40px;padding-bottom: 0px;text-align: center">
      <img src="../../static/icon/admin-logo.png" style="width: 60%;" alt="">
    </p>
    <group>
      <x-input title="昵称" type="text" :max="10" placeholder="中文或英文或数字 2到10位" v-model="formData.nickName" :required="true"></x-input>
      <x-input title="账号" type="text" :max="18" placeholder="英文或数字 6到18位" v-model="formData.loginName" :required="true"></x-input>
      <x-input title="密码" type="password" :max="18" placeholder="英文或数字 6到18位" v-model="formData.password"
               :required="true"></x-input>
      <x-input title="手机" type="number" :max="11" placeholder="请输入手机号码" v-model="formData.phone"
               is-type="china-mobile"></x-input>
      <x-input title="邮箱" type="text" :max="18" placeholder="请输入邮箱" v-model="formData.email"
               is-type="email"></x-input>


    </group>


    <div style="padding:15px;">
      <x-button @click.native="onEnter" type="primary" :disabled="disabled">注册</x-button>
    </div>

    <p style="padding: 0 15px;color: #333">
      <span>已有账号？</span> <span @click="goLogin" style="color: orangered">点击登录</span>
    </p>

  </div>
</template>

<script type="text/ecmascript-6">
  import { XInput, Group, XButton, Cell } from 'vux'
  import Util from '../../util/util'
  import Rule from '../../util/Rule'
  import API from '../../util/API'
  import VueDB from '../../util/VueDB'

  let _ = require('lodash');

  export default {
    name: 'login',
    components: {
      XInput,
      Group,
      XButton,
      Cell
    },
    data() {
      return {
        formData: {
          nickName: '', // 昵称
          loginName : '', // 登录名
          password : '', // 密码
          email: '', // n r
          phone: '', // n r
        },
        disabled: false
      }
    },
    methods: {
      onEnter() {
        let nikName = Rule.nikName(this.formData.nickName)
        let userName = Rule.userName(this.formData.loginName)
        let passWord = Rule.passWord(this.formData.password)
        let emial = Rule.emial(this.formData.email)
        let phoneNumber = Rule.phoneNumber(this.formData.phone)

        if(!nikName.test()){
          this.$vux.toast.text(nikName.msg, 'center')

          return
        }



        if(!userName.test()){

          this.$vux.toast.text(userName.msg, 'center')

          return
        }
        if(!passWord.test()){
          this.$vux.toast.text(passWord.msg, 'center')

          return
        }
        if(!_.isEmpty(this.formData.email) && !emial.test()){
          this.$vux.toast.text(emial.msg, 'center')
        }
        if(_.isEmpty(this.formData.phone) || !phoneNumber.test()){
          this.$vux.toast.text(phoneNumber.msg, 'center')

          return;
        }

        this.$vux.loading.show({
          text: 'Loading'
        })

        this.disabled = true;


        API.register(this.formData).then( res=> {
          this.$vux.loading.hide()
          var data = res.data
          if (API.isSuccess(data.code)){
            // 注册成功
            this.$vux.toast.text(data.msg, 'center')

            VueDB.setItem('token', data.data.token)
            VueDB.setItem('userId', data.data.userId)

            setTimeout(()=>{

              this.$router.push({
                path: '/home',
                query: Util.makeAnimationRouter()
              })

            }, 1500)

          }else{
            this.$vux.toast.text(data.msg, 'center')
            this.disabled = false;
          }

        })
        .catch( err=> {
          this.$vux.loading.hide()
          this.$vux.toast.text(API.message.serverError, 'center')
          this.disabled = false;
        });
      },
      goLogin() {
        this.$router.push({
          path: '/login'
        })
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$vux.loading.hide()
      next();
    }
  }
</script>

<style type="text/css">
.signup .vux-x-input:nth-of-type(1) .weui-cell__hd label:after,.signup .vux-x-input:nth-of-type(2) .weui-cell__hd label:after,.signup .vux-x-input:nth-of-type(3) .weui-cell__hd label:after,.signup .vux-x-input:nth-of-type(4) .weui-cell__hd label:after{
  content: '*';
  color: #E00;
}
</style>

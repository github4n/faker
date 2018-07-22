<template>
  <div class="scroll-y">
    <p style="padding-top: 40px;padding-bottom: 0px;text-align: center">
      <img src="../../static/icon/admin-logo.png" style="width: 60%;" alt="">
    </p>
    <group>
      <x-input title="账号" ref="zh" type="text" placeholder="登录名/手机号/邮箱" v-model="formData.user"></x-input>
      <x-input title="密码" ref="mm" type="password" placeholder="请输入密码" v-model="formData.password"
               @on-enter="onEnter"></x-input>
    </group>


    <div style="padding:15px;">
      <x-button @click.native="onEnter" type="primary" :disabled="disabled">登录</x-button>
    </div>

    <p style="padding: 0 15px;color: #333">
      <span>没有账号？</span>  <span @click="goZc" style="color: orangered">点击注册</span>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import Util from  '../../util/util'
  import { XInput, Group, XButton, Cell } from 'vux'
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
          user: '',
          password: '',

        },
        disabled: false
      }
    },
    methods: {
      onEnter() {
        if(_.isEmpty(this.formData.user)){
          this.$vux.toast.text('用户名不能为空', 'center')
          return
        }
        if(_.isEmpty(this.formData.password)){
          this.$vux.toast.text('密码不能为空', 'center')
          return
        }

        this.$vux.loading.show({
          text: 'Loading'
        })

        this.disabled = true;

        API.login(this.formData).then( res=> {
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

        }).catch( err=> {
          this.$vux.loading.hide()
          this.$vux.toast.text(API.message.serverError, 'center')
          this.disabled = false;
        });

      },
      goZc() {
        // 注册
        this.$router.push({
          path: '/signup',
          query: Util.makeAnimationRouter()
        })
      }
    },

    beforeRouteLeave(to, from, next) {
      this.$vux.loading.hide()
      next();
    },

    mounted() {
      this.formData.user = this.$refs.zh.value
    }
  }
</script>

<style type="text/css">

</style>

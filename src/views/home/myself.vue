<template>
  <div class="home-myself scroll-y footer-y">
    <group>
      <cell title="昵称" :value="userConfig.userNickName" is-link @click.native="showPlugin3"></cell>
      <cell title="账号" :value="userConfig.userLoginName"></cell>
      <cell title="邮箱" :value="userConfig.userEmail || '未填写'"></cell>
      <cell title="手机号" :value="userConfig.userPhone || '未填写'"></cell>
      <cell title="修改密码" is-link @click.native="editPassword"></cell>

      <div style="padding: 10px">
        <x-button type="warn" @click.native="quit">退出登录</x-button>
      </div>

    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Cell, CellBox, CellFormPreview, Group, Badge, Confirm, XButton } from 'vux'
  import VueDB from '../../util/VueDB'
  import API from '../../util/API'
  import Rule from '../../util/Rule'

  export default{
    components: {
      Group,
      Cell,
      CellFormPreview,
      CellBox,
      Badge,
      Confirm,
      XButton
    },
    data() {
      return {
        userConfig: {

        }
      }
    },

    mounted() {

      this.$vux.loading.show({
        text: 'Loading'
      })

      API.getUser({}).then(res=>{
        this.$vux.loading.hide()

        var data = res.data;

        if(API.isSuccess(data.code)){
          this.userConfig = data.data
        }else{
          this.$vux.toast.text(data.msg, 'center')
        }

      }).catch(err=>{
        this.$vux.loading.hide()
      })
    },

    beforeRouteLeave(to, from, next) {
      this.$vux.loading.hide()
      next();
    },

    methods: {
      showPlugin3 () {
        const _this = this
        this.$vux.confirm.prompt('输入昵称', {
          title: '修改昵称',
          onShow () {
            _this.$vux.confirm.setInputValue(_this.userConfig.userNickName)
          },
          onHide () {
          },
          onCancel () {

          },
          onConfirm (msg) {
            var r = Rule.nikName(msg)
            if(!r.test()){
              _this.$vux.toast.text(r.msg, 'center')
            }else{
              _this.$vux.loading.show({
                text: 'Loading'
              })

              API.updateNickName({
                nickName: msg
              }).then(res=> {
                _this.$vux.loading.hide()

                var data = res.data

                if(API.isSuccess(data.code)){
                  _this.userConfig.userNickName = msg;
                  _this.$vux.toast.text('修改成功', 'center')

                }else{
                  _this.$vux.toast.text(data.msg, 'center')
                }

              }).catch(err=>{
                _this.$vux.toast.text(API.message.serverError, 'center')
                _this.$vux.loading.hide()
              })


            }
          }
        })
      },
      editPassword() {
        const _this = this
        this.$vux.confirm.prompt('输入新密码', {
          title: '修改密码',
          onShow () {
          },
          onHide () {
          },
          onCancel () {

          },
          onConfirm (msg) {
            var r = Rule.passWord(msg)
            if(!r.test()){
              _this.$vux.toast.text(r.msg, 'center')
            }else{
              _this.$vux.loading.show({
                text: 'Loading'
              })

              API.updatePassword({
                password : msg
              }).then(res=> {
                _this.$vux.loading.hide()

                var data = res.data

                if(API.isSuccess(data.code)){
                  _this.userConfig.userNickName = msg;
                  _this.$vux.toast.text('修改成功', 'center')
                  API.exit()
                  setTimeout(function () {
                    _this.$router.push({
                      path: 'login'
                    })
                  }, 1500)

                }else{
                  _this.$vux.toast.text(data.msg, 'center')
                }

              }).catch(err=>{
                _this.$vux.toast.text(API.message.serverError, 'center')
                _this.$vux.loading.hide()
              })


            }
          }
        })
      },

      quit() {

        this.$vux.loading.show({
          text: 'Loading'
        })

        API.exit({}).then(res=>{

          VueDB.removeItem('userId')
          VueDB.removeItem('token')

          this.$router.push({
            path: '/login'
          })
        }).catch(err=>{
          this.$router.push({
            path: '/login'
          })
        })

      }
    }
  }
</script>

<style type="text/css">

</style>

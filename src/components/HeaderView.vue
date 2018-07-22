<template>
  <div class="header-view">
    <appleHeader ref="apple" v-show="passData.system == 'ios'" :color="color" :bgcolor="bgcolor"></appleHeader>
    <androidHeader ref="android" v-show="passData.system == 'android'" :color="color" :bgcolor="bgcolor"></androidHeader>
  </div>
</template>

<script type="text/ecmascript-6">
  import androidHeader from './androidHeader'
  import appleHeader from './appleHeader'

  export default{
    props: {
      color: {
        default: '#fff'
      },
      bgcolor: {
        default: '#2D2C32'
      }
    },
    components: {
      androidHeader,
      appleHeader
    },
    data() {
      return {
        passData: {}
      }
    },
    methods: {
      update(value) {
        this.passData = value;

        if(this.passData.system == 'ios'){
          this.$refs.apple.update(this.passData);
        }else{
          this.$refs.android.update(this.passData);
        }

      }
    }
  }
</script>

<style type="text/css">

</style>

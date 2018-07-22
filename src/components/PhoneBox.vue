<template>
  <div class="phone-box">
    <div class="phone-box-header">
      <slot name="header"></slot>
    </div>

    <div class="app-header">
      <slot name="app-header"></slot>
    </div>

    <div class="phone-box-content scroll-y">
      <slot name="content"></slot>
    </div>

    <div class="phone-box-footer">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'phone-box',
    data() {
      return {

      }
    }
  }
</script>

<style type="text/sass" lang="sass">
  .phone-box
    display: block
    width: 320px
    height: 568px
    position: relative
    font-family: Arial,"微软雅黑"
    .phone-box-header
      position: absolute
      top: 0px
      left: 0px
      width: 100%
      z-index: 600
    .phone-box-content
      position: absolute
      left: 0px
      top: 22px
    .app-header
      position: absolute
      top: 20px
      left: 0px
      width: 100%
      z-index: 100
    .phone-box-footer
      position: absolute
      bottom: -2px
      left: 0px
      width: 100%
      z-index: 600
</style>

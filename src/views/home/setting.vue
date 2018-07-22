<template>
  <div class="setting scroll-y footer-y">
      <cell title="建议意见" is-link></cell>
      <cell title="用户协议" is-link></cell>
      <cell title="版本号" value="1.0.0"></cell>
      <cell title="检查更新" is-link ></cell>
      <cell title="作者" value="jon-millent(吃鱼的帆)"></cell>
      <cell title="github" value="https://github.com/Jon-Millent"></cell>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
  export default{
    components: {
      Group,
      Cell,
      CellFormPreview,
      CellBox,
      Badge
    }
  }
</script>

<style type="text/css">

</style>


export default {
  install(vue){
    // lable 上的宽度
    vue.prototype.defaultLabelWidth = '200';
    vue.prototype.getLeft = function () {
      return ((document.documentElement.clientWidth - 320) / document.documentElement.clientWidth) / 2 * 100 + '%'
    }
    vue.prototype.getTop = '0px'
  }
}

let moment = require('moment')

class WxDate{
  constructor(timeChuo, isDoIt) {
    this.data = moment(timeChuo)
    this.now = new Date()

    this.myDoit = isDoIt || false
  }

  toString() {
    var key = ''
    var value = ''

    if(this.data.month() == this.now.getMonth() && this.data.date() == this.now.getDate() && this.myDoit){
      // 今天
      value = this.data.format('H:mm')

      if(this.data.hours() <= 10){
        key = '早上'
      }else if(this.data.hours() <= 14){
        key = '中午'
      }else if(this.data.hours() <= 17){
        key = '下午'
      }else if(this.data.hours() <= 22){
        key = '晚上'
      }


    }else{
      var curDay =  this.now.getDate() - this.data.date();

      if(curDay == 1 && this.myDoit){
        // 昨天
        key = "昨天"
      }else{
        key = this.data.format('MM')+'月'+this.data.format('DD')+'日'
      }
    }

    return key + value;
  }
}

export default WxDate;

class Rule{
  constructor(){

  }

  isImage(fileTypeString) {
    return /(?:png|jpg|bmp|gif|jpeg)$/g.test(fileTypeString)
  }

  nikName(text){

    var rule = /^[\u4e00-\u9fa5a-zA-Z0-9_]{2,10}$/g
    return {
      test() {
        return rule.test(text)
      },

      msg: '昵称2-16位，只能为中文英文数字'

    }
  }

  userName(text){

    var rule = /^[a-zA-Z0-9_]{6,18}$/g
    return {
      test() {
        return rule.test(text)
      },

      msg: '账号6-18位，只能为英文或数字'

    }
  }



  passWord(text){

    var rule = /^[a-zA-Z0-9_]{6,18}$/g
    return {
      test() {
        return rule.test(text)
      },

      msg: '密码6-18位，只能为英文或数字'

    }
  }

  emial(text){

    var rule = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    return {
      test() {
        return rule.test(text);
      },

      msg: '邮箱格式错误'

    }
  }

  phoneNumber(text) {
    var rule = /^[0-9]{11,11}$/
    return {
      test() {
        return rule.test(text);
      },
      msg: '手机号格式错误'
    }
  }

}


export default new Rule()

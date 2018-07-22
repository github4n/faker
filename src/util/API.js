
import axios from 'axios'
let _ = require('lodash');
import VueDB from '../util/VueDB'

class API{
  constructor() {

    this.url = '/'
    this.urlForLhr = '/'

    this.status = {
      success: 0,
      netError: '网络出错',
      serverError: '服务器出错',
      timeOut: '请求数据超时'
    }

    this.message = {
      netError: '网络出错',
      serverError: '服务器出错',
      timeOut: '请求数据超时'
    }
  }

  concatData(data) {
    return  _.assignIn({
      userId: VueDB.getItem('userId').toString(),
      token: VueDB.getItem('token').toString()
    },data)
  }

  // 是否是苹果
  isApple() {
    return /iP(ad|hone|od)/.test(navigator.userAgent)
  }

  isSuccess(code) {
    return code == this.status.success
  }

  // 是否登录
  isLogin() {
    return VueDB.getItem('userId').toString() && VueDB.getItem('token').toString()
  }

  // 注册
  register(data) {
    return axios.get(this.url + 'register',{
        params: data
    })
  }

  // 登录
  login(data) {
    return axios.get(this.url + 'login',{
      params: data
    })
  }

  // 获取用户信息
  getUser(data) {
    return axios.get(this.url + 'getUser',{
      params: this.concatData(data)
    })
  }

  // 更新用户名
  updateNickName(data) {
    return axios.get(this.url + 'updateNickName',{
      params: this.concatData(data)
    })
  }

  // 更新密码
  updatePassword(data) {
    return axios.get(this.url + 'updatePassword',{
      params: this.concatData(data)
    })
  }


  // 退出
  exit(data) {
    return axios.get(this.url + 'exit', {
      params: this.concatData(data)
    })
  }

  // 保存权限
  save(data) {
    return axios({
      url: this.urlForLhr + 'save',
      method: 'post',
      data: this.concatData(data),
      transformRequest: [function (data) {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

}

export default new API()

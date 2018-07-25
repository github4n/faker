# faker
vue实例项目-微商神器(在线制作微信/支付宝假红包，假聊天，假转账，假余额，花呗等截图)，代码可自由更改，转载请注明出处，切勿用于商业用途。



## DEMO
<div align="center">
  <img src="https://qr.api.cli.im/qr?data=http%253A%252F%252Fshow.thisummer.com%252Fhongbao&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=dfd6e8c41af9fd51ae94e79a36319172">

</div>
<div align="center">
  <a href="http://show.thisummer.com/hongbao">在线演示</a>
</div>  

## 坑
本项目使用vux 作为ui框架，但是发现一个问题 x-input type =number 在安卓qq浏览器下 v-model 绑定无效 已经向vux提交<a href="https://github.com/airyland/vux/issues/2960">bug</a>

## 安装
```
  git clone https://github.com/Jon-Millent/faker.git
  cd faker
  npm install | cnpm install | yarn
  npm run dev
  # http://localhost:8081
```
## 模块
* 首页
  * 微信
    * 生成微信首页
    * 生成微信聊天
    * 生成微信红包
    * 生成微信转账
    * 生成微信零钱
  * 支付宝
    * 生成支付宝账单
    * 生成支付宝余额
    * 生成余额宝
    * 生成花呗
* 我的（没对接后台）
  * 登录
  * 注册
* 设置
  * 关于
  

## 请我喝杯咖啡，支持更多开源
![1024.png](https://i.loli.net/2018/07/25/5b57cb91a44a1.png)  

## LICENSE
<a href="http://opensource.org/licenses/MIT">MIT</a>

/**
 * Created by HP on 2017/11/20.
 */
// 用来制造数据结构格式
let _ = require('lodash');

class Egg {

  constructor(targetData) {
    this.factory = targetData;
    this.factory_bak = _.cloneDeep(this.factory);
  }

  set(key, value){
    this.factory[key] = value;
  }

  get(key){
    return this.factory[key];
  }

  toJson(){
    return _.cloneDeep(this.factory);
  }

  reset(){
    this.factory = _.cloneDeep(this.factory_back);
  }

}

export default Egg

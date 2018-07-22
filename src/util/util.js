
class Util{
  constructor(){

  }
  makeAnimationRouter (data) {
    let defaultData = data || {};
    defaultData.time = new Date().getTime();
    return defaultData;
  }

}


export default new Util();

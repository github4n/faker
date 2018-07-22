
class VueEvent{
  constructor(){
    window.private_evnet = window.private_evnet || {};
    this.evnet = window.private_evnet;
  }
  $on(eventName, callBack) {
    this.evnet[eventName] = this.evnet[eventName] || [];
    this.evnet[eventName].push(callBack);
  }
  $emit(eventName,dataJson){
    if(this.evnet[eventName]){
      for(var i=0; i<this.evnet[eventName].length; i++){
        this.evnet[eventName][i](dataJson);
      }
    }
  }
}


export default VueEvent;

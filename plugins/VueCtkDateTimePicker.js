import Vue from 'vue'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'

const vcdtp = {
  install(Vue, options){
    Vue.component('vue-ctk-date-time-picker', VueCtkDateTimePicker);
  }
}

Vue.use(vcdtp);

export default vcdtp;
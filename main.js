import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/*全局组件引用*/
import swiper from "./components/swiper-box.vue"
Vue.component("swiper-box",swiper)
// import WXShare from "./components/wx-share.vue"
// Vue.component("wx-share",WXShare)

/*全局方法或变量*/
Vue.prototype. now = Date.now || function () {
    return new Date().getTime();
};
Vue.prototype.websiteUrl = 'http://main.meetji.com';
Vue.prototype.sourceUrl = 'http://api_test.meetji.com';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

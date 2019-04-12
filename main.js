import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 引入vuex 状态库
import store from "./store";
Vue.prototype.$store = store;
import tabBar from "./components/tab-bar.vue"
Vue.component("tab-bar",tabBar)

/*全局组件引用*/
import swiper from "./components/swiper-block.vue"
Vue.component("swiper-block", swiper)
/*用户协议*/
import agreement from "./components/agreement.vue"
Vue.component("agreement", agreement)
/*积分*/
import integral from "./components/integral.vue"
Vue.component("integral", integral)
// import WXShare from "./components/wx-share.vue"
// Vue.component("wx-share",WXShare)

/*全局方法或变量*/
Vue.prototype.now = Date.now || function() {
	return new Date().getTime();
};
Vue.prototype.websiteUrl = 'http://main.meetji.com';
Vue.prototype.sourceUrl = 'http://api_test.meetji.com';

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()

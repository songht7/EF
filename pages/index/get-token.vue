<template>
	<view class="page ">
		<view class="" style="margin-bottom: 50upx;">
			access_token：
		</view>
		<view class="">
			{{access_token}}
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	// const wx = require('jweixin-module')
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;

	export default {
		data() {
			return {
				user: {},
				access_token: ""
			}
		},
		computed: {},
		components: {},
		onLoad(option) {
			var _this = this;
			uni.setNavigationBarTitle({
				title: "英语免费试听课网"
			});
		},
		onShow() {
			var _this = this;
			this.$store.commit("change_page", 0)
			this.$store.dispatch('checkWeixin');
			this.$store.dispatch('cheack_user');
		},
		onReady() {
			var _this = this;
			_this.access_token = _this.$store.state.access_token
		},
		onPullDownRefresh() {},
		onReachBottom() {},
		methods: {}
	}
</script>

<style>
	@import "./index.css";
</style>

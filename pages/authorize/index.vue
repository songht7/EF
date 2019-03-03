<template>
	<view class="wxLoading">
		{{wxLoading}}...
	</view>
</template>

<script>
	import util from '../../common/util.js';
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;
	const pageis = mdl.queryString("type");
	export default {
		data() {
			return {
				userInfo: {},
				wxLoading: "微信授权中"
			};
		},
		onLoad() {},
		onShow() {
			console.log("=====onShow====")
			var _this = this;
			var funStor = function(res) {
				_this.userInfo = res;
				if (res.openid) {
					_this.wxLoading = "授权成功";
					mdl.goHomePage();
					// window.location.href = inter.domain";
				} else {
					uni.switchTab({
						url: '/pages/user/index'
					});
				}
			}
			let myStorage = mdl.getMyStorage("uWXInfo", "", funStor)
		}
	}
</script>

<style>
	.wxLoading {
		text-align: center;
		line-height: 3;
		font-size: 34upx;
	}
</style>

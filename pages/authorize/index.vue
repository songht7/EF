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
				wxLoading: "加载中...",//微信授权中
				lm_id: ""
			};
		},
		onLoad(option) {
			this.lm_id = option.lm_id;
		},
		onShow() {
			console.log("=====onShow====")
			var _this = this;
			var funStor = function(res) {
				_this.userInfo = res;
				var pageis = mdl.queryString("type");
				var pagekey = mdl.queryString("key") || 2;
				console.log("pageis:", pageis, pagekey)
				if (res.openid) {
					_this.wxLoading = "授权成功";
					uni.getStorage({
						key: "temp",
						success: function(ress) {
							uni.removeStorage({
								key: 'temp'
							});
							uni.navigateTo({
								url: "/pages/detail/activity?uid=" + ress.data.parent_openid + "&lm_id=" + ress.data.lm_id
							});
						},
						fail() {
							mdl.goHomePage();
						}
					});
					// window.location.href = inter.domain;
				} else if (!mdl.isWeixin()) {
					uni.redirectTo({
						url: '/pages/index/index'
					});
				} else if (pageis == "ef") {
					uni.redirectTo({
						url: `/pages/detail/ef${pagekey}`
					});
				} else {
					uni.redirectTo({
						url: '/pages/user/index'
					});
				}
			}
			// let myStorage = mdl.getMyStorage("uWXInfo", "", funStor)
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

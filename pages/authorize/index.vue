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
				wxLoading: "微信授权中",
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
				} else if (!util.isWeixin()) {
					uni.switchTab({
						url: '/pages/index/index'
					});
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

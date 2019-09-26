<template>
	<view class="activity-box">
		<view class="video-box">
			<video id="myVideo" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
			 @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
		</view>
		<view class="saf-info">
			顶顶顶顶顶顶顶顶顶
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;
	export default {
		data() {
			return {
				userInfo: {}
			};
		},
		onLoad(option) {},
		onShow() {}
	}
</script>

<style>
	.activity-box {
		width: 100%;
	}

	#myVideo {
		width: 100%;
	}

	.saf-info {
		font-size: 32upx;
		padding: 15upx;
	}

	@media screen and (min-device-width: 1025px) {
		.activity-box {
			width: 1025px;
			margin: 0 auto;
			font-size: 14px;
			color: #333;
			line-height: 18px;
		}

		.video-box {
			width: 50%;
			margin: 0 auto;
			padding: 50px 0;
		}

		.saf-info {
			font-size: 14px;
			padding: 15px;
		}
	}
</style>

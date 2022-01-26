<template>
	<view class="ef-page-thx">
		<view class="page-cont">
			<view class="page-title">微信名片</view>
			<view class="line"></view>
			<view class="qrbox ">
				<img src="../../static/card/1.jpg" class="card" alt="">
				<view class="qrtxt ">长按下载名片，微信扫一扫</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '../../components/uni-icon.vue';
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				key: ""
			};
		},
		onLoad(option) {
			var _key = option.key;
			this.key = _key || ''
			uni.setNavigationBarTitle({
				title: ""
			});
		}
	}
</script>

<style scoped>
	.ef-page-thx {
		/* background:#0E0E0E; */
		width: 100%;
		height: 150%;
		min-height: 1200upx;
		color: #0E0E0E;
		background-size: contain;
		padding: 160upx 0 0;
	}

	.page-cont {
		width: 90%;
		margin: 0 auto;
	}

	.icon {
		width: 100%;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100upx;
	}

	.good-img {
		height: 100%;
		width: auto;
	}

	.line {
		width: 100upx;
		margin: 40upx auto;
		height: 2upx;
		overflow: hidden;
		background: #0E0E0E;
	}

	.page-title {
		font-weight: lighter;
		font-size: 46upx;
		text-align: center;
		line-height: 3;
		letter-spacing: 4upx;
	}

	.page-views {
		text-align: center;
		line-height: 2;
		font-size: 30upx;
		letter-spacing: 2upx;
		padding: 20upx 0 50upx;
	}

	.qrbox {
		text-align: center;
		color: #999;
	}

	.card {
		display: block;
		width: 80%;
		margin: 0 auto 40upx;
	}

	.qr-code2 {
		width: 80%;
	}
</style>

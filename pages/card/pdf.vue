<template>
	<view class="ef-page-thx">
		<view class="page-cont">
			<view class="page-title">名校课程对照表</view>
			<view class="line"></view>
			<view class="qrbox ">
				<a href="https://plbs-test-1257286922.cos.ap-shanghai.myqcloud.com/data/shitingke/dzb.pdf"
					class="linkBtn">
					<img src="../../static/card/pdf.jpg" class="card" alt="">
					<view class="qrtxt downBtn">
						下载 PDF
					</view>
				</a>
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

	.linkBtn {
		display: block;
		width: 100%;
		text-decoration: none;
	}

	.downBtn {
		display: inline;
		border: 1px solid #666;
		color: #333;
		border-radius: 5px;
		padding: 5px 15px;
	}

	.qr-code2 {
		width: 80%;
	}
</style>

<template>
	<view class="list-block uni-padding-wrap uni-common-mt">
		<view class="uni-card" v-for="(value,key) in list" :key="key">
			<view class="uni-card-content">
				<view class="uni-card-content-inner">
					<navigator class="service-head" :url="'/pages/detail/index?id='+value.id">
						<view class="ser-logo">
							<image lazy-load :src="sourceUrl+value.src" mode="aspectFill"/>
						</view>
						<view class="ser-body">
							<view class="ser-title">{{value.name}}</view>
							<view class="ser-describe" v-html="value.overview"></view>
							<view class="ser-price">市场价:￥{{value.market_price?value.market_price:"-"}}</view>
						</view>
						<view class="ser-tag">{{value.current_price&&value.current_price!="0.00"?"￥"+value.current_price:"免费"}}</view>
					</navigator>
					<view class="apply">
						<view class="apply-nums">
							<view class="apply-cell apply-left">
								<view class="txt-a txt-gray">已领</view>
								<view class="txt-a txt-orange uni-ellipsis">{{value.age_min}}人</view>
							</view>
							<view class="apply-cell apply-middle">
								<view class="txt-a txt-gray">好评率</view>
								<view class="txt-a txt-orange uni-ellipsis">{{value.praise}}</view>
							</view>
							<view class="apply-cell apply-right">
								<view class="txt-a txt-gray">地点</view>
								<view class="txt-a txt-orange uni-ellipsis" v-if="value.school">{{value.school}}</view>
								<view class="txt-a txt-orange" v-else>全国</view>
							</view>
						</view>
						<navigator :url="'/pages/detail/index?id='+value.id" class="apply-btn">立即申请</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "list-block",
		props: {
			list: {
				type: Array,
				default: []
			}
		}
	}
</script>

<style>
	.uni-card {
		-webkit-box-shadow: 1px 1px 8px rgba(0, 0, 0, .3);
		box-shadow: 1px 1px 8px rgba(0, 0, 0, .3);
		margin: 15px 0;
	}

	.uni-card-content-inner {
		padding: 15upx;
	}

	.service-head {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		position: relative;
		width: 100%;
		text-decoration: none;
		color: #282828;
	}

	.ser-logo {
		width: 150upx;
		height: 150upx;
	}

	.ser-logo>image {
		width: 100%;
		height: 100%;
	}

	.ser-body {
		width: 63%;
		padding-left: 10upx;
	}

	.ser-title {
		line-height: 1.4;
		padding-bottom: 5upx;
	}

	.ser-describe {
		line-height: 1.4;
		color: #525252;
		font-size: 24upx;
		margin-bottom: 5upx;
	}

	.ser-price {
		line-height: 2;
		color: #A7A7A7;
		font-size: 24upx;
	}

	.ser-tag {
		font-size: 24upx;
		background: #FE1512;
		text-align: center;
		padding: 0 15upx;
		line-height: 2;
		color: #fff;
		position: absolute;
		top: -14upx;
		right: -14upx;
		border-radius: 0 5upx 0 5px;
		background: linear-gradient(135deg, rgba(251, 212, 165, 1), rgba(247, 94, 92, 1));
	}

	.apply {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 10upx 0 0;
	}

	.apply-nums {
		width: 60%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	
	.apply-cell {
		display: flex;
		flex-direction: column;
		align-content: center;
		align-items: center;
		justify-content: center;
		width: 33.3%;
	}
	
	.apply-left,
	.apply-middle {
		border-right: 1px solid #CDCDCD;
	}

	.txt-a {
		line-height: 1.2;
		width: 100%;
		text-align: center;
	}

	.apply-btn {
		width: 35%;
		color: #fff;
		background: linear-gradient(to right, rgba(249, 215, 68, 1), rgba(252, 165, 38, 1));
		box-shadow: 1px 1px 5px rgba(249, 215, 68, 0.8);
		text-align: center;
		line-height: 2;
		border-radius: 10upx;
		font-size: 26upx;
		padding: 5upx 0;
	}
	.apply-btn-a{display: block;color: #fff;text-decoration: none;}

	.navTo {
		text-decoration: none;
		color: #282828
	}
</style>

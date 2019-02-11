<template>
	<view class="list-block uni-padding-wrap uni-common-mt">
		<view class="uni-card">
			<view class="uni-card-content">
				<view class="uni-card-content-inner">
					<navigator class="service-head" url="/pages/detail/index">
						<view class="ser-logo">
							<image lazy-load src="../../static/ef/customer_qrcode.png" mode="aspectFill"/>
						</view>
						<view class="ser-body">
							<view class="ser-title">英孚</view>
							<view class="ser-time">预约时间：2019-03-01</view>
						</view>
						<view class="ser-tag-res">免费</view>
					</navigator>
					<view class="apply-res">
						预约状态：预约成功 等待课程顾问联系
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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

	.ser-time {
		line-height: 2;
		color: #A7A7A7;
		font-size: 24upx;
	}

	.ser-tag-res {
		font-size: 28upx;
		text-align: center;
		padding: 0 15upx;
		line-height: 2;
		color: #333;
		position: absolute;
		top: -14upx;
		right: -14upx;
	}

	.apply-res {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 10upx 0 0;
		padding: 10upx 0 0;
		border-top: 1px solid #F5F5F5;
	}
</style>

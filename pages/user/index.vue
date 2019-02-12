<template>
	<view class="center-page">
		<view class="vbox">
			<view class="c-top">
				<view class="c-top-main">
					<view class="uni-card">
						<view class="uni-card-content">
							<view class="uni-card-content-inner">
								<view class="c-user-info">
									<view class="circle">
										<image class="head" src="{{userInfo.headimgurl}}" mode="widthFix"></image>
									</view>
									<view class="top-texts">
										<text class="top-txt name">{{userInfo.nickname?userInfo.nickname:"游客"}}</text>
										<view class="top-txt">
											<text>手机 </text>
											<text>{{userInfo.phone?userInfo.phone:"--"}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="center-main">
				<!-- <view class="cell">
					<view class="cell-left">
						<text class="cell-text">生日</text>
					</view>
					<view class="cell-right">
						<text class="cell-text-right">1990 / 01 / 01</text>
					</view>
				</view> -->
				<view class="cell">
					<view class="cell-left">
						<text class="cell-text">性别</text>
					</view>
					<view class="cell-right">
						<text class="cell-text-right">{{userInfo.sex&&userInfo.sex==1?"男":"女"}}</text>
					</view>
				</view>
				<!-- <view class="cell">
					<view class="cell-left">
						<text class="cell-text">邮箱</text>
					</view>
					<view class="cell-right">
						<text class="cell-text-right">123@qq.com</text>
					</view>
				</view> -->
				<view class="cell">
					<view class="cell-left">
						<text class="cell-text">联系我们</text>
					</view>
					<view class="cell-right">
						<text class="cell-text-right"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	const mdl = util.module;
	export default {
		data() {
			return {
				userInfo: {}
			};
		},
		onLoad() {
			var _this = this;
			var funStor = function(res) {
				_this.userInfo = res;
			}
			let myStorage = mdl.getMyStorage("uWXInfo", "", funStor)
		}
	}
</script>

<style>
	.c-top {
		background: url(../../static/set-top-bg.png) no-repeat 50% 0;
		background-size: 100% 90%;
		width: 100%;
	}

	.c-top-main {
		width: 90%;
		margin: 0 auto;
		padding-top: 160upx;
	}

	.c-user-info {
		display: flex;
		align-items: center;
	}

	.circle {
		width: 120upx;
		height: 120upx;
		border-radius: 150upx;
		overflow: hidden;
	}

	.head {
		width: 100%;
		height: 100%;
		border-radius: 150upx;
	}

	.top-texts {
		display: flex;
		flex-direction: column;
		margin-left: 30upx;
	}

	.top-txt {
		font-size: 34upx;
	}

	.center-main {
		display: flex;
		flex-direction: column;
		width: 80%;
		margin: 0 auto;
	}

	.cell {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #D3D3D3;
		height: 80upx;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0 0;
	}

	.cell:active {
		background-color: #333;
		color: white;
		box-shadow: 1upx 1upx 35upx #ccc;
	}

	.cell-text {
		color: #5c5c5c;
		font-size: 32upx;
	}

	.cell-text-right {
		color: #a7a7a7;
		font-size: 32upx;
	}
</style>

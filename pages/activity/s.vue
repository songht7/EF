<template>
	<view class="saf-page-main">
		<view class="swiper-block">
			<swiper class="swiper-box" indicator-dots="false" autoplay="autoplay" circular="circular" interval="3000" duration="500">
				<swiper-item v-for="(slide,index) in swiperList" :key="index">
					<view class="swiper-item">
						<view class="slide-info">
							<view class="s-inner">
								<img class="saf-logo" src="/static/saf.png" alt="saf">
								<img class="slide-info1" src="/static/slide_info1.png" alt="">
							</view>
						</view>
						<image class="slideImg" lazy-load="true" :src="slide.original_src" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="page-content page-inner">
			<view class="page-wrapper">
				<view class="page-block block-right">
					<view class="user-box">
						<view class="user-title">
							<!-- 免费获得 SAF 专业择校评估 -->
							<image class="title-img title-img-2" src="/static/title2.png" mode="aspectFit"></image>
						</view>
						<view class="user-main">
							<view class="tip-box" v-if="tipShow">
								{{tips}}
							</view>
							<view class="form-box">
								<form @submit="formSubmit">
									<view class="user-list">
										<view class="uni-list-row">
											姓名
										</view>
										<view class="uni-list-row">
											<input class="uni-input" name="name" placeholder="" value="" />
										</view>
									</view>
									<view class="user-list">
										<view class="uni-list-row">
											手机
										</view>
										<view class="uni-list-row">
											<input class="uni-input" name="phone" type="number" placeholder="" value="" />
										</view>
									</view>
									<view class="uni-btn">
										<button formType="submit" :loading="loading" class="saf-btn" :class="loading?'btn-loading':''">{{sentRes}}</button>
									</view>
									<view class="protect">
										<img class="icon-saf icon-suo" src="/static/suo.png" alt="">SAF 保护您的隐私
									</view>
								</form>
							</view>
						</view>
					</view>
				</view>
				<view class="page-block block-left">
					<view class="saf-title">
						<!-- <view class="saf-t">SAF 学生的共识</view> -->
						<img class="title-img title-img-1" src="/static/title1.png" alt="">
					</view>
					<view class="saf-ov">
						往届学生分享参加 SAF 学习项目的实际价值和生活变化经历
					</view>
					<view class="video-box">
						<img class="icon-saf icon-arw" src="/static/arw.png" alt="">
						<view class="video-main">
							<video id="myVideo" @error="videoErrorCallback" :src="video" :muted="muted" controls :autoplay="autoplay"></video>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="footer-main page-inner">
				<img class="footer-logo" src="/static/saf.png" alt="saf" />
				<view class="footer-left">
					海外学习体验助您脱颖而出
				</view>
				<view class="footer-right">
					<view class="r-list">
						入读知名大学
					</view>
					<view class="r-list">
						匹配适合的交流项目
					</view>
					<view class="r-list">
						转变人生的探险之旅
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	var graceChecker = require("../../common/graceChecker.js");
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;
	export default {
		data() {
			return {
				loading: false,
				videoContext: "",
				video: "/static/video-saf.mp4",
				autoplay: true,
				muted: false,
				swiperList: [{
					"original_src": "/static/slide1.jpg"
				}],
				api: "http://api_test.meetji.com/v2/ApiHome-saveSingle.htm",
				formData: {
					"name": "",
					"phone": "",
					"channel_code": "saf"
				},
				sentRes: "立即行动",
				tipShow: false,
				tips: "正在提交..."

			};
		},
		onLoad(option) {
			this.setShare();
		},
		onShow() {},
		onReady() {
			var vi = uni.createVideoContext('myVideo');
			this.videoContext = vi;
			vi.play();
		},
		methods: {
			setShare(dtl) {
				var that = this;
				var share_url = util.Interface.domain + "/?type='s'#/pages/activity/s",
					title = "免费获得 SAF 专业择校评估",
					imgUrl = util.Interface.domain + "/static/h5/saf.png",
					dec = "海外学习体验助您脱颖而出";
				mdl.wxShare(share_url, title, imgUrl, dec);
			},
			videoErrorCallback: function(e) {
				console.log(e.target.errMsg)
			},
			formSubmit: function(e) {
				var that = this;
				if (that.loading == true) {
					return
				}
				let formData = e.detail.value;
				var rule = [{
						name: "name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请填写姓名"
					},
					{
						name: "phone",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请填写正确的手机号"
					}
				];
				//进行表单检查
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var _data = {
						"name": formData.name,
						"phone": formData.phone
					};
					var _head = {
						"channel": "saf"
					};

					// var _data = {
					// 	"name": "xxxx",
					// 	"age_range": "123",
					// 	"sex": "男",
					// 	"phone": "123123123",
					// 	"article_id": 1
					// };
					// var _head = {
					// 	"openid": "oeH5Zw1gRAZpsj6PJC4h3-huJmzQ"
					// };

					let url = that.api; //apiurl + inter.addr.saveSingle; //
					console.log(_data)
					that.loading = true;
					that.tipShow = true;
					that.tips = "正在提交...";
					let sentSAF = function(res, resAll) {
						console.log(resAll)
						var _tip = "提交成功！！";
						if (!resAll.success) {
							_tip = "行动失败,请重试";
						}
						that.tips = _tip;
						setTimeout(function() {
							that.tipShow = false;
							that.tips = "正在提交...";
							that.loading = false;
						}, 2000);
					}
					let _sentSAF = mdl.getData(url, sentSAF, "POST", _data, _head);


				} else {
					that.tipShow = true;
					that.tips = graceChecker.error;
					this.loading = false
					setTimeout(() => {
						that.tipShow = false;
						that.tips = "正在提交...";
					}, 1000)
				}

			}
		}
	}
</script>

<style>
	.page-content {
		width: 100%;
		line-height: 1.4;
		padding-bottom: 60upx;
	}

	#myVideo {
		width: 100%;
		height: 400upx;
	}

	.video-box {
		position: relative;
	}

	.icon-arw {
		display: none;
		position: absolute;
		z-index: 2;
		left: 80%;
		top: -20px;
	}

	.video-main {
		position: relative;
		z-index: 1;
	}

	/*swiper-slide*/
	.swiper-box {
		width: 100%;
		height: 600upx;
	}

	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		align-content: flex-end;
		height: 100%;
		background: #eee;
		color: #fff;
		position: relative;
	}

	.slide-info {
		position: absolute;
		z-index: 1;
		width: 100%;
		padding-bottom: 108upx;
	}

	.s-inner {
		width: 96%;
		margin: 0 auto;
		padding: 10upx 2%;
		display: flex;
		justify-content: flex-start;
		align-content: flex-end;
		align-items: flex-start;
		flex-direction: column;
	}

	.saf-logo {
		width: 150upx;
		margin-bottom: 15upx;
	}

	.slide-info1 {
		max-width: 55%;
	}

	.slideImg {
		width: 100%;
		height: 100%;
		display: inline-block;
	}

	.page-inner {
		width: 96%;
		padding: 10upx 2%;
	}

	.page-wrapper {
		position: relative;
		z-index: 1;
		top: -108upx;
	}

	.block-left {
		position: relative;
		top: 50upx;
	}

	.title-img {
		width: 80%;
	}

	.title-img-1 {
		width: 45%;
	}

	.title-img-2{
		height: 100%;
		overflow: hidden;
	}

	.saf-title {
		margin-bottom: 15upx;
	}

	.saf-t {
		font-size: 34upx;
		font-weight: 500;
		color: #000;
		line-height: 2;
		display: inline;
		padding-bottom: 10upx;
		border-bottom: 5upx solid #f08422;
	}

	.saf-ov {
		font-size: 36upx;
		color: #000;
		line-height: 1.6;
		padding-bottom: 15upx;
	}

	.user-title {
		font-size: 36upx;
		color: #FFFFFF;
		background: #008ba9;
		height: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-content: center;
		align-items: center;
	}

	.user-main {
		min-height: 422upx;
		background: #0e3b5f;
		position: relative;
	}

	.tip-box {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 1;
		background: rgba(54, 54, 54, 0.1);
		color: #E9831F;
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-content: top;
		align-items: top;
		font-size: 38upx;
	}

	.form-box {
		padding: 35upx 35upx 0;
		color: #FFFFFF;
		font-size: 18upx;
	}


	.user-list {
		padding-bottom: 30upx;
	}

	.uni-list-row {
		font-size: 36upx;
	}

	.uni-input {
		color: #333333;
		height: 53upx;
	}

	.uni-btn {
		padding: 20upx 0;
	}

	.saf-btn {
		background: #f08422;
		color: #FFFFFF;
		border-radius: 0;
		font-size: 34upx;
		height: 80upx;
		display: flex;
		flex-direction: row;
		align-content: center;
		align-items: center;
		justify-content: center;
	}

	.btn-loading {
		background: #333333;
		color: #FFFFFF;
	}

	.protect {
		color: #FFFFFF;
		font-size: 16upx;
		padding-bottom: 30upx;
		text-align: right;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.icon-suo {
		margin-right: 10upx;
	}

	.footer {
		background: #3b3838;
	}

	.footer-main {
		min-height: 130upx;
		color: #CCCCCC;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-content: center;
		align-items: flex-start;
		padding: 20upx 10upx 30upx;
		position: relative;
	}

	.footer-logo {
		position: absolute;
		width: 100upx;
		right: 10upx;
		bottom: 45upx;
		opacity: 0.8;
	}

	.footer-left {
		font-size: 36upx;
	}

	.footer-right {
		font-size: 34upx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-content: center;
		align-items: flex-start;
	}

	.r-list {
		padding-left: 40upx;
		position: relative;
		margin-left: 20upx;
	}

	.r-list:before {
		position: absolute;
		left: 0;
		top: 30%;
		height: 10upx;
		width: 10upx;
		content: '';
		background: #E9831F;
	}

	/* @media screen and (min-device-width: 1025px) { */
	@media screen and (min-width:768px) {
		.page-inner {
			width: 750px;
			margin: 0 auto;
			padding: 0;
		}


		.slide-info {
			padding-bottom: 10px;
		}

		.saf-logo {
			width: 10%;
			margin-bottom: 10px;
		}

		.slide-info1 {
			max-width: 32%;
		}

		.icon-arw {
			display: block;
			left: -20px;
			top: 20%;
		}

		.page-content {
			font-size: 14px;
			color: #333;
			line-height: 18px;
		}

		.swiper-block {
			margin-bottom: 30px;
		}

		.swiper-box {
			height: 320px;
		}

		.page-wrapper {
			display: flex;
			flex-direction: row-reverse;
			justify-content: space-between;
			position: relative;
			z-index: 1;
			top: -95px;
			right: 0;
		}

		.page-block {
			width: 48%;
			padding: 0;
		}

		.title-img {
			width: auto;
		}

		.title-img-1 {
			width: auto;
		}
		.title-img-2{
			width: 80%;
		}

		.block-left {
			top: 0;
			padding-top: 95px;
		}

		.saf-title {
			margin-bottom: 15px;
		}

		.saf-t {
			font-size: 28px;
			line-height: 2;
			display: inline;
			padding-bottom: 8px;
			border-bottom: 5px solid #f08422;
		}

		.saf-ov {
			font-size: 16px;
			line-height: 1.6;
			padding-bottom: 15px;
		}

		#myVideo {
			height: 245px;
		}

		.user-title {
			font-size: 26px;
			height: 65px;
		}

		.user-main {
			min-height: 416px;
		}

		.form-box {
			padding: 35px 35px 0;
			font-size: 18px;
		}

		.tip-box {
			font-size: 26px;
		}

		.user-list {
			padding-bottom: 20px;
			/* margin-left: 20px; */
		}

		.uni-input {
			height: 38px;
		}

		.uni-btn {
			padding: 20px 0;
		}

		.saf-btn {
			font-size: 22px;
			height: 55px;
		}

		.protect {
			font-size: 16px;
			padding-bottom: 15px;
		}

		.icon-suo {
			margin-right: 10px;
		}

		.footer-main {
			min-height: 100px;
			flex-direction: row;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			padding: 0;
		}

		.footer-logo {
			display: none;
		}

		.footer-left {
			font-size: 18px;
		}

		.footer-right {
			font-size: 16px;
			flex-direction: row;
			justify-content: space-between;
			align-content: center;
			align-items: center;
		}

		.r-list {
			padding-left: 15px;
			margin-left: 15px;
		}

		.r-list:before {
			height: 10px;
			width: 10px;
		}
	}

	@media screen and (min-width:1004px) {
		.page-inner {
			width: 1004px;
		}

		.s-inner {
			width: 1004px;
			padding: 0;
		}


		.saf-logo {
			width: auto;
			margin-bottom: 15px;
		}

		.slide-info1 {
			max-width: 100%;
		}

		.slide-info {
			padding-bottom: 20px;
		}


		#myVideo {
			height: 270px;
		}

		.saf-ov {
			font-size: 18px;
		}

		.uni-list-row {
			font-size: 18px;
		}

		.swiper-box {
			height: 620px;
		}

		.user-title {
			font-size: 28px;
		}
		.title-img-2{
			width: 355px;
		}

		.footer-main {
			min-height: 130px;
		}

		.footer-left {
			font-size: 24px;
		}

		.footer-right {
			font-size: 18px;
		}

		.r-list {
			padding-left: 20px;
			margin-left: 20px;
		}

	}
</style>

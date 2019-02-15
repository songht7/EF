<template>
	<!-- <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
	 @scroll="scroll"> -->
	<view class="detail-page-ef">
		<view class="scroll-view-item detail-block">
			<view class="ef-top-box">
				<view class="scroll-view-item ef-top"></view>
				<view class="uni-padding-wrap uni-common-mt">
					<view class="uni-card">
						<view class="uni-card-content">
							<view class="uni-card-content-inner" id="ApplyFormBox">
								<view class="ef-title">专业认证培训师<br />教你地道英语</view>
								<view class="ef-title-sub">FOREIGN TEACHER<br />免费试听体验课</view>
								<form @submit="formSubmit" @reset="formReset" id="ApplyForm">
									<view class="form-box">
										<view class="uni-list">
											<view class="uni-list-cell">
												<view class="uni-list-cell-left">
													姓名
												</view>
												<view class="uni-list-cell-db">
													<input class="uni-input" name="UserName" placeholder="" />
												</view>
											</view>
										</view>
										<view class="uni-list">
											<view class="uni-list-cell">
												<view class="uni-list-cell-left">
													电话
												</view>
												<view class="uni-list-cell-db">
													<input class="uni-input" name="UserPhone" type="number" placeholder="" />
												</view>
											</view>
										</view>
										<view class="uni-list half-box">
											<view class="uni-list-cell">

												<view class="uni-list half">
													<view class="uni-list-cell">
														<view class="uni-list-cell-left">
															年龄
														</view>
														<view class="uni-list-cell-db">
															<picker name="Age" @change="bindChangeAge" :value="age_index" :range="age">
																<view class="uni-input">{{age[age_index]}}</view>
															</picker>
														</view>
														<uni-icon size="20" type="arrowdown" color="#DDDDDF"></uni-icon>
													</view>
												</view>
												<view class="uni-list half">
													<view class="uni-list-cell">
														<view class="uni-list-cell-left">
															性别
														</view>
														<view class="uni-list-cell-db">
															<picker name="Gender" @change="bindPickerChange" :value="index" :range="gender">
																<view class="uni-input">{{gender[index]}}</view>
															</picker>
														</view>
														<uni-icon size="20" type="arrowdown" color="#DDDDDF"></uni-icon>
													</view>
												</view>
											</view>
										</view>
										<view class="uni-list">
											<view class="uni-list-cell">
												<view class="uni-list-cell-left">
													城市
												</view>
												<view class="uni-list-cell-db">
													<input @click="showMulLinkageTwoPicker" class="uni-input" name="City" disabled :value="pickerText"
													 placeholder="" />
												</view>
											</view>
										</view>
										<view class="uni-list apply-date">
											<view class="uni-list-cell">
												<view class="uni-list-cell-left">
													可约时间
												</view>
												<view class="uni-list-cell-db">
													<picker mode="date" name="ApplyDate" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
														<view class="uni-input">{{date}}</view>
													</picker>
												</view>
											</view>
										</view>
									</view>
									<view class="uni-btn-v">
										<button formType="submit" :loading="loading" class="apply-btn">立即预约 免费听课</button>
										<button type="default" class="hide" formType="reset">Reset</button>
									</view>
								</form>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="ef-imgs ef-imgs-left">
				<image src="../../static/ef/img-1.png" class="ef-img" mode="aspectFit"></image>
				<view class="img-info img-left-bg">
					<view class="pro-txt">严格筛选的培训师</view>
					<view class="pro-desc">专业英语教学认证</view>
				</view>
			</view>
			<view class="ef-imgs ef-imgs-right">
				<image src="../../static/ef/img-2.png" class="ef-img" mode="aspectFit"></image>
				<view class="img-info img-right-bg">
					<view class="pro-txt">培训师全英语交流<br />来自美英加澳等国</view>
					<view class="pro-desc">培养你与世界对话的能力</view>
				</view>
			</view>
			<view class="ef-imgs ef-imgs-left">
				<image src="../../static/ef/img-3.png" class="ef-img" mode="aspectFit"></image>
				<view class="img-info img-left-bg">
					<view class="pro-txt">中文助教全程协助</view>
					<view class="pro-desc">耐心陪伴，菜鸟也能飞</view>
				</view>
			</view>
			<!-- <view @tap="goTop" class="apply-btn go-top goTopEF" id="GoTo">立即预约 免费听课</view> --><!-- v-if="btnShow" -->
			<view class="ef-imgs ef-imgs-center">
				<img src="../../static/ef/img-4.png" class="ef-img" alt="">
			</view>
			<img src="../../static/ef/footer-img.jpg" class="ef-img" alt="">
			<img src="../../static/ef/copyright.png" class="ef-img" alt="">
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
	<!-- </scroll-view> -->

</template>

<!-- #ifdef H5 -->
<!-- #endif -->
<script>
	import util from '../../common/util.js';
	const mdl = util.module;
	import uniIcon from '../../components/uni-icon.vue';
	//来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
	var graceChecker = require("../../common/graceChecker.js");
	var _jquery = require("@/static/h5/public.js");
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../common/city.data.js';
	const _interface = util.Interface;
	const duration = 2000;
	const brand = "";
	export default {
		data() {
			return {
				brand: "",
				key: "",
				date: "",
				gender: ['男', '女'],
				index: 0,
				age: ['18岁以下', '19-22岁', '23-26岁', '27-35岁', '36-40岁', '41-50岁', '51岁'],
				age_index: 0,
				loading: false,
				scrollTop: 0,
				btnShow: false,
				old: {
					scrollTop: 0
				},
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mulLinkageTwoPicker: cityData,
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: []
			};
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		components: {
			uniIcon,
			mpvuePicker,
			mpvueCityPicker
		},
		onLoad: function(option) {
			let _key = option.key || 2;
			let _detail = util.getList(_key);
			const brand = _detail.title;
			this.date = option.date || this.getDate({
				format: true
			});
			this.brand = _detail.title;
			this.key = _key;
			uni.setNavigationBarTitle({
				title: "英孚教育 卓著英语培训专家"
			});
			var title = "英孚教育 卓著英语培训专家",
				imgUrl = util.Interface.domain + "/static/ef/billboard.png",
				dec = "专业认证培训师，教你地道英语";
			mdl.wxShare("", title, imgUrl, dec);
			_jquery.setEffectCollect();
		},
		onReady: function() {
			//_jquery.efftest();
		},
		onShow() {
			//console.log("onShow");
		},
		methods: {
			upper: function(e) {
				//console.log(e)
			},
			lower: function(e) {
				//console.log(e)
			},
			scroll: function(e) {
				//console.log(e)
				if (e.detail.scrollTop > 600) {
					this.btnShow = true;
				} else {
					this.btnShow = false;
				}
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				// 				this.scrollTop = this.old.scrollTop
				// 				this.$nextTick(function() {
				// 					this.scrollTop = 0
				// 				});
			},
			bindChangeAge: function(e) {
				this.age_index = e.target.value
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			onCancel: function(e) {
				//console.log(e)
			},
			onConfirm: function(e) {
				//console.log(JSON.stringify(e))
				this.pickerText = e.label;
			},
			showMulLinkageTwoPicker: function(e) {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			onBackPress: function(e) {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel();
					return true;
				}
				if (this.$refs.mpvueCityPicker.showPicker) {
					this.$refs.mpvueCityPicker.pickerCancel();
					return true;
				}
			},
			onUnload: function(e) {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel()
				}
				if (this.$refs.mpvueCityPicker.showPicker) {
					this.$refs.mpvueCityPicker.pickerCancel()
				}
			},
			formSubmit: function(e) {
				let _this = this;
				if (this.loading == true) {
					return
				}
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let formData = e.detail.value;
				this.loading = true
				var rule = [{
						name: "UserName",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请填写姓名"
					},
					{
						name: "UserPhone",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请填写正确的手机号"
					}, {
						name: "City",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择城市"
					}
				];
				//进行表单检查
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var _data = {
						"预约品牌": "EF英孚教育 - 专业认证培训师 - 免费试听体验课",
						"客户姓名": formData.UserName,
						"客户手机号": formData.UserPhone,
						"年龄": _this.age[formData.Age],
						"性别": _this.gender[formData.Gender],
						"城市": formData.City
					};
					console.log(_data);
					var fun = function(result) {
						if (result.success) {
							uni.navigateTo({
								url: "/pages/detail/thx?key=" + _this.key
							});
						} else {
							uni.showModal({
								content: "预约失败",
								showCancel: false
							})
						}
						_this.loading = false
						_this.res = JSON.stringify(result);
					}
					_jquery.sendMail(_interface.SendMail, _data, fun)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					this.loading = false
				}

			},
			formReset: function(e) {
				//console.log(e)
			},
			getDate(type) {
				const date = new Date();

				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	.scroll-Y {
		height: 1800upx;
	}

	.detail-page-ef {
		background: url(../../static/ef/billboard.png) 50% 0 no-repeat;
		background-size: contain;
	}

	.ef-top {
		height: 330upx;
	}

	.uni-list {
		margin-bottom: 15upx;
	}

	.form-box>.uni-list:last-child {
		margin-bottom: 0;
	}

	.form-box {
		border: 2upx solid #E4E3E6;
		border-bottom: 0;
	}

	.uni-list:before {
		background: none
	}

	.half-box:after {
		background: none;
	}

	.radio-block {
		padding-left: 20upx;
	}

	.uni-input {
		background: #fff;
		padding: 14upx 5upx;
	}

	.half {
		width: 50%;
		display: flex;
	}

	.uni-list.half {
		margin-bottom: 0;
	}

	.apply-btn {
		width: 100%;
		margin: 20upx auto;
		color: #fff;
		background: #E40088;
		text-align: center;
		line-height: 2.4;
		border-radius: 0;
		letter-spacing: 3upx;
		font-size: 32upx;
		padding: 5upx 0;
	}

	.go-top {
		display: none;
		width: 86%;
		position: fixed;
		bottom: 0;
		left: 7%;
		z-index: 2;
	}

	.apply-date {
		display: none;
	}

	.ef-title {
		font-size: 50upx;
		color: #000;
		line-height: 1.3;
		font-weight: 600;
		padding-bottom: 20upx;
	}

	.ef-title-sub {
		font-size: 30upx;
		line-height: 1.3;
		padding-bottom: 40upx;
	}

	.ef-imgs {
		width: 95%;
		padding-bottom: 60upx;
		line-height: 0;
	}

	.ef-img {
		max-width: 100%;
		display: block;
	}

	.ef-imgs-right {
		margin-left: 5%;
	}

	.img-info {
		width: 90%;
		border: 10upx solid #F2F2F2;
		border-width: 0 10upx 10upx 0;
		padding: 20upx 0;
		text-align: right;
	}

	.img-right-bg {
		text-align: left;
		border-width: 0 0 10upx 10upx;
		margin-left: 10%;
	}

	.pro-txt,
	.pro-desc {
		color: #231f20;
		font-size: 44upx;
		line-height: 1.4;
		padding: 6upx 40upx;
		letter-spacing: 4upx;
	}

	.pro-desc {
		font-size: 24upx;
	}

	.ef-imgs-center {
		width: 100%;
		text-align: center;
	}
</style>

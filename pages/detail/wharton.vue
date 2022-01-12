<template>
	<!-- <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
	 @scroll="scroll"> -->
	<view class="page detail-page detail-page-mx detail-page-ef-2">
		<view class="scroll-view-item detail-block">
			<view class="ef-imgs ef-imgs-center">
				<img src="../../static/wharton/1.jpg" class="ef-img" alt="">
			</view>
			<view class="ef-top-box">
				<!-- <uni-icon size="35" @tap="makePhoneCall" class="makePhoneCall" type="phone-filled" color="#000"></uni-icon> -->
				<!-- <view class="goHomePage" @click="goHomePage">
					<uni-icon size="30" type="home-filled" color="#DDDDDF"></uni-icon>
				</view> -->
				<view class="uni-card-box">
					<view class="uni-cards">
						<view class="uni-card-content">
							<view class="uni-card-content-inner ApplyFormBox">
								<!-- <view class="ef-title">wharton</view>
								<view class="ef-title-s"></view> -->
								<form @submit="formSubmit" @reset="formReset" id="ApplyForm">
									<view class="form-box">
										<view class="uni-list">
											<view class="uni-list-cell">
												<!-- <view class="uni-list-cell-left">
													姓名
												</view> -->
												<view class="uni-list-cell-db">
													<input :class="model?'uni-input':''" name="UserName"
														placeholder="您的姓名" />
												</view>
											</view>
										</view>
										<view class="uni-list">
											<view class="uni-list-cell">
												<!-- <view class="uni-list-cell-left">
													电话
												</view> -->
												<view class="uni-list-cell-db">
													<input :class="model?'uni-input':''" name="UserPhone" type="number"
														placeholder="您的电话" />
												</view>
											</view>
										</view>
										<view class="uni-list">
											<view class="uni-list-cell">
												<!-- <view class="uni-list-cell-left">
													年龄
												</view> -->
												<block v-if="model">
													<view class="uni-list-cell-db">
														<picker name="Age" @change="bindChangeAge" :value="age_index"
															:range="age" placeholder="您的工作经验">
															<view :class="['uni-input',age_index<0?'age-select':'']">
																{{age_index>=0?age[age_index]:'您的工作经验'}}
															</view>
														</picker>
													</view>
													<uni-icon size="20" type="arrowdown" color="#DDDDDF"></uni-icon>
												</block>
												<block v-else>
													<input class="" name="Age" placeholder="" />
												</block>
											</view>
										</view>
										<!-- <view class="uni-list">
											<view class="uni-list-cell">
												<view class="uni-list-cell-db">
													<input :class="model?'uni-input':''" name="Email" placeholder="邮箱" />
												</view>
											</view>
										</view> -->
									</view>
									<view class="uni-btn-v">
										<button formType="submit" :loading="loading" class="apply-btn">立即了解课程详情</button>
										<button type="default" class="hide" formType="reset">Reset</button>
									</view>
								</form>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view @tap="goTop" class="apply-btn go-top goTopEF GoTo">立即了解课程详情</view>
			<!-- v-if="btnShow" -->
			<view class="ef-imgs ef-imgs-center">
				<img src="../../static/wharton/2.jpg" class="ef-img" alt="">
				<img src="../../static/wharton/3.jpg" class="ef-img" alt="">
				<img src="../../static/wharton/4.jpg" class="ef-img" alt="">
				<img src="../../static/wharton/5.jpg" class="ef-img" alt="">
				<img src="../../static/wharton/6.jpg" class="ef-img" alt="">
				<img src="../../static/wharton/7.jpg" class="ef-img" alt="">
				<!-- <img src="../../static/wharton/cr.png" class="ef-img" alt=""> -->
				<view style="padding-bottom: 80upx;background-color: #000000;">
					<copyright></copyright>
				</view>
			</view>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm" @onCancel="onCancel"
			:pickerValueArray="pickerValueArray"></mpvue-picker>
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
	const inter = util.Interface;
	const apiurl = inter.apiurl;

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
				model: "",
				platform: "",
				article_id: 35,
				brand: "",
				key: "",
				date: "",
				gender: ['男', '女'],
				index: 0,
				age: ['5年以下', '5-10年', '15-20年', '20年以上'],
				age_index: -1,
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
				pickerValueArray: [],
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
				title: "沃顿商学院 管理发展"
			});
			// _jquery.setEffectCollect();
		},
		onReady: function() {
			//_jquery.efftest();
		},
		onShow() {
			var that = this;
			let hash = window.location.hash;
			var share_url = util.Interface.domain + "/?type=ef8&id=999" + hash,
				title = "沃顿商学院 管理发展",
				imgUrl = util.Interface.domain + "/static/wharton/1.jpg",
				dec = "沃顿商学院 管理发展";
			mdl.wxShare(share_url, title, imgUrl, dec);
			//console.log("onShow");
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					that.model = res.model;
					that.platform = res.platform;
				}
			})
		},
		methods: {
			goHomePage() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
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
			makePhoneCall: function() {
				uni.makePhoneCall({
					phoneNumber: "",
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			formSubmit: function(e) {
				let _this = this;
				if (this.loading == true) {
					return
				}
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let formData = e.detail.value;
				// return
				this.loading = true
				formData["Age"] = _this.age[_this.age_index] ? _this.age[_this.age_index] : '';
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
						name: "Age",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择工作经验"
					},
					// {
					// 	name: "Email",
					// 	checkType: "email",
					// 	checkRule: "",
					// 	errorMsg: "请填写正确的邮箱"
					// }, 
				];
				if (!_this.model) {
					let _rule = [{
						name: "Age",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择工作经验"
					}]
					// rule = [...rule, ..._rule];
				}
				// console.log(rule)
				// console.log(formData)
				// return
				//进行表单检查
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var _data = {
						"预约品牌": "沃顿商学院 管理发展 - 来自试听课网",
						"客户姓名": formData.UserName,
						"工作经验": formData.Age,
						"客户手机号": formData.UserPhone
					};
					// console.log(_data);
					// return
					/** request-1 send email **/
					var sendMail_key = 0;
					var fun = function(result) {
						// if (result.success) {} else {
						// 	uni.showModal({
						// 		content: "预约失败",
						// 		showCancel: false
						// 	})
						// }
						_this.loading = false
						_this.res = JSON.stringify(result);
					}
					var emails = _interface.SendMail.email; //email,testEmail
					var sendMailUrl = _interface.SendMail.url;
					emails.forEach((value, index, array) => {
						sendMail_key++;
						let inter = sendMailUrl + value;
						_jquery.sendMail(inter, _data, fun);
					})

					/** request-2 save to DB **/
					var _href = window.location.href;
					var fun2DB = function(result) {
						console.log("=====fun2DB======")
						console.log(result)
						if (result) {
							uni.navigateTo({
								url: "/pages/detail/thx?key=wharton"
							});
						} else {
							uni.showModal({
								content: "预约失败",
								showCancel: false
							})
						}
					}
					var data2DB = {
						"name": formData.UserName + ' - 沃顿商学院 管理发展',
						"age_range": formData.Age,
						"note": "工作经验：" + formData.Age,
						"sex": formData.Email, //_this.gender[formData.Gender],
						"phone": formData.UserPhone,
						"city": formData.City,
						"school": "", //this.schoolId,
						"article_id": _this.article_id,
						"arrive_time": formData.ApplyDate ? formData.ApplyDate : ""
					};
					let url_saveSingle = apiurl + inter.addr.saveSingle;
					console.log(data2DB)
					let _saveSingle = mdl.getData(url_saveSingle, fun2DB, "POST", data2DB, {});

					/** request-3 POST to EF **/
					var _city = formData.City;
					var data3EF = {
						"firstname": formData.UserName,
						"lastname": formData.UserName,
						"mobilephone": formData.UserPhone,
						"telephone": formData.UserPhone,
						"age": _this.age[formData.Age],
						"gender": _this.gender[formData.Gender],
						"state": _city.split("-")[0],
						"city": _city.split("-")[1],
						"district": _city.split("-")[1],
						"emailenglish": "",
						"emaillist": "4,5",
						"formType": "CNMK",
						"ctr": "CTR",
						"partner": "",
						"local": "CN",
						"etag": "",
						"omnitureFriendlyName2": "Offline_Redeem_API",
						"lang": "CS",
						"lng": "CS",
						"savelocation": "AgentRequest",
						"responseType": "JsonP",
						"jsonpcallback": ""
					};
					//https://secure.englishtown.cn/online/cn/cnleadshandler.ashx
					let url_EF = "http://qa.englishtown.cn/online/cn/cnleadshandler.ashx";
					// console.log("url_EF:", url_EF)
					// console.log(data3EF)
					// let post2EF = mdl.getData(url_EF, "", "POST", data3EF, {});
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
	.goHomePage {
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		flex-direction: column;
		position: fixed;
		top: 20upx;
		right: 20upx;
		z-index: 5;
		background: rgba(120, 120, 120, 0.5);
		border-radius: 50%;
		width: 60upx;
		height: 60upx;
		line-height: 2;
	}

	.age-select,
	.uni-input-placeholder {
		color: #808080;
	}

	.scroll-Y {
		height: 1800upx;
	}

	.makePhoneCall {
		position: absolute;
		top: 30upx;
		right: 40upx;
	}


	.uni-list {
		margin-bottom: 25upx;
		border: 2upx solid rgb(140, 140, 140);
		border-radius: 10upx;
		overflow: hidden;
	}

	.form-box>.uni-list:last-child {
		margin-bottom: 0;
	}

	.form-box {
		border-bottom: 0;
	}

	.uni-list:before,
	.uni-list::after {
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
		padding: 15upx 20upx;
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
		background: #982520;
		text-align: center;
		line-height: 2.4;
		border-radius: 10upx;
		letter-spacing: 3upx;
		font-size: 32upx;
		padding: 5upx 0;
	}

	.go-top {
		background-color: #982520;
		display: none;
		width: 86%;
		position: fixed;
		bottom: 0;
		left: 7%;
		z-index: 2;
		font-size: 32upx;
		line-height: 2.4;
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

	.ef-title-s {
		font-size: 40upx;
		font-weight: 600;
		padding: 0 20upx 20upx;
	}

	.ef-title-sub {
		font-size: 30upx;
		line-height: 1.3;
		padding-bottom: 40upx;
	}

	.clr-red {
		color: #f40;
	}

	.ef-imgs {
		width: 95%;
		padding-bottom: 30upx;
		line-height: 0;
	}

	.ef-imgs:last-child {
		padding-bottom: 0;
	}

	.ef-img {
		max-width: 100%;
		display: block;
	}

	.ef-img-logo {
		max-width: 45%;
		margin: 20upx 20upx 0 20upx;
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

	@media screen and (min-device-width: 1025px) {
		.uni-list {
			margin-bottom: 5px;
		}

		uni-input input {
			height: 25px;
			min-height: 25px;
		}

		.uni-input {
			height: 25px;
		}

		.uni-card-content-inner {
			padding: 15px;
		}

		.uni-input {
			padding: 10px;
			line-height: 1.4;
		}

		.detail-page-mx {
			max-width: 640px;
			margin: 0 auto;
		}

		.ef-title-s {
			font-size: 18px;
		}

		.ef-title-sub {
			font-size: 16px;
			line-height: 2;
			padding-bottom: 15px;
		}

		.ef-imgs {
			margin-bottom: 10px;
			padding-bottom: 10px;
		}

		.ef-img {
			width: 100%;
		}

		.uni-picker-item {
			font-size: 14px !important;
			line-height: 1.4 !important;
		}

		.uni-btn-v {
			padding: 5px 0;
		}

		.apply-btn {
			margin: 5px auto;
			font-size: 16px;
			line-height: 1.4;
		}

		.go-top {
			font-size: 16px;
			line-height: 1.4;
		}
	}
</style>

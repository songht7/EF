<template>
	<!-- <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
	 @scroll="scroll"> -->
	<view class="page detail-page detail-page-mx detail-page-ef-2">
		<view class="scroll-view-item detail-block">
			<view class="ef-imgs ef-imgs-center">
				<img src="../../static/ef/p2-logo-icon.png" class="ef-img ef-img-logo" alt="">
			</view>
			<view class="ef-imgs ef-imgs-center">
				<img src="../../static/branner-ef8.jpg" class="ef-img" alt="">
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
								<view class="ef-title">《每日e课》每刻进步</view>
								<view class="ef-title-s">还在打游戏浪费时间？不如每天5分钟，学习英语提升自己！</view>
								<form @submit="formSubmit" @reset="formReset" id="ApplyForm">
									<view class="form-box">
										<view class="uni-list">
											<view class="uni-list-cell">
												<!-- <view class="uni-list-cell-left">
													姓名
												</view> -->
												<view class="uni-list-cell-db">
													<input :class="model?'uni-input':''" name="UserName" placeholder="姓名" />
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
														<picker name="Age" @change="bindChangeAge" :value="age_index" :range="age" placeholder="年龄">
															<view :class="['uni-input',age_index<0?'age-select':'']">{{age_index>=0?age[age_index]:'年龄'}}</view>
														</picker>
													</view>
													<uni-icon size="20" type="arrowdown" color="#DDDDDF"></uni-icon>
												</block>
												<block v-else>
													<input class="" name="Age" placeholder="" />
												</block>
											</view>
										</view>
										<view class="uni-list">
											<view class="uni-list-cell">
												<!-- <view class="uni-list-cell-left">
													电话
												</view> -->
												<view class="uni-list-cell-db">
													<input :class="model?'uni-input':''" name="UserPhone" type="number" placeholder="电话" />
												</view>
											</view>
										</view>
										<!-- <view class="uni-list">
											<view class="uni-list-cell">
												<view class="uni-list-cell-db">
													<input :class="model?'uni-input':''" name="Email" placeholder="邮箱" />
												</view>
											</view>
										</view> -->
										<view class="uni-list">
											<view class="uni-list-cell">
												<!-- <view class="uni-list-cell-left">
													城市
												</view> -->
												<block v-if="model">
													<view class="uni-list-cell-db">
														<input @click="showMulLinkageTwoPicker" class="uni-input" name="City" disabled :value="pickerText"
														 placeholder="城市" />
													</view>
												</block>
												<block v-else>
													<view class="uni-list-cell-db">
														<input class="" name="City" placeholder="城市" />
													</view>
												</block>
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
										<button formType="submit" :loading="loading" class="apply-btn">立即订阅</button>
										<button type="default" class="hide" formType="reset">Reset</button>
									</view>
								</form>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view @tap="goTop" class="apply-btn go-top goTopEF GoTo">立即订阅《每日e课》</view>
			<!-- v-if="btnShow" -->
			<view class="ef-imgs ef-imgs-center">
				<img src="../../static/ef5/s1-title.png" class="ef-img" alt="">
				<swiper-block :swiperList="swiperList" swiperHeight="1100upx" :autoplay="false" :circular="false"></swiper-block>
			</view>
			<view class="ef-imgs ef-imgs-center">
				<img src="../../static/ef5/s2-title.png" class="ef-img" alt="">
				<swiper-block :swiperList="swiperList2" swiperHeight="400upx" :autoplay="false" :circular="false"></swiper-block>
			</view>
			<view class="ef-imgs ef-imgs-center">
				<img src="../../static/ef5/p1.png" class="ef-img" alt="">
				<img src="../../static/ef5/p2.png" class="ef-img" alt="">
				<!-- <img src="../../static/ef5/cr.png" class="ef-img" alt=""> -->
				<view style="padding-bottom: 80upx;background-color: #000000;">
					<copyright></copyright>
				</view>
			</view>
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
				age: ['18-22岁', '23-26岁', '27-35岁', '36-40岁', '41-50岁', '51岁', '18岁以下'],
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
				"swiperList": [{
					"original_src": "/static/ef5/s1-1.png",
					"host": "local",
					"link": ""
				}, {
					"original_src": "/static/ef5/s1-2.png",
					"host": "local",
					"link": ""
				}, {
					"original_src": "/static/ef5/s1-3.png",
					"host": "local",
					"link": ""
				}],
				"swiperList2": [{
					"original_src": "/static/ef5/s2-1.png",
					"host": "local",
					"link": ""
				}, {
					"original_src": "/static/ef5/s2-2.png",
					"host": "local",
					"link": ""
				}, {
					"original_src": "/static/ef5/s2-3.png",
					"host": "local",
					"link": ""
				}, {
					"original_src": "/static/ef5/s2-4.png",
					"host": "local",
					"link": ""
				}, {
					"original_src": "/static/ef5/s2-5.png",
					"host": "local",
					"link": ""
				}, {
					"original_src": "/static/ef5/s2-6.png",
					"host": "local",
					"link": ""
				}],
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
				title: "英孚教育 英语培训中心"
			});
			// _jquery.setEffectCollect();
		},
		onReady: function() {
			//_jquery.efftest();
		},
		onShow() {
			var that = this;
			let hash = window.location.hash;
			var share_url = util.Interface.domain + "/?type=ef8&id=35" + hash,
				title = "英孚教育 英语培训中心",
				imgUrl = util.Interface.domain + "/static/ef/p2-banner.jpg",
				dec = "专业认证培训师，教你地道英语";
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
					}, {
						name: "Age",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择年龄"
					},
					{
						name: "UserPhone",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请填写正确的手机号"
					},
					// {
					// 	name: "Email",
					// 	checkType: "email",
					// 	checkRule: "",
					// 	errorMsg: "请填写正确的邮箱"
					// }, 
					{
						name: "City",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择城市"
					}
				];
				if (!_this.model) {
					let _rule = [{
							name: "Age",
							checkType: "notnull",
							checkRule: "",
							errorMsg: "请填写年龄"
						},
						{
							name: "Gender",
							checkType: "notnull",
							checkRule: "",
							errorMsg: "请填写性别"
						}
					]
					// rule = [...rule, ..._rule];
				}
				// console.log(rule)
				// console.log(formData)
				// return
				//进行表单检查
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var _data = {
						"预约品牌": "EF英孚教育 - 英语培训中心 - 免费试听体验课",
						"客户姓名": formData.UserName,
						"年龄": formData.Age,
						"客户手机号": formData.UserPhone,
						"城市": formData.City
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
								url: "/pages/detail/thx?key=" + _this.key
							});
						} else {
							uni.showModal({
								content: "预约失败",
								showCancel: false
							})
						}
					}
					var data2DB = {
						"name": formData.UserName + ' - ef11《每日e课》',
						"age_range": formData.Age,
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
		background: #ff329b;
		text-align: center;
		line-height: 2.4;
		border-radius: 10upx;
		letter-spacing: 3upx;
		font-size: 32upx;
		padding: 5upx 0;
	}

	.go-top {
		background-color: #009eeb;
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

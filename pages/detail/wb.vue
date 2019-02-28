<template>
	<view class="detail-page" id="Weibo-Page">
		<view class="wb-block wb-head">
			<img class="wb-logo" src="../../static/wb/head_logo2.png" />
			<img class="wb-logo" src="../../static/wb/head_logo-wb.png" />
		</view>
		<view class="wb-block">
			<img class="wb-imgs" src="../../static/wb/m2_header.jpg" />
			<img class="wb-imgs" src="../../static/wb/wb.jpg" />
		</view>
		<view class="wb-block wb-register">
			<!-- 预约块 -->
			<view class="">
				<view class="reg-view-head">
					<view class="reg-view">30秒立即注册</view>
					<view class="reg-view">立获298元体验课大礼包</view>
				</view>
				<view class="uni-padding-wrap uni-common-mt">
					<view class="uni-card">
						<view class="uni-card-content">
							<view class="uni-card-content-inner">
								<view class="apply-block ApplyFormBox" id="ApplyFormBox">
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
											<view class="uni-list">
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
										</view>
										<view class="uni-btn-v">
											<button formType="submit" :loading="loading" class="apply-btn">立即领取</button>
											<button type="default" class="hide" formType="reset">Reset</button>
										</view>
									</form>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<img class="wb-imgs" src="../../static/wb/1.jpg" />
		<img class="wb-imgs" src="../../static/wb/2.jpg" />
		<img class="wb-imgs" src="../../static/wb/3.jpg" />
		<img class="wb-imgs" src="../../static/wb/4.jpg" />
		<img class="wb-imgs" src="../../static/wb/5.jpg" />
		<img class="wb-imgs" src="../../static/wb/6.jpg" />
		<img class="wb-imgs" src="../../static/wb/7.jpg" />
		<view class="wb-block">
			<img src="../../static/qrcode1.png" alt="英语" class="qrcodefot" />
		</view>
		<view @tap="goTo" v-if="btnShow" class="goTo" id="GoTo">立即领取</view>

		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;
	var graceChecker = require("../../common/graceChecker.js");
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import lvvPopup from '../../components/lvv-popup.vue'
	import cityData from '../../common/city.data.js';
	import cityDataWb from '../../common/city.data.wb.js';
	const duration = 2000;
	const brand = "";

	import uniIcon from '../../components/uni-icon.vue'
	export default {
		data() {
			return {
				brand: "",
				key: "",
				date: "",
				gender: ['男', '女'],
				index: 0,
				age: ['3-6岁', '7-9岁', '10-12岁', '13-15岁', '16-18岁', '18岁以上'],
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
				mulLinkageTwoPicker: cityDataWb,
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: []
			}
		},
		computed: {},
		components: {
			uniIcon,
			mpvuePicker,
			mpvueCityPicker
		},
		onLoad(option) {
			var _this = this;
		},
		onShow() {
			let hash = window.location.hash;
			var share_url = util.Interface.domain + "/?type=wb&id=20"+hash,
				title = "韦博教育",
				imgUrl = util.Interface.domain + "/static/wb/logo.png",
				dec = "开心豆少儿英语，青少年英语";
			mdl.wxShare(share_url, title, imgUrl, dec);
			//console.log("onShow");
		},
		onPageScroll(e) {
			var that = this;
			let view = uni.createSelectorQuery().select("#ApplyFormBox");
			view.fields({
				rect: true
			}, function(res) {
				let _top = res.top;
				if (_top <= -350) {
					that.btnShow = true
				} else {
					that.btnShow = false
				}
			}).exec();
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
			goTo: function(e) {
				uni.pageScrollTo({
					scrollTop: 100,
					duration: 300
				})
			},
			bindChangeAge: function(e) {
				let c_age_index = this.age_index;
				let _age_index = e.target.value;
				if (c_age_index != _age_index) {
					this.age_index = _age_index;
					this.pickerText = "";
					if (_age_index <= 0) {
						this.mulLinkageTwoPicker = cityDataWb;
					} else {
						this.mulLinkageTwoPicker = cityData;
					}
				}
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
						"预约品牌": "韦博 - 少儿 - 青少年",
						"客户姓名": formData.UserName,
						"客户手机号": formData.UserPhone,
						"年龄": _this.age[formData.Age],
						"城市": formData.City
					};
					//console.log(_data);
					/** request-1 send email **/
					var fun = function(result) {
						if (result == "Message has been sent") {
							uni.navigateTo({
								url: "/pages/detail/thx?key=wb"
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
					mdl.getData(inter.SendMail, fun, "POST", _data);

					/** request-2 save to DB **/
					var _href = window.location.href;
					var data2DB = {
						"name": formData.UserName,
						"phone": formData.UserPhone,
						"age_range": _this.age[formData.Age],
						"city": formData.City,
						"sex": "",
						"school": "", //this.schoolId,
						"article_id": 20,
						"arrive_time": "" //formData.ApplyDate
					};
					let url_saveSingle = apiurl + inter.addr.saveSingle;
					let _saveSingle = mdl.getData(url_saveSingle, "", "POST", data2DB, {});
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
	@import "./detail.css";

	.wb-head {
		/* background: #00693E; */
		padding: 20upx;
		display: flex;
		height: 100upx;
		justify-content: space-between;
		align-items: center;
		align-content: center;
	}

	.wb-logo {
		height: 80%;
	}

	.wb-register {
		background: #DAE248;
		padding: 40upx 0;
	}

	.reg-view-head {
		padding-bottom: 30upx;
	}

	.reg-view {
		text-align: center;
		font-size: 28upx;
		line-height: 1.6;
	}

	.wb-imgs {
		display: block;
		width: 100%;
	}
</style>

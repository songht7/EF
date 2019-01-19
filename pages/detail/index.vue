<template>
	<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
	 @scroll="scroll">
		<view class="detail-page">
			<view class="detail-block">
				<view class="swiper-box" v-if="detail.image">
					<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="3000" duration="1000"
					 indicator-color="#979797" indicator-active-color="#FFFFFF">
						<swiper-item class="swiper-item" v-for="(slide,index) in detail.image" :key="index">
							<view class="vli">
								<view class="vli2">
									<image class="slideImg" :src="sourceUrl+slide.original_src" mode="aspectFill"></image>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="card-box">
					<view class="uni-padding-wrap uni-common-mt">
						<view class="uni-card">
							<view class="uni-card-content">
								<view class="uni-card-content-inner dtlHead">
									<view class="ser-title txt-orange">
										{{detail.name}}
									</view>
									<view class="ser-abstract txt-black">
										{{detail.overview}}
									</view>
									<view class="ser-feature txt-gray">
										市场价:￥{{detail.market_price?detail.market_price:"-"}}
									</view>
									<view class="ser-tag">{{detail.current_price&&detail.current_price!="0.00"?"￥"+detail.current_price:"免费"}}</view>
									<view class="apply-num">
										<view class="apply-cell apply-left">
											<view class="txt-gray">已领</view>
											<view class="txt-orange">199人</view>
										</view>
										<view class="apply-cell apply-middle">
											<view class="txt-gray">好评率</view>
											<view class="txt-orange">{{detail.praise}}</view>
										</view>
										<view class="apply-cell apply-right">
											<view class="txt-gray">地点</view>
											<view class="txt-orange">
												{{schoolDtl.length>1?"全国":schoolDtl.region_name}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>

					<view class="uni-padding-wrap uni-common-mt">
						<view class="uni-title">
							<view class="introduction">
								<view class="h3 txt-black">课程介绍</view>
								<view class="lesson-content txt-light-black" v-html="detail.detail"></view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="detail-block">
				<view class="comments">
					评论<uni-icon size="32" type="arrowright" color="#BDBDBD"></uni-icon>
				</view>
				<view class="uni-padding-wrap">
					<!-- 评论区 start -->
					<view class="uni-comment">
						<!-- <view class="uni-comment-list" v-for="(value,key) in detail.comment.list" :key="key"> -->
						<view class="uni-comment-list">
							<view class="uni-comment-face">
								<!-- <image src="../../static/logo.png" mode="widthFix"></image> -->
								<uni-icon size="55" type="contact" color="#DDDDDF"></uni-icon>
							</view>
							<view class="uni-comment-body">
								<view class="uni-comment-top">匿名者</view>
								<view class="uni-comment-date">
									<view class="star">
										<uni-icon size="16" type="star-filled" color="#F7A631"></uni-icon>
										<uni-icon size="16" type="star-filled" color="#F7A631"></uni-icon>
										<uni-icon size="16" type="star-filled" color="#F7A631"></uni-icon>
										<uni-icon size="16" type="star-filled" color="#F7A631"></uni-icon>
										<uni-icon size="16" type="star-filled" color="#D3D3D3"></uni-icon>
										{{detail.praise}}
									</view>
									<view>2018.3.15</view>
								</view>
								<view class="uni-comment-content">环境优雅，气氛浓郁，学习之地</view>
							</view>
						</view>
					</view>
					<!-- 评论区 end -->
				</view>
			</view>

			<!-- 预约块 -->
			<view class="detail-block apply-box">
				<view class="block-title">课程预约</view>
				<view class="uni-padding-wrap uni-common-mt">
					<view class="uni-card">
						<view class="uni-card-content">
							<view class="uni-card-content-inner">
								<view class="apply-block">
									<form @submit="formSubmit" @reset="formReset">
										<view class="uni-list half-box">
											<view class="uni-list-cell">
												<view class="uni-list half">
													<view class="uni-list-cell">
														<view class="uni-list-cell-left">
															姓名
														</view>
														<view class="uni-list-cell-db">
															<input class="uni-input" name="UserName" placeholder="" />
														</view>
													</view>
												</view>
												<view class="uni-list half">
													<view class="uni-list-cell">
														<view class="uni-list-cell-left">
															年龄
														</view>
														<view class="uni-list-cell-db">
															<input class="uni-input" name="Age" type="number" placeholder="" value="" />
														</view>
													</view>
												</view>
												<view class="uni-list half">
													<view class="uni-list-cell">
														<view class="uni-list-cell-left">
															性别
														</view>
														<view class="uni-list-cell-db">
															<picker name="Gender" @change="bindPickerChange" :value="genderIndex" :range="gender">
																<view class="uni-input">{{gender[genderIndex]}}</view>
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
													手机号码
												</view>
												<view class="uni-list-cell-db">
													<input class="uni-input" name="UserPhone" type="number" placeholder="" />
												</view>
											</view>
										</view>
										<view class="uni-list">
											<view class="uni-list-cell">
												<view class="uni-list-cell-left">
													所属城市
												</view>
												<view class="uni-list-cell-db">
													<input @click="showMulLinkageTwoPicker" class="uni-input" name="City" disabled :value="pickerText"
													 placeholder="" />
												</view>
											</view>
										</view>
										<view class="uni-list">
											<view class="uni-list-cell school-box">
												<view class="uni-list-cell-left">
													预约校区
												</view>
												<view class="uni-list-cell-db">
													<picker name="School" v-if="schoolDtl.length" @change="PickerSchool" :value="schoolIndex" :range="schoolVal">
														<view class="uni-input">
															<view class="sclName">{{schoolDtl[schoolIndex].name}}</view>
															<view class="sclAddr txt-gray">{{schoolDtl[schoolIndex].address}}</view>
														</view>
													</picker>
												</view>
												<uni-icon size="20" type="arrowdown" color="#DDDDDF"></uni-icon>
											</view>
										</view>
										<view class="uni-list apply-date">
											<view class="uni-list-cell">
												<view class="uni-list-cell-left">
													预约时间
												</view>
												<view class="uni-list-cell-db">
													<picker mode="date" name="ApplyDate" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
														<view class="uni-input">{{date}}</view>
													</picker>
												</view>
											</view>
										</view>
										<view class="uni-btn-v">
											<button formType="submit" :loading="loading" class="apply-btn">立即申请</button>
											<img src="../../static/icon-1.png" alt="英语" class="btnIcon" />
										</view>
									</form>
									<img src="../../static/qrcode1.png" alt="英语" class="qrcodefot" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
			<!-- 预约块/ -->
			<!-- <view class="detail-block">
			<view class="dtl-btns">
				<navigator :url="url" class="apply-btn">立即申请</navigator>
			</view>
		</view> -->
			<view @tap="goTo" v-if="btnShow" class="goTo">立即申请</view>
		</view>
	</scroll-view>
</template>

<script>
	import util from '../../common/util.js';
	const wx = require('jweixin-module')
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;

	var graceChecker = require("../../common/graceChecker.js");
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../common/city.data.js';
	const duration = 2000;
	const brand = "";

	import uniIcon from '../../components/uni-icon.vue'

	export default {
		data() {
			return {
				detail: [],
				brand: "",
				brandId: "",
				date: "",
				gender: ['男', '女'],
				genderIndex: 0,
				schoolVal: [],
				schoolDtl: [],
				schoolId: "",
				schoolIndex: 0,
				loading: false,
				date: this.getDate({
					format: true
				}),
				id: "",
				topage: "/pages/apply/index",
				url: "",
				scrollTop: 0,
				btnShow: true,
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
		onLoad(option) {
			var _this = this;
			let _id = option.id;
			this.id = _id;
			let url_detail = apiurl + inter.addr.getDetail + "?id=" + _id;
			let fun = function(res) {
				console.log("======fun========");
				console.log(res)
				let _data = res.info;
				if (_data) {
					_this.detail = _data;
					_data.school.forEach(item => {
						let _scl = {
							"id": item.id,
							"name": item.name,
							"address": item.address,
							"phone": item.phone,
							"region_id": item.region_id,
							"region_name": item.region_name
						};
						//let sclList='<view class="scl"><view class="sclName">'+item.name+'</view><view class="sclAddr">'+item.address+'</view></view>'
						_this.schoolVal.push(item.name);
						_this.schoolDtl.push(_scl);
					});
					_this.schoolId = _data.school["0"]["id"];
					_this.brandId = _data.id;
					uni.setNavigationBarTitle({
						title: _data.name
					});
				}
			}
			let _detail = mdl.getData(url_detail, fun);
			var _date = this.getDate({
				format: true
			});
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
		methods: {
			bindPickerChange: function(e) {
				this.genderIndex = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			PickerSchool: function(e) {
				let key = e.target.value;
				this.schoolIndex = key;
				this.schoolId = this.schoolDtl[key]["id"];
			},
			formSubmit: function(e) {
				var that = this;
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
					}
				];
				//进行表单检查
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var _data = {
						"name": formData.UserName,
						"age": formData.Age,
						"sex": formData.Gender == 0 ? "男" : "女",
						"phone": formData.UserPhone,
						"city": formData.City,
						"school": this.schoolId,
						"article_id": this.brandId,
						"arrive_time": formData.ApplyDate
					};
					console.log(this.schoolDtl);
					let url_saveSingle = apiurl + inter.addr.saveSingle;
					console.log(url_saveSingle);
					let funSave = function(res) {
						console.log("=======save========")
						console.log(res)
						that.loading = false
						uni.showToast({
							title: '请求成功',
							icon: 'success',
							mask: true,
							duration: duration
						})
						// 						uni.navigateTo({
						// 							url: "/pages/detail/thx?id=" + this.brandId
						// 						});
					}
					let _saveSingle = mdl.getData(url_saveSingle, funSave, "POST", _data);

				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					this.loading = false
				}

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
			upper: function(e) {
				//console.log(e)
			},
			lower: function(e) {
				//console.log(e)
			},
			scroll: function(e) {
				//console.log(e)
				// 				if (e.detail.scrollTop > 600) {
				// 					this.btnShow = true;
				// 				} else {
				// 					this.btnShow = false;
				// 				}
				this.old.scrollTop = e.detail.scrollTop
			},
			goTo: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 20000
				});
			}
		}
	}
</script>

<style>
	@import "./detail.css";
</style>

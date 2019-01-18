<template>
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
							<view class="uni-card-content-inner">
								<view class="ser-title txt-orange">
									{{detail.name}}
								</view>
								<view class="ser-abstract txt-black">
									{{detail.overview}}
								</view>
								<view class="ser-feature txt-light-black">
									标签:{{detail.tags}}
								</view>
								<view class="apply-num">
									<view class="apply-left">
										<view class="txt-gray">已领</view>
										<view class="txt-orange">199人</view>
									</view>
									<view class="apply-right">
										<view class="txt-gray">好评率</view>
										<view class="txt-orange">{{detail.praise}}</view>
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
														城市
													</view>
													<view class="uni-list-cell-db">
														<input @click="showMulLinkageTwoPicker" class="uni-input" name="City" disabled :value="pickerText"
														 placeholder="" />
													</view>
												</view>
											</view>
									<view class="uni-list">
										<view class="uni-list-cell">
											<view class="uni-list-cell-left">
												校&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区
											</view>
											<view class="uni-list-cell-db">
												<picker name="School" @change="PickerSchool" :value="schoolIndex" :range="schoolVal">
													<view class="uni-input">{{schoolVal[schoolIndex]}}</view>
												</picker>
											</view>
											<uni-icon size="20" type="arrowdown" color="#DDDDDF"></uni-icon>
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
									<view class="uni-btn-v">
										<button formType="submit" :loading="loading" class="apply-btn">立即申请</button>
									</view>
								</form>
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
	</view>
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
				schoolVal:[],
				schoolDtl:[],
				schoolId:"",
				schoolIndex:0,
				loading: false,
				date: this.getDate({
					format: true
				}),
				id: "",
				topage: "/pages/apply/index",
				url: "",
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
						let _scl={"id":item.id,"name":item.name};
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
				let key=e.target.value;
				this.schoolIndex = key;
				this.schoolId=this.schoolDtl[key]["id"];
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
						"city":formData.City,
						"school": this.schoolId,
						"article_id": this.brandId,
						"arrive_time": formData.ApplyDate
					};
					console.log(_data);
					let url_saveSingle = apiurl + inter.addr.saveSingle;
					console.log(url_saveSingle);
					let funSave = function(res) {
						console.log("=======save========")
						console.log(res)
						that.loading = false
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
			}
		}
	}
</script>

<style>
	.detail-block {
		background: #fff;
		border-bottom: 20upx solid #EBEBEB;
		padding-bottom: 10upx;
	}

	.apply-box {
		padding-top: 28upx;
	}

	.card-box {
		position: relative;
		top: -10upx;
		z-index: 5;
	}

	.uni-common-mt {
		margin: 0 auto 25upx
	}

	.uni-card {
		-webkit-box-shadow: 1px 1px 8px rgba(0, 0, 0, .3);
		box-shadow: 1px 1px 8px rgba(0, 0, 0, .3);
		margin: 0 0 15upx;
	}

	.uni-card-content-inner {
		padding: 15upx;
	}

	.swiper {
		height: 380upx;
	}

	.vli {
		width: 100%;
		height: 100%;
	}

	.vli2 {
		width: 100%;
		margin: 0 auto;
		height: 100%;
	}

	.slideImg {
		width: 100%;
		height: 100%;
		display: inline-block;
	}

	uni-swiper .uni-swiper-dots.uni-swiper-dots-horizontal {
		bottom: 30upx;
	}

	.ser-title {
		line-height: 1.8;
		font-size: 32upx;
	}

	.ser-abstract,
	.ser-feature {
		line-height: 1.6;
	}

	.ser-feature {
		font-size: 24upx;
	}

	.apply-num {
		border-top: 1px solid #CDCDCD;
		margin-top: 20upx;
		display: flex;
		justify-content: space-between;
		align-content: center;
		padding: 20upx 0 15upx;
	}

	.apply-left,
	.apply-right {
		display: flex;
		align-content: center;
		justify-content: center;
		width: 49%;
	}

	.apply-left {
		border-right: 1px solid #CDCDCD;
	}

	.txt-gray {
		padding-right: 20upx;
	}

	.h3 {
		font-size: 34upx;
		padding-bottom: 10upx;
	}

	.comments {
		font-size: 34upx;
		padding: 10upx 20upx 5upx 35upx;
		border-bottom: 1px solid #CDCDCD;
		display: flex;
		justify-content: space-between;
	}

	.uni-comment-face {
		width: 110upx;
		height: 110upx;
	}

	.uni-comment-top {
		color: #282828;
	}

	.dtl-btns {
		display: flex;
		justify-content: space-between;
		padding: 20upx 20upx 15upx;
	}

	.apply-btn {
		width: 100%;
		color: #fff;
		background: linear-gradient(to right, rgba(249, 215, 68, 1), rgba(252, 165, 38, 1));
		box-shadow: 1px 1px 5px rgba(249, 215, 68, 0.8);
		text-align: center;
		line-height: 2;
		border-radius: 50upx;
		font-size: 26upx;
		padding: 10upx 0;
	}

	.uni-list:first-child:before,
	.half:before,
	.uni-list:after {
		background: none;
	}

	.uni-list.apply-date:after {
		background: #c8c7cc;
	}

	.uni-list.half-box:last-child:after {
		background: none;
	}
	.uni-list-cell-left{padding: 0 10upx;}
	.radio-block {
		padding-left: 20upx;
	}

	.uni-input {
		background: #fff;
	}

	.half {
		width: 33.3%;
		display: flex;
	}
</style>

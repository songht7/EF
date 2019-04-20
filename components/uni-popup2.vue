<template>
	<view>
		<view class="uni-mask" v-show="show" v-if="close=='on'&&show" :style="{ top: offsetTop + 'px' }" @click="hide"
		 @touchmove.stop.prevent="moveHandle"></view>
		<view class="uni-popup" :class="'uni-popup-' + position + ' ' + 'uni-popup-' + mode + ' ' + 'uni-popup-' + width"
		 v-show="show" v-if="close=='on'&&show" :style="'width:'+setWidth(width)">
			{{ msg }}
			<slot></slot>
			<view class="user-phone-box" v-if="setUserPhone=='setUserPhone'">
				<view class="set-user-info">
					<view class="set-user-overview">
						<view class="ov-row">想获取更多资讯？请完善个人信息。</view>
						<view class="ov-row">还有丰厚礼品等着你！</view>
					</view>
					<form @submit="formSetUser">
						<view class="cell">
							<view class="cell-right">
								<input class="uni-input pop-input" name="Nickname" type="text" placeholder="您的姓名" value="" />
							</view>
						</view>
						<view class="cell">
							<view class="cell-right">
								<input class="uni-input pop-input" name="UserPhone" type="number" placeholder="手机号" value="" />
							</view>
						</view>
						<view class="uni-btn-v">
							<button formType="submit" :loading="loading" class="btn-orange">保存</button>
						</view>
					</form>
				</view>
			</view>
			<view v-if="position === 'middle' && mode === 'insert'" class=" uni-icon uni-icon-close" :class="{
					'uni-close-bottom': buttonMode === 'bottom',
					'uni-close-right': buttonMode === 'right'
				}"
			 @click="closeMask"></view>
		</view>
	</view>
</template>

<script>
	import util from '../common/util.js';
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;
	var graceChecker = require("../common/graceChecker.js");
	export default {
		name: 'uni-popup2',
		props: {
			/**
			 * 页面显示
			 */
			show: {
				type: Boolean,
				default: false
			},
			setUserPhone: {
				type: String,
				default: ""
			},
			/**
			 * 对齐方式
			 */
			position: {
				type: String,
				//top - 顶部， middle - 居中, bottom - 底部
				default: 'middle'
			},
			/**
			 * 显示模式
			 */
			mode: {
				type: String,
				default: 'insert'
			},
			/**
			 * 宽度
			 */
			width: {
				type: String,
				default: '80'
			},
			/**
			 * 额外信息
			 */
			msg: {
				type: String,
				default: ''
			},
			/**
			 * h5遮罩是否到顶
			 */
			h5Top: {
				type: Boolean,
				default: false
			},
			buttonMode: {
				type: String,
				default: 'bottom'
			}
		},
		data() {
			return {
				offsetTop: 0,
				loading: false,
				close: "on"
			};
		},
		watch: {
			h5Top(newVal) {
				if (newVal) {
					this.offsetTop = 44;
				} else {
					this.offsetTop = 0;
				}
			}
		},
		computed: {},
		methods: {
			setWidth(w) {
				return `${w}%`
			},
			hide() {
				if (this.mode === 'insert' && this.position === 'middle') return;
				this.$emit('hidePopup');
			},
			closeMask() {
				if (this.mode === 'insert') {
					this.$emit('hidePopup');
				}
			},
			moveHandle() {},
			formSetUser(e) {
				var that = this;
				if (this.loading == true) {
					return
				}
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let formData = e.detail.value;
				this.loading = true
				var rule = [{
					name: "Nickname",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "请填写您的姓名"
				}, {
					name: "UserPhone",
					checkType: "phoneno",
					checkRule: "",
					errorMsg: "请填写正确的手机号"
				}];
				//进行表单检查
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var _data = {
						"name": formData.Nickname,
						"phone": formData.UserPhone
					};
					//console.log(_data)
					let url_saveUser = apiurl + inter.addr.saveUserInfo;
					//console.log(url_saveUser);
					let funSave = function(res) {
						// 						console.log("=======saveUserInfo========")
						// 						console.log(res)
						that.loading = false
						if (res.Result == 0) {
							uni.showToast({
								title: "保存失败,请重试",
								image: "../static/icon-1.png"
							})
						} else {
							uni.getStorage({
								key: 'uWXInfo',
								success: function(ress) {
									let _uWXInfo = ress.data;
									_uWXInfo["nickname"] = _data.name;
									_uWXInfo["phone"] = _data.phone;
									uni.setStorage({
										key: 'uWXInfo',
										data: _uWXInfo,
										success: function() {}
									})
								},
							})
							uni.showToast({
								title: "保存成功",
								complete() {
									setTimeout(() => {
										that.$store.commit('set_popup_user', 'off');
										that.close = "off";
									}, 1500)
								}
							});
						}
					}
					let openid = that.$store.state.openid;
					let test_openid = inter.wx.test_openid;
					let _head = {
						"openid": openid || test_openid
					};
					let _saveSingle = mdl.getData(url_saveUser, funSave, "POST", _data, _head);

				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					this.loading = false
				}
			}
		},
		created() {
			let offsetTop = 0;
			//#ifdef H5
			if (!this.h5Top) {
				offsetTop = 44;
			} else {
				offsetTop = 0;
			}
			//#endif
			this.offsetTop = offsetTop;
		}
	};
</script>
<style>
	.uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.uni-popup {
		position: absolute;
		z-index: 999;
		background-color: #ffffff;
	}

	.uni-popup-middle {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.uni-popup-middle.uni-popup-insert {
		min-width: 380upx;
		min-height: 380upx;
		max-width: 100%;
		max-height: 80%;
		transform: translate(-50%, -65%);
		background: none;
		box-shadow: none;
	}

	.uni-popup-middle.uni-popup-fixed {
		border-radius: 10upx;
		padding: 30upx;
	}

	.uni-close-bottom,
	.uni-close-right {
		position: absolute;
		bottom: -180upx;
		text-align: center;
		border-radius: 50%;
		color: #f5f5f5;
		font-size: 60upx;
		font-weight: bold;
		opacity: 0.8;
		z-index: -1;
	}

	.uni-close-right {
		right: -60upx;
		top: -80upx;
	}

	.uni-close-bottom:after {
		content: '';
		position: absolute;
		width: 0px;
		border: 1px #f5f5f5 solid;
		top: -200upx;
		bottom: 56upx;
		left: 50%;
		transform: translate(-50%, -0%);
		opacity: 0.8;
	}

	.uni-popup-top {
		top: 0;
		left: 0;
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
	}

	.uni-popup-bottom {
		left: 0;
		bottom: 0;
		width: 100%;
		min-height: 100upx;
		line-height: 100upx;
		text-align: center;
	}

	.user-phone-box {
		background: #FFF;
		padding: 20upx;
		border-radius: 10upx;
		overflow: hidden;
		width: 100%;
	}

	.set-user-overview {
		padding-bottom: 30upx;
	}

	.ov-row {
		font-size: 36upx;
		color: #F69A22;
	}

	.pop-input {
		border: 1px solid #CCCCCC;
		border-radius: 10upx;
		margin-bottom: 20upx;
	}
</style>

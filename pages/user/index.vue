<template>
	<view class="center-page" :class="$store.state.isWeixin?'page-main':''">
		<view class="vbox">
			<view class="c-top">
				<view class="c-top-main">
					<view class="uni-card">
						<view class="uni-card-content">
							<view class="uni-card-content-inner">
								<view class="c-user-info">
									<view class="circle">
										<image class="head" v-if="openid" :src="headimgurl" mode="widthFix"></image>
										<uni-icon v-if="!openid" size="60" type="contact" color="#DDDDDF"></uni-icon>
									</view>
									<view class="top-texts">
										<view class="top-txt name">
											<text>{{name?name:"游客"}}</text>
											<text class="logout" v-if="openid" @click="logout">[退出]</text>
											<text class="logout" v-if="!openid" @click="login">[微信授权登录]</text>
										</view>
										<view class="top-txt" v-if="phone">
											<text>手机 </text>
											<text>{{phone}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="center-main" v-if="openid" :class="!isDisabled?'txt-align-left':''">
				<form @submit="formSubmit" @reset="formReset">
					<view class="cell" :class="isHide">
						<view class="cell-left">
							<text class="cell-text">用户名</text>
						</view>
						<view class="cell-right">
							<input class="uni-input" name="Nickname" type="text" placeholder="您的称呼" :value="userInfo.nickname" :disabled="isDisabled" />
						</view>
					</view>
					<view class="cell" :class="isHide">
						<view class="cell-left">
							<text class="cell-text">手机号</text>
						</view>
						<view class="cell-right">
							<input class="uni-input" name="UserPhone" type="number" placeholder="" :value="userInfo.phone" :disabled="isDisabled" />
						</view>
					</view>
					<view class="cell">
						<view class="cell-left">
							<text class="cell-text">生日</text>
						</view>
						<view class="cell-right">
							<view class="uni-list-cell-db" v-if="!isDisabled">
								<picker mode="date" name="Birthday" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
									<view class="uni-input">{{date}}</view>
								</picker>
							</view>
							<view class="uni-list-cell-db" v-if="isDisabled">
								{{date}}
							</view>
						</view>
					</view>
					<view class="cell">
						<view class="cell-left">
							<text class="cell-text">性别</text>
						</view>
						<view class="cell-right">
							<view class="uni-list-cell-db" v-if="!isDisabled">
								<picker name="Gender" @change="bindPickerChange" :value="genderIndex" :range="gender">
									<view class="uni-input">{{gender[genderIndex]}}</view>
								</picker>
							</view>
							<view class="uni-list-cell-db" v-if="isDisabled">
								{{gender[genderIndex]}}
							</view>
						</view>
					</view>
					<view class="cell">
						<view class="cell-left">
							<text class="cell-text">邮箱</text>
						</view>
						<view class="cell-right">
							<view class="cell-text-right"><input class="uni-input" name="Email" type="text" :value="email" placeholder=""
								 :disabled="isDisabled" /></view>
						</view>
					</view>
					<view class="cell">
						<view class="cell-left">
							<view class="cell-text" @click="popupIntro('integral')">积分 <uni-icon size="20" type="info" color="#A7A7AF"></uni-icon>
							</view>
						</view>
						<view class="cell-right">
							<text class="cell-text-right">{{point}}</text>
						</view>
					</view>
					<!-- 	<view class="cell">
						<view class="cell-left">
							<text class="cell-text">联系我们</text>
						</view>
						<view class="cell-right">
							<text class="cell-text-right"></text>
						</view>
					</view> -->
					<view class="uni-btn-v">
						<view @click="toEdit" class="toEdit" :class="!isHide?'isHide':''">编辑</view>
						<button formType="submit" :loading="loading" class="apply-btn" :class="isHide">保存</button>
					</view>
				</form>
			</view>
			<view class="agreement" :class="openid?'':'onlyAgmt'" @click="popupIntro('agreement')">声明条款</view>
			<!-- 弹出层 -->
			<lvv-popup position="top" ref="lvvpopref">
				<view class="pop-inner" :class="'pop-inner-'+popType">
					<block v-if="popType=='agreement'">
						<agreement @click="closeIntro"></agreement>
					</block>
					<block v-else-if="popType=='integral'">
						<integral @click="closeIntro"></integral>
					</block>
				</view>
			</lvv-popup>
			<!-- 弹出层 -->
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;
	import uniIcon from '../../components/uni-icon.vue'
	import lvvPopup from '../../components/lvv-popup.vue'
	var graceChecker = require("../../common/graceChecker.js");
	export default {
		data() {
			return {
				userInfo: {},
				openid: "",
				name: "",
				headimgurl: "",
				phone: "",
				date: "", //Birthday
				gender: ['男', '女'],
				genderIndex: 0,
				email: "",
				point: 0,
				loading: false,
				isHide: "isHide",
				isDisabled: true,
				popType: "agreement"
			};
		},
		onLoad() {},
		onShow() {
			var that = this;
			this.$store.commit("change_page", 2)
			that.getUserInfo();
		},
		components: {
			uniIcon,
			lvvPopup
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onPullDownRefresh() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo: function() {
				var that = this;
				var funStor = function(res) {
					that.userInfo = res;
					that.openid = res.openid ? res.openid : "";
					that.headimgurl = res.headimgurl;
					that.point = res.point;
					that.setUserInfo(res);
					if (res.sex == 1 || res.sex == "男") {
						that.genderIndex = 0
					} else {
						that.genderIndex = 1
					}
					uni.stopPullDownRefresh();
				}
				let myStorage = mdl.getMyStorage("uWXInfo", "", funStor)
			},
			bindPickerChange: function(e) {
				this.genderIndex = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			toEdit: function() {
				var that = this;
				that.isHide = ""
				that.isDisabled = false
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
						"phone": formData.UserPhone,
						"birthday": formData.Birthday,
						"sex": formData.Gender == 0 ? "男" : "女",
						"email": formData.Email
					};
					//console.log(_data)
					let url_saveUser = apiurl + inter.addr.saveUserInfo;
					//console.log(url_saveUser);
					let funSave = function(res) {
																		console.log("=======saveUserInfo========")
																		console.log(res)
						that.loading = false
						if (res.Result == 0) {
							uni.showToast({
								title: "保存失败,请重试",
								image: "../../static/icon-1.png"
							})
						} else {
							uni.getStorage({
								key: 'uWXInfo',
								success: function(ress) {
									let _uWXInfo = ress.data;
									_uWXInfo["nickname"] = _data.name;
									_uWXInfo["phone"] = _data.phone;
									_uWXInfo["birthday"] = _data.birthday;
									_uWXInfo["sex"] = _data.sex;
									_uWXInfo["email"] = _data.email;
									uni.setStorage({
										key: 'uWXInfo',
										data: _uWXInfo,
										success: function() {}
									})
								},
							})
							_data["point"] = res.point ? res.point : that.point;
							that.setUserInfo(_data);
							uni.showToast({
								title: "保存成功"
							});
							that.isHide = "isHide";
							that.isDisabled = true
						}
					}
					let openid = that.userInfo.openid ? that.userInfo.openid : "";
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

			},
			setUserInfo(_data) {
				var that = this;
				that.name = _data.name || _data.nickname;
				that.phone = _data.phone ? _data.phone : "";
				that.date = _data.birthday ? _data.birthday : that.getDate({
					format: true
				});
				that.genderIndex = _data.sex == "男" || _data.sex == 1 ? 0 : 1;
				that.email = _data.email ? _data.email : "";
				that.point = _data.point ? _data.point : 0;
			},
			logout() {
				var that = this;
				console.log("===logout===")
				uni.removeStorage({
					key: 'uWXInfo',
					success: function(res) {
						that.openid = "";
						that.name = ""
						that.phone = ""
						that.date = that.getDate({
							format: true
						});
						that.genderIndex = 0;
						that.email = "";
					}
				});
			},
			login() {
				console.log("====login====")
				window.location.href = inter.domain;
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
			popupIntro(type) {
				this.popType = type;
				this.$refs.lvvpopref.show();
			},
			closeIntro() {
				// 关闭modal弹出框
				this.$refs.lvvpopref.close();
			}
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

	.logout {
		padding: 0 0 0 10upx;
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

	.isHide {
		display: none;
	}

	.cell-left {
		width: 35%;
		padding-left: 5upx;
	}

	.cell-right {
		width: 65%;
		color: #a7a7a7;
		text-align: right;
		padding-right: 5upx;
		line-height: 2;
	}

	.txt-align-left .cell-right {
		text-align: left;
	}

	.cell-text {
		color: #5c5c5c;
		font-size: 32upx;
	}

	.cell-text-right {
		color: #a7a7a7;
		font-size: 32upx;
	}

	.uni-input {
		background: transparent;
	}

	.uni-btn-v {
		padding: 40upx 0 10upx;
	}

	.apply-btn,
	.toEdit {
		width: 100%;
		color: #fff;
		background: linear-gradient(to right, rgba(249, 215, 68, 1), rgba(252, 165, 38, 1));
		box-shadow: 3px 5px 10px -1px rgba(249, 215, 68, 0.8);
		text-align: center;
		line-height: 2;
		border-radius: 10upx;
		font-size: 30upx;
		letter-spacing: 2px;
		padding: 15upx 0;
		border-color: none;
	}

	.toEdit {
		background: #CCCCCC;
		box-shadow: none;
	}

	.agreement {
		padding: 60upx 0 40upx;
		text-align: center;
		font-size: 28upx;
	}

	.onlyAgmt {
		position: absolute;
		bottom: 0;
		width: 100%;
	}
</style>

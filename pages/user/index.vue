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
										<image class="head" v-if="userInfo.headimgur" :src="userInfo.headimgurl" mode="widthFix"></image>
										<uni-icon v-else size="60" type="contact" color="#DDDDDF"></uni-icon>
									</view>
									<view class="top-texts">
										<text class="top-txt name">{{userInfo.nickname?userInfo.nickname:"游客"}}</text>
										<view class="top-txt" v-if="userInfo.phone">
											<text>手机 </text>
											<text>{{userInfo.phone}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="center-main" style="display: none;">
				<form @submit="formSubmit" @reset="formReset">
					<view class="cell" :class="isHide">
						<view class="cell-left">
							<text class="cell-text">用户名</text>
						</view>
						<view class="cell-right">
							<input class="uni-input" name="Nickname" type="text" placeholder="您的称呼" :value="userInfo.nickname" :disabled="isDisabled"/>
						</view>
					</view>
					<view class="cell" :class="isHide">
						<view class="cell-left">
							<text class="cell-text">手机号</text>
						</view>
						<view class="cell-right">
							<input class="uni-input" name="UserPhone" type="number" placeholder="" :disabled="isDisabled"/>
						</view>
					</view>
					<view class="cell">
						<view class="cell-left">
							<text class="cell-text">生日</text>
						</view>
						<view class="cell-right">
							<input class="uni-input" name="Birthday" type="text" placeholder="" :disabled="isDisabled" />
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
							<text class="cell-text-right"><input class="uni-input" name="Email" type="text" value="" placeholder="" :disabled="isDisabled" /></text>
						</view>
					</view>
					<view class="cell">
						<view class="cell-left">
							<text class="cell-text">联系我们</text>
						</view>
						<view class="cell-right">
							<text class="cell-text-right"></text>
						</view>
					</view>
					<view class="uni-btn-v">
						<view @click="toEdit" class="toEdit" :class="!isHide?'isHide':''">编辑</view>
						<button formType="submit" :loading="loading" class="apply-btn" :class="isHide">保存</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;
	import uniIcon from '../../components/uni-icon.vue'
	var graceChecker = require("../../common/graceChecker.js");
	export default {
		data() {
			return {
				userInfo: {},
				gender: ['男', '女'],
				genderIndex: 0,
				loading: false,
				isHide: "isHide",
				isDisabled: true
			};
		},
		onLoad() {
			var _this = this;
			var funStor = function(res) {
				_this.userInfo = res;
				if (res.sex == 1) {
					_this.genderIndex = 0
				} else {
					_this.genderIndex = 1
				}
			}
			let myStorage = mdl.getMyStorage("uWXInfo", "", funStor)
		},
		components: {
			uniIcon
		},
		methods: {
			bindPickerChange: function(e) {
				this.genderIndex = e.target.value
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
						"nickname": formData.nickname,
						"phone": formData.UserPhone,
						"birthday": formData.Birthday,
						"sex": formData.Gender == 0 ? "男" : "女",
						"email": formData.Email
					};
					console.log(_data)
					that.isHide = "isHide";
					that.isDisabled = true;
					let url_saveUser = apiurl + inter.addr.saveSingle;
					console.log(url_saveUser);
					let funSave = function(res) {
						console.log("=======save========")
						console.log(res)
						that.loading = false
						if (res.Result == 0) {
							uni.showToast({
								title: "保存失败,请重试",
								image: "../../static/icon-1.png"
							})
						} else {
							uni.showToast({
								title: "保存成功"
							})
						}
					}
					let openid = that.userInfo.openid ? that.userInfo.openid : "";
					//let _saveSingle = mdl.getData(url_saveSingle, funSave, "POST", _data,{"openid":openid});

				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					this.loading = false
				}

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
		width: 40%;
		padding-left: 5upx;
	}

	.cell-right {
		width: 60%;
		color: #a7a7a7;
		text-align: right;
		padding-right: 5upx;
		line-height: 2;
	}

	.cell-text {
		color: #5c5c5c;
		font-size: 32upx;
	}

	.cell-text-right {
		color: #a7a7a7;
		font-size: 32upx;
	}
	.uni-input{background: transparent;}
	.uni-btn-v{padding: 40upx 0 10upx;}
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
</style>

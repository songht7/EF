<template>
	<view class="uni-padding-wrap uni-common-mt">
		<form @submit="formSubmit" @reset="formReset">
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
						邮箱
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" name="Email" placeholder="" />
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
			<view class="uni-btn-v">
				<button formType="submit" :loading="loading" class="apply-btn">立即申请</button>
			</view>
		</form>
		<view v-html="_wxApi"></view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	import uniIcon from '../../components/uni-icon.vue';
	//来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
	var graceChecker = require("../../common/graceChecker.js");
	const _interface=util.Interface;
	const duration = 2000;
	const brand = "";
	export default {
		data() {
			return {
				"_wxApi": "",
				brand: "",
				date: "",
				gender: ['男', '女'],
				index: 0,
				loading: false,
			};
		},
		onLoad(option) {
			let _key = option.key;
			let _detail = util.getList(_key);
			const brand = _detail.title;
			console.log(_detail);
			let _wxApi = util.wxApi();
			this._wxApi = _wxApi;
			util.getToken();
			this.date = option.date || this.getDate({
				format: true
			});
			this.brand = _detail.title;
			uni.setNavigationBarTitle({
				title: "申请预约 - " + _detail.title
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
			uniIcon
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			formSubmit: function(e) {
				if(this.loading==true){return}
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
					},
					{
						name: "Age",
						checkType: "betweenD",
						checkRule: "1,90",
						errorMsg: "请填写正确的年龄"
					},
					{
						name: "Email",
						checkType: "email",
						checkRule: "",
						errorMsg: "请填写正确的邮箱"
					}
				];
				//进行表单检查
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var _data = {
						"预约品牌": this.brand,
						"客户姓名": formData.UserName,
						"客户手机号": formData.UserPhone,
						"年龄": formData.Age,
						"性别": formData.Gender == 0 ? "男" : "女",
						"邮箱": formData.Email,
						"意向区域":formData.area||"全国",
						"可约时间": formData.ApplyDate
					};
					//console.log(_data);
					uni.request({
						url: _interface.SendMail,
						data: _data,
						method: "POST",
						dataType: "json",
						success: (res) => {
							uni.showToast({
								title: '请求成功',
								icon: 'success',
								mask: true,
								duration: duration
							})
							//uni.navigateBack({delta: 1});
							this.res = JSON.stringify(res);
							console.log(res)
						},
						fail: (err) => {
							console.log('request fail', err);
							uni.showModal({
								content: err.errMsg,
								showCancel: false
							})
						},
						complete: () => {
							this.loading = false
						}
					})
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
			}
		}
	}
</script>

<style>
	.uni-list {
		margin-bottom: 15upx;
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
	}

	.half {
		width: 45%;
		display: flex;
	}

	.apply-btn {
		width: 80%;
		margin: 20upx auto;
		color: #fff;
		background: linear-gradient(to right, rgba(249, 215, 68, 1), rgba(252, 165, 38, 1));
		box-shadow: 1px 1px 5px rgba(249, 215, 68, 0.8);
		text-align: center;
		line-height: 2;
		border-radius: 30upx;
		font-size: 32upx;
		padding: 5upx 0;
	}
	.apply-date{display: none;}
</style>

<template>
	<!-- 1确认 2作废 0是未确认 v-if="value.status!=2"-->
	<view class="list-block uni-padding-wrap uni-common-mt">
		<view :class="$store.state.isWeixin?'page-main':''">
			<view class="uni-card" v-for="(value,key) in reservedList" :key="key">
				<view class="uni-card-content">
					<view class="uni-card-content-inner">
						<navigator class="service-head" :url="'/pages/detail/index?id='+value.article_id">
							<view class="ser-logo">
								<image lazy-load :src="value.subjectSrc?sourceUrl+value.subjectSrc:''" mode="aspectFill" />
							</view>
							<view class="ser-body">
								<view class="ser-title">{{value.subjectName}}</view>
								<view class="ser-time">
									<!-- 预约时间：{{value.arrive_time}} -->
								</view>
							</view>
							<view class="ser-tag-res">{{value.subjectCurrentPrice&&value.subjectCurrentPrice!="0.00"?"￥"+value.subjectCurrentPrice:"免费"}}</view>
						</navigator>
						<view class="apply-res">
							<view>
								<text>预约状态：</text>
								<text v-if="value.article_type=='help'">预约成功</text>
								<text v-else class="txt-light-black">预约成功 等待课程顾问与您联系</text>
								<!-- <text v-if="value.status==0" class="txt-orange">预约成功 等待课程顾问与您联系</text>
						<text v-else-if="value.status==1" class="txt-light-black">客服已联系</text>
						<text v-else-if="value.status==2" class="txt-gray">本人已回绝</text> -->
							</view>
							<view v-if="value.article_type=='help'">
								<navigator :url="'/pages/detail/activity?uid=' + openid +'&lm_id='+value.id" class="helpBtn txt-orange">[查看助力状态]</navigator>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="reservedIsNull" v-if="reservedNull&&userInfo.openid">{{reservedNull}}</view>
		<view class="reservedIsNull" v-if="!userInfo.openid" @click="login">{{reservedNull}}</view>
		<view class="reservedIsNull" v-if="!userInfo.openid"><img src="../../static/qrcode1.png" alt="英语" class="reservedQR" /></view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;

	import uniIcon from '../../components/uni-icon.vue'
	export default {
		data() {
			return {
				userInfo: {},
				openid: "",
				reservedList: [],
				param: {
					"pi": 1,
					"ps": 10,
					"pageTotal": 1, //页数
					"listTotal": 0 //列表数
				},
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				reservedNull: ""
			};
		},
		components: {
			uniIcon
		},
		onLoad() {
			var that = this;
			that.checkUser();
		},
		onShow() {
			this.$store.commit("change_page", 1)
			var that = this;
			that.paramReset();
			that.checkUser();
			that.getList("refresh");
		},
		onPullDownRefresh() {
			var that = this;
			that.paramReset();
			that.checkUser();
			that.getList("refresh");
		},
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			if (this.param.pi >= this.param.pageTotal) {
				this.loadingType = 2;
				return;
			}
			this.param.pi = this.param.pi + 1;
			this.loadingType = 1;
			this.checkUser();
			this.getList();
		},
		methods: {
			getList(type) {
				var that = this;
				let param = that.param;
				var _param = "?currentPage=" + param.pi + "&pagesize=" + param.ps;
				let url_list = apiurl + inter.addr.getBookedList + _param;
				console.log(url_list)
				uni.showLoading({
					title: '正在加载 ...'
				});
				var funList = function(res) {
					console.log("====预约课程=====")
					console.log(res)
					let data = res.list;
					let total = res.total;
					if (total <= 0) {
						that.reservedNull = "暂无预约课程"
					}
					if (type) {
						if (data) {
							that.reservedList = data;
						} else {
							that.reservedList = [];
						}
						uni.stopPullDownRefresh();
					} else {
						if (data) {
							data.forEach(item => {
								that.reservedList.push(item);
							});
						}
					}
					that.loadingType = 0;
					that.pagination(total);
					uni.hideLoading();
				}
				let openid = that.userInfo.openid ? that.userInfo.openid : "";
				let test_openid = inter.wx.test_openid;
				let _head = {};
				if (openid != "" || test_openid != "") {
					_head = {
						"openid": openid || test_openid
					};
				}
				if (!mdl.isWeixin() && test_openid == "") {
					that.reservedNull = "请在微信客户端打开查看";
					that.paramReset();
					uni.hideLoading();
					uni.stopPullDownRefresh();
					return
				} else if (openid == "" && test_openid == "") {
					that.reservedNull = "查看我的预约 [微信授权登录]";
					that.reservedList = [];
					that.paramReset();
					uni.hideLoading();
					uni.stopPullDownRefresh();
					return
				}
				console.log("===url_list====")
				console.log(url_list)
				console.log("openid:", openid)
				let getList = mdl.getData(url_list, funList, "GET", {}, _head);
			},
			checkUser() {
				var that = this;
				var funStor = function(res) {
					console.log(res)
					that.userInfo = res;
					that.openid = res.openid;
					if (!res) {
						that.userInfo = {};
						that.reservedList = [];
					}
				}
				let myStorage = mdl.getMyStorage("uWXInfo", "", funStor)
			},
			login() {
				console.log("login:", inter.domain)
				window.location.href = inter.domain;
			},
			paramReset() {
				this.param.pi = 1;
				this.param.pageTotal = 1;
				this.param.listTotal = 0;
				this.loadingType = 0;
			},
			pagination(total) {
				let _pageSize = this.param.ps;
				let _pageTotal = Math.ceil(total / _pageSize);
				this.param.listTotal = total;
				this.param.pageTotal = _pageTotal;
			}
		}
	}
</script>

<style>
	.uni-card {
		-webkit-box-shadow: 1px 1px 8px rgba(0, 0, 0, .3);
		box-shadow: 1px 1px 8px rgba(0, 0, 0, .3);
		margin: 15px 0;
	}

	.uni-card-content-inner {
		padding: 15upx;
	}

	.service-head {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		position: relative;
		width: 100%;
		text-decoration: none;
		color: #282828;
	}

	.ser-logo {
		width: 150upx;
		height: 150upx;
	}

	.ser-logo>image {
		width: 100%;
		height: 100%;
	}

	.ser-body {
		width: 63%;
		padding-left: 10upx;
	}

	.ser-title {
		line-height: 1.4;
		padding-bottom: 5upx;
	}

	.ser-describe {
		line-height: 1.4;
		color: #525252;
		font-size: 24upx;
		margin-bottom: 5upx;
	}

	.ser-time {
		line-height: 2;
		color: #A7A7A7;
		font-size: 24upx;
	}

	.ser-tag-res {
		font-size: 28upx;
		text-align: center;
		padding: 0 15upx;
		line-height: 2;
		color: #333;
		position: absolute;
		top: -14upx;
		right: -14upx;
	}

	.apply-res {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 10upx 0 0;
		padding: 10upx 0 0;
		border-top: 1px solid #F5F5F5;
	}

	.reservedIsNull {
		text-align: center;
		line-height: 3;
		font-size: 34upx;
		letter-spacing: 1.2px;
		color: #555555;
		margin-bottom: 40upx;
	}

	.reservedQR {
		width: 90%;
		margin: 0 auto;
	}
</style>

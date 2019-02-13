<template>
	<view class="list-block uni-padding-wrap uni-common-mt">
		<view class="uni-card" v-for="(value,key) in reservedList" :key="key">
			<view class="uni-card-content">
				<view class="uni-card-content-inner">
					<navigator class="service-head" :url="'/pages/detail/index?id='+value.article_id">
						<view class="ser-logo">
							<image lazy-load lazy-load :src="value.subjectSrc?sourceUrl+value.subjectSrc:''" mode="aspectFill" />
						</view>
						<view class="ser-body">
							<view class="ser-title">{{value.subjectName}}</view>
							<view class="ser-time">预约时间：{{value.arrive_time}}</view>
						</view>
						<view class="ser-tag-res">{{value.subjectCurrentPrice&&value.subjectCurrentPrice!="0.00"?"￥"+value.subjectCurrentPrice:"免费"}}</view>
					</navigator>
					<view class="apply-res">
						预约状态：预约成功 等待课程顾问联系
					</view>
				</view>
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
	export default {
		data() {
			return {
				userInfo: {},
				reservedList: []
			};
		},
		components: {
			uniIcon
		},
		onLoad() {
			var that = this;
			var funStor = function(res) {
				that.userInfo = res;
			}
			let myStorage = mdl.getMyStorage("uWXInfo", "", funStor)


			that.getList();
		},
		onPullDownRefresh() {
			this.getList();
		},
		methods: {
			getList(type) {
				var that = this;
				let url_list = apiurl + inter.addr.getBookedList;
				var funList = function(res) {
					//console.log(res)
					that.reservedList = res;
					uni.stopPullDownRefresh();
				}
				let openid = that.userInfo.openid ? that.userInfo.openid : "";
				let _head = {
					"openid": openid
				};
				let getList = mdl.getData(url_list, funList, "GET", {}, _head);
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
</style>

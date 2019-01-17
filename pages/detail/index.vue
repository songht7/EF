<template>
	<view class="detail-page">
		<view class="detail-block">
			<view class="swiper-box" v-if="detail.slideimg.length">
				<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="3000" duration="1000"
				 indicator-color="#979797" indicator-active-color="#FFFFFF">
					<swiper-item class="swiper-item" v-for="(slide,index) in detail.slideimg" :key="slide">
						<view class="vli">
							<view class="vli2">
								<image class="slideImg" :src="slide" mode="aspectFill"></image>
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
									{{detail.title}}
								</view>
								<view class="ser-abstract txt-black">
									{{detail.abstract}}
								</view>
								<view class="ser-feature txt-light-black">
									{{detail.feature}}
								</view>
								<view class="apply-num">
									<view class="apply-left">
										<view class="txt-gray">已领</view>
										<view class="txt-orange">{{detail.putout}}人</view>
									</view>
									<view class="apply-right">
										<view class="txt-gray">好评率</view>
										<view class="txt-orange">{{detail.comment.percent}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-padding-wrap uni-common-mt">
					<view class="uni-card">
						<view class="uni-card-content">
							<view class="uni-card-content-inner">
								<view class="uni-list">
									<view class="uni-list-cell">
										<view class="uni-list-cell-left  txt-gray">
											校&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区
										</view>
										<view class="uni-list-cell-db">
											<view class="uni-input">全国</view>
										</view>
									</view>
								</view>
								<view class="uni-list">
									<view class="uni-list-cell">
										<view class="uni-list-cell-left  txt-gray">
											可约时间
										</view>
										<view class="uni-list-cell-db">
											<picker mode="date" name="ApplyDate" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
												<view class="uni-input">{{date}}</view>
											</picker>
										</view>
										<uni-icon size="24" type="arrowright" color="#DDDDDF"></uni-icon>
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
							<view class="lesson-content txt-light-black" v-html="detail.content"></view>
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
					<view class="uni-comment-list" v-for="(value,key) in detail.comment.list" :key="key">
						<view class="uni-comment-face">
							<image :src="value.portrait" mode="widthFix"></image>
						</view>
						<view class="uni-comment-body">
							<view class="uni-comment-top">{{value.name}}</view>
							<view class="uni-comment-date">
								<view class="star">
									<uni-icon size="16" type="star-filled" color="#F7A631"></uni-icon>
									<uni-icon size="16" type="star-filled" color="#F7A631"></uni-icon>
									<uni-icon size="16" type="star-filled" color="#F7A631"></uni-icon>
									<uni-icon size="16" type="star-filled" color="#F7A631"></uni-icon>
									<uni-icon size="16" type="star-filled" color="#D3D3D3"></uni-icon>
									{{value.grade}}
								</view>
								<view>{{value.date}}</view>
							</view>
							<view class="uni-comment-content">{{value.cont}}</view>
						</view>
					</view>
				</view>
				<!-- 评论区 end -->
			</view>
		</view>
		<view class="detail-block">
			<view class="dtl-btns">
				<navigator :url="url" class="apply-btn">立即申请</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	import uniIcon from '../../components/uni-icon.vue'
	export default {
		data() {
			return {
				detail: [],
				date: this.getDate({
					format: true
				}),
				key: "",
				topage: "/pages/apply/index",
				url: ""
			};
		},
		onLoad(option) {
			let _key = option.key;
			let _detail = util.getList(_key);
			this.detail = _detail;
			console.log(_detail);
			this.key = _key;
			var _date = this.getDate({
				format: true
			});
			this.url = this.topage + "?key=" + _key + "&date=" + _date;
			uni.setNavigationBarTitle({
				title: _detail.title
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
			bindDateChange: function(e) {
				this.date = e.target.value;
				let _key = this.key;
				let _date = e.target.value;
				this.url = this.topage + "?key=" + _key + "&date=" + _date;
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
		line-height: 1.8;font-size: 32upx;
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

	.uni-list:first-child:before,
	.uni-list:first-child:after,
	.uni-list:last-child:after {
		background: none;
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
</style>

<template>
	<view class="page">
		<!-- #ifndef MP-WEIXIN -->
		<!-- 固定在顶部的导航栏 -->
		<uni-nav-bar color="#333333" background-color="#FFFFFF" fixed="true" @click-left="showCity">
			<block slot="left">
				<view class="city">
					<uni-icon type="location" color="#333333" size="22"></uni-icon>
					<text>{{city}}</text>
				</view>
			</block>
			<view class="input-view">
				<input confirm-type="search" @confirm="confirm" class="input" type="text" v-model="serchVal" placeholder="英语试听" />
				<uni-icon type="search" size="22" color="#666666"></uni-icon>
			</view>
		</uni-nav-bar>
		<view style="height:45px;">...</view>
		<!-- #endif -->

		<view class="content">
			<swiper-box :swiperList="swiperList"></swiper-box>
			<!-- <view class="filter-box">
				<view class="ctgBtns ctgs">少儿</view>
				<view class="ctgBtns ctgs">成人</view>
				<view class="filterBtn">筛选</view>
			</view> -->
			<list-block :list="list"></list-block>
			<uni-load-more v-if="param.pageTotal>1" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	const wx = require('jweixin-module')
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;
	import uniNavBar from '../../components/uni-nav-bar.vue'
	import uniIcon from '../../components/uni-icon.vue'
	import uniLoadMore from '../../components/uni-load-more.vue'

	import listBlock from '../../components/list-block.vue'

	export default {
		data() {
			return {
				"city": "上海", //当前位置
				"category": [], //分类
				"ageGroup": [], //
				"swiperList": [],
				"region": [],
				tagList: [
					'成人',
					'少儿'
				],
				list: [],
				serchVal: "",
				param: {
					"pi": 1,
					"ps": 4,
					"keywords": "",
					"region": "上海",
					"cat": "",
					"brand": "",
					"age_start": "",
					"age_end": "",
					"subject_category": "",
					pageTotal: 1,
					listTotal: 0
				},
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		computed: {},
		components: {
			uniIcon,
			uniNavBar,
			uniLoadMore,
			listBlock
		},
		onShow() {
			wx.ready(function() {
				// TODO
			});
		},
		onLoad(option) {
			var _this = this;
			uni.setNavigationBarTitle({
				title: "英语免费试听课网"
			});
			/**
			 * 轮播
			 */
			let url_slide = apiurl + inter.addr.slideShow;
			let fun1 = function(res) {
				console.log("======fun1========");
				console.log(res)
				let _data = res.list;
				if (_data) {
					_this.swiperList = _data;
				} else {
					_this.swiperList = [];
				}
			}
			let swiper = mdl.getData(url_slide, fun1);
			/**
			 * 区域
			 */
			let url_region = apiurl + inter.addr.getRegion2;
			let fun2 = function(res) {
				console.log("======fun2========");
				let _data = res.list;
				console.log(_data)
				if (_data) {
					_this.region = _data;
				} else {
					_this.region = [];
				}
				console.log(_this.region)
			}
			let region = mdl.getData(url_region, fun2);
			/**
			 * 产品列表
			 */
			_this.getList();
			// 			uni.getLocation({
			// 				type: 'wgs84',
			// 				success: function(res) {
			// 					console.log("=====getLocation-success=====")
			// 					console.log(res)
			// 					const latitude = res.latitude;
			// 					const longitude = res.longitude;
			// 					// 					uni.openLocation({
			// 					// 						latitude: latitude,
			// 					// 						longitude: longitude,
			// 					// 						success(res) {
			// 					// 							console.log("----openLocation-success----")
			// 					// 							console.log(res);
			// 					// 						},
			// 					// 						fail(f) {
			// 					// 							console.log("----openLocation-fail----")
			// 					// 							console.log(f);
			// 					// 						}
			// 					// 					});
			// 				},
			// 				fail(f) {
			// 					console.log("=====getLocation-fail=====")
			// 					console.log(f)
			// 				}
			// 			});
		},
		onPullDownRefresh() {
			console.log("========onPullDownRefresh=========")
			this.paramReset();
			this.getList("refresh");
		},
		onReachBottom() {
			console.log("=======onReachBottom=========")
			if (this.loadingType !== 0) {
				return;
			}
			if (this.param.pi >= this.param.pageTotal) {
				this.loadingType = 2;
				return;
			}
			this.param.pi = this.param.pi + 1;
			this.loadingType = 1;
			this.getList();
		},
		methods: {
			getList(type) {
				var that = this;
				let param = that.param;
				//?currentPage=1&pagesize=5&keywords=关键字&region=黄埔&cat=少儿&brand=英孚&age_start=0&age_end=10&subject_category=少儿英语
				var _param =
					"?currentPage=" + param.pi + "&pagesize=" + param.ps + "&keywords=" + param.keywords + "&region=" + param.region +
					"&cat=" + param.cat + "&brand=" + param.brand + "&age_start=" + param.age_start + "&age_end=" + param.age_end +
					"&subject_category=" + param.subject_category;
				let url_list = apiurl + inter.addr.article + _param;
				let fun = function(res) {
					console.log("======fun========");
					console.log(res)
					let data = res.list;
					let total = res.total;
					if (type) {
						if (data) {
							that.list = data;
						} else {
							that.list = [];
						}
						uni.stopPullDownRefresh();
					} else {
						if (data) {
							data.forEach(item => {
								that.list.push(item);
							});
						}
					}
					that.loadingType = 0;
					that.pagination(total);
				}
				let pro_list = mdl.getData(url_list, fun);
			},
			pagination(total) {
				let _pageSize = this.param.ps;
				let _pageTotal = Math.ceil(total / _pageSize);
				this.param.listTotal = total;
				this.param.pageTotal = _pageTotal;
			},
			search() {
				uni.showToast({
					title: '搜索1'
				})
			},
			confirm(e) {
				console.log(e)
				this.paramReset()
				let keywords = e.detail.value
				this.param.keywords = keywords;
				this.getList("search")
				this.serchVal = "";
			},
			showCity() {
				uni.showToast({
					title: '选择城市'
				})
			},
			paramReset() {
				this.param.pi = 1;
				this.param.pageTotal = 1;
				this.param.listTotal = 0;
				this.loadingType = 0;
			}
		}
	}
</script>

<style>
	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left: 8px;
	}

	.input-view {
		width: 80%;
		display: flex;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}

	.input-view .uni-icon {
		line-height: 30px !important;
	}

	.input-view .input {
		height: 30px;
		line-height: 30px;
		width: 94%;
		padding: 0 3%;
	}

	.tag-view {
		margin: 10upx 20upx;
		display: inline-block;
	}
</style>

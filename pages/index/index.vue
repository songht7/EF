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
			<swiper-block :swiperList="swiperList"></swiper-block>
			<view class="filter-box">
				<view class="flt-block ctgBox">
					<view class="ctgBtns ctgs" v-if="ctg" v-for="(c,t) in ctg" :key="t" @click="bindCtg" :id="c.name">{{c.name}}</view>
				</view>
				<view class="flt-block moreCtg" @click="filterCtgBtn" data-position="bottom">筛选</view>
			</view>
			<list-block :list="list"></list-block>
			<uni-load-more v-if="param.pageTotal>1" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</view>
		<!-- 弹出层 -->
        <view class="uni-banner" style="background:#FFFFFF;" v-if="bannerShow">
			<view class="pop-box">
				<view class="pop-head">
					<view class="pop-title">筛选</view>
					<view class="pop-close"  @tap="closeBanner"><text class="uni-icon uni-icon-close"></text></view>
				</view>
				<view class="pop-ctg-box">
					<view class="pop-ctg-name">学科年龄</view>
					<view class="pop-ctg-list" v-if="ageRange" v-for="(a,r) in ageRange" :key="r" @click="bindCtgAge" :id="a" type="age">{{a}}</view>
				</view>
			</view>
        </view>
        <view class="uni-mask" v-if="bannerShow"></view>
		<!-- 弹出层 -->
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
				ctg: [],
				subctg: [],
				brand: [],
				ageRange: [],
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
				},
                bannerShow: false
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
				console.log("======slideShow========");
				let _data = res.list;
				_this.setData("swiperList", _data);
			}
			let swiper = mdl.getData(url_slide, fun1);
			/**
			 * 区域
			 */
			let url_region = apiurl + inter.addr.getRegion2;
			let fun2 = function(res) {
				console.log("======getRegion2========");
				let _data = res.list;
				_this.setData("region", _data);
			}
			let region = mdl.getData(url_region, fun2);
			/**
			 * 分类
			 */
			let url_ctg = apiurl + inter.addr.getCategory;
			let fun3 = function(res) {
				console.log("======getCategory========");
				console.log(res)
				let _data = res.list;
				_this.setData("ctg", _data);

			}
			let getCategory = mdl.getData(url_ctg, fun3);
			/**
			 * 子分类
			 */
			let url_subctg = apiurl + inter.addr.getSubjectCategory;
			let fun4 = function(res) {
				console.log("======getSubjectCategory========");
				let _data = res.list;
				_this.setData("subctg", _data);

			}
			let getSubjectCategory = mdl.getData(url_subctg, fun4);
			/**
			 * brand
			 */
			let url_brand = apiurl + inter.addr.getBrand;
			let fun5 = function(res) {
				console.log("======getBrand========");
				let _data = res.list;
				_this.setData("brand", _data);

			}
			let getBrand = mdl.getData(url_brand, fun5);
			/**
			 * getAgeRange
			 */
			let url_age = apiurl + inter.addr.getAgeRange;
			let fun6 = function(res) {
				console.log("======getAgeRange========");
				let _data = res.list;
				_this.setData("ageRange", _data);

			}
			let getAgeRange = mdl.getData(url_age, fun6);
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
		onBackPress() {
			if (this.bannerShow) {
				this.bannerShow = false;
				return true;
			}
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
					console.log("======article========");
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
			setData(key, _data) {
				if (_data) {
					this[key] = _data;
				} else {
					this[key] = [];
				}
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
			bindCtg(e) {
				let eid = e.target.id;
				this.param.cat = eid;
				this.getList("search")
			},
            closeBanner: function() {
                this.bannerShow = false;
            },
            filterCtgBtn: function() {
                this.bannerShow = true;
            },
			bindCtgAge(e) {
				console.log(e)
// 				let eid = e.target.id;
// 				this.param.age = eid;
// 				this.getList("search")
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
		font-size: 24upx;
	}

	.filter-box {
		width: 90%;
		margin: 0 auto;
	}

	.filter-box,
	.flt-block {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.ctgBtns {
		width: 70%;
	}

	.moreCtg {
		width: 30%;
		text-align: left;
		display: flex;
		justify-content: flex-end
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
    /* 遮罩层 */
	.pop-box{padding: 30upx;}
    .uni-mask {
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 1;
    }

    /* 弹出层形式的广告 */
    .uni-banner {
        width: 100%;
        position: fixed;
        left: 50%;
        top: 70%;
        background: #FFF;
        border-radius: 10upx;
        z-index: 99;
        transform: translate(-50%, -50%);
    }
</style>

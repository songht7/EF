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
				<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="英语试听" />
				<uni-icon type="search" size="22" color="#666666"></uni-icon>
			</view>
		</uni-nav-bar>
		<view style="height:45px;">...</view>
		<!-- #endif -->
		<view class="content">
			<swiper-box :swiperList="swiperList"></swiper-box>
		</view>

		<uni-segmented-control :current="current" :values="tagList" v-on:clickItem="onClickItem" styleType="text" activeColor="#F69A22"></uni-segmented-control>
		<view class="tag-cont">
			<view v-show="current === 0">
				<view class="tag-list">
					<view class="tag-view">
						<uni-tag text="标签1" size="small" type="royal" circle="true" :inverted="inverted" @click="setInverted"></uni-tag>
					</view>
					<view class="tag-view">
						<uni-tag text="标签2" size="small" type="royal" circle="true" :inverted="inverted" @click="setInverted"></uni-tag>
					</view>
				</view>
			</view>
			<view v-show="current === 1">
				选项卡2的内容
			</view>
		</view>
		<list-block :list="list"></list-block>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	const mdl = util.module;
	const inter = util.Interface;
	import uniTag from '../../components/uni-tag.vue'
	import uniSegmentedControl from '../../components/uni-segmented-control.vue'
	import uniNavBar from '../../components/uni-nav-bar.vue'
	import uniIcon from '../../components/uni-icon.vue'
	import listBlock from '../../components/list-block.vue';

	export default {
		data() {
			return {
				"city": "上海",
				"wxApi": "",
				"category": [],
				"ageGroup": [],
				swiperList: [],
				tagList: [
					'成人',
					'少儿'
				],
				current: 0,
				inverted: true,
				list: []
			}
		},
		components: {
			uniIcon,
			uniNavBar,
			uniTag,
			uniSegmentedControl,
			listBlock
		},
		onShow() {},
		onLoad() {
			var _this = this;
			uni.setNavigationBarTitle({
				title: "英语免费试听课网"
			});
			let url_slide = inter.apiurl + inter.addr.slideShow;
			let fun1 = function(res) {
				console.log("======fun1========");
				console.log(res)
				let data = res.list;
				data.forEach(item => {
					_this.swiperList.push(item);
				});
			}
			let swiper = mdl.getData(url_slide, fun1);
			
			_this.getList(1);


			// 			uni.getLocation({
			// 				type: 'wgs84',
			// 				success: function(res) {
			// 					console.log("=====getLocation-success=====")
			// 					console.log(res)
			// 					const latitude = res.latitude;
			// 					const longitude = res.longitude;
			// // 					uni.openLocation({
			// // 						latitude: latitude,
			// // 						longitude: longitude,
			// // 						success(res) {
			// // 							console.log("----openLocation-success----")
			// // 							console.log(res);
			// // 						},
			// // 						fail(f) {
			// // 							console.log("----openLocation-fail----")
			// // 							console.log(f);
			// // 						}
			// // 					});
			// 				},
			// 				fail(f) {
			// 					console.log("=====getLocation-fail=====")
			// 					console.log(f)
			// 				}
			// 			});
		},
		methods: {
			getList(pi){
				var that=this;
				let url_list = inter.apiurl + inter.addr.article+"?pagesize=5&pageindex="+pi;
				let fun = function(res) {
					console.log("======fun========");
					console.log(res)
					let data = res.list;
					data.forEach(item => {
						that.list.push(item);
					});
				}
				let pro_list = mdl.getData(url_list,fun);
			},
			search() {
				uni.showToast({
					title: '搜索'
				})
			},
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			},
			showCity() {
				uni.showToast({
					title: '选择城市'
				})
			},
			onClickItem(index) {
			},
			setInverted() {
				this.inverted = !this.inverted;
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

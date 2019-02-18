<template>
	<view class="page">
		<!-- #ifndef MP-WEIXIN -->
		<!-- 固定在顶部的导航栏 -->
		<uni-nav-bar color="#333333" background-color="#FFFFFF" fixed="true" @click-left="showCity">
			<block slot="left">
				<view class="city" @click="showMulLinkageTwoPicker">
					<uni-icon type="location" color="#333333" size="22"></uni-icon>
					<text>{{city}}</text>
				</view>
			</block>
			<view class="input-view" :class="searchShow?'searchShow':''">
				<view class="searh-innter">
					<input confirm-type="search" @confirm="confirm" class="input search-ipt" @focus="searchBox('focus')" @blur="searchBox('blur')"
					 type="text" v-model="serchVal" :placeholder="placeholder" :value="param.keywords" />
				</view>
			</view>
		</uni-nav-bar>
		<view style="height:45px;">...</view>
		<!-- #endif -->

		<view class="content">
			<swiper-block :swiperList="swiperList" v-if="swiperList.length"></swiper-block>
			<view class="filter-box">
				<view class="flt-block ctgBox">
					<view class="ctg-btn-block">
						<view class="ctgBtns ctgs" :class="c.checked ?  'ctgChecked' : ''" v-if="ctg" v-for="(c,t) in ctg" :key="t"
						 @click="bindCtg(c.name,t)" :id="c.name">{{c.name}}</view>
					</view>
				</view>
				<view class="flt-block moreCtg" data-position="bottom">
					<text class="flt-txt" @click="filterCtgBtn">筛选</text>
				</view>
			</view>
			<list-block :list="list"></list-block>
			<uni-load-more v-if="param.pageTotal>1" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</view>
		<!-- 弹出层 -->
		<lvv-popup position="bottom" ref="lvvpopref">
			<view class="pop-inner">
				<view class="pop-box">
					<view class="pop-head">
						<view class="pop-title">筛选</view>
						<view class="pop-close" @tap="closeBanner">
							<uni-icon type="closeempty" size="42" color="#666666"></uni-icon>
						</view>
					</view>
					<view class="pop-main">
						<view class="pop-ctg-box">
							<form @reset="filterReset">
								<view class="filter-ctg-list">
									<view class="pop-ctg-block">
										<view class="pop-ctg-name">学科年龄</view>
										<radio-group name="age">
											<label :class="a.checked ?  'checkbox selectBox' : 'checkbox '" @click="filterBtn(a.value,g,'age')" v-for="(a,g) in ageRange"
											 :key="a.value">
												<radio :value="a.value" :checked="a.checked" v-show="false" />{{a.name}}
											</label>
										</radio-group>
									</view>
									<view class="pop-ctg-block">
										<view class="pop-ctg-name">学科分类</view>
										<radio-group class="flt-list" name="subctg">
											<view class="f-block" :class="s.checked ?  'checkbox selectBox' : 'checkbox '" @click="filterBtn(s.value,c,'subCtg')"
											 v-for="(s,c) in subctg" :key="s.value">
												<label class="f-label">
													<radio :value="s.value" :checked="s.checked" v-show="false" />{{s.name}}
												</label>
											</view>
										</radio-group>
									</view>
								</view>
								<view class="pop-ctg-btns">
									<view class="pop-btn cancel" @tap="closeBanner">取消</view>
									<view class="pop-btn confirm" @click="filterConfirm">确定</view>
								</view>
							</form>
						</view>
					</view>
				</view>
			</view>
		</lvv-popup>
		<!-- 弹出层 -->
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	// const wx = require('jweixin-module')
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;
	import uniNavBar from '../../components/uni-nav-bar.vue'
	import uniIcon from '../../components/uni-icon.vue'
	import uniLoadMore from '../../components/uni-load-more.vue'
	import lvvPopup from '../../components/lvv-popup.vue'
	import uniTag from '@/components/uni-tag.vue'
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../common/city.data.js';

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
				subctg: [{
					"value": "",
					"name": "全部",
					"checked": true
				}],
				brand: [],
				ageRange: [{
					"value": "-",
					"name": "全部",
					"checked": true
				}],
				list: [],
				serchVal: "",
				ctgChecked: "",
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
					"pageTotal": 1,
					"listTotal": 0
				},
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				rdoAgeVal: "-",
				rdoSubCtgVal: "",
				searchShow: false,
				searchBtnShow: true,
				placeholder: "搜索",
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mulLinkageTwoPicker: cityData,
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				successShow: ""
			}
		},
		computed: {},
		components: {
			uniIcon,
			uniNavBar,
			uniLoadMore,
			lvvPopup,
			uniTag,
			mpvuePicker,
			mpvueCityPicker,
			listBlock
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
				//console.log("======slideShow========");
				let _data = res.list;
				_this.setData("swiperList", _data);
			}
			let swiper = mdl.getData(url_slide, fun1);
			/**
			 * 区域
			 */
			let url_region = apiurl + inter.addr.getRegion2;
			let fun2 = function(res) {
				//console.log("======getRegion2========");
				let _data = res.list;
				_this.setData("region", _data);
			}
			let region = mdl.getData(url_region, fun2);
			/**
			 * 分类 - 成人、少儿
			 */
			let url_ctg = apiurl + inter.addr.getCategory;
			let fun3 = function(res) {
				//console.log("======getCategory========");
				//console.log(res)
				let _data = res.list;
				_this.setData("ctg", _data);

			}
			let getCategory = mdl.getData(url_ctg, fun3);
			/**
			 * 子分类 - 学科
			 */
			let url_subctg = apiurl + inter.addr.getSubjectCategory;
			let fun4 = function(res) {
				//console.log("======getSubjectCategory========");
				let _data = res.list;
				_data.forEach(item => {
					let _subCtg = {
						"value": item,
						"name": item,
						"checked": false
					};
					_this.subctg.push(_subCtg);
				});
			}
			let getSubjectCategory = mdl.getData(url_subctg, fun4);
			/**
			 * brand - 英孚、开心豆、韦伯...
			 */
			let url_brand = apiurl + inter.addr.getBrand;
			let fun5 = function(res) {
				//console.log("======getBrand========");
				let _data = res.list;
				_this.setData("brand", _data);

			}
			let getBrand = mdl.getData(url_brand, fun5);
			/**
			 * getAgeRange - 年龄段
			 */
			let url_age = apiurl + inter.addr.getAgeRange;
			let fun6 = function(res) {
				//console.log("======getAgeRange========");
				let _data = res.list;
				_data.forEach(item => {
					let age = {
						"value": item,
						"name": item,
						"checked": false
					};
					_this.ageRange.push(age);
				});
			}
			let getAgeRange = mdl.getData(url_age, fun6);
			/**
			 * 课程列表
			 */
			_this.getList();

			//定位
			_this.getLocation();
		},
		onShow() {
			var title = "英语免费试听",
				imgUrl = util.Interface.domain + "/static/share.jpg",
				dec = "英语免费试听课，在这里找到你想要的";
			mdl.wxShare("", title, imgUrl, dec);
		},
		onPullDownRefresh() {
			//console.log("========onPullDownRefresh=========")
			this.paramReset();
			this.getList("refresh");
		},
		onReachBottom() {
			//console.log("=======onReachBottom=========")
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
				console.log(url_list)
				uni.showLoading({
					title: '正在加载 ...'
				});
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
					uni.hideLoading();
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
				//console.log(e)
				this.paramReset()
				let keywords = e.detail.value
				this.param.keywords = keywords;
				this.getList("search")
				this.searchBox('sch')
				this.serchVal = keywords;
			},
			searchBox(type) {
				if (this.serchVal == "" && type == "blur") {
					this.searchShow = !this.searchShow
					this.searchBtnShow = !this.searchBtnShow
					this.placeholder = "搜索";
					this.blurToGet()
				} else if (this.serchVal != "" && type == "blur") {
					this.searchShow = true
					this.searchBtnShow = false
					this.placeholder = "学前英语试听";
					this.blurToGet()
				} else if (type == "focus") {
					this.searchShow = true
					this.searchBtnShow = false
					this.placeholder = "学前英语试听";
				}
			},
			blurToGet() {
				let oldKeyword = this.param.keywords;
				let newKeyword = this.serchVal;
				this.param.keywords = newKeyword;
				if (oldKeyword != newKeyword) {
					this.getList("search")
				}
			},
			getLocation() {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log("=====getLocation-success=====")
						console.log(res)
						const latitude = res.latitude;
						const longitude = res.longitude;
					},
					fail(f) {
						console.log("=====getLocation-fail=====")
						console.log(f)
					}
				});
			},
			showCity() {
				// 				uni.showToast({
				// 					title: '选择城市'
				// 				})
			},
			bindCtg(val, index) {
				this.param.pi = 1;
				if (this.ctg[index]["checked"] == true) {
					this.ctg[index]["checked"] = false
					this.param.cat = "";
				} else {
					for (let i in this.ctg) {
						if (i != index) {
							this.ctg[i]["checked"] = false;
						}
					}
					this.ctg[index]["checked"] = true
					this.param.cat = val;
				}
				this.getList("search")
			},
			filterCtgBtn() {
				this.$refs.lvvpopref.show();
			},
			closeBanner() {
				// 关闭modal弹出框
				this.$refs.lvvpopref.close();
			},
			filterConfirm: function() {
				this.param.pi = 1;
				let ageVals = this.rdoAgeVal.split("-");
				this.param.age_start = ageVals[0];
				this.param.age_end = ageVals[1];
				this.param.subject_category = this.rdoSubCtgVal;
				//console.log("=======filterConfirm=======");
				//console.log(this.param);
				this.getList("search");

				this.$refs.lvvpopref.close();
			},
			paramReset() {
				this.param.pi = 1;
				this.param.pageTotal = 1;
				this.param.listTotal = 0;
				this.loadingType = 0;
			},
			filterBtn(val, index, type) {
				switch (type) {
					case 'age':
						this.rdoAgeVal = val;
						for (let i in this.ageRange) {
							this.ageRange[i].checked = false;
						}
						this.ageRange[index].checked = true
						break;
					case 'subCtg':
						this.rdoSubCtgVal = val;
						for (let k in this.subctg) {
							this.subctg[k].checked = false;
						}
						this.subctg[index].checked = true
						break;
				}
			},
			onCancel: function(e) {
				//console.log(e)
			},
			onConfirm: function(e) {
				//console.log(JSON.stringify(e))
				var city = e.label.split("-");
				this.city = city[1];
				this.param.region = city[1];
				this.pickerText = e.label;
				this.param.pi = 1;
				this.getList("search");
			},
			showMulLinkageTwoPicker: function(e) {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [8, 0]
				this.$refs.mpvuePicker.show()
			},
			onBackPress: function(e) {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel();
					return true;
				}
				if (this.$refs.mpvueCityPicker.showPicker) {
					this.$refs.mpvueCityPicker.pickerCancel();
					return true;
				}
			},
			onUnload: function(e) {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel()
				}
				if (this.$refs.mpvueCityPicker.showPicker) {
					this.$refs.mpvueCityPicker.pickerCancel()
				}
			}
		}
	}
</script>

<style>
	@import "./index.css";
</style>

<template>
	<div class="activity-page">
		<block v-if="!lm">
			<view class="page-loading">
				正在加载···
			</view>
		</block>
		<block v-if="lm">
			<view class="activity-block">
				<img class="head-img" :src="sourceUrl+firstImage" />
			</view>
			<view class="activity-main">
				<view class="activity-block article-info">
					<view class="article-title">{{detail.name}}</view>
					<view class="article-ov">
						<text class="txt">售价：{{detail.current_price=="0.00"?"0":detail.current_price}}元</text>
						<text class="txt">适合年龄：{{detail.age_min}}-{{detail.age_max}}岁</text>
					</view>
					<view class="article-overview">{{detail.overview}}</view>
				</view>
				<view class="activity-block help-user" :class="surplus==0||Countdown==0?'help-user-succ':''">
					<view class="help-user-portrait portrait-block" v-for="(value,key) in help_list" :key="key">
						<img :src="value.headimgurl" class="portrait-img" alt="" />
					</view>
					<block v-if="Countdown!=0&&surplus!=0">
						<view class="help-user-portrait portrait-block" v-for="n in parseInt(surplus)" v-if="surplus>1" :key="n">
							<img src="../../static/contact.jpg" class="portrait-img" alt="" />
						</view>
						<view class="help-user-portrait portrait-block" v-if="surplus==1">
							<img src="../../static/contact.jpg" class="portrait-img" alt="" />
						</view>
					</block>
					<block v-if="Countdown==0&&surplus!=0">
						<view class="help-user-portrait portrait-block" v-for="p in parseInt(surplus)" v-if="surplus>0" :key="'portrait'+p">
							<img :src="'../../static/portrait/p'+p+'.jpg'" class="portrait-img" alt="" />
						</view>
					</block>
				</view>
				<view class="activity-block share-info-block" v-if="surplus>0&&Countdown!=0">
					<view class="share-info-txt">还差 {{surplus}} 位好友助力即可免费申请</view>
					<view class="share-info-txt">赶快召唤小伙伴吧！</view>
					<view class="share-info-txt">剩余<uni-countdown :timer="Countdown"></uni-countdown>时间助力结束</view>
				</view>
				<view class="activity-block share-info-block" v-if="Countdown==0||surplus<=0">
					<view class="share-info">恭喜您获得<text class="free">免费体验</text></view>
					<view class="share-info">原价{{detail.current_price=="0.00"?"0":detail.current_price}}元{{detail.name}}</view>
				</view>
				<!-- <view class="activity-block share-info-block" v-if="surplus>0&&Countdown==0">
				<view class="share-info-txt">对不起，助力已超时</view>
			</view> -->
				<view class="activity-block share-info-block" v-if="surplus>0&&Countdown!=0">
					<view class="share-info">分享成功即可<text class="free">免费体验</text></view>
					<view class="share-info">原价{{detail.current_price=="0.00"?"0":detail.current_price}}元{{detail.name}}</view>
				</view>
				<view class="activity-block help-block" v-if="surplus>0&&Countdown!=0">
					<view class="help-info" @click="toHelp()">帮我助力</view>
				</view>
				<block v-if="parent_openid!=openid">
					<view class="activity-block help-block" v-if="Countdown==0||surplus<=0">
						<navigator class="help-info" :url="'/pages/detail/index?id=' + article_id">我也要预约</navigator>
					</view>
				</block>
			</view>
		</block>
		<view class="share-tips" v-if="shareTips" @click="closeShareTips">
			<view class="share-box">
				<view class="s-row">
					点击右上角"<uni-icon size="45" type="more-filled" color="#FCFCFC"></uni-icon>"
					<uni-icon class="undo" size="50" type="undo" color="#FCFCFC"></uni-icon>
				</view>
				<view class="s-row">分享给好友完成助力</view>
			</view>
		</view>
	</div>
</template>

<script>
	import util from '../../common/util.js';
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;
	import uniCountdown from "../../components/uni-countdown.vue";
	import uniIcon from '../../components/uni-icon.vue'
	export default {
		data() {
			return {
				userInfo: {},
				article_id: "",
				portrait: "",
				detail: [],
				firstImage: "",
				brand_id: "",
				lm_id: "",
				parent_openid: "",
				nickname: "",
				openid: "",
				lm: "",
				help_list: {},
				surplus: 2,
				total: 3,
				Countdown: this.getDate({
					format: true
				}),
				shareTips: false
			}
		},
		components: {
			uniCountdown,
			uniIcon
		},
		onLoad(option) {
			this.lm_id = option.lm_id;
			this.parent_openid = option.uid;
		},
		onShow() {
			this.getData();
		},
		methods: {
			setShare(detail) {
				var that = this;
				let hash = window.location.hash;
				let t = "仅差" + that.surplus + "人助力成功!" + that.nickname + "喊你来助力!";
				var share_url = location.origin + "/?type=activity" + hash,
					title = detail.name ? t + detail.name : t,
					imgUrl = detail.image ? apiurl + detail.image[0]["original_src"] : util.Interface.domain + "/static/share.jpg",
					dec = "给好友助力，获得免费体验课 - " + detail.overview;
				mdl.wxShare(share_url, title, imgUrl, dec);
			},
			getData() {
				var _this = this;
				var funStor = function(res) {
					// 					console.log("=========getMyStorage========")
					// 					console.log(res)
					if (res) {
						_this.userInfo = res;
						_this.portrait = res.headimgurl;
						_this.openid = res.openid;
					} else {
						let hash = window.location.hash;
						var redirect_uri = location.origin + "/?type=activity" + hash;
						uni.setStorage({
							key: 'temp',
							data: {
								"parent_openid": _this.parent_openid,
								"lm_id": _this.lm_id
							},
							success: function() {}
						});
						mdl.getWXCode(redirect_uri);
					}
				}
				let myStorage = mdl.getMyStorage("uWXInfo", "", funStor);

				/**助力详细**/
				var parent_openid = _this.parent_openid;
				let _head = {};
				if (parent_openid != "") {
					_head = {
						"openid": parent_openid
					};
				}
				//console.log(_head)
				let url_getHelp = apiurl + inter.addr.getHelp + "?lm_id=" + _this.lm_id;
				// 				console.log(url_getHelp)
				// 				console.log(_head)
				let funHelp = function(res) {
					// 					console.log("======getHelp========");
					// 					console.log(res)
					let article = res.article.data;
					_this.article_id = article.id;
					let lm = res.lm;
					_this.lm = lm;
					let _add_time = lm.add_time;
					let currentTimeStamp = Date.parse(new Date());
					_add_time = _add_time.split(" ");
					_add_time = _add_time[0] + " 24:00:00";
					let arriveTimeStamp = Date.parse(_add_time);
					if (arriveTimeStamp <= currentTimeStamp) {
						_this.Countdown = 0;
					} else {
						_this.Countdown = _add_time;
					}
					let _surplus = _this.total - lm.help.total;
					_this.surplus = _surplus <= 0 ? 0 : _surplus;
					_this.help_list = lm.help.list;
					_this.nickname = lm.help.list[0].nickname;
					if (article) {
						_this.detail = article;
						_this.firstImage = article.image[0]["original_src"];
						_this.setShare(article);
						_this.brand_id = article.brand_id;
						uni.setNavigationBarTitle({
							title: article.name
						});
					}
				}
				let _getHelp = mdl.getData(url_getHelp, funHelp, "GET", "", _head);

				/**课程详细**/
				// 			let url_detail = apiurl + inter.addr.getDetail + "?id=" + _id;
				// 			let fun = function(res) {
				// 				console.log("======getDetail========");
				// 				console.log(res)
				// 				let _data = res.info;
				// 				if (_data) {
				// 					_this.detail = _data;
				// 					_this.firstImage = _data.image[0]["original_src"];
				// 					_this.setShare(_data);
				// 					_this.brand_id = _data.brand_id;
				// 					uni.setNavigationBarTitle({
				// 						title: _data.name
				// 					});
				// 				}
				// 			}
				// 			let _detail = mdl.getData(url_detail, fun);
			},
			toHelp() {
				let that = this;
				let url_savehelp = apiurl + inter.addr.saveHelp;
				let _data = {
					lm_id: that.lm_id
				}
				if (inter.wx.test_openid) { //测试用,可以给自己助力
					_data["help"] = "self"
				}
				var openid = that.openid;
				if (openid == that.parent_openid && inter.wx.test_openid == "") {
					that.shareTips = true;
					setTimeout(function() {
						that.shareTips = false
					}, 5000)
					// 					uni.showToast({
					// 						title: '分享给好友完成助力',
					// 						icon: "none",
					// 						duration: 2000
					// 					});
					return
				}

				let _head = {};
				if (openid != "") {
					_head = {
						"openid": openid
					};
				}
				let funSavehelp = function(res, resAll) {
					console.log("======toHelp========");
					console.log(resAll)
					if (resAll.success) {
						uni.showToast({
							title: '助力成功!',
							duration: 2000,
							complete: function(res) {
								setTimeout(function() {
									uni.navigateTo({
										url: "/pages/detail/index?id=" + that.article_id
									});
								}, 2500)
							}
						});
					} else {
						uni.showToast({
							title: '助力失败',
							icon: "none",
							duration: 2000
						});
					}
				}
				let _savehelp = mdl.getData(url_savehelp, funSavehelp, "POST", _data, _head);

			},
			closeShareTips() {
				this.shareTips = false
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

				let YMDhms = `${year}-${month}-${day} 24:00:00`;
				//console.log(YMDhms)
				return YMDhms;
				//return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	.page-loading {
		padding: 80upx 0;
		line-height: 2;
		color: #FE9C01;
		text-shadow: -1px 0 5px #FFF, 0 1px 5px #FFF,
			1px 0 5px #FFF, 0 -1px 5px #FFF;
		text-align: center;
		font-size: 40upx;
	}

	.activity-page {
		background: #FFDDA7;
		min-height: 900px;
	}

	.head-img {
		display: block;
		width: 100%;
	}

	.activity-main {
		width: 90%;
		margin: 0 auto;
		position: relative;
		top: -5upx;
		z-index: 1;
		padding: 0 0 100upx;
	}

	.article-info {
		background: #fff;
		padding: 10upx 15upx;
		box-shadow: 0 2upx 10upx #A7A7A7;
	}

	.article-title {
		color: #FDBE5C;
		font-size: 38upx;
		line-height: 1.4;
	}

	.txt {
		padding-right: 20upx;
	}

	.article-overview {
		padding: 40upx 0 5upx;
	}

	.share-info-block {
		padding: 20upx 0;
	}

	.share-info,
	.share-info-txt {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		font-size: 32upx;
		color: #FE9C01;
		text-shadow: -1px 0 5px #FFF, 0 1px 5px #FFF,
			1px 0 5px #FFF, 0 -1px 5px #FFF;
		letter-spacing: 1px;
	}

	.share-info-txt {
		text-shadow: none;
		color: #333;
	}

	.free {
		font-size: 40upx;
	}

	.help-user {
		display: flex;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		padding: 30upx 0 0;
	}

	.help-user-succ {
		justify-content: center;
	}

	.help-user-portrait {
		width: 45px;
		height: 45px;
		border-radius: 50%;
		overflow: hidden;
	}

	.portrait-img {
		width: 100%;
	}

	.help-info {
		background: #FAB951;
		color: #fff;
		text-align: center;
		padding: 10upx 0;
		width: 100%;
		border-radius: 10upx;
		font-size: 32upx;
	}

	.portrait-block {
		margin-right: 10upx;
	}
</style>

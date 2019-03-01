<template>
	<div class="activity-page">
		<view class="activity-block">
			<img class="head-img" :src="sourceUrl+firstImage" />
		</view>
		<view class="activity-main">
			<view class="activity-block article-info">
				<view class="article-title">{{detail.name}}</view>
				<view class="article-ov">
					<text class="txt">售价：{{detail.current_price}}元</text>
					<text class="txt">适合年龄：{{detail.age_min}}-{{detail.age_max}}岁</text>
				</view>
				<view class="article-overview">{{detail.overview}}</view>
			</view>

			<view class="activity-block share-info-block">
				<view class="share-info">分享成功即可<text class="free">免费体检</text></view>
				<view class="share-info">原价{{detail.current_price}}元{{detail.name}}</view>
			</view>
		</view>
	</div>
</template>

<script>
	import util from '../../common/util.js';
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;
	export default {
		data() {
			return {
				userInfo: {},
				detail: [],
				firstImage: "",
				brand_id: ""
			}
		},
		onLoad(option) {
			var _this = this;
			var funStor = function(res) {
				if (res) {
					_this.userInfo = res;
				} else {
					mdl.getWXCode();
				}
			}
			let myStorage = mdl.getMyStorage("uWXInfo", "", funStor)
			let _id = option.article_id;
			this.article_id = _id;
			let url_detail = apiurl + inter.addr.getDetail + "?id=" + _id;
			let fun = function(res) {
				console.log("======getDetail========");
				console.log(res)
				let _data = res.info;
				if (_data) {
					_this.detail = _data;
					_this.firstImage = _data.image[0]["original_src"];
					_this.setShare(_data);
					_this.brand_id = _data.brand_id;
					uni.setNavigationBarTitle({
						title: _data.name
					});
				}
			}
			let _detail = mdl.getData(url_detail, fun);
		},
		methods: {
			setShare(detail) {
				var that = this;
				let hash = window.location.hash;
				var share_url = util.Interface.domain + "/?type=activity&id=" + detail.id + hash,
					title = detail.name ? detail.name : "英语免费试听",
					imgUrl = detail.image ? apiurl + detail.image[0]["original_src"] : util.Interface.domain + "/static/share.jpg",
					dec = detail.overview ? detail.overview : "英语免费试听课，在这里找到你想要的";
				mdl.wxShare(share_url, title, imgUrl, dec);
			}
		}
	}
</script>

<style>
	.activity-page {
		background: #FFDDA7;
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
	
	.share-info-block{padding: 50upx 0;}
	.share-info {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		font-size: 32upx;
		color: #FE9C01;
		text-shadow: -1px 0 5px #FFF, 0 1px 5px #FFF,
      1px 0 5px #FFF, 0 -1px 5px #FFF;
	}
	.free{font-size: 40upx;}
</style>

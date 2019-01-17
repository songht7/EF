<template name="filter-box">
	<view class="filter-box">
		<view class="swiper-box" v-if="swiperList.length">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular" :interval="interval"
			 :duration="duration" indicator-color="#979797" indicator-active-color="#FFFFFF">
				<swiper-item class="swiper-item" v-for="(slide,index) in swiperList" :key="index">
					<view class="vli">
						<view class="vli2">
							<image class="slideImg" :src="sourceUrl+slide.original_src" mode="aspectFill"></image>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		name: "filter-box",
		props: {
			swiperList: {
				type: Array,
				default: []
			},
			indicatorDots: {
				type: Boolean,
				default: true
			},
			autoplay: {
				type: Boolean,
				default: true
			},
			circular: {
				type: Boolean,
				default: true
			},
			interval: {
				type: Number,
				default: 3000
			},
			duration: {
				type: Number,
				default: 1000
			}
		}
	}
</script>
<style>
	.search-box {
		display: flex;
		padding: 10upx 15upx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.area {
		width: 10%;
	}

	.search-block {
		position: relative;
		width: 80%;
	}

	.uni-icon {
		position: absolute;
		right: 10upx;
		top: 8upx;
		z-index: 1;
	}

	.search-input {
		background: #BEBEBE;
		border-radius: 20upx;
		height: 24upx;
		padding: 0 15% 0 5%;
		color: #333333;
	}

	.swiper-box {
		margin-bottom: 20upx;
	}

	.swiper {
		height: 300upx;
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
</style>

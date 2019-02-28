<template name="swiper-block">
	<view class="swiper-block">
		<view class="swiper-box" v-if="swiperList.length">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular" :interval="interval"
			 :duration="duration" indicator-color="#979797" indicator-active-color="#FFFFFF">
				<swiper-item class="swiper-item" v-for="(slide,index) in swiperList" :key="index">
					<view class="vli">
						<view class="vli2">
							<image class="slideImg" @click="linkTo(slide.link)" lazy-load="true" :src="sourceUrl+slide.original_src" mode="aspectFill"></image>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		name: "swiper-block",
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
		},
		methods: {
			linkTo(pram) {
				if (pram) {
					uni.navigateTo({
						url: '/pages/detail/index?'+pram
					});
				}
			}
		}
	}
</script>
<style>
	.swiper-box {
		/* margin-bottom: 20upx; */
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

<template>
	<view class="content">
		<view class="ef-imgs" v-for="(value,key) in 4" :key="key">
			<img :src="'/static/xiaoguo/p_'+(key+1)+'.jpg'" class="ef-img" alt="">
			<block v-if="key<=0">
				<view class="btns">
					<view class="btn-app btn-android">
						<img src="/static/xiaoguo/btn1.png" class="btn-app-img" alt="" @tap="getApp('android')">
					</view>
					<view class="btn-app btn-ios">
						<img src="/static/xiaoguo/btn2.png" class="btn-app-img" alt="" @tap="getApp('ios')">
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			getApp(type) {
				console.log(type)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.ef-imgs {
		width: 100%;
		position: relative;
	}

	.ef-img,
	.btn-app-img {
		width: 100%;
		display: block;
	}

	.btns {
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		bottom: 100upx;
		left: 0;
		width: 100%;
	}

	.btn-app {
		width: 45%;
	}
</style>

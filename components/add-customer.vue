<template>
	<view class="customer-main">
		<img src="/static/icon-1.png" class="logo" alt="">
		<view class="block-val">
			你好，我是来自试听课网的{{parm.name}}
		</view>
		<view class="block-val">
			长按识别二维码，添加我为好友吧！
		</view>
		<img :src="parm.src" class="c-img" alt="" />
	</view>
</template>

<script>
	export default {
		props: {
			parm: {
				type: Object,
				default () {
					return {
						name: "小张",
						src: "/static/customer.jpg"
					};
				}
			}
		},
		data() {
			return {};
		},
		computed: {},
		methods: {

		},
	}
</script>

<style>
	.logo {
		display: block;
		width: 30%;
		margin-bottom: 50upx;
	}

	.customer-main {
		padding: 50upx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.block-val {
		text-align: center;
		font-size: 32upx;
	}

	.c-img {
		display: block;
		width: 90%;
		height: auto;
	}
</style>

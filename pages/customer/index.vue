<template>
	<view class="page">
		<view class="customer-main">
			<img src="../../static/icon-1.png" class="logo" alt="">
			<view class="block-val">
				你好，我是来自试听课网的小万
			</view>
			<view class="block-val">
				长按识别二维码，添加我为好友吧！
			</view>
			<img src="/static/customer.jpg" class="c-img" alt="">
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	import uniIcon from '../../components/uni-icon.vue';
	const _interface = util.Interface;
	export default {
		data() {
			return {};
		},
		onLoad(option) {

		},
		computed: {},
		components: {
			uniIcon
		},
		methods: {

		}
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
		width: 80%;
	}
</style>

<template name="wx-share">
	<view class="wx-share">
		<view v-html="wxApi"></view>
	</view>
</template>

<script>
	export default {
		name: "filter-box",
		props: {
			wxApi: {
				type: String,
				default: "<script src='http://res2.wx.qq.com/open/js/jweixin-1.4.0.js'/>"
			}
		},
		methods: {
			wxshare() {
				wx.config({
					debug: false,
					appId: 'wx11eb371cd85adfd4',
					timestamp: 1422605955,
					nonceStr: 'Ashermed',
					signature: 'eq2e2',
					jsApiList: [
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo'
					]
				});
			}
		}
	}
</script>

<style>

</style>

<template name="integral">
	<view class="pop-box">
		<view class="pop-head">
			<view class="pop-title">活动规则</view>
			<view class="pop-close" @click="onClick()">
				<uni-icon type="closeempty" size="42" color="#666666"></uni-icon>
			</view>
		</view>
		<view class="pop-main">
			<view class="intro-box">
				<view class="intro-block">
					<view class="intro-h3"></view>
					<view class="intro-row"><text>1.</text><text> 新用户微信登录并绑定手机号即可获得100积分。</text></view>
					<view class="intro-row"><text>2.</text><text> 每日转发页面至朋友圈或发送给好友可获得50积分（每日三次）。</text></view>
					<view class="intro-row"><text>3.</text><text> 报名成功课程还可获得积分奖励</text></view>
					<view class="intro-row"><text>4.</text><text> 售价￥1的课程，1积分可兑换</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from './uni-icon.vue'
	export default {
		name: "integral",
		props: {},
		components: {
			uniIcon
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>
<style>
</style>

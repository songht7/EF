<template name="integral">
	<view class="pop-box">
		<view class="pop-head no-border">
			<view class="pop-title active-title">积分规则</view>
			<view class="pop-close" @click="onClick()">
				<uni-icon type="closeempty" size="42" color="#FEA503"></uni-icon>
			</view>
			<view class="cut-line"></view>
		</view>
		<view class="pop-main">
			<view class="intro-box">
				<view class="intro-block">
					<view class="intro-h3"></view>
					<view class="intro-row"><text class="numb-li">1.</text><text class="txt-orange">每1积分可在申请课程时抵用1元现金</text></view>
					<view class="intro-row"><text class="numb-li">2.</text><text>新用户微信登录并绑定手机号即可获得30积分。</text></view>
					<view class="intro-row"><text class="numb-li">3.</text><text>每日转发页面至朋友圈或发送给好友可获得20积分（每日3次）。</text></view>
				</view>
			</view>
		</view>
		<view class="fix-bottom">
			<view class="intro-row txt-small txt-center">本活动最终解释权以试听课网为准</view>
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

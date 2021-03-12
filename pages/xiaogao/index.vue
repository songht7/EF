<template>
	<view class="content">
		<view class="ef-imgs" v-for="(value,key) in 6" :key="key">
			<block v-if="(key+1)==1">
				<view id="Logo">
					<img src="/static/xiaoguo/logo.png" class="logo" alt="效果英语">
				</view>
				<view class="btns">
					<view class="btn-app btn-android">
						<img src="/static/xiaoguo/btn1.png" class="btn-app-img" alt="android app" @tap="getApp('android')">
					</view>
					<view class="btn-app btn-ios">
						<img src="/static/xiaoguo/btn2.png" class="btn-app-img" alt="ios app" @tap="getApp('ios')">
					</view>
				</view>
			</block>
			<block v-if="(key+1)==2">
				<view class="page-val">
					<view class="page-val-block">
						<view class="val-title">
							应用介绍
						</view>
						<view class="val-info">
							<view class="info-row">效果英语，顾名思义是一个可以评估使用者</view>
							<view class="info-row">学习效果的英语学习工具。</view>
						</view>
						<view class="val-info val-info-en">
							<view class="info-row">Xiaoguo English is an English Learning Application that allows users to learn,
								try and practise English dialogs in a very interactive way. </view>
						</view>
					</view>
				</view>
			</block>
			<block v-if="(key+1)==3">
				<view class="page-val page-3-main" :style="{backgroundImage: 'url(/static/xiaoguo/p_'+(key+1)+'.jpg)'}">
					<view class="page-val-block page-3">
						<view class="val-info">
							<view class="info-row">该工具采用海量实用口语素材，通过
								对话、记忆、强化、练习等方式，高
								效学习英语，效果加倍，真正做到按
								照效果进行评估。</view>
						</view>
						<view class="val-info val-info-en">
							<view class="info-row">It’s evolutinal personal evaluation system will give users direct evaluations from each
								teacher and improve your English more efficiently.</view>
						</view>
						<view class="val-info val-info-link">
							<a href="//www.meetji.com" class="web-link">应用官网：WWW.MEETJI.COM</a>
						</view>
					</view>
				</view>
			</block>
			<block v-if="(key+1)==5">
				<view class="page-val page-val-flex" style="top: 22%;">
					<view class="page-val-block">
						<view class="val-title" style="display: none;">
							公司介绍
						</view>
						<view class="val-info">
							<view class="info-row" style="padding-bottom: 20upx;">梧桫教育科技有限公司，致力于利用人工智能和软件技术，打
								造适合中国英语学习爱好者的学习、练习、交流英语学习经验
								的平台。</view>
							<view class="info-row">
								我们相信通过技术的革命，可以有效提高学习的效率，改变传
								统学习模式只学不练的弊端，让你活学、活用，掌握真正的英
								语。</view>
						</view>
					</view>
				</view>
			</block>
			<block v-if="(key+1)==6">
				<view class="page-val page-val-flex" style="top: 40%;width:75%;">
					<view class="page-val-block">
						<view class="val-title" style="display: none;">
							应用说明
						</view>
						<view class="val-info">
							<view class="info-row">该应用是一个英语学习爱好者学习，练习，的平台和工具，可以有效帮助英语学习爱好者高效学习，练习英语。</view>
						</view>
					</view>
				</view>
			</block>
			<img v-if="(key+1)!=3" :src="'/static/xiaoguo/p_'+(key+1)+'.jpg'" class="ef-img" alt="">
		</view>
		<view>
			<copyright></copyright>
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

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
	}

	.ef-imgs {
		width: 100%;
		position: relative;
	}


	#Logo {
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
		padding: 60upx 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.logo {
		display: block;
		width: 30%;
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

	.page-val {
		background: #FFFFFF;
	}

	.page-val-block {
		padding: 60upx;
	}

	.val-title {
		font-size: 36upx;
		line-height: 2;
		color: #0fc180;
	}

	.page-val-flex {
		position: absolute;
		background: none;
		width: 100%;
		left: 0;
		top: 0
	}

	.val-info {
		padding-bottom: 20upx;
	}

	.info-row {
		font-size: 24upx;
		color: #333333;
		line-height: 1.4;
	}

	.val-info-en .info-row {
		font-size: 21upx;
		color: #7c7c7c
	}

	.page-3-main {
		background-repeat: no-repeat;
		background-position: right;
		background-size: cover;
	}

	.page-val-block.page-3 {
		padding: 30upx 60upx;
		width: 60%;
	}

	.page-3 .info-row {
		line-height: 1.4;
	}

	.web-link {
		line-height: 3;
		display: block;
		color: #0fc583;
		font-size: 24upx;
		text-decoration: none;
	}

	@media screen and (min-device-width: 1025px) {
		.content {
			width: 1025px;
			margin: 0 auto;
		}

		.page-val-block.page-3 {
			padding: 30px 60px;
		}

		.val-title {
			font-size: 18px;
		}

		.info-row {
			font-size: 16px;
		}

		.val-info-en .info-row {
			font-size: 14px;
		}

		.web-link {
			font-size: 18px;
		}
	}
</style>

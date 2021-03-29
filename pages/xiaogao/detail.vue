<template>
	<view class="content">
		<view class="page-head">
			<view id="Logo">
				<img src="/static/xiaoguo/logo.png" class="logo" alt="效果英语">
			</view>
		</view>
		<view class="page-main">
			<block v-if="type=='company'">
				<img src="/static/xiaoguo/pic-1.png" class="ef-img" alt="">
				<view class="cont-block">
					<view class="val-title">
						公司介绍
					</view>
					<view class="cont-row">
						<text style="font-weight: bold;">梧桫教育科技有限公司</text>，致力于利用人工智能和软件技术，打造适合中国英语学习爱好者的学习、练习、交流英语学习经验的平台。
					</view>
					<view class="cont-row">
						我们相信通过技术的革命，可以有效提高学习的效率，改变传统学习模式只学不练的弊端，让你活学、活用，掌握真正的英语。
					</view>
				</view>
			</block>
			<block v-else-if="type=='contact'">
				<img src="/static/xiaoguo/pic-2.png" class="ef-img" alt="">
				<view class="cont-block">
					<view class="val-title">
						联系我们
					</view>
					<view class="cont-row">
						<view class="contact-us">
							<view style="width:100%;line-height: 1;">
								<view>
									<a href="https://www.meetji.com" class="crlink">梧桫（上海）教育科技有限公司</a>
								</view>
								<view><text class="crlink">浦东新区书院镇丽正路1628号4栋1~2层</text></view>
								<view>
									<a href="mailto:aqi@wsshanghai.com" class="crlink">aqi@wsshanghai.com</a>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<block v-else>
				<img src="/static/xiaoguo/pic-3.png" class="ef-img" alt="">
				<view class="cont-block">
					<view class="val-title">
						移动应用介绍
					</view>
					<view class="cont-row">
						效果英语，顾名思义是一个可以评估使用者学习效果的英语学习工具。该工具，采用海量实用口语素材，通过对话，记忆，强化，练习等方式，高效学习英语，效果加倍，真正做到按照效果进行评估。
					</view>
					<view class="cont-row">
						Xiaoguo English is an English Learning Application that allows users to learn, try and practise English dialogs
						in a very interactive way. It's evolutinal personal evaluation system will give users direct evaluations from
						each teacher and improve your English more efficiently.
					</view>
					<view class="cont-row">
						<a href="//www.meetji.com" class="web-link">应用官网：WWW.MEETJI.COM</a>
					</view>
					<view class="val-title">
						申请应用说明
					</view>
					<view class="cont-row">该应用是一个英语学习爱好者学习，练习，的平台和工具，可以有效帮助英语学习爱好者高效学习，练习英语。</view>
				</view>
			</block>
		</view>
		<view v-if="false">
			<view id="Copyright" class="copyright">
				<view style="width:100%; padding:20px 0;line-height: 1;">
					<view class="about-us">
						<view class="us-block">
							<navigator url="/pages/index/detail?type=company" class="comment-btn">公司介绍</navigator>
						</view>
						<view class="us-block">
							<navigator url="/pages/index/detail?type=contact" class="comment-btn">联系方式</navigator>
						</view>
						<view class="us-block">
							<navigator url="/pages/index/detail?type=product" class="comment-btn">产品特色</navigator>
						</view>
					</view>
					<view>
						<a href="https://www.meetji.com" class="crlink">梧桫（上海）教育科技有限公司</a>
					</view>
					<view><text class="crlink">浦东新区书院镇丽正路1628号4栋1~2层</text></view>
					<view>
						<a href="mailto:aqi@wsshanghai.com" class="crlink">aqi@wsshanghai.com</a>
					</view>
					<view style="padding: 15px 0 0;">
						<!-- http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011702005308 -->
						<a class="crlink" target="_blank" href="http://www.beian.gov.cn/">
							<img src="/static/national.png" style="float:left;" />
							<!-- <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">沪公网安备 31011702005308号 </p> -->
							<p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">沪ICP备19000677号-6</p>
						</a>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'company' //company:公司介绍,contact:联系方式,product:产品特色
			}
		},
		onLoad(option) {
			var _this = this;
			let type = option.type;
			_this.type = type;
		},
		onNavigationBarButtonTap(e) {
			console.log("success")
		},
		methods: {
			getApp(type) {
				console.log(type)
			}
		}
	}
</script>

<style>
	@import "./xg.css";

	.page-head {
		width: 100%;
		position: relative;
		background: #11c483;
		min-height: 300upx;
	}

	.page-main {
		width: 90%;
		margin: 0 auto;
		position: relative;
		top: -120upx;
		z-index: 1;
	}

	.cont-block {
		padding: 20upx;
	}

	.cont-row {
		line-height: 1.4;
		padding-bottom: 15upx;
	}
</style>

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
			<view id="Copyright" class="copyright">
				<view style="width:100%; padding:20px 0;line-height: 1;">
					<view class="about-us">
						<view class="us-block">
							<navigator url="/pages/xiaogao/detail?type=company" class="comment-btn">公司介绍</navigator>
						</view>
						<view class="us-block">
							<navigator url="/pages/xiaogao/detail?type=contact" class="comment-btn">联系方式</navigator>
						</view>
						<view class="us-block">
							<navigator url="/pages/xiaogao/detail?type=product" class="comment-btn">产品特色</navigator>
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
	@import "./xg.css";
</style>

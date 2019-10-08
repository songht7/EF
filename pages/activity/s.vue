<template>
	<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
		<view class="saf-page-main">
			<view class="swiper-block">
				<swiper class="swiper-box" indicator-dots="false" autoplay="autoplay" circular="circular" interval="3000" duration="500">
					<swiper-item v-for="(slide,index) in swiperList" :key="index">
						<view class="swiper-item">
							<view class="slide-info">
								<view class="s-inner">
									<img class="saf-logo" src="/static/saf.png" alt="saf">
									<img class="slide-info1" src="/static/slide_info1.png" alt="">
								</view>
							</view>
							<image class="slideImg" lazy-load="true" :src="slide.original_src" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="page-content page-inner">
				<view class="page-wrapper">
					<view class="page-block block-right">
						<view class="user-box">
							<view class="user-title">
								<!-- 免费获得 SAF 专业择校评估 -->
								<image class="title-img title-img-2" src="/static/title2.png" mode="aspectFit"></image>
							</view>
							<view class="user-main">
								<view class="tip-box" v-if="tipShow">
									{{tips}}
								</view>
								<view class="form-box">
									<form @submit="formSubmit">
										<view class="user-list">
											<view class="uni-list-row">
												姓名
											</view>
											<view class="uni-list-row">
												<input class="uni-input" name="name" placeholder="" value="" />
											</view>
										</view>
										<view class="user-list">
											<view class="uni-list-row">
												手机
											</view>
											<view class="uni-list-row">
												<input class="uni-input" name="phone" type="number" placeholder="" value="" />
											</view>
										</view>
										<view class="uni-btn">
											<button formType="submit" :loading="loading" class="saf-btn" :class="loading?'btn-loading':''">{{sentRes}}</button>
										</view>
										<view class="protect">
											<img class="icon-saf icon-suo" src="/static/suo.png" alt="">SAF 保护您的隐私
										</view>
									</form>
								</view>
							</view>
						</view>
					</view>
					<view class="page-block block-left">
						<view class="saf-title">
							<!-- <view class="saf-t">SAF 学生的共识</view> -->
							<img class="title-img title-img-1" src="/static/title1.png" alt="">
						</view>
						<view class="saf-ov">
							往届学生分享参加 SAF 学习项目的实际价值和生活变化经历
						</view>
						<view class="video-box">
							<img class="icon-saf icon-arw" src="/static/arw.png" alt="">
							<view class="video-main">
								<video id="myVideo" @error="videoErrorCallback" :src="video" :muted="muted" controls :autoplay="autoplay"></video>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="saf-items">
				<view class="page-inner">
					<view class="saf-title">
						<!-- <view class="saf-t">SAF 学生的共识</view> -->
						<img class="title-img title-img-3" src="/static/title3.png" alt="">
					</view>
					<view class="saf-ov">
						选择 SAF 的海外访学项目，便是在投资您的未来
					</view>
					<view class="item-list">
						<view class="item-block" v-for="(obj,k) in items" :key="k">
							<view class="item-img">
								<img class="safImg" :src="obj.img" alt="">
							</view>
							<view class="item-main">
								<view class="item-title">
									{{obj.title}}
								</view>
								<view class="item-title">
									{{obj.item}}
								</view>
								<view class="item-des">
									<view class="item-text-row">
										<text class="item-test">{{obj.des1}}</text>
									</view>
									<view class="item-text-row">
										<text class="item-test">{{obj.des2}}</text>
									</view>
								</view>
								<view class="item-middle">
									<view class="item-dtl">
										{{obj.dtl}}
									</view>
									<view class="item-date">
										{{obj.date}}
									</view>
									<view class="item-end-date">
										报名截止日期：<text class="txt-org">{{obj.endDate}}</text>
									</view>
								</view>
								<view class="item-btn" @tap="goTo">
									我要咨询
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="footer">
				<view class="footer-main page-inner">
					<img class="footer-logo" src="/static/saf.png" alt="saf" />
					<view class="footer-left">
						海外学习体验助您脱颖而出
					</view>
					<view class="footer-right">
						<view class="r-list">
							入读知名大学
						</view>
						<view class="r-list">
							匹配适合的交流项目
						</view>
						<view class="r-list">
							转变人生的探险之旅
						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import util from '../../common/util.js';
	var graceChecker = require("../../common/graceChecker.js");
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;
	export default {
		data() {
			return {
				loading: false,
				videoContext: "",
				video: "/static/video-saf.mp4",
				autoplay: true,
				muted: false,
				swiperList: [{
					"original_src": "/static/slide1.jpg"
				}],
				api: "http://api_test.meetji.com/v2/ApiHome-saveSingle.htm",
				formData: {
					"name": "",
					"phone": "",
					"channel_code": "saf"
				},
				sentRes: "立即行动",
				tipShow: false,
				tips: "正在提交...",
				scrollTop: 0,
				items: [{
					"img": "/static/saf-1.jpg",
					"title": "加州大学洛杉矶分校 (UCLA)",
					"item": "影视制作项目",
					"des1": "美国名校访学经历加持",
					"des2": "无可比拟的国际硬核履历",
					"dtl": "参加项目的学生将师从加州大学洛杉矶分校的顶级教授和好莱坞知名导演，现场参访索尼、派拉蒙等大型影视公司，了解好莱坞成熟的影视制作及影片发行的流程，并全面学习影视前期制作、编剧、导演、拍摄和后期的系统知识。参加该项目的学生需要编导、制作和剪辑并发布一部微电影并通过大银幕审核方可结课。",
					"date": "项目日期：2月3日 - 2月16日",
					"endDate": "11月01日"
				}, {
					"img": "/static/saf-2.jpg",
					"title": "伦敦-阿姆斯特丹",
					"item": "国际法项目",
					"des1": "国际法律精英的成长之路",
					"des2": "为你的国际化履历中添上重要的一笔",
					"dtl": "学生将参加一系列专门讲授国际法的教授讲座，以解决当今世界面临的最大的问题。主题包括国际组织作为和平缔造者的作用、国际社会的演变、条约法、国际法与国内法之间的关系等。学生将有机会访问英国皇家法庭、英联邦最高法院，以及海牙的国际法庭、和平宫等机构，接触到世界上任何其他地方都无可比拟的国际法实例。为今后的学术和职业生涯提供背景提升。",
					"date": "项目日期：2月2日 - 2月15日",
					"endDate": "10月20日"
				}, {
					"img": "/static/saf-3.jpg",
					"title": "巴塞罗那 第二语言教学理",
					"item": "论及教学实践项目",
					"des1": "开阔国际视野",
					"des2": "培养具备开放教育理念的未来卓越教师",
					"dtl": "项目将在IES Abroad巴塞罗那中心举办，特邀西班牙排名第一巴塞罗那大学教授全英文授课。通过海外课堂教学实践活动、教育学讲座、中西方学生交流和文化参访活动，让学生实践教育学专业知识，实地了解中西教育系统及教育方法差异，认识西班牙当地学校多语言与多元文化教育的特色，感受西班牙传统文化风情。同时SAF将组织学生考察一所政府或民间教育机构（如西班牙教育厅等），着重研究与第二外语教育相关的创新或政策制定。",
					"date": "项目日期：2月2日 - 2月15日",
					"endDate": "10月20日"
				}, {
					"img": "/static/saf-4.jpg",
					"title": "维也纳-日内瓦",
					"item": "国际组织项目",
					"des1": "撰写精彩国际履历",
					"des2": "拓展国际化事业的开始",
					"dtl": "该项目通过讲座、案例分析和实地参访联合国维也纳总部、欧盟总部等，对国际组织的历史、机制及运行进行了全面的阐述，使学生能够对国际组织有第一手的了解，储备知识，为以后申请在国际组织的实习及就职打下坚实的基础。",
					"date": "项目日期：2月3日 - 2月16日",
					"endDate": "10月20日"
				}, {
					"img": "/static/saf-5.jpg",
					"title": "加州大学洛杉矶分校 (UCLA)",
					"item": "大数据项目",
					"des1": "美国名校访学",
					"des2": "掌握全球前沿大数据技术",
					"dtl": "学生将学习数据科学在不同领域帮助解决的各种挑战和问题，包括社会科学，金融，健康和健身以及娱乐。 该课程涉及数据科学中的关键知识领域，包括数据开发和管理，机器学习和自然语言处理，统计分析，数据可视化和推理。 本课程还介绍了数据科学应用中涉及的一些技术，包括Hadoop，NoSQL和Python编程语言。 该课程包括案例研究，要求学生处理现实生活中的数据科学问题。",
					"date": "项目日期：2月2日 - 2月15日",
					"endDate": "11月01日"
				}, {
					"img": "/static/saf-6.jpg",
					"title": "华盛顿大学",
					"item": "人工智能项目",
					"des1": "全球顶尖人工智能专家面授",
					"des2": "建立国际人脉圈",
					"dtl": "同学们将通过系列讲座及实地参访与经验丰富的教师密切合作学习，提升在计算机科学、机器学习和大数据方面的知识，学习如何创建在复杂情况下能够智能运行并准确响应的计算系统。项目期间将为学生们安排一系列讲座，并深入到总部位于西雅图的企业进行参访，这些企业均是利用认知计算进一步进行消费者研究和工程设计。完成后，同学们将获得SAF和华盛顿大学颁发的项目结业证书。",
					"date": "项目日期：2月2日 - 2月15日",
					"endDate": "10月20日"
				}]

			};
		},
		onLoad(option) {
			this.setShare();
		},
		onShow() {},
		onReady() {
			var vi = uni.createVideoContext('myVideo');
			this.videoContext = vi;
			vi.play();
		},
		methods: {
			setShare(dtl) {
				var that = this;
				var share_url = util.Interface.domain + "/?type=s#/pages/activity/s",
					title = "免费获得 SAF 专业择校评估",
					imgUrl = util.Interface.domain + "/static/h5/saf.png",
					dec = "海外学习体验助您脱颖而出";
				mdl.wxShare(share_url, title, imgUrl, dec);
			},
			videoErrorCallback: function(e) {
				console.log(e.target.errMsg)
			},
			formSubmit: function(e) {
				var that = this;
				if (that.loading == true) {
					return
				}
				let formData = e.detail.value;
				var rule = [{
						name: "name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请填写姓名"
					},
					{
						name: "phone",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请填写正确的手机号"
					}
				];
				//进行表单检查
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var _data = {
						"name": formData.name,
						"phone": formData.phone,
						"source": "s"
					};
					var _head = {
						"channel": "saf"
					};

					// var _data = {
					// 	"name": "xxxx",
					// 	"age_range": "123",
					// 	"sex": "男",
					// 	"phone": "123123123",
					// 	"article_id": 1
					// };
					// var _head = {
					// 	"openid": "oeH5Zw1gRAZpsj6PJC4h3-huJmzQ"
					// };

					let url = that.api; //apiurl + inter.addr.saveSingle; //
					console.log(_data)
					that.loading = true;
					that.tipShow = true;
					that.tips = "正在提交...";
					let sentSAF = function(res, resAll) {
						console.log(resAll)
						var _tip = "提交成功！！";
						if (!resAll.success) {
							_tip = "行动失败,请重试";
						}
						that.tips = _tip;
						setTimeout(function() {
							that.tipShow = false;
							that.tips = "正在提交...";
							that.loading = false;
						}, 2000);
					}
					let _sentSAF = mdl.getData(url, sentSAF, "POST", _data, _head);


				} else {
					that.tipShow = true;
					that.tips = graceChecker.error;
					this.loading = false
					setTimeout(() => {
						that.tipShow = false;
						that.tips = "正在提交...";
					}, 1000)
				}

			},
			goTo: function(e) {
				console.log(e)
				uni.pageScrollTo({
					scrollTop: 100,
					duration: 300
				})
			}
		}
	}
</script>

<style>
	@import "./saf.css";
</style>

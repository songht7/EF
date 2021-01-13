<template>
	<view id="Copyright" class="copyright">
		<view style="width:100%; padding:20px 0;line-height: 1;">
			<view>
				<a href="//main.meetji.com" class="crlink">{{$Copyright.title?$Copyright.title:"梧桫（上海）教育科技有限公司"}}</a>
			</view>
			<view><text class="crlink">浦东新区书院镇丽正路1628号4栋1~2层</text></view>
			<view>
				<a href="mailto:aqi@wsshanghai.com" class="crlink">aqi@wsshanghai.com</a>
			</view>
			<view style="padding: 15px 0 0;">
				<!-- http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011702005308 -->
				<a class="crlink" target="_blank" :href="$Copyright.recordcode?'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode='+$Copyright.recordcode:'http://www.beian.gov.cn/'">
					<img src="/static/national.png" style="float:left;" />
					<!-- <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">沪公网安备 31011702005308号 </p> -->
					<p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">{{$Copyright.ICP}}</p>
				</a>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.copyright {
		background: #000000;
		text-align: center;
	}

	.crlink {
		display: inline-block;
		color: #939393;
		text-decoration: none;
		line-height: 25px;
	}
</style>

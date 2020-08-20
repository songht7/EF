<template>
	<view id="Copyright" class="copyright">
		<view style="width:100%; padding:20px 0;">
			<view>
				<a href="//main.meetji.com" class="crlink">{{$Copyright.title?$Copyright.title:"梧桫试听课网"}}</a>
			</view>
			<!-- http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011702005308 -->
			<a class="crlink" target="_blank" :href="$Copyright.recordcode?'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode='+$Copyright.recordcode:'http://www.beian.gov.cn/'">
				<img src="/static/national.png" style="float:left;" />
				<!-- <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">沪公网安备 31011702005308号 </p> -->
				<p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">{{$Copyright.ICP}}</p>
			</a>
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
		line-height: 40px;
	}
</style>

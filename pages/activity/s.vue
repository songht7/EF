<template>
	<saf-temp :type="type"></saf-temp>
</template>

<script>
	import safTemp from './saf-temp.vue'
	import util from '../../common/util.js';
	const mdl = util.module;
	export default {
		data() {
			return {
				type: "s"
			}
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
		components: {
			safTemp
		},
		methods: {
			setShare(dtl) {
				var that = this;
				var share_url = util.Interface.domain + `/?type=${that.type}#/pages/activity/${that.type}`,
					title = "免费获得 SAF 专业择校评估",
					imgUrl = util.Interface.domain + "/static/h5/saf.png",
					dec = "带您叩开世界名校之门";
				mdl.wxShare(share_url, title, imgUrl, dec);
			}
		}
	}
</script>

<style>
</style>

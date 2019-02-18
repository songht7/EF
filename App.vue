<script>
	import util from '@/common/util.js';
	const mdl = util.module;
	export default {
		onLaunch: function() {
// 			var isIOS=mdl.isIOS();
// 			if (isIOS) {
// 				mdl.wxShare();
// 			}
			//console.log('App Launch')
		},
		onShow: function() {
			var _this = this;
			mdl.getWXCode();
			//console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
			uni.removeStorage({
				key: 'wx_ticket',
				success: function(res) {}
			});
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
</style>

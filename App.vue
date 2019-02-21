<script>
	import util from '@/common/util.js';
	const mdl = util.module;
	export default {
		onLaunch: function() {
			var pageis = mdl.queryString("type");
			var id = mdl.queryString("id");
			console.log(pageis)
			if (pageis == "home") {
				window.location.href = location.origin;
			} else if (pageis == "detail" && id) {
				window.location.href = location.origin + '/#/pages/detail/index?id=' + id
				// 				uni.navigateTo({
				// 					url: '/pages/detail/index?id='+id
				// 				});
			} else if (pageis == "ef" && id) {
				window.location.href = location.origin + '/#/pages/detail/ef?key=' + id
				// 				uni.navigateTo({
				// 					url: '/pages/detail/ef?key='+id
				// 				});
			}
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

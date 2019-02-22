<script>
	import util from '@/common/util.js';
	const mdl = util.module;
	const pageis = mdl.queryString("type");
	export default {
		onLaunch: function() {
			var id = mdl.queryString("id");
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
			//console.log('App Show')
			var _this = this;
			let hash = window.location.hash;
			if (hash != "#/pages/detail/ef?key=2") {
				mdl.getWXCode();
			}
		},
		onHide: function() {
			//console.log('App Hide')
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

<script>
	import util from '@/common/util.js';
	const mdl = util.module;
	const pageis = mdl.queryString("type");
	export default {
		onLaunch: function() {
			//console.log('App Launch')
			var id = mdl.queryString("id");
			var key = mdl.queryString("key") || 2;
			if (pageis == "home") {
				window.location.href = location.origin;
			} else if (pageis == "detail" && id) {
				window.location.href = location.origin + '/#/pages/detail/index?id=' + id
				// 				uni.navigateTo({
				// 					url: '/pages/detail/index?id='+id
				// 				});
			} else if (pageis == "ef" && id) {
				let hash = window.location.hash;
				window.location.href = location.origin + '/' + hash
			} else if (pageis == "ef" && key) {
				let hash = window.location.hash;
				window.location.href = location.origin + '/#/pages/detail/ef' + key
			} else if (pageis) {
				let hash = window.location.hash;
				window.location.href = location.origin + '/' + hash
			}
		},
		onShow: function() {
			//console.log('App Show')
			// 			this.$store.dispatch('get_sysInfo')
			// 			if (this.$store.state.sysInfo.model == undefined) {
			// 				uni.redirectTo({
			// 					url: "/pages/error"
			// 				});
			// 				return false
			// 			} else {
			// 				console.log("else else")
			// 			}
			var _this = this;
			let hash = window.location.hash;
			if (hash != "#/pages/detail/ef?key=2" || hash != "#/pages/detail/ef2") {
				// mdl.getWXCode();
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

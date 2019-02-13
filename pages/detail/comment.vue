<template>
	<view class="comment-page">
		<view class="comment-main">
			<form @submit="formSubmit">
				<view class="star-box">
					<uni-rate size="28" value="0" max="5" margin="1" @change="changeStar"></uni-rate>
				</view>
				<view class="uni-textarea">
					<textarea value="" name="Comment" placeholder="评论(至少15字)" @blur="bindTextAreaBlur" auto-height />
					</view>
				<view class="cmt-btns">
					<button formType="submit" :loading="loading" class="comment-btn">提交评论</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate.vue"
	import util from '../../common/util.js';
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;

	export default {
		data() {
			return {
				userInfo:{},
				loading:false,
				openid:"",
				article_id:"",
				star:0,
				comment:""
			};
		},
		components: {
			uniRate
		},
		onLoad(option) {
			var _this = this;
			var funStor=function(res){
				_this.userInfo=res;
			}
			let myStorage = mdl.getMyStorage("uWXInfo","",funStor)
			let articleid = option.articleid;
			_this.article_id=articleid;
		},
		methods: {
			changeStar(e){
				console.log(e)
				this.star=e.value;
			},
			bindTextAreaBlur: function (e) {
				this.comment=e.detail.value;
				console.log(e.detail.value)
			},
			formSubmit(e){
				var that = this;
				if (this.loading == true) {
					return
				}
				this.loading = true;
				let _comment=this.comment;
				var count=_comment.length;
				if(count>=15){
					var _data = {
						"article_id":this.article_id,
						"star": this.star,
						"comment": _comment
					};
					let url_saveComment = apiurl + inter.addr.saveComment;
					let funSave = function(res) {
						console.log("=======saveComment========")
						console.log(res)
						that.loading = false
						uni.showModal({
							title: "评论成功",
							content: "感谢您的评论，待管理员审核",
							showCancel: false,
							confirmText: "确定",
							success: function (res) {
								console.log(123)
								uni.navigateBack({
									delta:1
								})
							}
						})
					}
					let openid=that.userInfo.openid?that.userInfo.openid:"";
					let _saveComment = mdl.getData(url_saveComment, funSave, "POST", _data,{"openid":openid});
				} else {
					uni.showToast({
						title: "评论(至少15字)",
						icon: "none"
					});
					this.loading = false
				}
			}
		}
	}
</script>

<style>
.comment-page{padding: 60upx 40upx;}
.comment-main{width: 100%;}
.star-box{padding: 40upx 0 30upx;border-bottom: 2upx solid #D2D2D2;margin-bottom: 30upx;}
.uni-textarea{padding-bottom: 40upx;}
.comment-btn{border-radius: 50upx;text-align: center;display: flex;align-content: center;justify-content: center;align-items: center;color: #535353;}
</style>


module.exports = {
	getCode:function(key){
		let REDIRECT_URI=urlEncode("http://main.meetji.com/");//授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
		let scope="snsapi_base";//snsapi_userinfo （弹出授权页面，获取更多信息）
		let state="";//重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
		let url='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx11eb371cd85adfd4&redirect_uri='+REDIRECT_URI+'&response_type=code&scope='+scope+'&state='+state+'#wechat_redirect';
		var result=""
		uni.request({
			url:url,
			success(res) {
				result=res;
				console.log(res)
			},
			fail(err) {
				result=err;
				console.log(err)
			},complete(c) {
				console.log("getCode")
				return result
			}
		})
	}
}

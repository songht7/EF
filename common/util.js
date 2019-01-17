const isArray = Array.isArray || function(obj) {
	return obj instanceof Array;
};
const Interface = {
	//"SendMail": "http://www.spacehu.com/space/mail/mail.php?leo=407794660@qq.com",
	"SendMail": "http://www.spacehu.com/space/mail/mail.php?leo=alein.qi@163.com",
	// 	,"getData":"http://api_test.meetji.com/v1/ApiEnum-getRegion.htm?id=110000"
	"apiurl": "http://api_test.meetji.com",
	"domain": "http://www.meetji.com",
	"addr": {
		"slideShow": "/v2/ApiHome-slideShow.htm",
		"article": "/v2/ApiHome-article.htm",
		"getRegion": "/v1/ApiEnum-getRegion.htm",
		"getWeChatInfo": "/v2/ApiWeChat-getWeChatInfo.htm"
	},
	"wx": {
		"appid": "wx11eb371cd85adfd4",
		"access_token": "client_credential",
		"secret": "01ef7de58bc18da629d4ec33a62744f9",
		"getToken": "https://api.weixin.qq.com/cgi-bin/token"
	}

};
const module = {
	getData: function(url,fun,method, data) {
		console.log(url)
		let result = [];
		uni.request({
			url: url,
			method: method || "GET",
			data: data || {},
			success: function(res) {
				console.log("======success========");
				console.log(res);
				result=res.data.data;
			},
			fail: function(err) {
				console.log("======fail========");
				console.log(err);
				result = {
					"Result": "0",
					"Msg": "接口请求失败",
					"err": err
				}
			},
			complete: function(comp) {
				console.log("======complete========");
				console.log(result)
				if(fun){new fun(result)}
			}
		})
	},
}
const getToken = function() {
	var appid = this.Interface.wx.appid;
	var secret = this.Interface.wx.secret;
	var _url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" +
		secret;
	//alert(_url);
	uni.request({
		url: _url,
		method: "GET",
		success: function(res) {
			//alert("success");
			if (res.errmsg) {
				//alert(res.errmsg);
			} else {
				//alert(res.errcode);
			}
		},
		fail: function(err) {
			//alert(err.errMsg);
		},
		complete: function(comp) {
			//alert("comp");
		}
	})
}
export default {
	Interface,
	module,
	getToken,
	isArray
}

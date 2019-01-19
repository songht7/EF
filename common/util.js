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
		"article": "/v2/ApiHome-article.htm", //列表
		"getDetail": "/v2/ApiHome-article_detail.htm",
		"saveSingle": "/v2/ApiHome-saveSingle.htm", //预约POST
		"saveComment": "/v2/ApiHome-saveComment.htm", //评论
		"getCategory":"/v2/ApiHome-getCategory.htm",//获取分类
		"getSubjectCategory":"/v2/ApiHome-getSubjectCategory.htm",//获取子分类
		"getBrand":"/v2/ApiHome-getBrand.htm",
		"getRegion": "/v1/ApiEnum-getRegion.htm",
		"getRegion2": "/v2/ApiEnum-getRegion.htm", //区域
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
	getData: function(url, fun, method, data) {
		console.log(url)
		let result = [];
		uni.request({
			url: url,
			method: method || "GET",
			data: data || {},
			success: function(res) {
				console.log("======success========");
				console.log(res);
				let __res=res.data;
				if (__res.success) {
					if (__res.data) {
						result = __res.data;
					} else if (__res.post) {
						result = __res.post;
					} else {
						result = __res.info;
					}
				}
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
				if (fun) {
					new fun(result)
				}
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
const getList = function() {
	let _list = [ {},{}, {
		"id": 5,
		"title": "专业认证培训师,教你地道英语",
		"overview": "免费试听体验课",
		"price": "7999",
		"sale": "免费",
		"total": "1000",
		"putout": "101",
		"brandLogo": "../../static/ef/logo2.png",
		"navTo":"",
		//"navTo": "http://www.ef.com.cn/online/lp/cn/2017yr/mobile/product_feature_ft_light.aspx?ctr=cn&lng=cs&apr=ProductFeatureFT&offer=FreeDemo&ptn=EMSP&Etag=edm-dcoo-none-all-none-E_3rd_DS_030",
		"slideimg": [
			"../../static/ef/img1.jpg",
			"../../static/ef/img2.jpg"
		],
		"comment": {
			"percent": "4.5",
			"list": [{
				"portrait": "../../static/ef/logo.png",
				"name": "amile",
				"cont": "孩子喜欢这样的环境，老师很优秀，家长很放心",
				"grade": "4.8",
				"date": "2018-5-10"
			}]
		}
	}]
	if (key!=undefined) {
		return _list[key];
	} else {
		return _list;
	}
}

export default {
	Interface,
	module,
	getToken,
	getList,
	isArray
}

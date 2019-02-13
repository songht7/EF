const wx = require('jweixin-module')
const isArray = Array.isArray || function(obj) {
	return obj instanceof Array;
};
const Interface = {
	//"SendMail": "http://www.spacehu.com/space/mail/mail.php?leo=407794660@qq.com",
	"SendMail": "http://www.spacehu.com/space/mail/mail.php?leo=stk@meetji.com",
	// 	,"getData":"http://api_test.meetji.com/v1/ApiEnum-getRegion.htm?id=110000"
	"apiurl": "http://api_test.meetji.com",
	"domain": "http://main.meetji.com",
	"addr": {
		"slideShow": "/v2/ApiHome-slideShow.htm",
		"article": "/v2/ApiHome-article.htm", //列表
		"getDetail": "/v2/ApiHome-article_detail.htm",
		"saveSingle": "/v2/ApiHome-saveSingle.htm", //预约POST
		"saveComment": "/v2/ApiHome-saveComment.htm", //评论
		"getCategory": "/v2/ApiHome-getCategory.htm", //获取分类
		"getSubjectCategory": "/v2/ApiHome-getSubjectCategory.htm", //获取子分类
		"getAgeRange": "/v2/ApiHome-getAgeRange.htm", //获取年龄段
		"getBrand": "/v2/ApiHome-getBrand.htm", //品牌
		"getRegion": "/v1/ApiEnum-getRegion.htm",
		"getRegion2": "/v2/ApiEnum-getRegion.htm", //区域
		"getBookedList":"/v2/ApiHome-getBookedList.htm",//预约列表
		"getWeChatInfo": "/v2/ApiWeChat-getWeChatInfo.htm",
		"getJsApiTicket": "/v2/ApiWeChat-getJsApiTicket.htm"
	},
	"wx": {
		"appid": "wx11eb371cd85adfd4",
		"access_token": "client_credential",
		"secret": "01ef7de58bc18da629d4ec33a62744f9",
		"getToken": "https://api.weixin.qq.com/cgi-bin/token",
		"openid":"oeH5Zw1gRAZpsj6PJC4h3-huJmzQ"//测试
	}

};
const module = {
	getData: function(url, fun, method, data, _head) {
		let result = [];
		uni.request({
			url: url,
			method: method || "GET",
			data: data || {},
			header: _head || {},
			success: function(res) {
				// 				console.log("======success========");
				// 				console.log(res);
				let __res = res.data;
				if (__res.success) {
					if (__res.data) {
						result = __res.data;
					} else if (__res.post) {
						result = __res.post;
					} else {
						result = __res.info;
					}
				} else {
					result = {
						"Result": "0",
						"Msg": "请求失败，请重试!",
						"err": ""
					}
				}
			},
			fail: function(err) {
				// 				console.log("======fail========");
				// 				console.log(err);
				result = {
					"Result": "0",
					"Msg": "接口请求失败",
					"err": err
				}
			},
			complete: function(comp) {
				// 				console.log("======complete========");
				// 				console.log(result)
				if (fun) {
					new fun(result)
				}
			}
		})
	},
	wxShare: function(share_url, title, imgUrl, dec) {
		let funTicket = function(res) {
			console.log("=======getTicket======")
			console.log(res)
			// 			uni.setStorage({
			// 				key: 'wx_ticket',
			// 				data: {
			// 					"access_token": res.access_token,
			// 					"jsapi_ticket": res.ticket,
			// 					"signature": res.signature
			// 				},
			// 				success: function() {}
			// 			});
			var _config = {
				debug: false,
				appId: Interface.wx.appid,
				timestamp: res.timestamp,
				nonceStr: res.noncestr,
				signature: res.signature,
				jsApiList: [
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ'
				]
			}
			wx.config(_config);
		}
		let url_ticket = Interface.apiurl + Interface.addr.getJsApiTicket + "?url=" + location.origin + "/#/";

		let wx_ticket = this.getData(url_ticket, funTicket)

		let _href = location.origin + "/" + location.hash;
		console.log(_href)
		var share_url = share_url ? share_url : "http://main.meetji.com:3001?wxr=" + encodeURIComponent(_href);
		var wxSet = {
			title: title,
			desc: dec,
			link: share_url,
			imgUrl: imgUrl,
			trigger: function(res) {
				// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
			},
			success: function(res) {},
			cancel: function(res) {

			},
			fail: function(res) {
				//alert(JSON.stringify(res));
			}
		};
		wx.ready(function() {
			// 2. 分享接口
			// 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
			wx.onMenuShareAppMessage(wxSet);
			// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
			wx.onMenuShareTimeline(wxSet);
			// 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
			wx.onMenuShareQQ(wxSet);
		});
	},
	queryString: function(value) {
		const reg = new RegExp(`(^|&)${value}=([^&]*)(&|$)`, 'i')
		const r = window && window.location.search.substr(1).match(reg)
		if (r != null) {
			return unescape(r[2])
		}
		return null
	},
	isWeixin: function() {
		return !!/micromessenger/i.test(navigator.userAgent.toLowerCase())
	},
	getWXCode: function() {
		var _this = this,
			appid = Interface.wx.appid,
			secret = Interface.wx.secret;
		// 		console.log("======getWXInfos========")
		// 		console.log(_this.isWeixin())
		// 		console.log(location.origin)
		// 		console.log(type)

		_this.userLogin("061ax0962CiClR04eP462VkU862ax09c"); //测试用
		if (!_this.isWeixin()) {
			//return
		}
		var _uWXInfo = "";
		uni.getStorage({
			key: 'uWXInfo',
			success: function(res) {
				_uWXInfo = res.data;
			},
			complete: function() {
				console.log("=====getStorage-_uWXInfo======")
				console.log(_uWXInfo)
				if (_uWXInfo && _uWXInfo.openid) {
					_this.userLogin("", _uWXInfo.openid);
				} else {
					let REDIRECT_URI = encodeURIComponent(Interface.domain), //授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
						scope = "snsapi_base", //snsapi_userinfo （弹出授权页面，获取更多信息）
						state = "STATE"; //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
					var _url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
						REDIRECT_URI +
						'&response_type=code&scope=' + scope + '&state=' + state + '#wechat_redirect';
					let code = _this.queryString('code');
					if (code) {
						console.log(code)
						_this.userLogin(code);
					} else {
						//window.location.href = _url;
					}
				}
			}
		});

	},
	userLogin: function(code, openid) {
		var _this = this;
		var result = "";
		var param = code ? "?code=" + code : "?openid=" + openid
		var _url = Interface.apiurl + Interface.addr.getWeChatInfo + param;
		console.log("======getWXInfo========")
		console.log(_url)
		//return;
		uni.request({
			url: _url,
			method: "GET",
			data: {},
			success(res) {
				console.log(res)
				result = res;
				let _data = res.data.data;
				if (_data.openid) {
					uni.setStorage({
						key: 'uWXInfo',
						data: _data,
						success: function() {
							console.log('setStorage-uWXInfo-success');
						}
					})
				}
			},
			fail(err) {
				result = err;
				console.log(err)
			},
			complete(c) {}
		})
	},
	getMyStorage: function(key, val, fun) {
		var _storage = "";
		uni.getStorage({
			key: key,
			success: function(res) {
				if (val) {
					_storage = res.data.val;
				} else {
					_storage = res.data;
				}
			},
			complete(c) {
				if (fun) {
					new fun(_storage)
				}
			}
		});
	}
}
const getList = function(key) {
	let _list = [{}, {}, {
		"id": 5,
		"title": "专业认证培训师,教你地道英语",
		"overview": "免费试听体验课",
		"price": "7999",
		"sale": "免费",
		"total": "1000",
		"putout": "101",
		"brandLogo": "../../static/ef/logo2.png",
		"navTo": "",
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
	if (key != undefined) {
		return _list[key];
	} else {
		return _list;
	}
}

export default {
	Interface,
	module,
	getList,
	isArray
}

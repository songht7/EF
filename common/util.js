// #ifdef MP-WEIXIN || H5
const wx = require('jweixin-module')
import md5 from "./md5.js";
// #endif
const isArray = Array.isArray || function(obj) {
	return obj instanceof Array;
};
const Interface = {
	"SendMail": {
		"url": "http://www.spacehu.com/space/mail/mail.php?leo=",
		"email": ["980558589@qq.com", "stk@meetji.com", "yunfeng.ma@inmobi.com", "jason.wu@inmobi.com"],
		"testEmail": ["407794660@qq.com"]
	},
	"copyright": {
		"title": "梧桫（上海）教育科技有限公司",
		"recordcode": "31011702005308", //默认meetji.com
		"ICP": "沪公网安备 31011702005308号"
	},
	// 	,"getData":"http://api_test.meetji.com/v1/ApiEnum-getRegion.htm?id=110000"
	"apiurl": "http://api_test.meetji.com",
	"domain": "http://www.meetji.com",
	"template_id": "lArO_3bhjAAoCMdv78bmJ2l46L-HByz-4Co4tCDEiyI", //'4M8RWgwsGDYlZL_NuWg--FecFh3QKWMW1hVZIfm34IU'
	"addr": {
		"sendRegistSms": "/v4/ApiSms-sendRegistSms.htm", //发送验证码(有阻拦：手机号已使用) 测试：1111
		"sendSms": "/v4/ApiSms-sendSms.htm", //发送验证码(无阻拦）
		"slideShow": "/v2/ApiHome-slideShow.htm",
		"article": "/v2/ApiHome-article.htm", //列表
		"getDetail": "/v2/ApiHome-article_detail.htm",
		"saveSingle": "/v2/ApiHome-saveSingle.htm", //预约POST
		"getHelp": "/v2/ApiHome-getHelp.htm", //助力详细
		"saveHelp": "/v2/ApiHome-saveHelp.htm", //帮助助力
		"saveComment": "/v2/ApiHome-saveComment.htm", //评论
		"getCategory": "/v2/ApiHome-getCategory.htm", //获取分类
		"getSubjectCategory": "/v2/ApiHome-getSubjectCategory.htm", //获取子分类
		"getAgeRange": "/v2/ApiHome-getAgeRange.htm", //获取年龄段
		"getBrand": "/v2/ApiHome-getBrand.htm", //品牌
		"getRegion": "/v1/ApiEnum-getRegion.htm",
		"getRegion2": "/v2/ApiEnum-getRegion.htm", //区域
		"getBookedList": "/v2/ApiHome-getBookedList.htm", //预约列表
		"saveUserInfo": "/v2/ApiHome-saveUserInfo.htm", //编辑保存用户
		"getWeChatInfo": "/v2/ApiWeChat-getWeChatInfo.htm",
		"getJsApiTicket": "/v2/ApiWeChat-getJsApiTicket.htm",
		"savePoint": "/v2/ApiHome-savePoint.htm", //得积分POST
		"sendWechatMessage": "/v2/ApiWeChat-sendWechatMessage.htm" //发送订阅消息-公众号?code=1
	},
	"wx": {
		"appid": "wx11eb371cd85adfd4",
		"appidQY": "ww00bf81f97337653e", //企业微信
		"access_token": "client_credential",
		"secret": "01ef7de58bc18da629d4ec33a62744f9",
		"getToken": "https://api.weixin.qq.com/cgi-bin/token",
		"test_openid": "" //"oeH5Zw1gRAZpsj6PJC4h3-huJmzQ" //测试
	}

};
let deepTranslateParam = ""; //北京 媒体 深度转化对接参数
const module = {
	getData: function(url, fun, method, data, _head) {
		let result = [];
		let resultAll = [];
		uni.request({
			url: url,
			method: method || "GET",
			data: data || {},
			header: _head || {},
			success: function(res) {
				// console.log("mdl.getData:", url);
				// console.log(res);
				let __res = res.data;
				resultAll = __res;
				if (__res.success) {
					if (__res.data) {
						result = __res.data;
					} else if (__res.post) {
						result = __res.post;
					} else if (__res.result) {
						result = __res.result;
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
					new fun(result, resultAll)
				}
			}
		})
	},
	subscribemsg() {
		let url = encodeURIComponent(window.location.href);
		let tempId = 'BgdSbZEnDeCGmr8X_dtZuPGPtbaC9MaapKbAAhbKCcM';
		let subscribemsg_url = 'https://mp.weixin.qq.com/mp/subscribemsg?action=get_confirm&appid=' +
			Interface.wx.appid + '&scene=1000&template_id=' + tempId + '&redirect_url=' + url +
			'&reserved=stk#wechat_redirect';
		console.log(url)
		console.log(subscribemsg_url)
		window.location.href = subscribemsg_url;
	},
	addCustomer(parm) {
		//POST https://api.weixin.qq.com/cgi-bin/message/subscribe/bizsend?access_token=ACCESS_TOKEN
		console.log("---addCustomer---", parm)
		//我的模板
		//上课提醒 K6gp-WO8aM2XVAiMeGTmtRHyRcBQaSG6--KqUAEurps
		//名片交换通知 2al7eSNW2j5x_DOMJLKbFi9q_xA_LWxVfKqspqN3W08
		let _data = {
			access_token: parm.access_token, //string 接口调用凭证
			touser: parm.openid, //string 接收者（用户）的 openid
			template_id: "2al7eSNW2j5x_DOMJLKbFi9q_xA_LWxVfKqspqN3W08", //string 所需下发的订阅模板id
			page: "", //string跳转网页时填写[非必填]
			miniprogram: "", //Array.<Objtect> 跳转小程序时填写，格式如{ "appid": "pagepath": { "value": any } }[非必填]
			data: {
				"tips": {
					"value": "试听课网正邀请您添加他为好友，加入与他的聊天"
				},
				"name": {
					"value": "小万"
				},
				"class": {
					"value": "梧桫（上海）教育"
				}
			}
		} //Object 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
		console.log(_data)
		//
		let url_addTemplate = 'https://api.weixin.qq.com/wxaapi/newtmpl/addtemplate';
		let url_getTemplateList = 'https://api.weixin.qq.com/wxaapi/newtmpl/gettemplate?access_token=' +
			_data.access_token;
		let url_send = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/bizsend';
		uni.request({
			url: url_getTemplateList,
			method: "GET", //GET POST
			data: _data,
			success: function(res) {
				console.log("======subscribe-message:request-success========", res)
				//code：0 代表成功 1 参数不完整 2 加密校验失败 3 参数异常 4 	记录不存在 5 访问频率过快 
			},
			fail: function(err) {
				console.log("======subscribe-message:request-fail========", err);
			},
			complete: function(comp) {
				if (parm.fun) {
					new fun()
				}
			}
		})
	},
	dtMd5(parm) { //媒体 深度转化对接 step1
		// console.log("deepTranslate:", parm) //accountId, bidId, click_ext, dkey, status, trackParam 
		let accountId = parm.accountId ? parm.accountId : "";
		let bidId = parm.bidId ? parm.bidId : "";
		let click_ext = parm.click_ext ? parm.click_ext : "";
		let dkey = parm.dkey ? parm.dkey : "";
		let status = parm.status ? parm.status : "";
		let trackParam = parm.trackParam ? parm.trackParam : "";
		let str = accountId + bidId + click_ext + dkey + status + trackParam;
		let sign = md5.hex_md5(str)
		// console.log(str)
		var params = Object.keys(parm).map(function(key) {
			return key + "=" + parm[key];
		}).join("&");
		deepTranslateParam = params + "&sign=" + sign;
		console.log(deepTranslateParam)
	},
	deepTranslate(fun) { //媒体 深度转化对接 step2
		let api1 = 'https://openapi.bayimob.com/openApi/deepTranslate/v2';
		let api2 = "https://openapi.bayimob.com/openApi/orderDeepTranslate/v2";
		let apiUrl = api1 + "?" + deepTranslateParam;
		console.log(apiUrl)
		uni.request({
			url: apiUrl,
			method: "GET",
			success: function(res) {
				console.log("======deepTranslate:request-success========", res)
				//code：0 代表成功 1 参数不完整 2 加密校验失败 3 参数异常 4 	记录不存在 5 访问频率过快 
			},
			fail: function(err) {
				console.log("======deepTranslate:request-fail========", err);
			},
			complete: function(comp) {
				if (fun) {
					new fun()
				}
			}
		})
	},
	wxShare: function(share_url, title, imgUrl, dec) {
		var that = this;
		if (!that.isWeixin()) {
			return
		}
		//console.log(share_url, title, dec)
		var funTicket = function(res) {
			// 			console.log("=======getTicket======")
			// 			console.log(res)
			uni.setStorage({
				key: 'wx_ticket',
				data: {
					"access_token": res.access_token,
					"jsapi_ticket": res.ticket,
					"noncestr": res.noncestr,
					"signature": res.signature,
					"expires_in": res.expires_in
				},
				success: function() {}
			});
			var _config = {
				debug: false,
				appId: Interface.wx.appid,
				timestamp: res.timestamp,
				nonceStr: res.noncestr,
				signature: res.signature,
				jsApiList: [
					'updateAppMessageShareData',
					'updateTimelineShareData',
					'onMenuShareAppMessage',
					'onMenuShareTimeline',
					'onMenuShareQQ'
				]
			}
			wx.config(_config);
		}
		var getTicketUrl = location.origin + "/#/";
		if (that.isIOS()) {
			getTicketUrl = location.origin + "/";
		}
		let url_ticket = Interface.apiurl + Interface.addr.getJsApiTicket + "?url=" + getTicketUrl;
		let _head = {};
		let channel_code = that.queryString("channel_code");
		if (channel_code) {
			_head = {
				"channel_code": channel_code
			};
		}
		let wx_ticket = that.getData(url_ticket, funTicket, "GET", "", _head)

		var storFun = function(res) {
			if (res == "") {}
		}
		//that.getMyStorage("wx_ticket", "", storFun);


		let _href = location.origin + "/" + location.hash;
		// 		console.log("======share_url=====")
		// 		console.log(_href)
		_href = "http://main.meetji.com:3001?wxr=" + encodeURIComponent(_href)
		var share_url = share_url ? share_url : _href;
		imgUrl = imgUrl ? imgUrl : Interface.domain + "/static/share.jpg";
		var wxSet = {
			title: title || "英语免费试听",
			desc: dec || "英语免费试听课，在这里找到你想要的",
			link: share_url,
			imgUrl: imgUrl,
			success: function() {
				let fun = function(storageRes) {
					let openid = storageRes.openid ? storageRes.openid : "";
					let test_openid = Interface.wx.test_openid;
					let _head = {
						"openid": openid || test_openid
					};
					console.log("-----share succ----")
					console.log(_head)
					let funSave = function(res) {
						if (res.point) {
							uni.getStorage({
								key: 'uWXInfo',
								success: function(ress) {
									let _uWXInfo = ress.data;
									_uWXInfo["point"] = res.point;
									uni.setStorage({
										key: 'uWXInfo',
										data: _uWXInfo,
										success: function() {}
									})
								},
							})
						}
					}
					let url_savePoint = Interface.apiurl + Interface.addr.savePoint;
					/*分享获得积分*/
					let _savePoint = that.getData(url_savePoint, funSave, "POST", "", _head);
				}
				that.getMyStorage("uWXInfo", "", fun)
			}
		};
		wx.ready(function() {
			//wx.updateAppMessageShareData(wxSet);
			//wx.updateTimelineShareData(wxSet);
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
	isIOS: function() {
		var isIphone = navigator.userAgent.includes('iPhone');
		var isIpad = navigator.userAgent.includes('iPad');
		return isIphone || isIpad;
	},
	isWeixin: function() {
		return !!/micromessenger/i.test(navigator.userAgent.toLowerCase())
	},
	getWXCode: function(redirect_uri) {
		var _this = this,
			appid = Interface.wx.appid,
			secret = Interface.wx.secret;
		// 		console.log("======getWXInfos========")
		//		console.log(_this.isWeixin())
		// 		console.log(location.origin)
		// 		console.log(type)

		//_this.userLogin("061AMrz72wh1XR0VkTB72Knmz72AMrzb"); //测试用
		var test_openid = Interface.wx.test_openid;
		if (!_this.isWeixin() && test_openid == "") {
			_this.goHomePage();
			return
		}
		var _uWXInfo = "";
		uni.getStorage({
			key: 'uWXInfo',
			success: function(res) {
				_uWXInfo = res.data;
			},
			complete: function() {
				// console.log("=====getStorage-_uWXInfo======")
				// console.log(_uWXInfo)
				if ((_uWXInfo && _uWXInfo.openid) || test_openid) {
					var __openid = _uWXInfo.openid || test_openid;
					_this.userLogin("", __openid);
				} else {
					let redirect_uri = redirect_uri ? redirect_uri : Interface.domain;
					//授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
					let REDIRECT_URI = encodeURIComponent(redirect_uri),
						scope = "snsapi_userinfo", //snsapi_base，snsapi_userinfo （弹出授权页面，获取更多信息）
						state = "STATE"; //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
					var _url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
						appid + '&redirect_uri=' +
						REDIRECT_URI +
						'&response_type=code&scope=' + scope + '&state=' + state +
						'#wechat_redirect';
					let code = _this.queryString('code');
					//console.log(_url)
					if (code) {
						//console.log(code)
						_this.userLogin(code);
					} else {
						window.location.href = _url;
					}
				}
			}
		});

	},
	userLogin: function(code, _openid) {
		var _this = this;
		var result = "";
		var param = code ? "?code=" + code : "";
		var _head = "";
		if (_openid) {
			_head = {
				"openid": _openid
			}
		}
		var _url = Interface.apiurl + Interface.addr.getWeChatInfo + param;
		console.log("======getWXInfo========")
		console.log(_url)
		uni.request({
			url: _url,
			method: "GET",
			data: {},
			header: _head || {},
			success(res) {
				console.log("====getWeChatInfo====")
				console.log(res)
				result = res;
				let _data = res.data.data;
				if (_data.openid) {
					uni.setStorage({
						key: 'uWXInfo',
						data: _data,
						success: function() {
							//console.log('setStorage-uWXInfo-success');
						}
					})
					if (!_openid) {
						window.location.href = Interface.domain;
					} else if (_openid) {
						_this.goHomePage();
					}
				} else {
					_this.goHomePage();
				}
			},
			fail(err) {
				result = err;
				console.log("---getWeChatInfo-err---")
				console.log(err)
				_this.goHomePage();
			},
			complete(c) {}
		})
	},
	getSysInfo: function() {
		return uni.getSystemInfoSync().platform;
	},
	goHomePage: function() {
		let hash = window.location.hash;
		if (hash == "#/pages/authorize/index" || hash == "#/") {
			uni.redirectTo({
				url: '/pages/index/index'
			});
		}
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

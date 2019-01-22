module.exports = {
	sendMail: function(url, data, fun) {
		var result = {};
		$.post({
			type: 'POST',
			url: url,
			data: data,
			dataType: "json",
			success: function(res) {
				//console.log(res)
				result = res
				if (res.success) {
					EffectCollect.effectReport({
						type: 1
					}, {
						successCallBack: function() {
							console.log('效果上报成功')
						},
						failCallBack: function() {
							console.log('效果上报失败')
						},
					})
				}
			},
			error: (function(err) {
				//console.log(err)
				result = err
			}),
			complete: (function() {
				//console.log("complete");
				new fun(result)
			})
		});
	}
}

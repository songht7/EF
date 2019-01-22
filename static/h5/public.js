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
					console.log("===EffectCollect======")
					EffectCollect.effectReport({
						type: 3
					})
				}
			},
			error: (function(err) {
				//console.log(err)
				result = err
			}),
			complete: (function() {
				//console.log("complete");
				//new fun(result)
			})
		});
	}
}

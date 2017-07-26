$(function(){
	var common = {
		// ajax数据请求
		Ajax:function (url,mydata,callback,error){
			$.ajax({ 
		            type: "post",
		            contentType: "application/json", 
		            url: "http://47.88.61.84:8080/petsocial/"+url, 
		            data: mydata,
		            success: function(res) { 
						callback(res);
					},
					error:function (err) {
						error(err);
	                }
				})
		},
		// 点击或者回车键搜索
		click:function(search){
			$('.imgsearch').on('click',function(){
					search();
			})
			$(document).keydown(function(event){ 
				if(event.keyCode==13){ 
					search();
				} 
			})
		}

	}
	window.common = common;
})
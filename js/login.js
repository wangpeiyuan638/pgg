$(function(){
	//记住密码免登陆
	var getNum = localStorage.getItem('num');
	var getNpsw = localStorage.getItem('psw');
	
	// var getNum = $.cookie("num");
	// var getNpsw = $.cookie("psw");
	console.log(getNum,getNpsw);
	if(getNum && getNpsw){
		$('.name').val(getNum);
		$('.password').val(getNpsw);
		$('.checkbox').attr('checked','checked');
	}
	// 获取随机验证码
	$('.imgcheck').on('focus',function(){
		var code = Math.floor(Math.random()*9000)+1000;
		console.log(code);
		$(this).val(code);
	})
	$('.bt').on('click',function(){
		var account = $('.name').val();
		var password = $('.password').val();
		//判断验证码是否输入正确
		var flag = true;
		if($('.check').val() == $('.imgcheck').val()){
			flag = true;
			console.log($('.check').val());
			$('.yzm').hide();
		}
		else{
			flag = false;
			$('.yzm').show();
		}
		var url = 'administratorLogin';
		var mydata = JSON.stringify({"account":account,"password":password});
		if(flag == true){
			common.Ajax(url,mydata,function(res){
				common.result = JSON.stringify(res.result);
				sessionStorage.setItem('result',common.result) ;
				if($('.checkbox').is(':checked')){
					localStorage.setItem('num',account) ;
					localStorage.setItem('psw',password) ;
					// $.cookie("num","account",{expires:1,path:'/'});
					// $.cookie("psw","password",{expires:1,path:'/'});
					// var getNum = $.cookie("num");
					// var getNpsw = $.cookie("psw");
					// console.log(getNum,getNpsw);
				}else{
					localStorage.removeItem('num');
					localStorage.removeItem('psw');
				}
				window.location.href='index.html';
			})
		}
	})
})
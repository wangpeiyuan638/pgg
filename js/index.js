$(function(){
	// 点击左侧菜单栏颜色变色 
	$(".c-left  ul  li a").on('click',function(){
		$(".c-left  ul  li a").css('background','#fff');
		$(this).css('background','#fd9e2f');
		$(".c-left  ul  li").children('ul').hide();
		$(this).parents('li').children('.comshow').show();
	})
	$('.comodity').on('click',function(){
		$(this).show();
	})
	$('.note').on('click',function(){
		$(this).show();
	})

	common.result = JSON.parse(sessionStorage.getItem('result'));
	console.log(common.result);
	if(common.result){
		$('.welcome').html(common.result.account);
	}else{
		window.location.href = 'login.html';
		$('.welcome').html('欢迎登陆');
	}

	// 判断是否有权限点击
	// 权限管理权限
	if(common.result.administratorPrivileges == 'true'){
		$('.l2').show();
	}else if(common.result.administratorPrivileges == 'false'){
		$('.l2').hide();
	}
	// 用户管理权限
	if(common.result.userPrivileges == 'true'){
		$('.l3').show();
	}else if(common.result.userPrivileges == 'false'){
		$('.l3').hide();
	}
	// 宠物管理权限
	console.log(common.result.petPrivileges);
	if(common.result.petPrivileges == 'true'){
		$('.l4').show();
	}else if(common.result.petPrivileges == 'false'){
		console.log('dfdf');
		$('.l4').css('display','none');
	}
	// 活动管理权限
	if(common.result.actionPrivileges == 'true'){
		$('.l5').show();
	}else if(common.result.actionPrivileges == 'false'){
		console.log('dfdf');
		$('.l5').css('display','none');
	}
	// 帖子管理权限
	if(common.result.postPrivileges == 'true'){
		$('.l6').show();
	}else if(common.result.postPrivileges == 'false'){
		console.log('dfdf');
		$('.l6').css('display','none');
	}
	// 商业管理权限
	if(common.result.businessPrivileges == 'true'){
		$('.l7').show();
	}else if(common.result.businessPrivileges == 'false'){
		console.log('dfdf');
		$('.l7').css('display','none');
	}
	// 文章管理权限
	if(common.result.articlesPrivileges == 'true'){
		$('.l8').show();
	}else if(common.result.articlesPrivileges == 'false'){
		console.log('dfdf');
		$('.l8').css('display','none');
	}
	// 里程碑管理权限
	if(common.result.milestonePrivileges == 'true'){
		$('.l9').show();
	}else if(common.result.milestonePrivileges == 'false'){
		console.log('dfdf');
		$('.l9').css('display','none');
	}
	
})
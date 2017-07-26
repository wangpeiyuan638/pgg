$(function(){
	var id = window.location.href.split('=')[1];
	console.log(id);
	var url = 'administratorInfo';
	var mydata = JSON.stringify({"administratorId":id});
	common.Ajax(url,mydata,function(res){
		var list = res.result;
		console.log(list);
		$('.account').val(list.account);
		$('.description').val(list.description);
		$('.alias').val(list.alias);
		// $('.password').val(list.password);
		if(list.state ==1){
			$('.on').attr('checked','checked');
		}else if(list.state ==0){
			$('.off').attr('checked','checked');
		}
		if(list.administratorPrivileges == 'true'){
			$('.authority').attr('checked','checked');
		}
		if(list.userPrivileges == 'true'){
			$('.user').attr('checked','checked');
		}
		if(list.petPrivileges == 'true'){
			$('.pet').attr('checked','checked');
		}
		if(list.actionPrivileges == 'true'){
			$('.activity').attr('checked','checked');
		}
		if(list.postPrivileges == 'true'){
			$('.note').attr('checked','checked');
		}
		if(list.businessPrivileges == 'true'){
			$('.comodity').attr('checked','checked');
		}
		if(list.articlesPrivileges == 'true'){
			$('.artical').attr('checked','checked');
		}
		if(list.milestonePrivileges){
			$('.marker').attr('checked','checked');
		}
	});
	//点击修改信息
	$('.yes').on('click',function(){
		var account = $('.account').val();
		var description = $('.description').val();
		var alias = $('.alias').val();
		var password = $('.password').val();

		if($('.on').is(':checked')){
			var state = 1;
		}else if($('.off').is(':checked')){
			var state = 0;
		}
		console.log(account,description,alias,password,state);
		var authority = $('.authority').is(':checked')?true:false;
		var user = $('.user').is(':checked')?true:false;
		var pet = $('.pet').is(':checked')?true:false;
		var activity = $('.activity').is(':checked')?true:false;
		var note = $('.note').is(':checked')?true:false;
		var comodity = $('.comodity').is(':checked')?true:false;
		var artical = $('.artical').is(':checked')?true:false;
		var marker = $('.marker').is(':checked')?true:false;
		console.log(authority,user,pet,activity,comodity,artical,marker);

		var url = 'updateAdministrator';
		var mydata = JSON.stringify({"administratorId":id,"account":account,"password":password,"alias":alias,"description":description,"state":state,"administratorPrivileges":authority,"userPrivileges":user,"petPrivileges":pet,"actionPrivileges":activity,"postPrivileges":note,"businessPrivileges":comodity,"articlesPrivileges":artical,"milestonePrivileges":marker});
		common.Ajax(url,mydata,function(res){
			console.log(res);
        	alert('修改成功');
        	window.location.href="authority.html";
		});
	})
})
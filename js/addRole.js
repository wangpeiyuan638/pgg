$(function(){
	$('.yes button').on('click',function(){
		var alias = $('.alias').val();
		var description = $('.description').val();
		if($('.on').is(':checked')){
			var	state = 1;
		}else if($('.off').is(':checked')){
			var	state = 0;
		}
		if(alias&&description){
			var url = 'saveAdministrator';
			var mydata = JSON.stringify({"alias":alias,"description":description,"state":state});
			common.Ajax(url,mydata,function(res){
				$(".addrole li a", window.parent.document).css("background","");
				$(".addrole", window.parent.document).hide();
				$("#addrole a", window.parent.document).css("background","#fd9e2f");
				window.location.href="authority.html";
				localStorage.setItem('flag',true);
            });
		}
	})
	
})
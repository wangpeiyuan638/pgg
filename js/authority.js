$(function(){
		// 请求数据
		var count = 1;
		var total;
		var url = 'administratorList';
		var mydata = JSON.stringify({"pageNo":count,"pageSize":"10"});
		common.Ajax(url,mydata,function(res){
			var msg = res.result.resultList;
			total = Math.ceil(res.result.totalCount/10);
			console.log(msg);
			create(msg);
		});

			function create(msg){
				for(var j = 0;j < msg.length;j++){
					if(!msg[j].account){
						msg[j].account = '';
					}
					if(!msg[j].jurisdictionType){
						msg[j].jurisdictionType = '';
					}
					var account = '';
					msg[j].account == 'admin'?account = '':account = "<a href="+'setAuthority.html?administratorId='+msg[j].administratorId+">[设置权限]</a><a class='audelete'>[删除]<i style='display:none;'>"+msg[j].administratorId+"</i></a>"
					var tr = $("<tr></tr>");
					var td = $("<td>"+(j+1)+"</td>"+
						"<td>"+msg[j].account+"</td>"+
						"<td>"+msg[j].alias+"</td>"+
						"<td>"+msg[j].description+"</td>"+
						"<td>"+msg[j].state+"</td>"+
						// "<td><a href="+'setAuthority.html?administratorId='+msg[j].administratorId+">[设置权限]</a><a class='audelete'>[删除]<i style='display:none;'>"+msg[j].administratorId+"</i></a></td>"
						"<td>"+account+"</td>"
						// 
					);
					tr.append(td);
					$('table tbody').append(tr);
				}
				// 删除管理员
				$('.audelete').on('click',function(msg){
					var infor = '您确定要删除管理员信息吗';
					if(confirm(infor)){
						var administratorId = $(this).children('i').html();
						console.log(administratorId);
						$(this).parents('tr').remove();
						var url = 'deleteAdministrator';
						var mydata = JSON.stringify({"administratorId":administratorId});
						common.Ajax(url,mydata,function(res){
							alert('删除成功');
						});
					};
				})
			}

			//创建分页列表
			$('.next').on('click',function(){
				console.log(total);
				count++;
				if(count > total){
					count = total;
				}
				$('.pagecont').html(count);
				var url = 'administratorList';
				var mydata = JSON.stringify({"pageNo":count,"pageSize":"10"});
				common.Ajax(url,mydata,function(res){
					var msg = res.result.resultList;
					console.log(res);
					$('table tbody').empty();
					create(msg);
				});
			})
			$('.pre').on('click',function(){
				count--;
				if(count <= 1){
					count = 1;
				};
				$('.pagecont').html(count);
				var url = 'administratorList';
				var mydata = JSON.stringify({"pageNo":count,"pageSize":"10"});
				common.Ajax(url,mydata,function(res){
					var msg = res.result.resultList;
					console.log(res);
					$('table tbody').empty();
					create(msg);
				});
			})
})
$(function(){
		//数据请求
		var	count = 1; 
		var total;
		var URL;
		var Data;
		var list;
		var pageFlag = false; 
		var url = 'userList';
		var mydata = JSON.stringify({"pageNo":count,"pageSize":"10"});
		if(!list){
			common.Ajax(url,mydata,function(res){
				var msg = res.result.resultList;
				total = Math.ceil(res.result.totalCount/10);
				console.log(msg);
				console.log(res);
				create(msg);
			});
		}
		//动态创建表格
			function create(msg){
				for(var j = 0;j < msg.length;j++){

					if(msg[j].userType == 1){

						msg[j].userType = '宠物类型';

					}else if(msg[j].userType == 2){

						msg[j].userType = '商业类型';
					}
					console.log(typeof msg[j].userState);
					if(msg[j].userState == "0"){
						var state = '[拉黑]';
					}else if(msg[j].userState == "1"){
						var state = '[恢复常态]';
					}
					var tr = $("<tr></tr>");
					var td = $("<td class='index'>"+(j+1)+"</td>"+
						"<td>"+msg[j].userId+"</td>"+
						"<td>"+msg[j].userName+"</td>"+
						"<td>"+msg[j].userType+"</td>"+
						"<td>"+msg[j].phone+"</td>"+
						"<td><span class='defriend'>"+state+"</span><i style='display:none;'>"+msg[j].userId+"</i><strong style='display:none;'>"+msg[j].userState+"</strong></td>"
					);
					tr.append(td);
					$('table tbody').append(tr);
				}
				// 用户拉黑
				$('.defriend').on('click',function(){
					var that = this;
					var userId = $(this).siblings('i').html();
					var userState = $(this).siblings('strong').html();
					var url = 'blacklist';
					var mydata = JSON.stringify({"userId":userId,"userState":userState});
					console.log(mydata);
					common.Ajax(url,mydata,function(res){
						console.log(res);
						if( res.result == 0 ){
							// $(that).html('[恢复常态]');
							alert('用户已恢复常态');
							$(that).siblings('strong').html('1');
							window.history.go(0);
							
						}else if( res.result == 1 ){
							// $(that).html('[拉黑]');
							alert('用户已拉黑');
							$(that).siblings('strong').html('0');
							window.history.go(0);
							
						}
					});
				})
			}
			//创建分页列表
			// 下一页
			$('.next').on('click',function(){
				console.log(total);
				count++;
				if(count > total && total){
					count = total;
				}
				$('.pagecont').html(count);
				pageFlag?Data=JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list}):Data=JSON.stringify({"pageNo":count,"pageSize":"10"});
				pageFlag?URL="searchUser":URL="userList";
				common.Ajax(URL,Data,function(res){
					var msg = res.result.resultList;
					console.log(res);
					$('table tbody').empty();
					create(msg);
				});
			})
			// 上一页
			$('.pre').on('click',function(){
				count--;
				if(count <= 1){
					count = 1;
				};
				$('.pagecont').html(count);
				pageFlag?Data=JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list}):Data=JSON.stringify({"pageNo":count,"pageSize":"10"});
				pageFlag?URL="searchUser":URL="userList";
				common.Ajax(URL,Data,function(res){
					var msg = res.result.resultList;
					console.log(res);
					$('table tbody').empty();
					create(msg);
				});
			})

			// 用户搜索信息
			common.click(search);
			function search(){
				list = $('.search').val();
				if(list){
					var url = 'searchUser';
					var mydata = JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list});
					common.Ajax(url,mydata,function(res){
						var msg = res.result.resultList;
						total = Math.ceil(res.result.totalCount/10);
						console.log(msg);
						console.log(res);
						$('table tbody').empty();
						create(msg);
						pageFlag = true;
					});
				}
			}
	})
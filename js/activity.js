$(function(){
		//数据请求
		var count = 1;
		var list;
		var Data;
		var URL;
		var pageFlag = false;
		var url = 'allActionList';
		var mydata = JSON.stringify({"pageNo":count,"pageSize":"10"});
		common.Ajax(url,mydata,function(res){
			console.log(res);
			var msg = res.result.resultList;
			total = Math.ceil(res.result.totalCount/10);
			create(msg);
		});
		function create(msg){
			for(var j = 0;j < msg.length;j++){
				var tr = $("<tr></tr>");
				var td = $("<td>"+(j+1)+"</td>"+
					"<td>"+msg[j].userName+"</td>"+
					"<td>"+msg[j].phone+"</td>"+
					"<td>"+msg[j].actionTitle+"</td>"+
					"<td>"+msg[j].actionTime+"</td>"+
					"<td>"+msg[j].location+"</td>"+
					"<td><a href='javascript:' class='delete'>[删除]<i style='display:none;'>"+msg[j].actionId+"</i></a></td>"
				);
				tr.append(td);
				$('table tbody').append(tr);
			}

			$('.delete').on('click',function(){
				var actionId = $(this).children('i').html();
				var url = 'deleteAction';
				var mydata = JSON.stringify({"actionId":actionId});
				console.log(mydata);
				if(confirm('您确定要删除该条活动吗？')){
					$(this).parents('tr').remove();
					common.Ajax(url,mydata,function(res){
						console.log(res);
						
					});
				}
			})
		}

		//创建分页列表

		$('.next').on('click',function(){
			console.log(total);
			count++;
			if(count > total && total){
				count = total;
			}
			console.log(count);
			console.log(total);
			$('.pagecont').html(count);
			pageFlag?Data=JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list}):Data=JSON.stringify({"pageNo":count,"pageSize":"10"});
			pageFlag?URL="searchAction":URL="allActionList";
			common.Ajax(URL,Data,function(res){
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
			pageFlag?Data=JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list}):Data=JSON.stringify({"pageNo":count,"pageSize":"10"});
			pageFlag?URL="searchAction":URL="allActionList";
			common.Ajax(URL,Data,function(res){
					var msg = res.result.resultList;
					console.log(res);
					$('table tbody').empty();
					create(msg);
				});
		})

			// 活动信息搜索
			common.click(search);
			function search(){
				list = $('.search').val();
				if(list){
					var url = 'searchAction';
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
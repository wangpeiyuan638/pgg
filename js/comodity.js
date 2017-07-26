$(function(){
		//页面加载完成请求数据
		var	count = 1; 
		var total 
		console.log(count)
		var url = 'allBusinessList';
		var mydata = JSON.stringify({"pageNo":count,"pageSize":"10"});
		common.Ajax(url,mydata,function(res){
			console.log(res);
			var msg = res.result.resultList;
			total = Math.ceil(res.result.totalCount/10);
			console.log(total);
			create(msg);
		});

			// 动态创建表格
			function create(msg){
				for(var j = 0;j < msg.length;j++){
						var tr = $("<tr></tr>");
						var td = $("<td>"+(j+1)+"</td>"+
							"<td>"+msg[j].userName+"</td>"+
							"<td>"+msg[j].businessTitle+"</td>"+
							"<td>"+msg[j].businessType+"</td>"+
							"<td>"+msg[j].commentCount+"</td>"+
							"<td><a class='look'>[查看]<i style='display:none;'>"+msg[j].businessId+"</i></a></td>"
						);
						tr.append(td);
						$('table tbody').append(tr);
				}
				$('.look').on('click',function(){
					var id = $(this).children('i').html();
					var href = 'comment.html?id='+id;
					$(this).attr('href',href);
					$(".comodity", window.parent.document).show().css("background","#fd9e2f");
					$("#comodity a", window.parent.document).css("background","");
				})
			}

			//创建分页列表
			var Data;
			var URL;
			var list;
			var pageFlag = false;
			$('.next').on('click',function(){
				console.log(total);
				count++;
				if(count > total && total){
					count = total;
				}
				$('.pagecont').html(count);
				console.log(pageFlag);
				pageFlag?Data=JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list}):Data=JSON.stringify({"pageNo":count,"pageSize":"10"});
				pageFlag?URL="searchBusiness":URL="allBusinessList";
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
				console.log(pageFlag);
				pageFlag?Data=JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list}):Data=JSON.stringify({"pageNo":count,"pageSize":"10"});
				pageFlag?URL="searchBusiness":URL="allBusinessList";
				common.Ajax(URL,Data,function(res){
					var msg = res.result.resultList;
					console.log(res);
					$('table tbody').empty();
					create(msg);
				});
			})

			// 商业管理搜索
			common.click(search);
			function search(){
				list = $('.search').val();
				if(list){
					var url = 'searchBusiness';
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
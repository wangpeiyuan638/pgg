$(function(){
		var count = 1;
		var total;
		var id = window.location.href.split('=')[1];
		console.log(id);
		var url = 'queryCommentList';
		var mydata = JSON.stringify({"pageNo":count,"pageSize":"10","publicId":id,"commentType":"2"});
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
						"<td>"+msg[j].commentUserName+"</td>"+
						"<td>"+msg[j].content+"</td>"+
						"<td>"+msg[j].commentPhone+"</td>"+
						"<td><a class="+"'comnotedel'>删除<i style='display:none;'>"+msg[j].commentId+"</i></a></td>"
					);
					tr.append(td);
					$('table tbody').append(tr);
				}

				//删除帖子评论
				$('.comnotedel').on('click',function(msg){
					var infor = '您确定要删除该条评论吗';
					if(confirm(infor)){
						var commentId = $(this).children('i').html();
						console.log(commentId);
						$(this).parents('tr').remove();
						var url = 'deleteComment';
						var mydata = JSON.stringify({"commentId":commentId});
						common.Ajax(url,mydata,function(res){
							alert('删除成功');
						});

					};
				})
			}

			//创建分页列表
			var list;
			var Data;
			var URL;
			var pageFlag = false;
			$('.next').on('click',function(){
				console.log(total);
				count++;
				if(count > total && total){
					count = total;
				}
				$('.pagecont').html(count);
				console.log(pageFlag);
				pageFlag?Data=JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list,"commentType":"2","publicId":id}):Data=JSON.stringify({"pageNo":count,"pageSize":"10","publicId":id,"commentType":"2"});
				pageFlag?URL="searchComment":URL="queryCommentList";
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
				pageFlag?Data=JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list,"commentType":"2","publicId":id}):Data=JSON.stringify({"pageNo":count,"pageSize":"10","publicId":id,"commentType":"2"});
				pageFlag?URL="searchComment":URL="queryCommentList";
				common.Ajax(URL,Data,function(res){
					var msg = res.result.resultList;
					console.log(res);
					$('table tbody').empty();
					create(msg);
				});
			})

			// 商业评论管理搜索
			common.click(search);
			function search(){
				list = $('.search').val();
				if(list){
					var url = 'searchComment';
					var mydata = JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list,"commentType":"2","publicId":id});
					common.Ajax(url,mydata,function(res){
						var msg = res.result.resultList;
						total = Math.ceil(res.result.totalCount/10);
						$('table tbody').empty();
						create(msg);
						pageFlag = true;
					});
				}
			}
			// 返回上一页
			$('.back').on('click',function(){
				$(".comodity li a", window.parent.document).css("background","");
				$(".comodity", window.parent.document).hide();
				$("#comodity a", window.parent.document).css("background","#fd9e2f");
				window.location.href = 'comodity.html';
			})
	
	})
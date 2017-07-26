$(function(){
		//页面加载完成时请求数据
		var	count = 1; 
		var total ;
		var msg;
		var url = 'allPostList';
		var mydata = JSON.stringify({"pageNo":count,"pageSize":"10"});
		common.Ajax(url,mydata,function(res){
			msg = res.result.resultList;
			total = Math.ceil(res.result.totalCount/10);
			create(msg);
		});
			// 动态创建表格
			function create(msg){
				for(var j = 0;j < msg.length;j++){
					var tr = $("<tr></tr>");
					var td = $("<td>"+(j+1)+"</td>"+
						"<td>"+msg[j].userName+"</td>"+
						"<td>"+msg[j].createTime+"</td>"+
						"<td>"+msg[j].content+"</td>"+
						"<td>"+msg[j].commentCount+"</td>"+
						"<td><a class='look'>[查看]<i style='display:none;'>"+msg[j].postId+"</i></a><span class='notedel'>[删除]<i style='display:none;''>"+msg[j].postId+"</i></span></td>"
					);
					tr.append(td);
					$('table tbody').append(tr);
				
				}
				// 点击查看跳转链接
				$('.look').on('click',function(){
					var id = $(this).children('i').html();
					var href = 'comnote.html?id='+id;
					console.log(href);
					$(this).attr('href',href);
					$(".note", window.parent.document).show().css("background","#fd9e2f");
					$("#note a", window.parent.document).css("background","");
				})
				// 删除帖子
				$('.notedel').on('click',function(msg){
					var infor = '您确定要删除该条帖子吗';
					if(confirm(infor)){
						var postId = $(this).children('i').html();
						$(this).parents('tr').remove();
						var url = 'deletePost';
						var mydata = JSON.stringify({"postId":postId});
						common.Ajax(url,mydata,function(res){
							alert('删除成功');
						});
					};
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
				pageFlag?URL="huntPost":URL="allPostList";
				common.Ajax(URL,Data,function(res){
						var msg = res.result.resultList;
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
				pageFlag?URL="huntPost":URL="allPostList";
				
				common.Ajax(URL,Data,function(res){
						var msg = res.result.resultList;
						$('table tbody').empty();
						create(msg);
					});
			})

		// 帖子搜索
			common.click(search);
			function search(){
				list = $('.search').val();
				if(list){
					var url = 'huntPost';
					var mydata = JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list});
					common.Ajax(url,mydata,function(res){
						var msg = res.result.resultList;
						total = Math.ceil(res.result.totalCount/10);
						$('table tbody').empty();
						create(msg);
						pageFlag = true;
					});
				}
			}
	})
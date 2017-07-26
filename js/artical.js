$(function(){
	var	count = 1; 
	var total; 
	var url = 'articlesList';
	var mydata = JSON.stringify({"pageNo":count,"pageSize":"5"});
	common.Ajax(url,mydata,function(res){
		var msg = res.result.resultList;
		total = Math.ceil(res.result.totalCount/5);
		console.log(total);
		console.log(res);
		create(msg);
		console.log(res);
	});

	// 动态创建页面
	function create(msg){
				for(var j = 0;j < msg.length;j++){
					var div = $("<div class='content'><img class='fl' src='"+msg[j].multimediaUrl+"'>"+"<div class='fl center'><label><span>标题:</span><input disabled type='text' value='"+msg[j].articlesTitle+"'></label><div class='text' style='overflow:auto'>"+msg[j].content+"</div></div><div class='del'><button class='fl'>删除<i style='display:none;'>"+msg[j].articlesId+"</i><em style='display:none;'>"+j+"</em></button></div></div>");
					$('.artical-list').append(div);
				}

				$('.del button').on('click',function(){
					var infor = '您确定要删除该文章吗';
					if(confirm(infor)){
						var index = $(this).children('em').html();
						console.log(index);
						var articlesId = $(this).children('i').html();
						var url = 'deleteArticles';
						var mydata = JSON.stringify({"articlesId":articlesId});
						common.Ajax(url,mydata,function(res){
							$('.content').eq(index).remove();
							window.history.go(0);
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
				count++;
				if(count > total&&total){
					count = total;
				}
				console.log(total);
				console.log(count);
				$('.pagecont').html(count);
				pageFlag?Data=JSON.stringify({"pageNo":count,"pageSize":"5","searchContent":list}):Data=JSON.stringify({"pageNo":count,"pageSize":"5"});
				pageFlag?URL="searchArticles":URL="articlesList";
				common.Ajax(URL,Data,function(res){
					var msg = res.result.resultList;
					console.log(res);
					$('.artical-list').empty();
					create(msg);
				});

			})
			$('.pre').on('click',function(){
				count--;
				if(count <= 1){
					count = 1;
				};
				console.log(total);
				console.log(count);
				$('.pagecont').html(count);
				pageFlag?Data=JSON.stringify({"pageNo":count,"pageSize":"5","searchContent":list}):Data=JSON.stringify({"pageNo":count,"pageSize":"5"});
				pageFlag?URL="searchArticles":URL="articlesList";
				common.Ajax(URL,Data,function(res){
					var msg = res.result.resultList;
					console.log(res);
					$('.artical-list').empty();
					create(msg);
				});
			})

	// 文章搜索
			common.click(search);
			function search(){
				list = $('.search').val();
				if(list){
					var url = 'searchArticles';
					var mydata = JSON.stringify({"pageNo":count,"pageSize":"5","searchContent":list});
					common.Ajax(url,mydata,function(res){
						var msg = res.result.resultList;
						total = Math.ceil(res.result.totalCount/5);
						console.log(msg);
						console.log(res);
						$('.artical-list').empty();
						create(msg);
						pageFlag = true;
					});
				}
			}
})
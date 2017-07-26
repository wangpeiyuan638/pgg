//数据请求
	$(function(){
		var	count = 1; 
		var total;
		var list;
		var url = 'allMilestone';
		var mydata = JSON.stringify({"pageNo":count,"pageSize":"10"});
		common.Ajax(url,mydata,function(res){
			var msg = res.result.resultList;
			total = Math.ceil(res.result.totalCount/10);
			console.log(total);
			console.log(res);
			create(msg);
		});

		function create(msg){
				for(var j = 0;j < msg.length;j++){
					var state = '';
					msg[j].milestoneState == 0?state = '未完成':state = '完成';
					var tr = $("<tr></tr>");
					var td = $("<td>"+(j+1)+"</td>"+
						"<td>"+msg[j].milestoneTitle+"</td>"+
						"<td>"+msg[j].milestoneContent+"</td>"+
						"<td>"+state+"</td>"
					);
					tr.append(td);
					$('table tbody').append(tr);
				}
		}

			//创建分页列表
			var pageFlag = false;
			var Data;
			var URL;
			// 下一页
			$('.next').on('click',function(){
				console.log(total);
				count++;
				if(count > total && total){
					count = total;
				}
				$('.pagecont').html(count);
				pageFlag?Data=JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list}):Data=JSON.stringify({"pageNo":count,"pageSize":"10"});
				pageFlag?URL="searchMilestone":URL="allMilestone";
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
				pageFlag?URL="searchMilestone":URL="allMilestone";
				common.Ajax(URL,Data,function(res){
						var msg = res.result.resultList;
						console.log(res);
						$('table tbody').empty();
						create(msg);
					});
			})

			// 里程碑信息搜索
			common.click(search);
			function search(){
				list = $('.search').val();
				if(list){
					var url = 'searchMilestone';
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
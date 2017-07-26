$(function(){
		//数据请求
		var	count = 1; 
		var total ;
		var url = 'allPetList';
		var mydata = `{"pageNo":"${count}","pageSize":"10"}`
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
					var gender = '';
					msg[j].petState == 0?state = '常态':state = '待收养';
					msg[j].gender == 0?gender = '母':gender = '公';
					$('table tbody').append(tr);
					var tr = $("<tr></tr>");
					var td = $("<td>"+(j+1)+"</td>"+
						"<td>"+msg[j].userName+"</td>"+
						"<td>"+msg[j].phone+"</td>"+
						"<td>"+msg[j].petName+"</td>"+
						"<td>"+msg[j].breed+"</td>"+
						"<td>"+state+"</td>"+
						"<td>"+msg[j].gender+"</td>"+
						"<td>"+msg[j].petAge+"</td>"
					);
					tr.append(td);
					$('table tbody').append(tr);
				}
			}

			//创建分页列表
			// 下一页
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
				pageFlag?Data=JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list}):Data=JSON.stringify({"pageNo":count,"pageSize":"10"});
				pageFlag?URL="searchPet":URL="allPetList";
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
				pageFlag?URL="searchPet":URL="allPetList";
				common.Ajax(URL,Data,function(res){
					var msg = res.result.resultList;
					console.log(res);
					$('table tbody').empty();
					create(msg);
				});
			})

			// 宠物信息搜索
			common.click(search);
			function search(){
				var list = $('.search').val();
				if(list){
					var serurl = 'searchPet';
					var serdata = JSON.stringify({"pageNo":count,"pageSize":"10","searchContent":list});
					common.Ajax(serurl,serdata,function(res){
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
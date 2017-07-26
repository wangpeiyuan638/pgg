$(function(){
		var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
      	var option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'horizontal',
		        left: 'left',
		        data:(function(){
		        		var list = [];
		                 $.ajax({ 
		                    type: "get",
		                    async: false, 
		                    contentType: "application/json", 
		                    url: "http://47.88.61.84:8080/petsocial/backstageHome", 
		                    data: {}, 
		                    dataType: "json", 
		                    success: function(res) { 
								var data = res.result.statisticsModelList;
								$('li span').eq(0).html(res.result.yesterdaySaveCount);
								$('li span').eq(1).html(res.result.yesterdayActiveCount);
								$('li span').eq(2).html(res.result.userCount);
								for(var i = 0; i<data.length;i++){
									list.push(data[i].name);
								}
							}
						})
						return list; 
				})()
		    },
		    series : [
		        {
		            name: '访问来源',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:(function(){
		        		var obj = [];
		                 $.ajax({ 
		                    type: "GET",
		                    async: false, 
		                    contentType: "application/json", 
		                    url: "http://47.88.61.84:8080/petsocial/backstageHome", 
		                    data: {}, 
		                    dataType: "json", 
		                    success: function(res) { 
								var result = res.result.statisticsModelList;
								for(var i = 0; i<result.length;i++){
									obj.push(result[i]);
								}
							}
						})
						return obj; 
				})(),
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    })

get_chart_date_ajax();

// -- 함수 선언 -- //

// 차트를 그릴 데이터를 가져오는 함수
function get_chart_date_ajax(){
	//ajax start
	$.ajax({
		url: '/restApi/restApiAjax', //요청경로
		type: 'get',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {}, //필요한 데이터
		success: function(result) {
			console.log(result)
			draw_chart1(result['계열'], result['취업률']);
			draw_chart2(result['계열'], result['입학률']);
			
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end


}

function draw_chart1(uni, per) {

	const chartLabels = [];
	const chartDatas = [];
	
	for(const e of uni){
		chartLabels.push(e);
	}
	for(const i of per){
		chartDatas.push(i);
	}
	console.log(chartLabels);
	console.log(chartDatas);
	
	const labels = chartLabels;
	const data = {
		labels: labels,
		datasets: [{
			axis: 'y',
			label: '',
			data: chartDatas,
			fill: false,
			backgroundColor: [
				'rgba(255, 99, 132, 0.4)',
				'rgba(255, 159, 64, 0.4)',
				'rgba(255, 205, 86, 0.4)',
				'rgba(75, 192, 192, 0.4)',
				'rgba(54, 162, 235, 0.4)',
				'rgba(153, 102, 255, 0.4)',
				'rgba(201, 203, 207, 0.4)'
			],
			borderColor: [
				'rgb(255, 99, 132)',
				'rgb(255, 159, 64)',
				'rgb(255, 205, 86)',
				'rgb(75, 192, 192)',
				'rgb(54, 162, 235)',
				'rgb(153, 102, 255)',
				'rgb(201, 203, 207)'
			],
			borderWidth: 1
			
		}]
	};

	const config = {
		type: 'bar',
		data: data,
		options: {
			indexAxis: 'x',
			scales: {
				x: {
					title: {
						display: true,
						text: '취업률(%)'
					}
				},
				y: {
					title: {
						display: true,
						text: '계열'
					}
				}
			},
			plugins: {
			legend: {
				display: false  // 범례 숨기기
			}
		}
			
		}
	};


	// Create a new chart instance
	const ctx = document.getElementById('myChart1').getContext('2d');
	const myChart = new Chart(ctx, config);
}


function draw_chart2(uni, per) {

	const chartLabels = [];
	const chartDatas = [];
	
	for(const e of uni){
		chartLabels.push(e);
	}
	for(const i of per){
		chartDatas.push(i);
	}
	console.log(chartLabels);
	console.log(chartDatas);
	
	const labels = chartLabels;
	const data = {
		labels: labels,
		datasets: [{
			axis: 'y',
			label: '',
			data: chartDatas,
			fill: false,
			backgroundColor: [
				'rgba(255, 99, 132, 0.4)',
				'rgba(255, 159, 64, 0.4)',
				'rgba(255, 205, 86, 0.4)',
				'rgba(75, 192, 192, 0.4)',
				'rgba(54, 162, 235, 0.4)',
				'rgba(153, 102, 255, 0.4)',
				'rgba(201, 203, 207, 0.4)'
			],
			borderColor: [
				'rgb(255, 99, 132)',
				'rgb(255, 159, 64)',
				'rgb(255, 205, 86)',
				'rgb(75, 192, 192)',
				'rgb(54, 162, 235)',
				'rgb(153, 102, 255)',
				'rgb(201, 203, 207)'
			],
			borderWidth: 1
			
		}]
	};

	const config = {
		type: 'bar',
		data: data,
		options: {
			indexAxis: 'y',
			scales: {
				x: {
					title: {
						display: true,
						text: '입학률(%)'
					}
				},
				y: {
					title: {
						display: true,
						text: '계열'
					}
				}
			},
			plugins: {
			legend: {
				display: false  // 범례 숨기기
			}
		}
		}
	};


	// Create a new chart instance
	const ctx = document.getElementById('myChart2').getContext('2d');
	const myChart1 = new Chart(ctx, config);
}
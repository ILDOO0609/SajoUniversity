
get_chart_date_ajax();



// -- 함수 선언 -- //

// 차트를 그릴 데이터를 가져오는 함수
function get_chart_date_ajax(){
	const year = document.querySelector('#yearSelect').value;
	
	//ajax start
	$.ajax({
		url: '/member/getChartDataAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'year' : year}, //필요한 데이터
		success: function(result) {
			console.log(result);
			
			// 차트 그리기
			draw_chart(result);
			
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end

}



function draw_chart(monthly){
	

const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
		data: {
			labels: [
				'1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
			],
			datasets: [
				{
					label: '월별 재학생수',
					data: monthly['attendList'],
					borderWidth: 1,
					yAxisID: 'y'
				},
				{
					label: '월별 휴학생수',
					data: monthly['absenceList'],
					borderWidth: 1,
					yAxisID: 'y1'
				},
				{	
					type:'line',
					label: '월별 등록생수',
					data: monthly['regList'],
					borderWidth: 1,
					yAxisID: 'y2'
				},
			]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
					type: 'linear',
					display: true,
					position: 'left',
					min: 0,
					max: 10 
				},
				y1: {
					beginAtZero: true,
					type: 'linear',
					display: true,
					position: 'right',
					min: 0,
					max: 10 // 휴학생수의 최대 범위를 가정하고 설정한 값
				},
				y2: {
					beginAtZero: true,
					type: 'linear',
					display: true,
					position: 'right',
					min: 0,
					max: 10 // 등록생수의 최대 범위를 가정하고 설정한 값
				}
			}
		}
  });
  
  
}  

  
  
  
// select box 값 변경 시 시랭 
function getStatistics(){
	const year = document.querySelector('#yearSelect').value;
	location.href = `/member/stuRegPerMonth?year=${year}`;
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
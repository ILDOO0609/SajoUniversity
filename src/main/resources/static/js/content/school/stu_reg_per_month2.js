
get_chart_date_ajax();



// -- 함수 선언 -- //

// 차트를 그릴 데이터를 가져오는 함수
function get_chart_date_ajax(){
	const year = document.querySelector('#yearSelect').value;
	
	//ajax start
	$.ajax({
		url: '/member/getChartDataAjax2', //요청경로
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
      labels: ['01', '02', '03', '04', '05', '06','07',
      			'08', '09', '10', '11','12'],
      datasets: [
		
      	
      	{
			type:'line',
	        label: '휴학생 현황',
	        data: monthly['cntList'], // data : [2,3,4,5 ...]
	        borderWidth:5,
	        yAxisID:'y1'
      	}
      ]
    },
    options: {
      scales: {
       
        y1: {
          beginAtZero: true,
          type:'linear',
          display:'true',
          position:'left'
        }
      }
    }
  });
  
  
} 
  
  
  
// select box 값 변경 시 시랭 
function getStatistics(){
	const year = document.querySelector('#yearSelect').value;
	location.href = `/member/stuRegPerMonth2?year=${year}`;
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
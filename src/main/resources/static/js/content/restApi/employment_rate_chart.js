get_chart_date_ajax();

// -- 함수 선언 -- //

// 차트를 그릴 데이터를 가져오는 함수
function get_chart_date_ajax(){
	
	//ajax start
	$.ajax({
		url: '/restApi/restApiAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {}, //필요한 데이터
		success: function(result) {
			console.log(result);
			
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end


}
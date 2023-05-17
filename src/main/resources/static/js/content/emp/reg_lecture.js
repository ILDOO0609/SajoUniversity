function checkTime(){
	//ajax start
	$.ajax({
		url: '/emp/timeCheckAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/json; charset=UTF-8',
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {}, //필요한 데이터
		success: function(result) {
			alert('ajax 통신 성공');
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end
}
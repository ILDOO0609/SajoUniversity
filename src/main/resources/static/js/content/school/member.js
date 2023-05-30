//--------------회원메뉴--------------------------------------------------------------
function updatePosition(memNo) {
	
	//ajax start
	$.ajax({
   		url: '/school/updatePosition', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'memNo': memNo}, //필요한 데이터
	   	success: function(result) {
	      alert('ajax 통신 성공');
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end

	
}
	
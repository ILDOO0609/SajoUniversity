//검색버튼 클릭시 실행
function searchOrderList(){
	const search_form = document.querySelector('#searchForm');
	
	search_form.submit();	
	
}

//휴학신청 승인완료 클릭시 실행
function updateLeaveApp(statusNo){
	const check_box = document.querySelector('#leaveTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	
	if(checked_box == 0){
		alert('최소 1명의 학생을 선택해야합니다.');
		return
	}
	
	//ajax start
	$.ajax({
   		url: '/school/updateLeaveAppAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'statusNo': statusNo}, //필요한 데이터
	   	success: function(result) {
			alert('승인완료 되었습니다.')
			location.href = `/school/acaLeave`;
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end

}

//휴학신청 승인취소 클릭시 실행
function updateLeaveDenied(statusNo){
	const check_box = document.querySelector('#leaveTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	
	if(checked_box == 0){
		alert('최소 1명의 학생을 선택해야합니다.');
		return
	}
	
	//ajax start
	$.ajax({
   		url: '/school/updateLeaveDeniedAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'statusNo': statusNo}, //필요한 데이터
	   	success: function(result) {
			alert('승인취소 되었습니다.')
			location.href = `/school/acaLeave`;
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end


}






//복학신청 승인완료 클릭시 실행
function updateReturnApp(statusNo){
	const check_box = document.querySelector('#leaveTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	
	if(checked_box == 0){
		alert('최소 1명의 학생을 선택해야합니다.');
		return
	}
	
	//ajax start
	$.ajax({
   		url: '/school/updateReturnAppAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'statusNo': statusNo}, //필요한 데이터
	   	success: function(result) {
			alert('승인완료 되었습니다.')
			location.href = `/school/acaReturn`;
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end

}













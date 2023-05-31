//검색버튼 클릭시 실행
function searchOrderList(){
	const search_form = document.querySelector('#searchForm');
	
	search_form.submit();	
	
}

//휴학신청 승인완료 클릭시 실행
function updateLeaveApp(){
	const check_box = document.querySelector('#leaveTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	if(checked_box == 0){
		swal("대상 선택", "최소 1명의 학생을 선택해야합니다.", "error", {button: "확인"})
		.then((result) => {
		})
		
		return
	}
	
	const statusNo = document.querySelector(".chk:checked").value;
	console.log(statusNo);
	
	//ajax start
	$.ajax({
   		url: '/school/updateLeaveAppAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'statusNo': statusNo}, //필요한 데이터
	   	success: function(result) {
			swal("승인 완료", "승인완료 되었습니다.", "success",{button: "확인"})
			.then((result) => {
				location.href = `/school/acaLeave`;
			})
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end

}

//휴학신청 승인취소 클릭시 실행
function updateLeaveDenied(){
	const check_box = document.querySelector('#leaveTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	
	if(checked_box == 0){
		swal("대상 선택", "최소 1명의 학생을 선택해야합니다.", "error", {button: "확인"})
		.then((result) => {
		})
		
		return
	}
	const statusNo = document.querySelector(".chk:checked").value;
	
	//ajax start
	$.ajax({
   		url: '/school/updateLeaveDeniedAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'statusNo': statusNo}, //필요한 데이터
	   	success: function(result) {
		
			swal("승인 취소", "승인취소 되었습니다.", "success",{button: "확인"})
			.then((result) => {
				location.href = `/school/acaLeave`;
			})
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end


}






//복학신청 승인완료 클릭시 실행
function updateReturnApp(){
	const check_box = document.querySelector('#returnTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	
	if(checked_box == 0){
		swal("대상 선택", "최소 1명의 학생을 선택해야합니다.", "error", {button: "확인"})
		.then((result) => {
		})
		
		return
	}
	const statusNo = document.querySelector(".chk:checked").value;
	console.log(statusNo)
	
	
	//ajax start
	$.ajax({
   		url: '/school/updateReturnAppAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'statusNo': statusNo}, //필요한 데이터
	   	success: function(result) {
			swal("승인 완료", "승인완료 되었습니다.", "success",{button: "확인"})
			.then((result) => {
				location.href = `/school/acaReturn`;
			})
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end
}


//복학신청 승인취소 클릭시 실행
function updateReturnDenied(){
	const check_box = document.querySelector('#returnTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	
	if(checked_box == 0){
		swal("대상 선택", "최소 1명의 학생을 선택해야합니다.", "error", {button: "확인"})
		.then((result) => {
		})
		
		return
	}
	const statusNo = document.querySelector(".chk:checked").value;
	console.log(statusNo);
	
	//ajax start
	$.ajax({
   		url: '/school/updateReturnDeniedAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'statusNo': statusNo}, //필요한 데이터
	   	success: function(result) {
		
			swal("승인 취소", "승인취소 되었습니다.", "success",{button: "확인"})
			.then((result) => {
				location.href = `/school/acaReturn`;
			})
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end


}







 
//복수전공신청 승인완료 클릭시 실행
function updateDoubleApp(){
	const check_box = document.querySelector('#dobleTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	if(checked_box == 0){
		swal("대상 선택", "최소 1명의 학생을 선택해야합니다.", "error", {button: "확인"})
		.then((result) => {
		})
		
		return
	}
	
	const applyNo = document.querySelector(".chk:checked").value;
	console.log(applyNo);
	
	//ajax start
	$.ajax({
   		url: '/school/updateDoubleAppAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'applyNo': applyNo}, //필요한 데이터
	   	success: function(result) {
			swal("승인 완료", "승인완료 되었습니다.", "success",{button: "확인"})
			.then((result) => {
				location.href = `/school/lessonMajorDouble`;
			})
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end

}

//복수전공신청 승인취소 클릭시 실행
function updateDoubleDenied(){
	const check_box = document.querySelector('#dobleTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	
	if(checked_box == 0){
		swal("대상 선택", "최소 1명의 학생을 선택해야합니다.", "error", {button: "확인"})
		.then((result) => {
		})
		
		return
	}
	const applyNo = document.querySelector(".chk:checked").value;
	console.log(applyNo);
	
	//ajax start
	$.ajax({
   		url: '/school/updateDoubleDeniedAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'applyNo': applyNo}, //필요한 데이터
	   	success: function(result) {
			swal("승인 취소", "승인취소 되었습니다.", "success",{button: "확인"})
			.then((result) => {
				location.href = `/school/lessonMajorDouble`;
			})
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end

}

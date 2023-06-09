init();

// 휴학 신청 클릭 시 실행
function applyAbsence(){
	const statusContent = document.querySelector('.status_content').value;
	
	if (statusContent == "") {
		Swal.fire('휴학사유를 입력해 주세요', '', 'error');
		return;
	}
	
	const hiddenBtn = document.querySelector('#hiddenBtn');
	hiddenBtn.click();
	
}

// 휴학신청 모달 창 실행
function init(){
	const checkbox = document.querySelector('#isAgree');
  	const confirmBtn = document.querySelector('#confirmBtn');

	checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      confirmBtn.removeAttribute('disabled');
    } else {
      confirmBtn.setAttribute('disabled', 'disabled');
    }
  });
	
}

function forStatusSubmit (){
		
	$.ajax({
		url: '/stu/forStatusSubmitAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {}, //필요한 데이터
		success: function(result) {
			if(result > 0){
				Swal.fire('휴학 또는 휴학신청 처리중 입니다', '', 'error');
			}
			else{
				const formTag = document.querySelector('#stuAbsence');
				Swal.fire('휴학신청이 완료되었습니다.', '', 'success').then(() => {
								formTag.submit();
							});
			}
			
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end
	
	
	
}
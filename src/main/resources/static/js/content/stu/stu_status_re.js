function applyAbsenceRe(){
	
	Swal.fire({
		title: '복학 신청 하시겠습니까?',
		text: '',
		icon: 'question',
   
		showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
		confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
		cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
		confirmButtonText: '확인', // confirm 버튼 텍스트 지정
		cancelButtonText: '취소', // cancel 버튼 텍스트 지정
   
		reverseButtons: false, // 버튼 순서 거꾸로
   
		}).then(result => {
   		// 만약 Promise리턴을 받으면,
			if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
				//ajax start
				$.ajax({
					url: '/stu/stuAbsenceReAjax', //요청경로
					type: 'post',
					async: true,
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					data: {}, //필요한 데이터
					success: function(result) {
						console.log(result);
						if (result) {
							Swal.fire('신청 취소가 완료되었습니다.', '', 'success').then(() => {
								document.querySelector('#stuAbsence').submit();
							});
						}
						else {
							Swal.fire('휴학 상태인 학생만 복학신청이 가능합니다', '', 'error');
							return;
						}

					},
					error: function() {
						alert('실패');
					}
				});
			//ajax end
   			}
   
			
	});
	
	
	
	
	
	
	
}
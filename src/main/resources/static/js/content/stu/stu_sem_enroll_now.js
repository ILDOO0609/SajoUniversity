function deleteEnr(button){
	const submitFormTag = button.parentNode;
	Swal.fire({
			title: '강의신청을 취소 하시겠습니까?',
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
					Swal.fire('신청 취소가 완료되었습니다.', '', 'success').then(() => {
			        submitFormTag.submit();
			      	});
	   			}
	   
				else {
					return;
	   			}
		});

	
}

	
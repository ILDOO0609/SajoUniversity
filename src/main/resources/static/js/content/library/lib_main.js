

// 도서관 자리 클릭시 자리예약을 위한 함수
function regSeat(btn, seatNum){
	const seatNo = seatNum;
	if(btn.style.backgroundColor == 'gray'){
		Swal.fire({
			title: '좌석을 반납 하시겠습니까?',
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
					Swal.fire('반납이 완료되었습니다.', '', 'success').then(() => {
						btn.style.backgroundColor = 'white';
						
			      	});
	   			}
	   
				else {
					return;
	   			}
		});
	
	}
	else{
		Swal.fire({
			title: '좌석 배정을 하시겠습니까?',
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
					Swal.fire('좌석 배정이 완료되었습니다.\n 좌석 기본 이용시간은 \n 4시간입니다.', '', 'success').then(() => {
						btn.style.backgroundColor = 'gray';
						
			      	});
	   			}
	   
				else {
					return;
	   			}
		});
	}
					
	
}
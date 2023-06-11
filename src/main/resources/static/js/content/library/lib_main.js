
// 도서관 자리 클릭시 자리예약을 위한 함수
function regSeat(btn, seatNum){
	const seatNo = seatNum;
	
	document.querySelector('.seatNo').value = seatNo;

	console.log(btn.classList);

	if (btn.classList.contains('graySeat')) {
		Swal.fire({
			title: '좌석을 반납 하시겠습니까?',
			text: '',
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '확인',
			cancelButtonText: '취소',
			reverseButtons: false,
		}).then(result => {
			if (result.isConfirmed) {
				Swal.fire('반납이 완료되었습니다.', '', 'success').then(() => {
					btn.style.backgroundColor = 'white';
					document.querySelector('#deleteSeat').submit();
				});
			} else {
				return;
			}
		});
	} else {
		if(document.querySelectorAll('.isNull').length === 0){
			Swal.fire({
				title: '좌석 배정을 하시겠습니까?',
				text: '',
				icon: 'question',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: '확인',
				cancelButtonText: '취소',
				reverseButtons: false,
			}).then(result => {
				if (result.isConfirmed) {
					Swal.fire('좌석 배정이 완료되었습니다.\n 좌석 기본 이용시간은 \n 4시간입니다.', '', 'success').then(() => {
						btn.style.backgroundColor = 'gray';
						document.querySelector('#regLibSeat').submit();
					});
				} else {
					return;
				}
			});
			
		}
		else{
			Swal.fire('이미 배정중인 좌석이 있습니다.', '', 'error');
			
		}
	}
	
}
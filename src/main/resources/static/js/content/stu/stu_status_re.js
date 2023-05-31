function applyAbsenceRe(){
	const applyAbsenceRe = confirm('복학 신청 하시겠습니까?');
	
	if (applyAbsenceRe){
		//ajax start
		$.ajax({
			url: '/stu/stuAbsenceReAjax', //요청경로
			type: 'post',
			async: true,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {}, //필요한 데이터
			success: function(result) {
				if(result){
					alert('복학 신청이 완료 되었습니다.');
					location.href="/stu/stuAbsenceRe";
				}
				else{
					alert('휴학 상태인 학생만 복학신청이 가능합니다.');
					return;
				}
				
			},
			error: function() {
				alert('실패');
			}
		});
	//ajax end
		
	}
	else{
		return;
	}
	
	
	
}
function deleteAbsence(){
	const result = confirm('휴학/복학 신청을 취소하시겠습니까?');
	
	if(result){
		location.href='/stu/deleteAbsence';
		alert('취소 완료 되었습니다.');
		return;
	}
	else{
		return;
	}
}

function deleteMultiMajor(){
	const deleteMultiMajor = confirm('복수전공 신청을 취소하시겠습니까?');
	
	if(deleteMultiMajor){
		location.href='/stu/deleteMultiMajor';
		alert('취소가 완료 되었습니다.');
		return
	}
	else{
		return;
	}
}
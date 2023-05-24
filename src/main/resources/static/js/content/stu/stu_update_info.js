function updateStuInfo(){
	const result = confirm('수정 하시겠습니까?');
	
	if(result){
		alert('수정이 완료되었습니다.')
		document.querySelector('#updateForm').submit();
		
	}
}


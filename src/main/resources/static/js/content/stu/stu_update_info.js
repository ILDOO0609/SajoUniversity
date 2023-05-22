function updateStuInfo(){
	const result = confirm('수정 하시겠습니까?');
	
	if(result){
		document.querySelector('#updateForm').submit();
		
	}
	
}
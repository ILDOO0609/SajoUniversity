function deleteEnr(){
	const result = confirm('강의신청을 취소 하시겠습니까?');
	const submitFormTag = document.querySelector('#deleteEnr');
	
	if(result){
		submitFormTag.submit();
		
	}
	
}
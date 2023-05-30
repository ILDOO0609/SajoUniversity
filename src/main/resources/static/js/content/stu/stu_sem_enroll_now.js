function deleteEnr(button){
	const result = confirm('강의신청을 취소 하시겠습니까?');
	const submitFormTag = button.parentNode;
	console.log(submitFormTag);
	if(result){
		submitFormTag.submit();
		
	}
	
}
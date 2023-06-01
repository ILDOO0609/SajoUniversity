//댓글 수정 버튼 클릭 시 실행
function setInput(selectedTag, replyNo, boardNo){
	//수정 버튼 클릭 시
	if(selectedTag.value=='수정'){
		
		const contentDiv=selectedTag.parentElement.previousElementSibling;
		
		const content=contentDiv.textContent;
		
		contentDiv.innerHTML = '';
		
		let str = ``;
		str += '<form id="updateReplyForm" action="/reply/updateReply" method="post">';	
	    str += `<input type="hidden" value="${replyNo}" name="replyNo">`;	
	    str += `<input type="hidden" value="${boardNo}" name="boardNo">`;	
	    str += `<input type="text" value="${content}" name="replyContent">`;	
		str += '</form>';	
		
		//선택한 태그의 첫번째 자식 태그로 삽입
		contentDiv.insertAdjacentHTML('afterbegin',str);
		
		//수정 버튼의 글자를 변경
		selectedTag.value='확인';
	}
	
	else{
		//form태그를 submit 시킨다.
		document.querySelector('#updateReplyForm').submit();
	}
	
	
	
	
	
}
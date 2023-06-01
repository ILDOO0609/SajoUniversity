//댓글 수정 버튼 클릭 시 실행
function setInput(selectedTag, replyNo, boardNo){
	//수정 버튼 클릭 시
	if(selectedTag.value=='수정'){
		
		const contentDiv=selectedTag.parentElement.previousElementSibling;
		
		const content=contentDiv.innerText;
		
		contentDiv.innerHTML = '';
		
		let str = ``;
		str += '<form id="updateReplyForm" action="/reply/updateReply" method="post">';	
	    str += `<input type="hidden" value="${replyNo}" name="replyNo">`;	
	    str += `<input type="hidden" value="${boardNo}" name="boardNo">`;	
	    str += `<input type="text" class="form-control" value="${content}" name="replyContent">`;	
		str += '</form>';	
		
		//선택한 태그의 첫번째 자식 태그로 삽입
		contentDiv.insertAdjacentHTML('afterbegin',str);
		
		//수정 버튼의 글자를 변경
		selectedTag.value='확인';
	}
	
	else{
		Swal.fire({
        icon: 'success',
        title: '수정완료',
        text: '수정 되었습니다.!',
	    }).then((result) => {
	        if (result.isConfirmed) {
	           document.querySelector('#updateReplyForm').submit();
	        }
	    })
		
	}
}

//글삭제
function deleteBoard(boardNo){
	Swal.fire({
		title: '글을 삭제하시겠습니까?',
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
				Swal.fire({
		        icon: 'success',
		        title: '삭제완료',
		        text: '해당글이 삭제 되었습니다.!',
			    }).then((result) => {
			        if (result.isConfirmed) {
			           location.href=`/board/deleteBoard?boardNo=${boardNo}`;
			        }
			    })
			}
		});	
}

//댓글삭제
function deleteReply(replyNo, boardNo){
	Swal.fire({
		title: '댓글을 삭제하시겠습니까?',
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
				
				Swal.fire({
		        icon: 'success',
		        title: '삭제완료',
		        text: '댓글이 삭제 되었습니다.!',
			    }).then((result) => {
			        if (result.isConfirmed) {
			           location.href=`/reply/deleteReply?boardNo=${boardNo}&replyNo=${replyNo}`;
			        }
			    })
			    
				
			}
		});	
}
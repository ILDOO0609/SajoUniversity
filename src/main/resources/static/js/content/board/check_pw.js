function checkPw(boardPw, boardNo){
	//키보드로 입력한 비밀번호 가져온다.
	const inputPw = document.querySelector('#inputPw').value;
	
	if(boardPw == inputPw){
		location.href=`/board/boardDetail?boardNo=${boardNo}`;
	}
	
	else{
		alert('게시글 비밀번호를 확인하세요');
	}
}
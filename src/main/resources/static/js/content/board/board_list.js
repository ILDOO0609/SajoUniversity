
function getBoardListPaging(pageNum){
	console.log(pageNum);
	document.querySelector('#nowPage').value=pageNum;
	categorySearch();
}


//카테고리로 검색
function categorySearch(){
	document.querySelector('#cateForm').submit();	
}

//게시판 검색
function searchBoard(){
	//강의검색
	const cate_no = document.querySelector('#cateSelect option:checked').value;
	
	const check = document.querySelector('#searchCheck');
	check.value = check.checked == true ? 'notSecret' : 'secret';
	
	document.querySelector('#cateInput').value = cate_no;
	
	document.querySelector('#searchForm').submit();
	
}

function showInput(secretBoard) {
    const td = secretBoard.closest('td');
    td.querySelector('.board-title').style.display = 'none';
    td.querySelector('.inputArea').style.display = 'inline-block';
}

function ok(okBtn, secretPw, boardNo) {
    const password = okBtn.parentNode.previousElementSibling.children[0].value;
    
    if(password == secretPw){
		location.href = `/board/boardDetail?boardNo=${boardNo}`;
    } 
    else{
		Swal.fire({
        icon: 'error',
        title: '오류',
        text: '비밀번호가 일치하지 않습니다.',
        });
    }
}

function cancel(cancelBtn) {
	cancelBtn.parentNode.previousElementSibling.previousElementSibling.children[0].value='';
    const td = cancelBtn.closest('td');
    td.querySelector('.board-title').style.display = 'inline-block';
    td.querySelector('.inputArea').style.display = 'none';
}

 function maxLengthCheck(object) {
    if (object.value.length > 4)
      object.value = object.value.slice(0, 4);
 }
 

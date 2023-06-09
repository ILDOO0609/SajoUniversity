function notice(){
	const is_notice = document.querySelector('#noticeChk').checked == true ? true : false;
	const secret_chk = document.querySelector('#secretChk');
	const secret_num = document.querySelector('#secretNum');
	
	if(is_notice){
		secret_chk.disabled = true;
		secret_num.value = '';
		secret_num.disabled = true;
	}
	else{
		secret_chk.disabled = false;
	}
}

function secret(){
	const secret_num = document.querySelector('#secretNum');
	const is_checked = document.querySelector('#secretChk').checked == true ? true : false;
	
	if(is_checked){
		secret_num.disabled = false;
	}
	else{
		secret_num.value = '';
		secret_num.disabled = true;
	}
	
}

 function maxLengthCheck(object) {
    if (object.value.length > 4)
      object.value = object.value.slice(0, 4);
 }
 
	// 게시글 등록
function regBoard(){
	if(document.querySelector('#boardTitle').value=='' || document.querySelector('#boardContent').value ==''){
		Swal.fire('제목 및 내용은 필수입력입니다.', '', 'error');
        return;
	}
	
	if(document.querySelector('#secretChk').checked && document.querySelector('#secretNum').value == ''){
		Swal.fire('비밀글 암호를 입력해주세요.', '', 'error');
        return;
	}
	
	Swal.fire({
    icon: 'success',
    title: '등록 성공',
    text: '글이 등록 되었습니다!',
	}).then((result) => {
	    document.querySelector('#formTag').submit();
	});

}

 
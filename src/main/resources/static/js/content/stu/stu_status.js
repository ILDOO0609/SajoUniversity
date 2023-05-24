init();

function applyAbsence(){
	const statusContent = document.querySelector('.status_content').value;
	
	if (statusContent == "") {
		alert('휴학사유를 입력해 주세요.');
		return;
	}
	
	const hiddenBtn = document.querySelector('#hiddenBtn');
	hiddenBtn.click();
	
}

function init(){
	const checkbox = document.querySelector('#isAgree');
  	const confirmBtn = document.querySelector('#confirmBtn');

	checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      confirmBtn.removeAttribute('disabled');
    } else {
      confirmBtn.setAttribute('disabled', 'disabled');
    }
  });
	
}

function forSubmit (){
	const formTag = document.querySelector('#stuAbsence');
	formTag.submit();
	
}
// 단과대학 셀렉트박스 변경 시 실행
function changeColl(coll){
	const coll_no = coll.value;
	
		//ajax start
		$.ajax({
			url: '/stu/changeCollAjax', //요청경로
			type: 'post',
			async: true,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'collNo':coll_no}, //필요한 데이터
			success: function(result) {
				drawDeptSelectbox(result);
			},
			error: function() {
				alert('실패');
			}
		});
	//ajax end
}

// 단과대학 변경 시 소속학과 변경
function drawDeptSelectbox(deptList){
	const dept_div = document.querySelector('#deptDiv');
	
	dept_div.replaceChildren();
		
	let str = '';
	
	str += `<select class="form-select text-center" name="multiMajorDept" style="width:200px;">`;
	for(const dept of deptList){
		str += `<option id="deptNo" value="${dept.deptNo}">${dept.deptName}</option>`;
	}
	str += `</select>`;
	
	dept_div.insertAdjacentHTML('afterbegin',str);
}


init();

// 복수전공 신청 클릭 시 실행
function applyMulti(){
	const statusContent = document.querySelector('.applyReason').value;
	const selectedCollNo = document.querySelector('select[name="multiMajorColl"]').value;
	
	if (statusContent == "") {
		alert('복수전공 신청 사유를 입력해 주세요.');
		return;
	}
	
	if (selectedCollNo == ''){
		alert('복수전공 할 단과대학 및 학과를 선택해 주세요.');
		return;
	}
	
	const hiddenBtn = document.querySelector('#hiddenBtn');
	hiddenBtn.click();
	
}

// 복수전공 신청 모달 창 실행
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

// 복수전공 신청 모달 확인 클릭
function confirmMulti() {
	const collNo = document.querySelector('select[name="multiMajorColl"]').value;
	const deptNo = document.querySelector('select[name="multiMajorDept"]').value;
	
	const formTagForSubmit = document.querySelector('#formTag');
	formTagForSubmit.submit();
	
}
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
	
	if (deptList.length === 0) {
        str += `<select class="form-select text-center" name="deptNo">`;
        str += `<option value=''>전체</option>`;
        str += `</select>`;
  	} else {
        str += `<select class="form-select text-center" name="deptNo">`;
        for (const dept of deptList) {
            str += `<option id="deptNo" value="${dept.deptNo}">${dept.deptName}</option>`;
    }
        str += `</select>`;
    }
	
	dept_div.insertAdjacentHTML('afterbegin',str);
}

// 수강신청 검색
function searchLecture(){
	const searchValue = document.querySelector('#searchValue').value; 
	const collNo = document.querySelector('select[name="collNo"]').value;
	const deptNo = document.querySelector('select[name="deptNo"]').value;
	
	//ajax start
		$.ajax({
			url: '/stu/searchEnrollAjax', //요청경로
			type: 'post',
			async: true,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'searchValue':searchValue, 'collNo' : collNo, 'deptNo' : deptNo}, //필요한 데이터
			success: function(result) {
				const searchDiv = document.querySelector('.searchDiv');
				searchDiv.replaceChildren();
								
				let str = '';
					
					str += `<div class="scrollable-tobdy custom-scrollbar">`;
					str += `<table class="table text-center table-striped">`;
					str += `<colgroup>`;
					str += `<col width="5%">`;
					str += `<col width="10%">`;
					str += `<col width="5%">`;
					str += `<col width="13%">`;
					str += `<col width="13%">`;
					str += `<col width="10%">`;
					str += `<col width="15%">`;
					str += `<col width="10%">`;
					str += `<col width="10%">`;
					str += `<col width="*">`;
					str += `</colgroup>`;
					for(let i = 0; i < result.length; i++){
						str += `<tr class="align-middle">`;
						str += `<td>${i+1}</td>`;
						str += `<td>${result[i].lecName}</td>`;
						str += `<td>${result[i].lecScore}</td>`;
						str += `<td>${result[i].colleageVO.collName}</td>`;
						str += `<td>${result[i].deptVO.deptName}</td>`;
						str += `<td>${result[i].memberVO.memName}</td>`;
						str += `<td>${result[i].lectureTimeList[0].lecDay}/${result[i].lectureTimeList[0].firstTime}~${result[i].lectureTimeList[0].lastTime}</td>`;
						str += `<td>${result[i].nowNum}</td>`;
						str += `<td>${result[i].maxNum}</td>`;
						str += `<td><input ${result[i].nowNum >= result[i].maxNum ? 'disabled' : ''} type="button" class="btn btn-primary" value="수강신청" onclick="applyEnrollment('${result[i].lecNo}','${result[i].semNo}', this);"></td>`;
						str += ``;
						str += `</tr>`;
					}
					str += `</table>`;
					str += `</div>`;
					searchDiv.insertAdjacentHTML('afterbegin', str);
				
			},
			error: function() {
				alert('실패');
			}
		});
	//ajax end
	
}

// 수강신청 ajax함수
function doEnrollment(lecNo, semNo){
	
	
	//ajax start
		$.ajax({
			url: '/stu/applyEnrollmentAjax', //요청경로
			type: 'post',
			async: true,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'lecNo':lecNo, 'semNo':semNo}, //필요한 데이터
			success: function(result) {
				if(result){
					return;
				}
				else{
					alert('다시 시도하세요');
				}
			},
			error: function() {
				alert('실패');
			}
		});
	//ajax end
	
}


// 수강신청 버튼 클릭
function applyEnrollment(lecNo, semNo){
	Swal.fire('수강신청 하시겠습니까?', '', 'question').then(() => {
		        checkEnrollment(lecNo, semNo);
		      	});
	
}



// 수강신청
function checkEnrollment(lecNo, semNo){
	
	//ajax start
		$.ajax({
			url: '/stu/checkEnrollmentAjax', //요청경로
			type: 'post',
			async: true,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'lecNo':lecNo}, //필요한 데이터
			success: function(result) {
				if (result) {
            		Swal.fire('이미 수강신청한 강의 입니다', '', 'error');
            		return;
        		}
				else{
					doEnrollment(lecNo, semNo);
					Swal.fire('수강 신청을 완료 했습니다', '', 'success').then(() => {
						document.querySelector('#applyEnroll').submit();
			      	});
				}
			},
			error: function() {
				alert('실패');
			}
		});
	
}










//전공대학 변경시 실행되는 함수
function changeColl(coll){
	const coll_no = coll.value;
	
		//ajax start
		$.ajax({
			url: '/emp/changeCollAjax', //요청경로
			type: 'post',
			async: true,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'collNo':coll_no}, //필요한 데이터
			success: function(result) {
				console.log(result);
				drawDeptSelectbox(result);
			},
			error: function() {
				alert('실패');
			}
		});
	//ajax end
}

//전공학과 셀렉트박스 그리기
function drawDeptSelectbox(deptList){
	const dept_div = document.querySelector('#deptDiv');
	
	dept_div.replaceChildren();
		
	let str = '';
	
	str += `<select class="form-select" name="deptNo">`;
	for(const dept of deptList){
		str += `<option value="${dept.deptNo}">${dept.deptName}</option>`;
	}
	str += `</select>`;
	
	dept_div.insertAdjacentHTML('afterbegin',str);
}

//강의마치는시간 자동 설정
function setLastTime(timeTag){
	document.querySelector('#lastTime').value = parseInt(timeTag.value)+1+':00';
	document.querySelector('#regBtn').disabled=true;
}

//강의시간 중복체크
function timeDuplicationCheckAjax(){
	const lec_day = document.querySelector('select[name="lecDay"]').value;
	const first_time = document.querySelector('select[name="firstTime"]').value;
	
		//ajax start
	   $.ajax({
	      url: '/emp/timeDuplicationCheckAjax', //요청경로
	      type: 'post',
	      async: true,
	      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	      data: {'lecDay':lec_day, 'firstTime':first_time}, //필요한 데이터
	      success: function(result) {
	         if(result){
				Swal.fire({
				  icon: 'error',
				  title: '등록불가',
				  text: '해당 시간이 이미 등록되어있습니다.!',
				});
			 }
			 else{
				document.querySelector('#regBtn').disabled=false;
				Swal.fire({
				  icon: 'success',
				  title: '시간 체크',
				  text: '등록 가능한 시간입니다.',
				});
				
			}
	      },
	      error: function() {
	         alert('실패');
	      }
	   });
	//ajax end
}

//요일이나 시간 변경시 다시 등록버튼 비활성화
function change(){
	document.querySelector('#regBtn').disabled=true;
}

//강의 등록
function regLecture(){
	
	//유효성 검사 진행
	const isValid = regValidate();
	
	if(!isValid){
		return ;
	}
	
	//회원가입 진행
	document.querySelector('#regForm').submit();
}

//오류 메시지 div 전체 제거
function deleteErrorDiv(){
	//기존의 오류 메시지 전부 삭제
	const errorDivs = document.querySelectorAll('div[class="my-invalid"]');
	
	for(const errorDiv of errorDivs){
		errorDiv.remove();
	}
}

//강의 등록 유효성 검사
function regValidate(){
	
	deleteErrorDiv();
	
	const lec_name = document.querySelector('input[name="lecName"]');
	const lec_score = document.querySelector('select[name="lecScore"]');
	console.log(lec_name.value);
	//함수의 리턴 결과를 저장하는 변수
	let result_name = true;
	let result_score = true;
	
	//오류 메세지 
	let str_name = '';
	let str_score = '';
	
	if(lec_name.value == ''){
		str_name = '<div style="color:red; font-size:14px;" class="my-invalid">교과목명은 필수입니다.</div>';
		result_name = false;
	}
	if(lec_score.value == ''){
		str_score = '<div style="color:red; font-size:14px;" class="my-invalid">강의학점은 필수입니다.</div>'
		result_score = false;
	}
	
	if(!result_name){
		lec_name.parentElement.insertAdjacentHTML('afterend', str_name);
	}
	if(!result_score){
		lec_score.parentElement.insertAdjacentHTML('afterend', str_score);
	}
	
	return result_name && result_score;
	
}
 


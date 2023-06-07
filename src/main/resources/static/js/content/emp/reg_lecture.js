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

// 함수: firstTime 값에 따라 lastTime select box 갱신
function setLastTime(firstTimeSelect) {
    let firstTime = firstTimeSelect.value;
    let lastTimeSelect = firstTimeSelect.nextElementSibling;

    // lastTime select box 내용을 비움
    lastTimeSelect.innerHTML = '';

    // firstTime 이후의 시간들로 lastTime select box 채움
    for (let i = 1; i <= 8; i++) {
        if (i >= firstTime) {
            let option = document.createElement('option');
            option.value = option.text = i;
            lastTimeSelect.appendChild(option);
        }
    }
}

// 추가버튼 클릭시 실행되는 함수
function add() {
	
    if(document.querySelectorAll('#dayContainer #day').length < 5) {
		
        let originDiv = document.querySelector('#dayContainer #day');
        let newDiv = originDiv.cloneNode(true); // 'day' div 복사

        // 새로운 div에서 'firstTime' select box에 setLastTime 함수 연결
        newDiv.querySelector('select[name="firstTime"]').onchange = function() { setLastTime(this); };
        
        // lastTime 초기화
        let lastTimeSelect = newDiv.querySelector('select[name="lastTime"]');
        lastTimeSelect.innerHTML = '';
        for (let i = 1; i <= 8; i++) {
            let option = document.createElement('option');
            option.value = option.text = i;
            lastTimeSelect.appendChild(option);
        }

        // 새로운 div를 'dayContainer' div 바로 아래에 추가
        document.querySelector('#dayContainer').appendChild(newDiv);

        // 새로운 div에서 'addBtn'과 'deleteBtn' 삭제
        let buttons = newDiv.querySelectorAll('input[type="button"]');
        
		for(const button of buttons){
			button.remove();
		}
		
        // 삭제버튼 보이게하기
        document.querySelector('#deleteBtn').style.display = "inline";
    } 
    else {
        alert("최대 4개까지만 추가할 수 있습니다.");
    }
}

// 삭제버튼 클릭시 실행되는 함수
function deleteDay() {
	
	//day div 모두 가져오기
    const days = document.querySelectorAll('#dayContainer #day');
    
    //day div하나씩 제거
    if(days.length > 1) {
        days[days.length-1].remove();
    }
    
    // day div가 1개가 되면 삭제버튼 display속성 none
    if(document.querySelectorAll('#dayContainer #day').length == 1) {
        document.querySelector('#deleteBtn').style.display = 'none';
    }
}

//강의시간 중복체크
function timeDuplicationCheckAjax(){
	
	const result = checkDayDuplicate(); // 요일 중복체크 함수 호출
	
	if(!result){
		return;
	}
	
	const lec_nos = document.querySelectorAll('#modal-body #lecNo');
	const lec_days = document.querySelectorAll('select[name="lecDay"]');
	const first_times = document.querySelectorAll('select[name="firstTime"]');
	const last_times = document.querySelectorAll('select[name="lastTime"]');
	
	let lec_no_arr= [];
	let lec_day_arr = [];
	let first_time_arr = [];
	let last_time_arr = [];
	
	
	
	for(const lec_no of lec_nos){
		lec_no_arr.push(lec_no.value);
	}
	for(const lec_day of lec_days){
		lec_day_arr.push(lec_day.value);
	}
	for(const first_time of first_times){
		first_time_arr.push(first_time.value);
	}
	for(const last_time of last_times){
		last_time_arr.push(last_time.value);
	}
	
	
	time_info = {
		'lecNoArr':lec_no_arr
		, 'lecDayArr':lec_day_arr
		, 'firstTimeArr':first_time_arr
		, 'lastTimeArr':last_time_arr
	};
	
	
	   //ajax start
	   $.ajax({
	      url: '/emp/timeDuplicationCheckAjax', //요청경로
	      type: 'post',
	      async: true,
	      contentType : 'application/json; charset=UTF-8',
	      //contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	      data: JSON.stringify(time_info), //필요한 데이터
	      success: function(result) {
	         if(result){
				
				Swal.fire({
				  icon: 'error',
				  title: '등록불가',
				  text: '해당 시간이 이미 등록되어있습니다.!',
				});
			 }
			 else{
				document.querySelector('.regBtn').disabled=false;
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

//요일 중복체크
function checkDayDuplicate() {
	
	const lec_days = document.querySelectorAll('select[name="lecDay"]');
	
	// lec_days 값들을 배열에 저장
	let lec_day_arr = [];
	
	// lec_day_arr에 데이터 푸쉬
	for(const lec_day of lec_days){
		lec_day_arr.push(lec_day.value);
	}
	
	//lec_day_arr에 중복데이터 체크
    for (let i = 0; i < lec_day_arr.length; i++) {
        for (let j = i + 1; j < lec_day_arr.length; j++) {
            if (lec_day_arr[i] == lec_day_arr[j]) {
                alert("요일이 중복됩니다.");
                return false;
            }
        }
    }
    return true;
}

//요일이나 시간 변경시 다시 등록버튼 비활성화
function change(){
	//document.querySelector('#regBtn').disabled=true;
}

//강의 등록
function regLecture(){
	 // 파일 입력 필드를 참조
    const pdf_file = document.querySelector('#pdfFile');

    // 파일 입력 필드의 값이 비어있는지 확인
    if (pdf_file.value == '') {
        // 파일이 선택되지 않았을 경우, 경고 메시지 표시
        Swal.fire({
		  icon: 'error',
		  title: '등록불가',
		  text: '강의 자료는 필수입니다.',
		});
        return ;
    } 

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
	console.log(lec_name.value);
	//함수의 리턴 결과를 저장하는 변수
	let result_name = true;
	
	//오류 메세지 
	let str_name = '';
	
	if(lec_name.value == ''){
		str_name = '<div style="color:red; font-size:14px;" class="my-invalid">교과목명은 필수입니다.</div>';
		result_name = false;
	}
	
	if(!result_name){
		lec_name.parentElement.insertAdjacentHTML('afterend', str_name);
	}
	
	return result_name;
}




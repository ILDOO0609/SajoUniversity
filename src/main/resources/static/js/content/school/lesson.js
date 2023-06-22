//복수전공 페이지 페이징
function deptPaging(pageNum){
	document.querySelector('#nowPage').value=pageNum;
	//검색
	document.querySelector('#searchForm').submit();
}

//복수전공신청 승인완료 클릭시 실행
function updateDoubleApp(){
	const check_box = document.querySelector('#dobleTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	if(checked_box == 0){
		Swal.fire('대상 선택', '최소 1명의 학생을 선택해야합니다.', 'warning').then(() => {
		        
		      	});
		
		return
	}
	
	const applyNo = document.querySelector(".chk:checked").value;
	console.log(applyNo);
	
	//ajax start
	$.ajax({
   		url: '/school/updateDoubleAppAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'applyNo': applyNo}, //필요한 데이터
	   	success: function(result) {
			Swal.fire('승인 완료', '승인완료 되었습니다.', 'success').then(() => {
		        location.href = `/school/lessonMajorDouble`;
		    });
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end

}

//복수전공신청 승인취소 클릭시 실행
function updateDoubleDenied(){
	const check_box = document.querySelector('#dobleTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	
	if(checked_box == 0){
		Swal.fire('대상 선택', '최소 1명의 학생을 선택해야합니다.', 'warning').then(() => {
		        
		      	});
		
		return
	}
	const applyNo = document.querySelector(".chk:checked").value;
	console.log(applyNo);
	
	//ajax start
	$.ajax({
   		url: '/school/updateDoubleDeniedAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'applyNo': applyNo}, //필요한 데이터
	   	success: function(result) {
			Swal.fire('승인 취소', '승인취소 되었습니다.', 'error').then(() => {
		        location.href = `/school/lessonMajorDouble`;
		    });
			
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end

}
//복수전공 관리 회원 모달창
function checkDoubleModal(applyNo){
	console.log(applyNo);
	
	
	//ajax start
	$.ajax({
		url: '/school/getDoubleModalAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'applyNo':applyNo}, //필요한 데이터
		success: function(result) {
			console.log(result);
			
			const content_div = document.querySelector('#memberModal .modal-body');
			content_div.replaceChildren();	
			let str = '';
			
			str += `<div class="row">`;
			str += `<div class="col">`;
			str += `<table class="table">`;
			str += `<colgroup>`;
			str += `<col width="*%">`;
			str += `<col width="15%">`;
			str += `<col width="15%">`;
			str += `<col width="15%">`;
			str += `<col width="25%">`;
			str += `</colgroup>`;
			
			
			for(const status of result){
				str += `<tr>`;
				str += `<td colspan="5">학생 기본정보</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td rowspan="7"><img src="/upload/${status.stuVO.memberVO.memImage}" style="width: 100%; height: 100%"></td>`;
				str += `<td>학생No(ID)</td>`;
				str += `<td colspan="3">${status.stuVO.memNo}</td>`;
				str += `<tr>`;
				str += `<td>학생명</td>	`;
				str += `<td colspan="3">${status.stuVO.memberVO.memName}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>생년월일</td>`;
				str += `<td>${status.stuVO.memberVO.memBirthday}</td>`
				str += `<td style="text-align: center;">성별</td>`;
				str += `<td>${status.stuVO.memberVO.memGender}</td>`
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>신규가입일</td>`;
				str += `<td colspan="3">${status.stuVO.memberVO.regDate}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>이메일</td>`;
				str += `<td colspan="3">${status.stuVO.memberVO.memEmail}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>전화번호</td>`;
				str += `<td colspan="3">${status.stuVO.memberVO.memTell}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>주소</td>`;
				str += `<td colspan="3">${status.stuVO.memberVO.memAddr  + ' ' +  status.stuVO.memberVO.memAddrDetail}</td>`;
				str += `</tr>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td colspan="6">학생 학사정보</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td style="text-align: center;">학년</td>`;
				str += `<td>${status.stuVO.stuYear + ' '+ status.stuVO.stuSem}학기</td>`;
				str += `<td style="text-align: right;">재적상태</td>`;
				str += `<td></td>`;
				str += `<td>${status.stuVO.stuStatus}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td style="text-align: center;">단과대학</td>`;
				str += `<td>${status.stuVO.colleageVO.collName}</td>`;
				str += `<td style="text-align: right;">전공학과</td>`;
				str += `<td></td>`;
				str += `<td>${status.stuVO.deptVO.deptName}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td colspan="5">복수전공/과 사유</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td colspan="5" style="text-align: center;">${status.applyReason}</td>`;
				str += `</tr>`;
				
			}
			
			
			
			content_div.insertAdjacentHTML('afterbegin', str);
			
			const modal = new bootstrap.Modal('#memberModal');
			modal.show();
		
		
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
	
	
}

//학사징계 관리 검색
function searchProbList(){
	const searchValue = document.querySelector('#searchStuInput').value;
	const collNo = document.querySelector('select[name="collNo"]').value;
	const deptNo = document.querySelector('select[name="deptNo"]').value;

	//ajax start
	$.ajax({
	   url: '/school/searchProbStuListAjax', //요청경로
	   type: 'post',
	   data: {'searchValue':searchValue, 'collNo' : collNo, 'deptNo' : deptNo}, //필요한 데이터
	   success: function(result) {
			console.log(result)
			const stuProbListTag = document.querySelector('.stuProbListTag');
			stuProbListTag.replaceChildren();
			const tbodyTag = document.querySelector('#warningTable > tbody');
			tbodyTag.replaceChildren();
			
			let str = '';
			
			if(result.length == 0){
					str += `<tr>`;
					str += `<td colspan="8">조회된 회원이 없습니다.</td>`;
					str += `</tr>`;
			}
			else{
				for(const stu of result){
					str += `<tr>`;
					str += `<td style="cursor: pointer;" onclick="openWarningModal('${stu.stuNo}');">${stu.memNo}</td>`;
					str += `<td><input type="checkbox" class="form-check-input chk" id="stuNo" value="${stu.stuNo}"></td>`;
					str += `<td style="cursor: pointer;" onclick="openWarningModal('${stu.stuNo}');" id="memNo" value="${stu.memNo}">${stu.memNo}</td>`;
					str += `<td style="cursor: pointer;" onclick="openWarningModal('${stu.stuNo}');">${stu.memberVO.memName}</td>`;
					str += `<td style="cursor: pointer;" onclick="openWarningModal('${stu.stuNo}');">${stu.stuYear}</td>`;
					str += `<td style="cursor: pointer;" onclick="openWarningModal('${stu.stuNo}');">${stu.stuSem}학기</td>`;
					str += `<td style="cursor: pointer;" onclick="openWarningModal('${stu.stuNo}');">${stu.colleageVO.collName}</td>`;
					str += `<td colspan="2" style="text-align: center; cursor: pointer;" onclick="openWarningModal('${stu.stuNo}');">${stu.deptVO.deptName}</td>`;
					str += `<td style="cursor: pointer;" id="memNo" value="${stu.memNo}" onclick="openWarningModal('${stu.stuNo}');">${stu.memNo}</td>`;
					str += `<td>${stu.memberVO.memName}</td>`;
					str += `<td>${stu.stuYear}</td>`;
					str += `<td>${stu.stuSem}학기</td>`;
					str += `<td colspan="2">${stu.deptVO.deptName}</td>`;
					str += `<td>${stu.colleageVO.collName}</td>`;
					str += `</tr>`;
				}
			}
			stuProbListTag.insertAdjacentHTML('afterbegin', str);

	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
	
	
}

//학사징계 학사경고 버튼 클릭시
function stuProb(){
	const check_box = document.querySelector('#warningTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	if(checked_box == 0){
		Swal.fire('대상 선택', '최소 1명의 학생을 선택해야합니다.', 'warning').then(() => {
		        
		});
		
		return
	}
	
	const stuNo = document.querySelector(".chk:checked").value;
	const semNo = document.querySelector('select[name="semNo"]').value;
	const memNo = document.querySelector(".chk:checked").parentElement.nextElementSibling.textContent;
	const probStatusCode = document.querySelector('select[name="probStatusCode"]').value;
	console.log(stuNo);
	console.log(semNo);
	console.log(memNo);
	console.log(probStatusCode);
	
	//ajax start
	$.ajax({
   		url: '/school/insertProbAppAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'stuNo': stuNo, 'semNo': semNo, 'memNo':memNo, 'probStatusCode':probStatusCode}, //필요한 데이터
	   	success: function(result) {
			Swal.fire('승인 완료', '학사경고 처리되었습니다.', 'success').then(() => {
		        location.href = `/school/lessonWarning`;
		    });
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end

	
}


//학사징계 관리 회원 모달창
function openWarningModal(stuNo){
	
	console.log(stuNo);
	
	
	//ajax start
	$.ajax({
		url: '/school/getWarningModalAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'stuNo':stuNo}, //필요한 데이터
		success: function(result) {
			console.log(result);
			
			const probCnt = result['probCnt'];
			const stuList = result['stuList'];
			
			const content_div = document.querySelector('#memberModal .modal-body');
			content_div.replaceChildren();	
			let str = '';
			
			str += `<div class="row">`;
			str += `<div class="col">`;
			str += `<table class="table">`;
			str += `<colgroup>`;
			str += `<col width="*%">`;
			str += `<col width="15%">`;
			str += `<col width="15%">`;
			str += `<col width="15%">`;
			str += `<col width="25%">`;
			str += `</colgroup>`;
			
			str += `<tr>`;
			str += `<td colspan="5">학생 기본정보</td>`;
			str += `</tr>`;
			str += `<tr>`;
			str += `<td rowspan="7"><img src="/upload/${stuList[0]['MEM_IMAGE']}" style="width: 100%; height: 100%"></td>`;
			str += `<td>학생No(ID)</td>`;
			str += `<td colspan="3">${stuList[0]['MEM_NO']}</td>`;
			str += `<tr>`;
			str += `<td>학생명</td>	`;
			str += `<td colspan="3">${stuList[0]['MEM_NAME']}</td>`;
			str += `</tr>`;
			str += `<tr>`;
			str += `<td>생년월일</td>`;
			str += `<td>${stuList[0]['MEM_BIRTHDAY']}</td>`
			str += `<td style="text-align: center;">성별</td>`;
			str += `<td>${stuList[0]['MEM_GENDER']}</td>`
			str += `</tr>`;
			str += `<tr>`;
			str += `<td>신규가입일</td>`;
			str += `<td colspan="3">${stuList[0]['REG_DATE']}</td>`;
			str += `</tr>`;
			str += `<tr>`;
			str += `<td>이메일</td>`;
			str += `<td colspan="3">${stuList[0]['MEM_EMAIL']}</td>`;
			str += `</tr>`;
			str += `<tr>`;
			str += `<td>전화번호</td>`;
			str += `<td colspan="3">${stuList[0]['MEM_TELL']}</td>`;
			str += `</tr>`;
			str += `<tr>`;
			str += `<td>주소</td>`;
			str += `<td colspan="3">${stuList[0]['MEM_ADDR']  + ' ' +  stuList[0]['MEM_ADDR_DETAIL']}</td>`;
			str += `</tr>`;
			str += `</tr>`;
			str += `<tr>`;
			str += `<td colspan="6">학생 학사정보</td>`;
			str += `</tr>`;
			str += `<tr>`;
			str += `<td style="text-align: center;">학년</td>`;
			str += `<td>${stuList[0]['STU_YEAR'] + ' '+ stuList[0]['STU_SEM']}학기</td>`;
			str += `<td style="text-align: right;">학적상태</td>`;
			str += `<td></td>`;
			str += `<td>${stuList[0]['STU_STATUS']}</td>`;
			str += `</tr>`;
			str += `<tr>`;
			str += `<td style="text-align: center;">단과대학</td>`;
			str += `<td>${stuList[0]['COLL_NAME']}</td>`;
			str += `<td style="text-align: right;">전공학과</td>`;
			str += `<td></td>`;
			str += `<td>${stuList[0]['DEPT_NAME']}</td>`;
			str += `</tr>`;
			str += `<tr style="vertical-align: middle;">`;
			str += `<td style="text-align: center;">학사경고</td>`;
			if(probCnt == 3){
				str += `<td>${probCnt}회</td>`;
				str += `<td></td>`;
				str += `<td colspan="2" style="text-align: center;"><button class="btn btn-danger" id="probAppro" value="${stuList[0]['STU_NO']}" onclick="probAppro('${stuList[0]['STU_NO']}');">제적처리</button></td>`;
			}
			else{
				str += `<td>${probCnt}회</td>`;
				str += `<td></td>`;
				str += `<td colspan="3"></td>`;
			}
			str += `</tr>`;
			str += `<tr>`;
			str += `<td colspan="5">학사징계 목록</td>`;
			str += `</tr>`;
			
			for(const status of stuList){
				str += `<tr>`;
				str += `<td style="text-align: center;">${status['PROB_DATE']}</td>`;
				str += `<td>${status['SEM_YEAR']+status['SEMESTER']+'학기'}</td>`;
				str += `<td colspan="3" style="text-align: center;">${status['PROB_STATUS_NAME']}</td>`;
				str += `</tr>`;
			
			}
			
			content_div.insertAdjacentHTML('afterbegin', str);
			
			const modal = new bootstrap.Modal('#memberModal');
			modal.show();
		
		
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
	
	
}
//제적버튼 클릭시 실행
function probAppro(stuNo){
	const stu_No = document.querySelector('#probAppro').value;
	console.log(stu_No);
	
		//ajax start
	$.ajax({
   		url: '/school/updateStuProbAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'stuNo' : stu_No}, //필요한 데이터
	   	success: function(result) {
	      Swal.fire('제적 완료', '제적 처리되었습니다.', 'success').then(() => {
		        location.href = `/school/lessonWarning`;
		  });
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end
	

	

	
}










//복수전공신청 승인완료 클릭시 실행
function updateDoubleApp(){
	const check_box = document.querySelector('#dobleTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	if(checked_box == 0){
		swal("대상 선택", "최소 1명의 학생을 선택해야합니다.", "error", {button: "확인"})
		.then((result) => {
		})
		
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
			swal("승인 완료", "승인완료 되었습니다.", "success",{button: "확인"})
			.then((result) => {
				location.href = `/school/lessonMajorDouble`;
			})
			
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
		swal("대상 선택", "최소 1명의 학생을 선택해야합니다.", "error", {button: "확인"})
		.then((result) => {
		})
		
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
			swal("승인 취소", "승인취소 되었습니다.", "success",{button: "확인"})
			.then((result) => {
				location.href = `/school/lessonMajorDouble`;
			})
			
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
				str += `<td rowspan="7"><img src="'/upload/${status.stuVO.memberVO.memImage}" style="width: 100%; height: 100%"></td>`;
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
				str += `<td style="text-align: right;">학점</td>`;
				str += `<td></td>`;
				str += `<td>???점</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td style="text-align: center;">전공학과</td>`;
				str += `<td>${status.stuVO.deptVO.deptName}</td>`;
				str += `<td style="text-align: right;">학사경고</td>`;
				str += `<td></td>`;
				str += `<td>???회</td>`;
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
			const tbodyTag = document.querySelector('#stuTable > tbody');
			tbodyTag.replaceChildren();
			
			let str = '';
			
			if(result.length == 0){
					str += `<tr>`;
					str += `<td colspan="7">조회된 회원이 없습니다.</td>`;
					str += `</tr>`;
			}
			else{
				for(const stu of result){
					str += `<tr>`;
					str += `<td>${stu.memNo}</td>`;
					str += `<td>${stu.colleageVO.collName}</td>`;
					str += `<td>${stu.memberVO.memName}</td>`;
					str += `<td colspan="2">${stu.deptVO.deptName}</td>`;
					str += `<td>${stu.stuYear}</td>`;
					str += `<td>${stu.stuStatus}</td>`;
					str += `</tr>`;
				}
			}
			tbodyTag.insertAdjacentHTML('afterbegin', str);

	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
	
	
}






//학사징계 관리 회원 모달창
function checkWarningModal(){
	console.log();
	
	
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
				str += `<td rowspan="7"><img src="'/upload/${status.stuVO.memberVO.memImage}" style="width: 100%; height: 100%"></td>`;
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
				str += `<td style="text-align: right;">학점</td>`;
				str += `<td></td>`;
				str += `<td>???점</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td style="text-align: center;">전공학과</td>`;
				str += `<td>${status.stuVO.deptVO.deptName}</td>`;
				str += `<td style="text-align: right;">학사경고</td>`;
				str += `<td></td>`;
				str += `<td>???회</td>`;
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











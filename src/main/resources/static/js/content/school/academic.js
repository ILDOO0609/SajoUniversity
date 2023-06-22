//휴학페이지 페이징
function leavePaging(pageNum){
	document.querySelector('#nowPageForLeave').value=pageNum;
	//검색
	document.querySelector('#searchFormForLeave').submit();
}

//복학페이지 페이징
function returnPaging(pageNum){
	document.querySelector('#nowPageForReturn').value=pageNum;
	//검색
	document.querySelector('#searchFormForReturn').submit();
}


//휴학신청 승인완료 클릭시 실행
function updateLeaveApp(){
	const check_box = document.querySelector('#leaveTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	if(checked_box == 0){
		Swal.fire('대상 선택', '최소 1명의 학생을 선택해야합니다.', 'warning').then(() => {
		        
		      	});
				
		
		return
	}
	
	const statusNo = document.querySelector(".chk:checked").value;
	console.log(statusNo);
	
	//ajax start
	$.ajax({
   		url: '/school/updateLeaveAppAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'statusNo': statusNo}, //필요한 데이터
	   	success: function(result) {
			Swal.fire('휴학 완료', '승인완료 되었습니다.', 'success').then(() => {
		        location.href = `/school/acaLeave`;
		    });
					
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end

}

//휴학신청 승인취소 클릭시 실행
function updateLeaveDenied(){
	const check_box = document.querySelector('#leaveTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	
	if(checked_box == 0){
		Swal.fire('대상 선택', '최소 1명의 학생을 선택해야합니다.', 'warning').then(() => {
		        
		});
		
		return
	}
	const statusNo = document.querySelector(".chk:checked").value;
	
	//ajax start
	$.ajax({
   		url: '/school/updateLeaveDeniedAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'statusNo': statusNo}, //필요한 데이터
	   	success: function(result) {
			Swal.fire('휴학 취소', '승인취소 되었습니다.', 'error').then(() => {
		        location.href = `/school/acaLeave`;
		    });
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end


}






//복학신청 승인완료 클릭시 실행
function updateReturnApp(){
	const check_box = document.querySelector('#returnTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	
	if(checked_box == 0){
		Swal.fire('대상 선택', '최소 1명의 학생을 선택해야합니다.', 'warning').then(() => {
		        
		});
		
		return
	}
	const statusNo = document.querySelector(".chk:checked").value;
	console.log(statusNo)
	
	
	//ajax start
	$.ajax({
   		url: '/school/updateReturnAppAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'statusNo': statusNo}, //필요한 데이터
	   	success: function(result) {
			Swal.fire('복학 완료', '승인완료 되었습니다.', 'success').then(() => {
		        location.href = `/school/acaReturn`;
		    });
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end
}


//복학신청 승인취소 클릭시 실행
function updateReturnDenied(){
	const check_box = document.querySelector('#returnTable');
	const checked_box = check_box.querySelectorAll('input[type="checkbox"]:checked').length;
	
	if(checked_box == 0){
		Swal.fire('대상 선택', '최소 1명의 학생을 선택해야합니다.', 'warning').then(() => {
		        
		});
		
		return
	}
	const statusNo = document.querySelector(".chk:checked").value;
	console.log(statusNo);
	
	//ajax start
	$.ajax({
   		url: '/school/updateReturnDeniedAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'statusNo': statusNo}, //필요한 데이터
	   	success: function(result) {
			Swal.fire('복학 취소', '승인취소 되었습니다.', 'error').then(() => {
		        location.href = `/school/acaReturn`;
		    });
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end


}


//휴학관리 -> 학생 클릭시 상세창 모달 실행
function checkLeaveModal(statusNo){
	console.log(statusNo);
	
	//ajax start
	$.ajax({
		url: '/school/getLeaveModalAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'statusNo':statusNo}, //필요한 데이터
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
				str += `<td style="text-align: right;">학적상태</td>`;
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
				str += `<td colspan="6">학생 휴학사유</td>`;
				str += `</tr>`;
				str += `<td colspan="5" style="text-align: center;">${status.statusContent}</td>`;
				
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

//복학관리 -> 학생 클릭시 상세창 모달 실행
function checkReturnModal(statusNo){
	console.log(statusNo);
	
	//ajax start
	$.ajax({
		url: '/school/getReturnModalAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'statusNo':statusNo}, //필요한 데이터
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
				str += `<td style="text-align: right;">학적상태</td>`;
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
























 
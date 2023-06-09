//--------------회원메뉴--------------------------------------------------------------
//회원메뉴 -> 신규회원 승인완료
function updatePosition(memNo) {
	
	const collNo = document.querySelector('select[name="collNo"]').value;
	const deptNo = document.querySelector('select[name="deptNo"]').value;
	const memRole = document.querySelector('#memRole').value;
	
	console.log(collNo);
	console.log(deptNo);
	console.log(memRole);
	
	//ajax start
	$.ajax({
   		url: '/school/updatePositionAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'memNo':memNo,'deptNo':deptNo, 'collNo':collNo, 'memRole':memRole}, //필요한 데이터
	   	success: function(result) {
			Swal.fire('승인 완료', '승인완료 되었습니다.', 'success').then(() => {
		        location.href = `/school/memberList`;
		    });
			
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end

	
}
//회원메뉴 ->  신규회원 승인거절
function updateXPosition(memNo) {
	
	const collNo = document.querySelector('select[name="collNo"]').value;
	const deptNo = document.querySelector('select[name="deptNo"]').value;
	const memRole = document.querySelector('#memRole').value;
	
	console.log(memRole);
	
	//ajax start
	$.ajax({
   		url: '/school/updateXPositionAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'memNo':memNo,'deptNo':deptNo, 'collNo':collNo, 'memRole':memRole}, //필요한 데이터
	   	success: function(result) {
			Swal.fire('승인 취소', '승인 취소 되었습니다.', 'error').then(() => {
		        location.href = `/school/memberList`;
		    });
			
			
			
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end

	
}
	
//전공대학 변경시 실행되는 함수
function changeColl(coll){
	const coll_no = coll.value;
	
	//ajax start
	$.ajax({
		url: '/school/changeCollAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'collNo':coll_no}, //필요한 데이터
		success: function(result) {
			drawDeptSelectbox(result, coll);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

//전공학과 셀렉트박스 그리기
function drawDeptSelectbox(deptList, coll){
	const dept_div = coll.closest('tr').querySelector('.tdTag');
	console.log(dept_div);
	dept_div.replaceChildren();
	
	let str = '';
	
	str += `<select class="form-select" name="deptNo">`;
		
	for(const dept of deptList){
		str += `<option value="${dept.deptNo}">${dept.deptName}</option>`;
	}
	str += `</select>`;
	
	dept_div.insertAdjacentHTML('afterbegin',str);
}


//전체 페이지(1, 2, 3, ...) 클릭 시
function memberListPaging(pageNum){
	document.querySelector('#nowPageForSelectMember').value = pageNum;
	document.querySelector('#memberSelectListForm').submit();
	
}
//검색버튼 클릭시 실행
function selectMemberListSearch(){
	const searchValue = document.querySelector('#searchSelectMemberInput').value;
	if(searchValue == ''){
		Swal.fire('검색 실패', '검색할 제목을 입력하세요.', 'error')
		.then(() => {
		        
		})
		return;
	}
	document.querySelector('#memberSelectListForm').submit();
}


//회원메뉴 -> 승인/취소조회 -> 승인완료 조회
function approveO(isConfirmed){
	console.log(isConfirmed);
	
	//ajax start
	$.ajax({
		url: '/school/approveOAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'isConfirmed': isConfirmed}, //필요한 데이터
		success: function(result) {
			console.log(result);
			
			const memberVO = result['memberVO'];
			result = result['addList'];
			const tableDiv = document.querySelector('#tableDiv');
			tableDiv.classList.add('ds-scroll');
			const tbodyTag = document.querySelector('#approveTable > tbody');
			tbodyTag.replaceChildren();
			
			let str = '';
			
			if(result.length == 0){
					str += `<tr>`;
					str += `<td colspan="7">조회된 회원이 없습니다.</td>`;
					str += `</tr>`;
			}
			else{
				for(const app of result){
					str += `<tr style="cursor: pointer;" onclick="openModal('${app.memNo}');">`;
					str += `<td>${app.memNo}</td>`;
					str += `<td>${app.memName}</td>`;
					str += `<td>${app.memRole}</td>`;
					str += `<td>${app.memBirthday}</td>`;
					str += `<td>${app.memTell}</td>`;
					str += `<td>${app.regDate}</td>`;
					str += `<td>${app.isConfirmed}</td>`;
					str += `</tr>`;
				}
			
			const pagingTag = document.querySelector('#paging');
			pagingTag.replaceChildren();
			const searchTag = document.querySelector('#searchDiv');
			searchTag.replaceChildren();
			
			}
			
			tbodyTag.insertAdjacentHTML('afterbegin', str);
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
	
	
}
//회원메뉴 -> 승인/취소조회 -> 승인취소 조회
function approveX(isConfirmed){
	
	//ajax start
	$.ajax({
		url: '/school/approveXAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'isConfirmed': isConfirmed}, //필요한 데이터
		success: function(result) {
			console.log(result);
			
			const memberVO = result['memberVO'];
			result = result['deniedList'];
			
			const tableDiv = document.querySelector('#tableDiv');
			tableDiv.classList.add('ds-scroll');
			const tbodyTag = document.querySelector('#approveTable > tbody');
			tbodyTag.replaceChildren();
			
			let str = '';
			
			if(result.length == 0){
					str += `<tr>`;
					str += `<td colspan="7">조회된 회원이 없습니다.</td>`;
					str += `</tr>`;
			}
			else{
				for(const app of result){
					str += `<tr style="cursor: pointer;" onclick="openModal('${app.memNo}');">`;
					str += `<td>${app.memNo}</td>`;
					str += `<td>${app.memName}</td>`;
					str += `<td>${app.memRole}</td>`;
					str += `<td>${app.memBirthday}</td>`;
					str += `<td>${app.memTell}</td>`;
					str += `<td>${app.regDate}</td>`;
					str += `<td>${app.isConfirmed}</td>`;
					str += `</tr>`;
				}
			
			const pagingTag = document.querySelector('#paging');
			pagingTag.replaceChildren();
			const searchTag = document.querySelector('#searchDiv');
			searchTag.replaceChildren();
			
			}
			
			tbodyTag.insertAdjacentHTML('afterbegin', str);
			
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//회원 클릭시 상세창 모달 실행
function openModal(memNo){
	console.log(memNo);
	
	//ajax start
	$.ajax({
		url: '/school/getMemberModalAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'memNo':memNo}, //필요한 데이터
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
			
			
			result.forEach(function(member){
				str += `<tr>`;
				str += `<td rowspan="8"><img src="/upload/${member.memImage}" style="width: 100%; height: 100%"></td>`;
				str += `<td>회원명</td>`;
				str += `<td colspan="3">${member.memName}</td>`;
				str += `<tr>`;
				str += `<td>회원No(ID)</td>`;
				str += `<td colspan="3">${member.memNo}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>생년월일</td>`;
				str += `<td>${member.memBirthday}</td>`
				str += `<td style="text-align: center;">성별</td>`;
				str += `<td>${member.memGender}</td>`
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>신규가입일</td>`;
				str += `<td colspan="3">${member.regDate}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>이메일</td>`;
				str += `<td colspan="3">${member.memEmail}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>전화번호</td>`;
				str += `<td colspan="3">${member.memTell}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>주소</td>`;
				str += `<td colspan="3">${member.memAddr  + ' ' +  member.memAddrDetail}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>신청직책</td>`;
				str += `<td colspan="3">${member.memRole}</td>`;
				str += `</tr>`;
			});
			
			
			
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








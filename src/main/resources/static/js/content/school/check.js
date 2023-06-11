
//--------------학사조회-----------------------------------------------
//화면 로딩 후 바로 실행, 버튼 숨김
init()
function init(){
	$('.form-select').show()
	$('#serachPro').show()
	$('#serachStf').hide()
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

//학생조회 검색
function searchStuList(){
	const searchValue = document.querySelector('#searchStuInput').value;
	const collNo = document.querySelector('select[name="collNo"]').value;
	const deptNo = document.querySelector('select[name="deptNo"]').value;

	//ajax start
	$.ajax({
	   url: '/school/searchStuListAjax', //요청경로
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










//교수 교직원 라디오 버튼 클릭시 실행
$("input[name='checkPosition']").change(function(){
	var name = $("input[name='checkPosition']:checked").val();
	Swal.fire(name, '선택이(가) 완료되었습니다.', 'success').then(() => {
	});
	
	
	//교수 클릭시
	if($("input[name='checkPosition']:checked").val() == '교수'){
		$('.form-select').show()
		$('#serachPro').show()
		$('#serachStf').hide()
		
		const tdTag = document.querySelector('#proTable > tbody');
		tdTag.replaceChildren();	
		
				
		let str = '';
		
		str += `<tr>`;
		str +=	`<td>교수번호</td>`;
		str +=	`<td>직책</td>`;
		str +=	`<td>교수명</td>`;
		str +=	`<td>단과대학</td>`;
		str +=	`<td>전공</td>`;
		str += `</tr>`;
		
		
		
		tdTag.insertAdjacentHTML('afterbegin', str);
		
		
		
		
	}
	//교직원 클릭시
	else if($("input[name='checkPosition']:checked").val() == '교직원'){
		$('.form-select').hide()
		$('#serachPro').hide()
		$('#serachStf').show()
		
		
		const tdTag = document.querySelector('#proTable > tbody');
		tdTag.replaceChildren();
		
		let str = '';
				
		str += `<tr>`;
		str +=	`<td>교직원번호</td>`;
		str +=	`<td>직책</td>`;
		str +=	`<td>교직원명</td>`;
		str +=	`<td>비상연락망</td>`;
		str +=	`<td>Email</td>`;
		str += `</tr>`;
		
		tdTag.insertAdjacentHTML('afterbegin', str);
		
		//ajax start
		$.ajax({
			url: '/school/searchStfListAjax', //요청경로
			type: 'post',
			async: true,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'searchValue':searchValue}, //필요한 데이터
			success: function(result) {
				console.log(result)
				
				if(result.length == 0){
					str += `<tr>`
					str += `<td colspan="5">조회된 회원이 없습니다.</td>`
					str += `</tr>`
				}
				else{
					for(const pro of result){
						str += `<tr>`;
						str += `<td>${pro.empVO.memNo}</td>`;
						str += `<td>${pro.memberVO.memRole}</td>`;
						str += `<td>${pro.memberVO.memName}</td>`;
						str += `<td>${pro.colleageVO.collName}</td>`;
						str += `<td>${pro.deptVO.deptName}</td>`;
						str += `</tr>`;
					}
				}
				
			},
			
			error: function() {
				alert('실패');
			}
		});
	//ajax end
		
			
	}
	
				
});
//교수/교직원 조회 -> 교수검색
function searchProList(){
	const searchValue = document.querySelector('#searchProInput').value;
	const collNo = document.querySelector('select[name="collNo"]').value;
	const deptNo = document.querySelector('select[name="deptNo"]').value;
	
	
	//ajax start
		$.ajax({
			url: '/school/searchProListAjax', //요청경로
			type: 'post',
			async: true,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'searchValue':searchValue, 'collNo' : collNo, 'deptNo' : deptNo}, //필요한 데이터
			success: function(result) {
				console.log(result)
				const tdTag = document.querySelector('#proTable > tbody');
				tdTag.replaceChildren();	
				
				
				let str = '';
				
				str += `<tr>`;
				str +=	`<td>교수번호</td>`;
				str +=	`<td>직책</td>`;
				str +=	`<td>교수명</td>`;
				str +=	`<td>단과대학</td>`;
				str +=	`<td>전공</td>`;
				str += `</tr>`;
				
				if(result.length == 0){
					str += `<tr>`
					str += `<td colspan="5">조회된 회원이 없습니다.</td>`
					str += `</tr>`
				}
				else{
					for(const pro of result){
						str += `<tr style="cursor: pointer;" onclick="openProModal('${pro.empNo}');">`;
						str += `<td>${pro.empVO.memNo}</td>`;
						str += `<td>${pro.memberVO.memRole}</td>`;
						str += `<td>${pro.memberVO.memName}</td>`;
						str += `<td>${pro.colleageVO.collName}</td>`;
						str += `<td>${pro.deptVO.deptName}</td>`;
						str += `</tr>`;
					}
				}
				
				tdTag.insertAdjacentHTML('afterbegin', str);
			},
			
			error: function() {
				alert('실패');
			}
		});
	//ajax end
}


//교수/교직원 조회 -> 교직원검색
function searchStfList(){
	const searchValue = document.querySelector('#searchProInput').value;
	
	//ajax start
		$.ajax({
			url: '/school/searchStfListAjax', //요청경로
			type: 'post',
			async: true,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'searchValue':searchValue}, //필요한 데이터
			success: function(result) {
				const tdTag = document.querySelector('#proTable > tbody');
				tdTag.replaceChildren();	
				
				let str = '';
				
				str += `<tr>`;
				str +=	`<td>교직원번호</td>`;
				str +=	`<td>직책</td>`;
				str +=	`<td>교직원명</td>`;
				str +=	`<td>비상연락망</td>`;
				str +=	`<td>Email</td>`;
				str += `</tr>`;
				
				if(result.length == 0){
					str += `<tr>`
					str += `<td colspan="5">조회된 회원이 없습니다.</td>`
					str += `</tr>`
				}
				else{
					for(const stf of result){
						str += `<tr>`;
						str += `<td>${stf.memNo}</td>`;
						str += `<td>${stf.memRole}</td>`;
						str += `<td>${stf.memName}</td>`;
						str += `<td>${stf.memTell}</td>`;
						str += `<td>${stf.memEmail}</td>`;
						str += `</tr>`;
					}
				}
				
				tdTag.insertAdjacentHTML('afterbegin', str);
			},
			
			error: function() {
				alert('실패');
			}
		});
	//ajax end
}


//학생조회 -> 학생 클릭시 상세창 모달 실행
function openStuModal(stuNo){
	console.log(stuNo);
	
	//ajax start
	$.ajax({
		url: '/school/getStuModalAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'stuNo':stuNo}, //필요한 데이터
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
			
			
			for(const stu of result){
				str += `<tr>`;
				str += `<td colspan="5">학생 기본정보</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td rowspan="7"><img src="'/upload/${stu.memberVO.memImage}" style="width: 100%; height: 100%"></td>`;
				str += `<td>학생No(ID)</td>`;
				str += `<td colspan="3">${stu.memNo}</td>`;
				str += `<tr>`;
				str += `<td>학생명</td>	`;
				str += `<td colspan="3">${stu.memberVO.memName}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>생년월일</td>`;
				str += `<td>${stu.memberVO.memBirthday}</td>`
				str += `<td style="text-align: center;">성별</td>`;
				str += `<td>${stu.memberVO.memGender}</td>`
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>신규가입일</td>`;
				str += `<td colspan="3">${stu.memberVO.regDate}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>이메일</td>`;
				str += `<td colspan="3">${stu.memberVO.memEmail}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>전화번호</td>`;
				str += `<td colspan="3">${stu.memberVO.memTell}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>주소</td>`;
				str += `<td colspan="3">${stu.memberVO.memAddr  + ' ' +  stu.memberVO.memAddrDetail}</td>`;
				str += `</tr>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td colspan="6">학생 학사정보</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td style="text-align: center;">학년</td>`;
				str += `<td>${stu.stuYear + ' '+ stu.stuSem}학기</td>`;
				str += `<td style="text-align: right;">재적상태</td>`;
				str += `<td></td>`;
				str += `<td>${stu.stuStatus}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td style="text-align: center;">단과대학</td>`;
				str += `<td>${stu.colleageVO.collName}</td>`;
				str += `<td style="text-align: right;">학점</td>`;
				str += `<td></td>`;
				str += `<td>???점</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td style="text-align: center;">전공학과</td>`;
				str += `<td>${stu.deptVO.deptName}</td>`;
				str += `<td style="text-align: right;">학사경고</td>`;
				str += `<td></td>`;
				str += `<td>???회</td>`;
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


//교수/교직원 조회 -> 교수 클릭시 상세창 모달 실행
function openProModal(empNo){
	console.log(empNo);
	
	//ajax start
	$.ajax({
		url: '/school/getProModalAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'empNo':empNo}, //필요한 데이터
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
			
			for(const emp of result){
				str += `<tr>`;
				str += `<td colspan="5">교수/교직원 기본정보</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td rowspan="7"><img src="'/upload/${emp.memberVO.memImage}" style="width: 100%; height: 100%"></td>`;
				str += `<td>No(ID)</td>`;
				str += `<td colspan="3">${emp.memberVO.memNo}</td>`;
				str += `<tr>`;
				str += `<td>교수/교직원명</td>	`;
				str += `<td colspan="3">${emp.memberVO.memName}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>생년월일</td>`;
				str += `<td>${emp.memberVO.memBirthday}</td>`
				str += `<td style="text-align: center;">성별</td>`;
				str += `<td>${emp.memberVO.memGender}</td>`
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>신규가입일</td>`;
				str += `<td colspan="3">${emp.memberVO.regDate}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>이메일</td>`;
				str += `<td colspan="3">${emp.memberVO.memEmail}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>전화번호</td>`;
				str += `<td colspan="3">${emp.memberVO.memTell}</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td>주소</td>`;
				str += `<td colspan="3">${emp.memberVO.memAddr  + ' ' +  emp.memberVO.memAddrDetail}</td>`;
				str += `</tr>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td colspan="6">교수/교직원 학사정보</td>`;
				str += `</tr>`;
				str += `<tr>`;
				str += `<td style="text-align: center;">단과대학</td>`;
				str += `<td>${emp.colleageVO.collName}</td>`;
				str += `<td style="text-align: right;">전공학과</td>`;
				str += `<td colspan="2" style="text-align: center;">${emp.deptVO.deptName}</td>`;
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





















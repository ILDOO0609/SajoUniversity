
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
					str += `<td colspan="6">조회된 회원이 없습니다.</td>`;
					str += `</tr>`;
			}
			else{
				for(const stu of result){
					str += `<tr>`;
					str += `<td>${stu.memNo}</td>`;
					str += `<td>${stu.colleageVO.collName}</td>`;
					str += `<td>${stu.memberVO.memName}</td>`;
					str += `<td>${stu.deptVO.deptName}</td>`;
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
	swal(name , "선택이(가) 완료되었습니다.", "success");
	
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
						str += `<tr>`;
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







//--------------학사조회-----------------------------------------------

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
	
	
	if($("input[name='checkPosition']:checked").val() == '교수'){
		$('.form-select').show();
	}
	else if($("input[name='checkPosition']:checked").val() == '교직원'){
		$('.form-select').hide();
	}
	
	var name = $("input[name='checkPosition']:checked").val();
	swal(name , "선택이(가) 완료되었습니다.", "success");
				
});
//교수/교직원 조회 -> 검색
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
				const tdTag = document.querySelector('#proTable > tbody');
				tdTag.replaceChildren();	
				
				let str = '';
				
				if(result.length == 0){
					str += `<tr>`
					str += `<td colspan="5">조회된 회원이 없습니다.</td>`
					str += `</tr>`
				}
				else{
					for(const pro of result){
						str += `<tr>`;
						str += `<td>${pro.empVO.memNo}</td>`;
						str += `<td>${pro.empVO.empType}</td>`;
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





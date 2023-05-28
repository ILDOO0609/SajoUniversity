
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
			const tbodyTag = document.querySelector('#tbodyTag');
			tbodyTag.replaceChildren();
			let str = '';
			
			for(let i = 0; i < result.length; i++){
				str += `<tr>`;
				str += `<td>${result[i].schInfoNum}</td>`;
				str += `<td>`;
				str += `<a href="/school/schoolBoardDetail?schInfoCode='${result[i].schInfoCode}'">${result[i].schInfoTitle}</a>`;
				str += `</td>`;
				str += `<td>${result[i].schInfoDate}</td>`;
				str += `<td>${result[i].schInfoStartDate} ~ ${result[i].schInfoEndDate}</td>`;
				str += `</tr>`;
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
	alert(name + '이(가) 선택되었습니다.');
				
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
				
				str += `<div class="row text-center">`;
				for(const pro of result){
					str += `<div class="col-2">${pro.empVO.memNO}</div>`; 
					str += `<div class="col-2">${pro.empVO.empType}</div>`; 
					str += `<div class="col-2">${pro.memverVO.memName}</div>`; 
					str += `<div class="col-2">${pro.colleageVo.collName}</div>`; 
					str += `<div class="col-2">${pro.deptVO.deptName}</div>`; 
				}
				
				tdTag.insertAdjacentHTML('afterbegin', str);
			},
			
			error: function() {
				alert('실패');
			}
		});
	//ajax end
}





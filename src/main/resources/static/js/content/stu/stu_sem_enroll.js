// 단과대학 셀렉트박스 변경 시 실행
function changeColl(coll){
	const coll_no = coll.value;
	
		//ajax start
		$.ajax({
			url: '/stu/changeCollAjax', //요청경로
			type: 'post',
			async: true,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'collNo':coll_no}, //필요한 데이터
			success: function(result) {
				drawDeptSelectbox(result);
			},
			error: function() {
				alert('실패');
			}
		});
	//ajax end
}

// 단과대학 변경 시 소속학과 변경
function drawDeptSelectbox(deptList){
	const dept_div = document.querySelector('#deptDiv');
	
	dept_div.replaceChildren();
		
	let str = '';
	
	str += `<select class="form-select text-center" name="deptNo">`;
	for(const dept of deptList){
		str += `<option id="deptNo" value="${dept.deptNo}">${dept.deptName}</option>`;
	}
	str += `</select>`;
	
	dept_div.insertAdjacentHTML('afterbegin',str);
}

// 수강신청 검색
function searchLecture(){
	const searchValue = document.querySelector('#searchValue').value; 
	const collNo = document.querySelector('select[name="collNo"]').value;
	const deptNo = document.querySelector('select[name="deptNo"]').value;
	
	//ajax start
		$.ajax({
			url: '/stu/searchEnrollAjax', //요청경로
			type: 'post',
			async: true,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'searchValue':searchValue, 'collNo' : collNo, 'deptNo' : deptNo}, //필요한 데이터
			success: function(result) {
				const searchDiv = document.querySelector('.searchDiv');
				searchDiv.replaceChildren();
				console.log(result);
				let str = '';
				
					str += `<table class="table text-center">`;
					str += `<colgroup>`;
					str += `<col width="5%">`;
					str += `<col width="10%">`;
					str += `<col width="5%">`;
					str += `<col width="10%">`;
					str += `<col width="10%">`;
					str += `<col width="10%">`;
					str += `<col width="15%">`;
					str += `<col width="10%">`;
					str += `<col width="10%">`;
					str += `<col width="*">`;
					str += `</colgroup>`;
					for(let i = 0; i < result.length; i++){
						str += `<tr class="align-middle">`;
						str += `<td>${i+1}</td>`;
						str += `<td>${result[i].lecName}</td>`;
						str += `<td>${result[i].lecScore}</td>`;
						str += `<td>${result[i].colleageVO.collName}</td>`;
						str += `<td>${result[i].deptVO.deptName}</td>`;
						str += `<td>${result[i].memberVO.memName}</td>`;
						str += `<td>${result[i].lectureTimeList[0].lecDay}/${result[i].lectureTimeList[0].firstTime}~${result[i].lectureTimeList[0].lastTime}</td>`;
						str += `<td>${result[i].nowNum}</td>`;
						str += `<td>${result[i].maxNum}</td>`;
						str += `<td><input type="button" class="btn btn-primary" value="수강신청"></td>`;
						str += `</tr>`;
					}
					str += `</table>`;
					searchDiv.insertAdjacentHTML('afterbegin', str);
				
				
			},
			error: function() {
				alert('실패');
			}
		});
	//ajax end
	
}
//강의 폐강버튼 클릭시 실행
function regClose(lecNo){
	
	//체크되있는 강의상태 들고오기
	const result = confirm('강의를 폐강하시겠습니까?');
	if(!result){
		return ;
	}	
	//ajax start
	$.ajax({
		url: '/emp/regCloseAjax', //요청경로
		type: 'post',
		async: true,
		//contentType : 'application/json; charset=UTF-8',
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'lecNo':lecNo}, //필요한 데이터
		success: function(result) {
			if(result){
				alert('폐강 되었습니다');
				drawLectureListTable();
				document.querySelector('#all').checked=true;
			}
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end
}


//강의 폐강완료시 강의목록테이블 다시그리기
function drawLectureListTable(){
		//ajax start
		$.ajax({
			url: '/emp/getLectureListAjax', //요청경로
			type: 'post',
			async: true,
			//contentType : 'application/json; charset=UTF-8',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {}, //필요한 데이터
			success: function(result) {
				console.log(result);
				//ajax end
				const tbodyTag = document.querySelector('#tbodyTag');
				tbodyTag.replaceChildren();
				
				let str = '';
				
				if(result.size == 0){
					str += `<tr>`;
					str += `	<td colspan="11">등록된 강의가 없습니다.</td>`;
					str += `</tr>`;
				}
				else{
					for(const lec of result){
						str += `<tr>`;
						str += `	<td>${lec.lecNo}</td>`;
						str += `	<td>${lec.lecName}</td>`;
						str += `	<td>${lec.lecScore}</td>`;
						str += `	<td>${lec.colleageVO.collName}</td>`;
						str += `	<td>${lec.deptVO.deptName}</td>`;
						str += `	<td>${lec.memberVO.memName}</td>`;
						str += `	<td>${lec.maxNum}</td>`;
						str += `	<td>${lec.nowNum}</td>`;
						str += `	<td>`;
						for(const lectureTime of lec.lectureTimeList){
							if(lectureTime.firstTime == lectureTime.lastTime){
								str += `${lectureTime.lecDay+'/'+lectureTime.firstTime+'교시'}`;
							}
							else{
								str += `${lectureTime.lecDay+'/'+lectureTime.firstTime+'~'+lectureTime.lastTime+'교시'}`;
							}
						}
						str += `	</td>`;
						str += `	<td>${lec.lecStatus}</td>`;
						str += `	<td> <input data-bs-toggle="modal" data-bs-target="#updateModal" type="submit" value="수정" onclick="updateLec(this);" class="btn btn-primary"> </td>`;
						str += `	<td>`;
						if(lec.lecStatus == '폐강'){
							str += `	<input type="button" value="폐강" onclick="regClose('${lec.lecNo}');" disabled>`;
						}
						else{
							str += `	<input type="button" value="폐강" onclick="regClose('${lec.lecNo}');">`;
						}
						str += `	</td>`;
						str += `</tr>`;
					}
				}
				
				tbodyTag.insertAdjacentHTML('afterbegin', str);
			},
			error: function() {
				alert('실패');
			}
		});
}

//강의검색
function searchLecture(){
	const lec_status = document.querySelector('.lecStatus:checked').value;
	const search_value = document.querySelector('#searchInput').value;
	//ajax start
	$.ajax({
		url: '/emp/searchLectureAjax', //요청경로
		type: 'post',
		async: true,
		//contentType : 'application/json; charset=UTF-8',
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'lecStatus':lec_status, 'searchValue':search_value}, //필요한 데이터
		success: function(result) {
			const tbodyTag = document.querySelector('#tbodyTag');
				tbodyTag.replaceChildren();
				
				let str = '';
				
				if(result.size == 0){
					str += `<tr>`;
					str += `	<td colspan="11">등록된 강의가 없습니다.</td>`;
					str += `</tr>`;
				}
				else{
					for(const lec of result){
						str += `<tr>`;
						str += `	<td>${lec.lecNo}</td>`;
						str += `	<td>${lec.lecName}</td>`;
						str += `	<td>${lec.lecScore}</td>`;
						str += `	<td>${lec.colleageVO.collName}</td>`;
						str += `	<td>${lec.deptVO.deptName}</td>`;
						str += `	<td>${lec.memberVO.memName}</td>`;
						str += `	<td>${lec.maxNum}</td>`;
						str += `	<td>${lec.nowNum}</td>`;
						str += `	<td>`;
						for(const lectureTime of lec.lectureTimeList){
							if(lectureTime.firstTime == lectureTime.lastTime){
								str += `${lectureTime.lecDay+'/'+lectureTime.firstTime+'교시'}`;
							}
							else{
								str += `${lectureTime.lecDay+'/'+lectureTime.firstTime+'~'+lectureTime.lastTime+'교시'}`;
							}
						}
						str += `	</td>`;
						str += `	<td>${lec.lecStatus}</td>`;
						str += `	<td> <input data-bs-toggle="modal" data-bs-target="#updateModal" type="submit" value="수정" onclick="updateLec(this);" class="btn btn-primary"> </td>`;
						str += `	<td>`;
						if(lec.lecStatus == '폐강'){
							str += `	<input type="button" value="폐강" onclick="regClose('${lec.lecNo}', this);" disabled>`;
						}
						else{
							str += `	<input type="button" value="폐강" onclick="regClose('${lec.lecNo}', this);">`;
						}
						str += `	</td>`;
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

//강의 수정
//edit the lecture
function updateLec(updateBtn){
	
    const lec_name = updateBtn.closest('tr').querySelector('#lecName').innerText;
    const lec_no = updateBtn.closest('tr').querySelector('#lecNo').innerText;
    document.querySelector('#modalLecName').value = lec_name;
    
    //ajax start
	$.ajax({
		url: '/emp/getLectureListForUpdateAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/json; charset=UTF-8',
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'lecNo':lec_no}, //필요한 데이터
		success: function(result) {
			console.log(result);
			const modal_body = document.querySelector('#modal body');
			modal_body.replaceChildren();
			let str = '';
			
	        str += `		<form id="loginForm" method="post">`;
			str += `			강의 수정`;
			str += `			<table border="1" class="table text-center modalTable">`;
			str += `			<colgroup>`;
			str += `				<col width="25%">`;
			str += `				<col width="25%">`;
			str += `				<col width="25%">`;
			str += `				<col width="25%">`;
			str += `			</colgroup>`;
			str += `				<tr>`;
			str += `					<td>교과목명</td>`;
			str += `					<td colspan="3">`;
			str += `						<input type="text" name="lecName" id="modalLecName" value="${result[0].lecName}">`;
			str += `					</td>`;
			str += `				</tr>`;
			str += `				<tr>`;
			str += `					<td>단대명</td>`;
			str += `					<td>`;
			str += `						${result[0].colleageVO.collName}`;
			str += `					</td>`;
			str += `					<td>학과명</td>`;
			str += `					<td>`;
			str += `						${result[0].deptVO.deptName}`;
			str += `					</td>`;
			str += `				</tr>`;
			str += `				<tr>`;
			str += `					<td>강의 학점</td>`;
			str += `					<td>`;
			str += `						<select name="lecScore">`;
			for(let i = 1; i < 6; i++){
			str += `							<option value=${i}>${i}</option>`;
			}
			str += `						</select>`;
			str += `					</td>`;
			str += `					<td>교수</td>`;
			str += `					<td>`;
			str += `						${result[0].memberVO.memName}`;
			str += `					</td>`;
			str += `				</tr>`;
			for(const lectureTime of result){
			str += `				<tr>`;
			str += `					<td>강의 시간</td>`;
			str += `					<td>`;
			str += `						<select name="firstTime">`;
			for(let i= 1; i<9; i++){
			str += `							<option value=${i}>${i+'교시'}</option>`;
			}
			str += `						</select>`;
			str += `					</td>`;
			str += `					<td>`;
			str += `						<select name="lastTime">`;
			for(let i= 1; i<9; i++){
			str += `							<option value=${i}>${i+'교시'}</option>`;
			}
			str += `						</select>`;
			str += `					</td>`;
			str += `					<td>`;
			str += `						<select name="lecDay">`;
			str += `							<option value="월">월</option>`;
			str += `							<option value="화">화</option>`;
			str += `							<option value="수">수</option>`;
			str += `							<option value="목">목</option>`;
			str += `							<option value="금">금</option>`;
			str += `						</select>`;
			str += `					</td>`;
			str += `				</tr>`;
			}
			str += `			</table>`;
			str += `		</form>`;
			
			modal_body.insertAdjacentHTML('afterbegin', str);
			
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end
};

 
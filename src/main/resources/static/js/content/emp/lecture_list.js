//강의 폐강버튼 클릭시 실행
function regClose(lecNo){
	
	Swal.fire({
		title: '강의를 폐강하시겠습니까?',
		text: '',
		icon: 'question',
   
		showCancelButton: true, 
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: '확인',
		cancelButtonText: '취소',
   
		reverseButtons: false,
   
		}).then(result => {
			if (result.isConfirmed) {
				// Ajax request
				$.ajax({
					url: '/emp/regCloseAjax', //요청경로
					type: 'post',
					async: true,
					contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
					data: {'lecNo':lecNo}, //필요한 데이터
					success: function(result) {
						if(result){
							Swal.fire({
							  icon: 'success',
							  title: '폐강완료',
							  text: '폐강 되었습니다.!',
							});
							drawLectureListTable();
							document.querySelector('#all').checked=true;
						}
					},
					error: function() {
						alert('실패');
					}
				});
			}
		});	
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
					str += `	<td colspan="12">등록된 강의가 없습니다.</td>`;
					str += `</tr>`;
				}
				else{
					for(const lec of result){
						str += `<tr>`;
						str += `	<td id="lecNo">${lec.lecNo}</td>`;
						str += `	<td id ="lecName"><a href="/pdfFile/${lec.lecturePDFVO.attachedPdfName}">${lec.lecName}</a></td>`;
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
						if(lec.lecStatus == '폐강'){
						str += `	<td> <input data-bs-toggle="modal" data-bs-target="#updateModal" type="submit" value="수정" onclick="updateLec(this);" class="btn btn-primary" disabled> </td>`;
						}
						else{
						str += `	<td> <input data-bs-toggle="modal" data-bs-target="#updateModal" type="submit" value="수정" onclick="updateLec(this);" class="btn btn-primary"> </td>`;
						}
						str += `	<td>`;
						if(lec.lecStatus == '폐강'){
							str += `	<input type="button" value="폐강" class="btn btn-danger" onclick="regClose('${lec.lecNo}');" disabled>`;
						}
						else{
							str += `	<input type="button" value="폐강" class="btn btn-danger" onclick="regClose('${lec.lecNo}');">`;
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
			console.log(result);
			const tbodyTag = document.querySelector('#tbodyTag');
				tbodyTag.replaceChildren();
				
				let str = '';
				
				if(result.length == 0){
					str += `<tr>`;
					str += `	<td colspan="12">조회된 강의가 없습니다.</td>`;
					str += `</tr>`;
				}
				else{
					for(const lec of result){
						str += `<tr>`;
						str += `	<td id="lecNo">${lec.lecNo}</td>`;
						str += `	<td id ="lecName"><a href="/pdfFile/${lec.lecturePDFVO.attachedPdfName}">${lec.lecName}</a></td>`;
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
						if(lec.lecStatus == '폐강'){
						str += `	<td> <input data-bs-toggle="modal" data-bs-target="#updateModal" type="submit" value="수정" onclick="getLectureListForUpdateAjax(this);" class="btn btn-primary" disabled> </td>`;
						}
						else{
						str += `	<td> <input data-bs-toggle="modal" data-bs-target="#updateModal" type="submit" value="수정" onclick="getLectureListForUpdateAjax(this);" class="btn btn-primary"> </td>`;
						}
						str += `	<td>`;
						if(lec.lecStatus == '폐강'){
							str += `	<input type="button" value="폐강" class="btn btn-danger" onclick="regClose('${lec.lecNo}', this);" disabled>`;
						}
						else{
							str += `	<input type="button" value="폐강" class="btn btn-danger" onclick="regClose('${lec.lecNo}', this);">`;
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

//강의 수정위한 조회
function getLectureListForUpdateAjax(updateBtn){
	
    const lec_no = updateBtn.closest('tr').querySelector('#lecNo').innerText;
    //ajax start
	$.ajax({
		url: '/emp/getLectureListForUpdateAjax', //요청경로
		type: 'post',
		async: true,
		//contentType : 'application/json; charset=UTF-8',
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'lecNo':lec_no}, //필요한 데이터
		success: function(result) {
			console.log(result[0].lectureTimeList);
			
			const modal_body = document.querySelector('#modal-body');
			
			const days = {1: '월', 2: '화', 3: '수', 4: '목', 5: '금'};
			
			modal_body.replaceChildren();
			
			let str = '';
			
	        str += `		<form id="updateForm" action="/emp/lecUpdate" method="post">`;
			str += `		<input type="hidden" value="${result[0].lecNo}" name="lecNo">`;
			str += `			강의 수정`;
			str += `			<table border="1" class="table text-center align-middle modalTable dayContainer">`;
			str += `			<colgroup>`;
			str += `				<col width="25%">`;
			str += `				<col width="25%">`;
			str += `				<col width="25%">`;
			str += `				<col width="25%">`;
			str += `			</colgroup>`;
			str += `				<tr>`;
			str += `					<td>교과목명</td>`;
			str += `					<td colspan="3">`;
			str += `						<input type="text" class="form-control-sm" name="lecName" id="modalLecName" value="${result[0].lecName}">`;
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
			str += `						<select class="form-select-sm" name="lecScore">`;
			for(let i = 1; i < 6; i++){
			    if(i == result[0].lecScore){
	        		str += `<option value=${i} selected>${i}</option>`;
			    }
			    else{
	       			 str += `<option value=${i}>${i}</option>`;
			    }
			}
			str += `						</select>`;
			str += `					</td>`;
			str += `					<td>교수</td>`;
			str += `					<td>`;
			str += `						${result[0].memberVO.memName}`;
			str += `					</td>`;
			str += `				</tr>`;
			for(const lectureTime of result[0].lectureTimeList){
				str += `				<tr>`;
				str += `					<td>
												강의 시간
												<input type="hidden" value="${lectureTime.lecNo}" id="lecNo">
												<input type="hidden" value="${lectureTime.timeNo}" name="timeNo">
											</td>`;
				str += `					<td colspan="3">`;
				str += `						<select class="form-select-sm" name="firstTime" onchange="setLastTime(this);">`;
				for(let i= 1; i<9; i++){
					if(i == lectureTime.firstTime){
		        		 str += `					<option value=${i} selected>${i}</option>`;
				    }
				    else{
		       			 str += `					<option value=${i}>${i}</option>`;
				    }
				}
				str += `						</select>`;
				str += `						교시~`;
				str += `						<select class="form-select-sm" name="lastTime">`;
				for(let i= 1; i<9; i++){
					if(i == lectureTime.lastTime){
		        		 str += `					<option value=${i} selected>${i}</option>`;
				    }
				    else{
		       			 str += `					<option value=${i}>${i}</option>`;
				    }
				}
				str += `						</select>`;
				str += `						교시`;
				str += `						<select class="form-select-sm" name="lecDay">`;
				for(let i = 1; i < 6; i++){
					if(days[i] == lectureTime.lecDay){
				str += `							<option value="${days[i]}" selected>${days[i]}</option>`;
					}
					else{							
				str += `							<option value="${days[i]}">${days[i]}</option>`;
					}
				}
				str += `						</select>`;
				str += `					</td>`;
				str += `				</tr>`;
			}
			str += `			</table>`;
			str += `		<input type = "button" value = "시간체크" class="btn btn-success" onclick="timeDuplicationCheckAjax();">`;
			str += `		<input type = "button" value = "수정" class="btn btn-primary regBtn" onclick="lecUpdate();" disabled>`;
			str += `		</form>`;
			
			modal_body.insertAdjacentHTML('afterbegin', str);
			
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end
};

function lecUpdate(){
	Swal.fire({
        icon: 'success',
        title: '수정완료',
        text: '수정 되었습니다.!',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('#updateForm').submit();
        }
    })
}
 
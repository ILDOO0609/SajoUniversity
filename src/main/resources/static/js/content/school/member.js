//--------------회원메뉴--------------------------------------------------------------
function updatePosition(memNo) {
	
	const deptNo = document.querySelector('#deptNo').value;
	const collNo = document.querySelector('#collNo').value;
	const memRole = document.querySelector('#memRole').value;
	
	console.log(memRole);
	
	//ajax start
	$.ajax({
   		url: '/school/updatePositionAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {'memNo':memNo,'deptNo':deptNo, 'collNo':collNo, 'memRole':memRole}, //필요한 데이터
	   	success: function(result) {
			swal("승인완료" , "정상 처리되었습니다.", "success", {button: "확인"})
			.then((result) => {
				location.href = `/school/memberList`;
			})
			
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


//회원메뉴 -> 승인/취소조회 -> 승인완료 조회
function approveO(){
	
	
	//ajax start
	$.ajax({
		url: '/school/approveOAjax', //요청경로
		type: 'post',
		async: true,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'data': data}, //필요한 데이터
		success: function(result) {

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
	
	
}
//회원메뉴 -> 승인/취소조회 -> 승인취소 조회
function approveX(){
	
}

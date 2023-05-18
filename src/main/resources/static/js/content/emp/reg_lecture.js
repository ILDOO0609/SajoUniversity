//전공대학 변경시 실행되는 함수
function changeColl(coll){
	const coll_no = coll.value;
	
		//ajax start
		$.ajax({
			url: '/emp/changeCollAjax', //요청경로
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

//강의마치는시간 자동 설정
function setLastTime(timeTag){
	document.querySelector('#lastTime').value = parseInt(timeTag.value)+1+':00';
}
 
//강의시간 중복체크
function timeDuplicationCheckAjax(){
	const lec_day = document.querySelector('select[name="lecDay"]').value;
	const first_time = document.querySelector('select[name="firstTime"]').value;
	
		//ajax start
	   $.ajax({
	      url: '/emp/timeDuplicationCheckAjax', //요청경로
	      type: 'post',
	      async: true,
	      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	      data: {'lecDay':lec_day, 'firstTime':first_time}, //필요한 데이터
	      success: function(result) {
	         if(result){
				Swal.fire({
				  icon: 'error',
				  title: '등록불가',
				  text: '해당 시간이 이미 등록되어있습니다.!',
				});
			 }
			 else{
				document.querySelector('input[type="submit"]').removeAttribute('disabled');
				Swal.fire({
				  icon: 'success',
				  title: '시간 체크',
				  text: '등록 가능한 시간입니다.',
				});
				
			}
	      },
	      error: function() {
	         alert('실패');
	      }
	   });
	//ajax end
}





//학사인포 년도 셀렉트 변경시 실행
function schInfoYear(){
	const year = document.querySelector('#schInfoYear').value;
	location.href = `/school/info?year=${year}`;
}
//학사안내 월 셀렉트 변경시 실행




//검색버튼 클릭시 실행
function infoSearchList(){
	const searchForm = document.querySelector('#schInfoSearchForm');
	const schInfoSearchKeword = document.querySelector('#schInfoSearchKeword').value;
	
	if(schInfoSearchKeword == ''){
		alert('검색할 제목을 입력하세요.');
		return;
	}
	
	searchForm.submit();
}

//학사안내 글등록
function regSchInfo(){
	const schInfoTitle_tag = document.querySelector('#schInfoTitle').value;
	if(schInfoTitle_tag == ''){
		alert('글 제목은 필수 입력입니다.');
		return;
	}
	alert('정상적으로 등록 되었습니다.');
	document.querySelector('#regSchInfoForm').submit();
}
//학사안내 글삭제
function deleteInfo(schInfoCode){
	alert('해당글이 삭제 되었습니다.');
	location.href = `/school/deleteSchoolInfo?schInfoCode=${schInfoCode}`;
	
}
//학사안내 글수정
function schInfoUpdate(){
	confirm('해당글을 수정할까요?');
	document.querySelector('#schInfoUpdateForm').submit();
}





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


//학사일정 스케쥴 --------------------------------------------------------------

//윤년계산
function checkLeapYear(year){
	if(year % 400 == 0){
		return true;
	}else if(year % 100 == 0){
		return false;
	}else if(year % 4 == 0){
		return true;
	}else{
		return false;
	}
}

//각월에 1일 무슨요일인지 함수
function getFirstDayOfWeek(year, month){
	if(month < 10) month = "0" + month
	
	return (new Date(year + "-" + month + "-1")).getDay();
}

//셀렉트박스 변경됐을때 실행되는 함수
function changeYearMonth(year, month){
	let month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	if(month == 2){
		if(checkLeapYear(year)) month_day[1] = 29;
	}
	
	let first_day_of_week = getFirstDayOfWeek(year, month);
	let arr_calendar = [];
	for(let i = 0 ; i < first_day_of_week ; i++){
		arr_calendar.push("");
		
	}
	
	for(let i = 1 ; i <=month_day[month-1] ; i++){
		arr_calendar.push(String(i));
	}

	let remain_day = 7 - (arr_calendar.length % 7);
	if(remain_day < 7){
		for(let i = 0 ; i < remain_day ; i++){
			arr_calendar.push("");
		}
	}
	renderCalendar(arr_calendar);
		
}
function renderCalendar(data){
	let h = [];
	
	for(let i = 0 ; i < data.length ; i++){
		if(i == 0){
			h.push('<tr>');
		}else if(i % 7 == 0){
			h.push('</tr>')
			h.push('<tr>')
		}
		h.push('<td onclick="setDate('+ data[i] + ');" style="cursor:pointer;">' + data[i] + '</td>');
	}
	h.push('</tr>');
		
	$("#tb_body").html(h.join(""));
}

function setDate(day){
	if(day < 10) day = "0" + day;
	$("#input_date").val(current_year + "-" + current_month + "-" + day);
	//$("#div_calendar").hide();
}

//좌우 버튼클릭시 월이 변경되는 함수
function changeMonth(diff) {
	if(diff == undefined){
		current_month = parseInt($("#month").val());
	}else{
		current_month = current_month + diff;
		
		if(current_month == 0) {
			current_year = current_year - 1;
			current_month = 12;
		}else if(current_month == 13){
			current_year = current_year + 1;
			current_month = 1;
		}
	}
	
	loadCalendar();

}

function loadCalendar(){
	$("#year").val(current_year);
	$("#month").val(current_month);
	changeYearMonth(current_year, current_month);
}


let current_year = (new Date()).getFullYear();
let current_month = (new Date()).getMonth();

$("#year").val(current_year);
$("#month").val(current_month);

changeYearMonth(current_year, current_month);	


//$("#input_date").click(function(){
//	$("#div_calendar").toggle();
//})	

	
	

//--------------회원메뉴--------------------------------------------------------------
function position(memNo, memRole) {
	memNo_tag = document.querySelector('#memNo').value;
	memRole_tag = document.querySelector('#memRole').value;
	
	if(memNo == null){
		if(memRole = stu){
			
		}
	}
	
	
	//ajax start
	$.ajax({
   		url: '/test2/test2', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   	data: {}, //필요한 데이터
	   	success: function(result) {
	      alert('ajax 통신 성공');
	      alert(result);
	   	},
	   	error: function() {
	      alert('실패');
		}
	});
	//ajax end

	
}
	











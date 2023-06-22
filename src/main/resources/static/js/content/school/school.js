//학사인포 년도 셀렉트 변경시 실행
function schInfoYear(){
	const year = document.querySelector('#schInfoYear').value;
	location.href = `/school/info?year=${year}`;
}
//학사안내 월 셀렉트 변경시 실행
function infoSelectMonth(){
	const schInfoMonth = document.querySelector('#schInfoMonth').value;
	
	//ajax start
	$.ajax({
	   url: '/school/schInfoMonthAjax', //요청경로
	   type: 'post',
	   data: {'schInfoMonth':schInfoMonth}, //필요한 데이터
	   success: function(result) {
			console.log(result)
			const tbodyTag = document.querySelector('#tbodyTag');
			tbodyTag.replaceChildren();
			let str = '';
			
			if(result.length == 0){
				str += `<tr>`;
				str += `<td colspan="5">조회된 안내글이 없습니다.</td>`;
				str += `</tr>`;
				
			}
			else{
				for(let i = 0; i < result.length; i++){
					str += `<tr>`;
					str += `<td>${result[i].schInfoNum}</td>`;
					str += `<td>`;
					str += `<a href="/school/schoolBoardDetail?schInfoCode='${result[i].schInfoCode}'">${result[i].schInfoTitle}</a>`;
					str += `</td>`;
					str += `<td>${result[i].schInfoDate}</td>`;
					str += `<td>${result[i].schInfoStartDate} ~ ${result[i].schInfoEndDate}</td>`;
					str += `<td>${result[i].schInfoReadCnt}</td>`;
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



//검색버튼 클릭시 실행
function infoSearchList(){
	const searchValue = document.querySelector('#searchInfoInput').value;
	
	if(searchValue == ''){
		Swal.fire('검색 실패', '검색할 제목을 입력하세요.', 'error')
		.then(() => {
		        
		})
		return;
	}
	
	document.querySelector('#schInfoSearchForm').submit();
	
}
//페이징
function schInfoPaging(pageNum){
	document.querySelector('#nowPageForInfo').value=pageNum;
	document.querySelector('#schInfoSearchForm').submit();
}


//학사안내 글등록
function regSchInfo(){
	const schInfoTitle_tag = document.querySelector('#schInfoTitle').value;
	if(schInfoTitle_tag == ''){
		
		Swal.fire('등록 실패', '제목은 필수 입력입니다.', 'error').then(() => {
      	});
		
		return;
	}
	
	Swal.fire('등록 완료', '글 등록이 완료되었습니다.', 'success').then(() => {
    	document.querySelector('#regSchInfoForm').submit();
    });
}
//학사안내 글삭제
function deleteInfo(schInfoCode){
	
	Swal.fire('삭제 완료', '글 삭제가 완료되었습니다.', 'error').then(() => {
     
    	location.href = `/school/deleteSchoolInfo?schInfoCode=${schInfoCode}`; 
    });
	

}
//학사안내 글수정
function schInfoUpdate(){
	
	Swal.fire('수정 완료', '글 수정이 완료되었습니다.', 'info').then(() => {
    	document.querySelector('#schInfoUpdateForm').submit();
    });
	
}

//파일 다운로드
function download(schFileCode){
	const schOriginFileName = document.querySelector('#schOriginFileName').value;
	const schAttachedFileName = document.querySelector('#schAttachedFileName').value;
	
	console.log(schFileCode);
	console.log(schOriginFileName);
	console.log(schAttachedFileName);
	
	str = '';
	str += `<form action="/school/getFileDownload" method="post" id="download_form">`;
	str += `<input type="hidden" name="schFileCode" value="${schFileCode}">`;
	str += `</form>`;
	
	document.querySelector('#download_div').replaceChildren();
	document.querySelector('#download_div').insertAdjacentHTML('afterbegin', str);
	document.querySelector('#download_form').submit();
	
}

//글 상세보기, 이전글
function prev(schInfoCode){
	var number = parseInt(schInfoCode.substr(9), 10); // 문자열에서 숫자 부분 추출
	var incrementedNumber = number - 1; // 숫자 증가
	var replacedStr = schInfoCode.replace(number, incrementedNumber); // 문자열에서 숫자 대체
	console.log(replacedStr);	

	location.href='/school/schoolBoardDetail?schInfoCode=' + replacedStr;
}

//글 상세보기, 다음글
function next(schInfoCode){
	var number = parseInt(schInfoCode.substr(9), 10); // 문자열에서 숫자 부분 추출
	var incrementedNumber = number + 1; // 숫자 증가
	var replacedStr = schInfoCode.replace(number, incrementedNumber); // 문자열에서 숫자 대체
	console.log(replacedStr);	

	location.href='/school/schoolBoardDetail?schInfoCode=' + replacedStr;
}

















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


	











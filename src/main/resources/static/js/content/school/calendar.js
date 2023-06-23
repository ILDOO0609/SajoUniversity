
document.addEventListener('DOMContentLoaded', function() {
	const titleForCal = document.querySelectorAll('.drawTitle');
	const startDateForCal = document.querySelectorAll('.drawStartDate');
	const endDateForCal = document.querySelectorAll('.drawEndDate');
	
	var calendarEl = document.getElementById('calendar');

	var calendar = new FullCalendar.Calendar(calendarEl, {
    // 해더에 표시할 툴바
    	headerToolbar: {
			left: 'prev,next today',
      		center: 'title',
      		right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    	},
    	buttonText: {
    		today : '오늘',
    		month : '월',
    		week : '주',
    		day : '일',
    		list : '주간일정표'
    	},
	    initialView: 'dayGridMonth', // 초기 로드 될때 보이는 캘린더 화면(기본 설정: 달)
	    //initialDate: '2023-06-05', // 초기 날짜 설정 (설정하지 않으면 오늘 날짜가 보인다.)
	    navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
	    editable: true, // 수정 가능?
	    selectable: true, // 달력 일자 드래그 설정가능
	    nowIndicator: true, // 현재 시간 마크
	    dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
	    locale: 'ko', // 한국어 설정
	    eventAdd: function(obj) { // 이벤트가 추가되면 발생하는 이벤트
	      console.log(obj);
	    },
		    

		events: (() => {
      const events = [];

      for (let i = 0; i < titleForCal.length; i++) {
        events.push({
          title: titleForCal[i].innerText,
          start: startDateForCal[i].innerText,
          end: endDateForCal[i].innerText,
        });
      }

      return events;
    })(),
  });


	calendar.render();
});


//일정추가 확인 버튼 클릭시
function addSchedule(){
	const title = document.querySelector('#title').value;
	const calContent = document.querySelector('#calContent').value;
	const startDate = document.querySelector('#startDate').value;
	const endDate = document.querySelector('#endDate').value;
	
	if(title == ''){
		Swal.fire('일정 제목', '일정 제목은 필수 입력입니다.', 'info').then(() => {
    });
		return;
	}else if(calContent == ''){
		Swal.fire('일정 내용', '일정 내용은 필수 입력입니다.', 'info').then(() => {
    });
		return;
	}else if(startDate == ''){
		Swal.fire('시작 일정', '시작 일정은 필수 입력입니다.', 'info').then(() => {
    });
		return;
			
	}else if(endDate == ''){
		Swal.fire('종료 일정', '종료 일정은 필수 입력입니다.', 'info').then(() => {
    });
		return;
	}else if(new Date(endDate) - new Date(startDate) < 0){
		Swal.fire('일정 오류', '종료일정이 시작일정보다 앞섭니다.', 'info').then(() => {
    });
		return;
	}
	Swal.fire('일정 추가', '일정 등록이 완료되었습니다.', 'success').then(() => {
    	document.querySelector('#calendarForm').submit();
    });
	
	
}


// 일정 수정을 위한 조회
function openUpdateModal(btn, value){
	const calNo = value;
	console.log(calNo);

	//ajax start
	$.ajax({
		url: '/school/forUpdateCalAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: { 'calNo': calNo }, //필요한 데이터
		success: function(result) {
			console.log(result);
			var titleInput = document.querySelector('#updateTitle');
			var contentInput = document.querySelector('#updateContent');
			var startDateInput = document.querySelector('#updateStartDate');
			var endDateInput = document.querySelector('#updateEndDate');
			var calNoInput = document.querySelector('#updateCalNo');
			
			titleInput.value = result.title;
			contentInput.value = result.calContent;
			startDateInput.value = result.startDate;
			endDateInput.value = result.endDate;
			calNoInput.value = result.calNo;
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


// 일정 수정
function updateCal(){
	Swal.fire({
		title: '일정을 수정 하시겠습니까?',
		text: '',
		icon: 'question',
   
		showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
		confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
		cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
		confirmButtonText: '확인', // confirm 버튼 텍스트 지정
		cancelButtonText: '취소', // cancel 버튼 텍스트 지정
   
		reverseButtons: false, // 버튼 순서 거꾸로
   
		}).then(result => {
   		// 만약 Promise리턴을 받으면,
			if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
				Swal.fire('일정 수정이 완료되었습니다.', '', 'info').then(() => {
		        document.querySelector('#updateCalForm').submit();
		      	});
   			}
   
			else {
				return;
   			}
	});
}

// 일정 삭제
function deleteCal(calNo){
	Swal.fire({
		title: '일정을 삭제 하시겠습니까?',
		text: '',
		icon: 'question',
   
		showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
		confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
		cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
		confirmButtonText: '확인', // confirm 버튼 텍스트 지정
		cancelButtonText: '취소', // cancel 버튼 텍스트 지정
   
		reverseButtons: false, // 버튼 순서 거꾸로
   
		}).then(result => {
   		// 만약 Promise리턴을 받으면,
			if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
				Swal.fire('일정 삭제', '일정이 삭제되었습니다.', 'error').then(() => {
		        document.querySelector('#deleteCal').submit();
		      	});
   			}
   
			else {
				return;
   			}
	});
	
}




























document.addEventListener('DOMContentLoaded', function() {
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
	    initialDate: '2023-05-24', // 초기 날짜 설정 (설정하지 않으면 오늘 날짜가 보인다.)
	    navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
	    editable: true, // 수정 가능?
	    selectable: true, // 달력 일자 드래그 설정가능
	    nowIndicator: true, // 현재 시간 마크
	    dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
	    locale: 'ko', // 한국어 설정
	    eventAdd: function(obj) { // 이벤트가 추가되면 발생하는 이벤트
	      console.log(obj);
	    },
	    customButtons:{
			addEvenButton:{
				text : "일정추가",
				click : function(){
					$("#calendarModal").modal("show");
					$("#addCalendar").on("click",function(){
						var title = $("#calendar_title").val();
						var content = $("#calendar_content").val();
						var start_date = $("#calendar_start_date").val();
						var end_date = $("calendar_end_date").val();
						
						if(title == null || title == ''){
							alert('제목을 입력하세요')
						}else if(content == null || content == ''){
							alert('내용을 입력하세요.')		
						}else if(start_date == '' || end_date == ''){
							alert('날짜를 입력하세요.')
						}else if(new Date(end_date) - new Date(start_date) < 0){
							alert('종료일이 시작일보다 앞섭니다.')
						}else{
							var obj = {
								"title" : title,
								"content" : content,
								"start" : start_date,
								"end" : end_date								
							}
							
							console.log(obj);
							
						}
						
					});
				}
			}
		
		},
	    
	    
    	select: function(arg) { // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
        	var title = prompt('일정추가');
        	if (title) {
          		calendar.addEvent({
            		title: title,
		            start: arg.start,
		            end: arg.end,
		            allDay: arg.allDay
         		 })
        	}
        	calendar.unselect()
      	},
   		// 이벤트 
   		eventClick : function(arg){
   			//있는 일정 클릭시
   			console.log("#등록된 일정 클릭#");
   			console.log(arg.event);
   			
   			if(confirm('해당일정을 삭제 하시겠습니까?')){
   				arg.event.remove()
   			}
   		},
   		
		events: {
			
		}
      
	});

	calendar.render();
});



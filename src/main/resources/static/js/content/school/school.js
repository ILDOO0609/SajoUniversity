//select 박스(년도) 값 변경시 실행
function getYearSelect(){
	const year = document.querySelector('#yearSelect').value;
	location.href = `/school/info?year=${year}`;
}


//검색버튼 클릭시 실행
function infoSearchList(){
	const search_form = document.querySelector('#searchForm');
	const checkd_cnt = search_form.querySelectorAll('.form-select').length;
	
	if(checkd_cnt == 0){
		alert('검색할 주문상태를 선택하세요');
		return;
	}

	search_form.submit();	
	
}
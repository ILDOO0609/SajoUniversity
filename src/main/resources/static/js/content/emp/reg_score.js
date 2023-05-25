//강의검색
function searchLecture(){
	const search_value = document.querySelector('#searchInput').value;
	//ajax start
	$.ajax({
		url: '/emp/searchLectureAjax', //요청경로
		type: 'post',
		async: true,
		//contentType : 'application/json; charset=UTF-8',
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'searchValue':search_value}, //필요한 데이터
		success: function(result) {
			const tbodyTag = document.querySelector('#tbodyTag');
				console.log(result);
				console.log(result.length);
				
				tbodyTag.replaceChildren();
				let str = '';
				
				if(result.size == 0){
					str += `<tr>`;
					str += `	<td colspan="5">등록된 강의가 없습니다.</td>`;
					str += `</tr>`;
				}
				else{
					result.forEach(function(lec, index){
					str+=`<tr>`;
						if(lec.lecStatus=='강의중'){
						str+=`	<td>${result.length-index}</td>`;
						str+=`	<td>${lec.lecName}</td>`;
						str+=`	<td>${lec.lecScore}</td>`;
						str+=`	<td>${lec.colleageVO.collName}</td>`;
						str+=`	<td>${lec.deptVO.deptName}</td>`;
						}
					str+=`</tr>`;
					})
				}
				
				tbodyTag.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}
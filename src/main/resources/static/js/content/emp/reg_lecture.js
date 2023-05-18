//전공대학 변경시 실행되는 함수
function changeColl(coll){
	const collNo = coll.value;
	
		//ajax start
		$.ajax({
			url: '/emp/changeCollAjax', //요청경로
			type: 'post',
			async: true,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'collNo':collNo}, //필요한 데이터
			success: function(result) {
				alert('ajax 통신 성공');
				console.log(result);
				alert(result);
			},
			error: function() {
				alert('실패');
			}
		});
	//ajax end
}


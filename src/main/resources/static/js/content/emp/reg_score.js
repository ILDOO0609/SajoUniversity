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
			const tbodyTagOfLecture = document.querySelector('#tbodyTagOfLecture');
			const tbodyTagOfStu = document.querySelector('#tbodyTagOfStu');
				console.log(result);
				console.log(result.length);
				
				tbodyTagOfLecture.replaceChildren();
				tbodyTagOfStu.replaceChildren();
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
						str+=`	<td><a href="javascript:void(0);" onclick="getStuEnrList('${lec.lecNo}');">${lec.lecName}</a></td>`;
						str+=`	<td>${lec.lecScore}</td>`;
						str+=`	<td>${lec.colleageVO.collName}</td>`;
						str+=`	<td>${lec.deptVO.deptName}</td>`;
						}
					str+=`</tr>`;
					})
				}
				
				tbodyTagOfLecture.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

//성적등록위한 강의수강학생 조회
function getStuEnrList(lecNo){
	//ajax start
	$.ajax({
		url: '/emp/getStuEnrListAjax', //요청경로
		type: 'post',
		async: true,
		//contentType : 'application/json; charset=UTF-8',
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'lecNo':lecNo}, //필요한 데이터
		success: function(result) {
			console.log(result);
			
			const tbodyTagOfStu = document.querySelector('#tbodyTagOfStu');
			tbodyTagOfStu.replaceChildren();
			let str = '';
			
			for(const stu of result['stuList']){
				str +=`<tr>`;
				str +=`  <td>${stu['MEM_NO']}</td>`;
				str +=`  <td>${stu['MEM_NAME']}</td>`;
				if(stu['STU_GRADE_NO']!=''){
				str +=`  <td><span class="regScore">${stu['GRADE']}</span>`;
				}
				else{
				str +=`  <td><span class="regScore">미등록</span>`;
				}
				str +=`		<select name="grade" style="display: none;">`;
				for(const grade of result['gradeList']){
				str +=`			<option value="${grade.grade}" >${grade.grade}</option>`;
				}
				str +=`			<option>미등록</option>`;
				str +=`	    </select>`;
				str +=`   </td>`;
				str +=`   <td>`;
				str +=`	  	<input type="button" value="변경" onclick="openRegScore(this);">`;
				str +=`   </td>`;
				str +=`</tr>`;
			};
			
			tbodyTagOfStu.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

function openRegScore(btn) {
    const tr = btn.closest('tr');

    const spanTag = tr.querySelector('.regScore');
    const selectbox = tr.querySelector('select');
	
	//버튼의 글자가 변경일때
    if (btn.value == '변경') {
        spanTag.style.display = 'none';
        
        selectbox.style.display = 'block';

        btn.value = '확인';
    } 
    
    //버튼의 글자가 확인일때
    else if (btn.value == '확인') {
        spanTag.style.display = 'none';
        
        spanTag.innerText = selectbox.value;
        
        selectbox.style.display = 'none';
        
        spanTag.style.display = 'block';

        btn.value = '변경';
    }
}

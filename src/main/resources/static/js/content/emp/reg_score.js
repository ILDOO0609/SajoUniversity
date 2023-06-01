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
function getStuEnrList(lecNo, semNo){
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
				str +=`  <td><span class="regScore">${stu['GRADE']}</span>`;
				str +=`		<select name="grade" class="gradeSelect" style="display: none;">`;
				for(const grade of result['gradeList']){
					if(stu['GRADE']==grade.grade){
						str +=`	<option value="${grade.grade}" selected>${grade.grade}</option>`;
					}
					else{
						str +=`	<option value="${grade.grade}">${grade.grade}</option>`;
					}
				}
				str +=`	    </select>`;
				str +=`   </td>`;
				str +=`   <td>`;
				if(stu['GRADE']=='미등록'){
					str +=`	  	<input type="button" value="성적등록" class="btn btn-primary" onclick="openRegScore('${lecNo}', '${semNo}', '${stu['STU_NO']}', this);">`;
				}
				else{
					str +=`	  	<input type="button" value="성적변경" class="btn btn-success" onclick="openUpdateScore('${lecNo}', '${semNo}', '${stu['STU_GRADE_NO']}', this);">`;
				}
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

//성적 등록셀렉트박스 열기
function openRegScore(lecNo, semNo, stuNo, regBtn) {
    const tr = regBtn.closest('tr');
    const spanTag = tr.querySelector('.regScore');
    const selectbox = tr.querySelector('select');
	
	//버튼의 글자가 성적등록일때
    if (regBtn.value == '성적등록') {
        spanTag.style.display = 'none';
        
        selectbox.style.display = 'inline-block';

        regBtn.value = '등록';
    } 
    
    //버튼의 글자가 등록일때
    else if (regBtn.value == '등록') {
		
		//성적등록하기
		regScore(lecNo, semNo, stuNo, regBtn);
		
        spanTag.style.display = 'none';
        
        selectbox.style.display = 'none';
        
        spanTag.style.display = 'block';

        regBtn.value = '변경';
    }
}

//성적 변경 셀렉트박스 열기
function openUpdateScore(lecNo, semNo, stuGradeNo, updateBtn){
	const tr = updateBtn.closest('tr');

    const spanTag = tr.querySelector('.regScore');
    const selectbox = tr.querySelector('select');
    
	 if (updateBtn.value == '성적변경') {
        spanTag.style.display = 'none';
        
        selectbox.style.display = 'inline-block';

        updateBtn.value = '변경';
    } 
    
    else if (updateBtn.value == '변경') {
		
		//성적변경하기
		updateScore(lecNo, semNo, stuGradeNo, updateBtn);
		
        spanTag.style.display = 'none';
        
        selectbox.style.display = 'none';
        
        spanTag.style.display = 'block';

        updateBtn.value = '성적변경';
    }
}

//성적등록
function regScore(lecNo, semNo, stuNo, regBtn){
	
	//등록할 성적
	const grade = regBtn.closest('tr').querySelector('.gradeSelect').value;
	
	//ajax start
	   $.ajax({
	      url: '/emp/regScoreAjax', //요청경로
	      type: 'post',
	      async: true,
	      //contentType : 'application/json; charset=UTF-8',
	      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	      data: {'lecNo':lecNo, 'semNo':semNo, 'stuNo':stuNo, 'grade':grade}, //필요한 데이터
	      success: function(result) {
		  	if(result){
				Swal.fire({
				  icon: 'success',
				  title: '등록',
				  text: '성적이 등록되었습니다',
				});
				
				//수강생 목록 테이블 그리기
				getStuEnrList(lecNo, semNo);
		    }
		    else{
				alert('등록에 실패했습니다');
			}
	      },
	      error: function() {
	         alert('실패');
	      }
	   });
	//ajax end
}

//성적변경
function updateScore(lecNo, semNo, stuGradeNo, updateBtn){
	
	//등록할 성적
	const grade = updateBtn.closest('tr').querySelector('.gradeSelect').value;
	
	//ajax start
	   $.ajax({
	      url: '/emp/updateScoreAjax', //요청경로
	      type: 'post',
	      async: true,
	      //contentType : 'application/json; charset=UTF-8',
	      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	      data: {'stuGradeNo':stuGradeNo, 'grade':grade}, //필요한 데이터
	      success: function(result) {
	         if(result){
				Swal.fire({
				  icon: 'success',
				  title: '변경',
				  text: '성적이 변경되었습니다',
				});
				
				//수강생 목록 테이블 그리기
				getStuEnrList(lecNo, semNo);
		    }
		    else{
				alert('변경에 실패했습니다');
			}
	      },
	      error: function() {
	         alert('실패');
	      }
	   });
	//ajax end
}



function categorySearch(cateSelect){
	const cate_no = cateSelect.querySelector('option:checked').value;
	
	//ajax start
   $.ajax({
      url: '/board/cateSearchAjax', //요청경로
      type: 'post',
      async: true,
      contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {'cateNo':cate_no}, //필요한 데이터
      success: function(result) {
	  	  const tbody_tag = document.querySelector('#tbodyTag');
	  	  tbody_tag.replaceChildren();
	  	  
	  	  let str = '';
	  	  
	  	  result.forEach(function(board, index){
			  	  str+= `<tr>`;
			  	  str+= `	<td>${result.length-index}</td>`;
			  	  str+= `	<td>${board.boardCategoryVO.cateName}</td>`;
			  	  str+= `	<td>`;
			  	  if(board.isSecret == 'Y'){
				  str+= `	<img src="/img/lock.png" width="20px;">`;
				  }
				  
				  if(board.isSecret == 'Y'){
			  	  str+= `	<a href="/board/checkPw?boardNo=${board.boardNo}">`;
			  	  str+= `		<span>${board.boardTitle}</span>`;
			  	  str+= `	</a>`;
				  }			  	  
				  
			  	  if(board.isSecret == 'N'){
			  	  str+= `	<a href="/board/checkPw?boardNo=${board.boardNo}">`;
			  	  str+= `		<span>${board.boardTitle}</span>`;
			  	  str+= `	</a>`;
				  }		
			  	  
			  	  str+= `   </td>`;
			  	  str+= `	<td>${board.boardWriter}</td>`;
			  	  str+= `	<td>${board.boardCreateDate}</td>`;
			  	  str+= `	<td>${board.boardReadCnt}</td>`;
			  	  str+= `</tr>`;
			  })
		  
		  tbody_tag.insertAdjacentHTML('afterbegin', str);
      },
      error: function() {
         alert('실패');
      }
   });
//ajax end
}

//게시판 검색
function searchBoard(){
	//강의검색
	const cate_no = cateSelect.querySelector('#cateSelect option:checked').value;
	console.log(cate_no);
	const select_value = document.querySelector('#searchSelect').value;
	console.log(select_value);
	const input_value = document.querySelector('#searchInput').value;
	console.log(input_value);
	const check = document.querySelector('#searchCheck');
	check.value = check.checked == true ? 'notSecret' : 'secret';
	const check_value = check.value;
	//ajax start
	$.ajax({
		url: '/board/searchBoardAjax', //요청경로
		type: 'post',
		async: true,
		//contentType : 'application/json; charset=UTF-8',
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'inputValue':input_value, 'selectValue':select_value, 'checkValue':check_value, 'cateNo':cate_no}, //필요한 데이터
		success: function(result) {
        	const tbody_tag = document.querySelector('#tbodyTag');
			
		  	  tbody_tag.replaceChildren();
		  	  
		  	  let str = '';
		  	  
		  	  result.forEach(function(board, index){
			  	  str+= `<tr>`;
			  	  str+= `	<td>${result.length-index}</td>`;
			  	  str+= `	<td>${board.boardCategoryVO.cateName}</td>`;
			  	  str+= `	<td>`;
			  	  if(board.isSecret == 'Y'){
				  str+= `	<img src="/img/lock.png" width="20px;">`;
				  }
				  
				  if(board.isSecret == 'Y'){
			  	  str+= `	<a href="/board/checkPw?boardNo=${board.boardNo}">`;
			  	  str+= `		<span>${board.boardTitle}</span>`;
			  	  str+= `	</a>`;
				  }			  	  
				  
			  	  if(board.isSecret == 'N'){
			  	  str+= `	<a href="/board/checkPw?boardNo=${board.boardNo}">`;
			  	  str+= `		<span>${board.boardTitle}</span>`;
			  	  str+= `	</a>`;
				  }		
			  	  
			  	  str+= `   </td>`;
			  	  str+= `	<td>${board.boardWriter}</td>`;
			  	  str+= `	<td>${board.boardCreateDate}</td>`;
			  	  str+= `	<td>${board.boardReadCnt}</td>`;
			  	  str+= `</tr>`;
			  })
			  
			  tbody_tag.insertAdjacentHTML('afterbegin', str);
				
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


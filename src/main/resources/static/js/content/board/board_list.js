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
	  	  console.log(result);
	  	  
	  	  result.forEach(function(board, index){
				  if(board.isNotice == 'Y'){
			  	  str += `<tr class="active">`;
				  }
				  else{
				  str += `<tr>`;
				  }
			  	  if(board.isNotice == 'Y'){
			  	  str += `   <td>`;
			  	  str += `   	<img src="/img/notice.png" width="35px;">`;
			  	  str += `   	공지`;
			  	  str += `   </td>`;
				  }
				  else{
			  	  str += `   <td>${result.length-index}</td>`;
				  }
			  	  str += `   <td>${board.boardCategoryVO.cateName}</td>`;
			  	  str += `   <td> `;
			  	  str += `   	<div class="board-title">`;
			  	  if(board.isSecret == 'Y'){
			  	  str += `   			<img src="/img/lock.png" width="20px;">`;
				  }
				  if(board.isSecret == 'Y'){
				  str += `              <a href="javascript:void(0);" onclick="showInput(this);">`;
				  str += `					<span>${board.boardTitle}</span>`;
				  str += `				</a>`;
				  }
				  str += `       </div>`;
				  str += `       <div>`;
				  if(board.isSecret == 'N'){
			  	  str += `   			<a th:href="/board/boardDetail?boardNo=${board.boardNo}">`;
			  	  str += `   				<span>${board.boardTitle}</span>`;
			  	  str += `   			</a>`;
				  }
			  	  str += `   	</div>`;
			  	  str += `   	<div class="inputArea" style="display:none;">`;
			  	  str += `   		<div class="row">`;
			  	  str += `   			<div class="col-6">`;
			  	  str += `   				 <input type="password" oninput="maxLengthCheck(this)" class="passwordInput form-control">`;
			  	  str += `   			</div>`;
			  	  str += `   			<div class="col-3">`;
			  	  str += `   				<button onclick="ok(this)" class="btn btn-primary">확인</button>`;
			  	  str += `   			</div>`;
			  	  str += `   			<div class="col-3">`;
			  	  str += `   				<button onclick="cancel(this)" class="btn btn-danger">취소</button>`;
			  	  str += `   			</div>`;
			  	  str += `   		</div>`;
			  	  str += `       </div>`;
			  	  str += `   </td>`;
			  	  str += `   <td>${board.boardWriter}</td>`;
			  	  str += `   <td>${board.boardCreateDate}</td>`;
			  	  str += `   <td>${board.boardReadCnt}</td>`;
			  	  str += `</tr>`;
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
	const cate_no = document.querySelector('#cateSelect option:checked').value;
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
			alert('석옹');
			console.log(result);
        	const tbody_tag = document.querySelector('#tbodyTag');
			
		  	  tbody_tag.replaceChildren();
		  	  
		  	  let str = '';
		  	  
		  	  result.forEach(function(board, index){
				  if(board.isNotice == 'Y'){
			  	  str += `<tr class="active">`;
				  }
				  else{
				  str += `<tr>`;
				  }
			  	  if(board.isNotice == 'Y'){
			  	  str += `   <td>`;
			  	  str += `   	<img src="/img/notice.png" width="35px;">`;
			  	  str += `   	공지`;
			  	  str += `   </td>`;
				  }
				  else{
			  	  str += `   <td>${result.length-index}</td>`;
				  }
			  	  str += `   <td>${board.boardCategoryVO.cateName}</td>`;
			  	  str += `   <td> `;
			  	  str += `   	<div class="board-title">`;
			  	  if(board.isSecret == 'Y'){
			  	  str += `   			<img src="/img/lock.png" width="20px;">`;
				  }
				  if(board.isSecret == 'Y'){
				  str += `              <a href="javascript:void(0);" onclick="showInput(this);">`;
				  str += `					<span>${board.boardTitle}</span>`;
				  str += `				</a>`;
				  }
				  str += `       </div>`;
				  str += `       <div>`;
				  if(board.isSecret == 'N'){
			  	  str += `   			<a th:href="/board/boardDetail?boardNo=${board.boardNo}">`;
			  	  str += `   				<span>${board.boardTitle}</span>`;
			  	  str += `   			</a>`;
				  }
			  	  str += `   	</div>`;
			  	  str += `   	<div class="inputArea" style="display:none;">`;
			  	  str += `   		<div class="row">`;
			  	  str += `   			<div class="col-6">`;
			  	  str += `   				 <input type="password" oninput="maxLengthCheck(this)" class="passwordInput form-control">`;
			  	  str += `   			</div>`;
			  	  str += `   			<div class="col-3">`;
			  	  str += `   				<button onclick="ok(this)" class="btn btn-primary">확인</button>`;
			  	  str += `   			</div>`;
			  	  str += `   			<div class="col-3">`;
			  	  str += `   				<button onclick="cancel(this)" class="btn btn-danger">취소</button>`;
			  	  str += `   			</div>`;
			  	  str += `   		</div>`;
			  	  str += `       </div>`;
			  	  str += `   </td>`;
			  	  str += `   <td>${board.boardWriter}</td>`;
			  	  str += `   <td>${board.boardCreateDate}</td>`;
			  	  str += `   <td>${board.boardReadCnt}</td>`;
			  	  str += `</tr>`;
			  })
			  
			  tbody_tag.insertAdjacentHTML('afterbegin', str);
				
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

function showInput(secretBoard) {
    const td = secretBoard.closest('td');
    td.querySelector('.board-title').style.display = 'none';
    td.querySelector('.inputArea').style.display = 'inline-block';
}

function ok(okBtn, secretPw, boardNo) {
    const password = okBtn.parentNode.previousElementSibling.children[0].value;
    
    if(password == secretPw){
		location.href = `/board/boardDetail?boardNo=${boardNo}`;
    } 
    else{
		Swal.fire({
        icon: 'error',
        title: '오류',
        text: '비밀번호가 일치하지 않습니다.',
        });
    }
}

function cancel(cancelBtn) {
	cancelBtn.parentNode.previousElementSibling.previousElementSibling.children[0].value='';
    const td = cancelBtn.closest('td');
    td.querySelector('.board-title').style.display = 'inline-block';
    td.querySelector('.inputArea').style.display = 'none';
}

 function maxLengthCheck(object) {
    if (object.value.length > 4)
      object.value = object.value.slice(0, 4);
 }
 

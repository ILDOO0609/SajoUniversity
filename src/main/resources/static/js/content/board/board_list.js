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
		  	  str+= `	<td> <a href="/board/boardDetail?boardNo=${board.boardNo}"> ${board.boardTitle} </a> </td>`;
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
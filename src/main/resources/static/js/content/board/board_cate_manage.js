//등록버튼 누를 시 추가한 카테고리 등록
function regCategory() {
	//카테고리명이 빈 값인지 확인
	const cateNameTag = document.querySelector('#cateName');
	
	if(cateNameTag.value == ''){
		Swal.fire('카테고리명은 필수입니다.', '', 'info');
		return ; //return을 만나는 순간 메소드 종료 
	}
	
	//카테고리명 중복 확인
	if(checkCateName(cateNameTag.value)){
		Swal.fire('카테고리명이 중복입니다.\n다시입력하세요.', '', 'error');
		cateNameTag.value = '';
		return ;
	}
	
	//ajax start
	$.ajax({
		url: '/board/regCategoryAjax', //요청경로
		type: 'post',
		data: {'cateName':cateNameTag.value}, //필요한 데이터
		
		success: function(result) {
			Swal.fire('등록완료.', '', 'success');
			
			//카테고리 목록 데이터 다시 조회
			getCateListAjax();
			cateNameTag.value = '';
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

//카테고리 등록 시 이름 중복 확인
function checkCateName(cateName) {
	let isDuplecate = false; //중복 아니다.
	//ajax start
	$.ajax({
		url: '/board/checkCateNameAjax', //요청경로
		type: 'post',
		async:false, //동기 방식으로 실행, 작성하지 않으면 default true
		data: {'cateName':cateName}, //필요한 데이터
		success: function(result) {
				//카테고리명 중복 시...
			if(result == 1){
				isDuplecate = true;
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
	
	return isDuplecate;
}

//카테고리 등록 후 실행되는 목록 조회 기능
function getCateListAjax() {
	//ajax start
	$.ajax({
		url: '/board/getCateListAjax', //요청경로
		type: 'post',
		async: false,
		data: {}, //필요한 데이터
		success: function(result) {
			//카테고리 목록 테이블의 tbody 태그를 선택
			const tbodyTag = document.querySelector('#cateListTable > tbody');
			
			//해당 태그 안의 모든 내용 삭제
			tbodyTag.replaceChildren();
			
			//새롭게 조회된 카테고리 목록 데이터로 테이블 채워줌
			let str = '';
			
			for(let i = 0; i < result.length; i++){
				str += '<tr style="vertical-align: middle;">';
				str += `<td>${i+1}</td>`;
				str += `<td>${result[i].cateName}</td>`;	
							
				str += `<td>`;                                                            								
				str += `<div class="row">`;                                                                              
				str += `<div class="form-check col">`;                                                                     
				
				if(result[i].isUse =='Y'){
					str += `<input class="form-check-input" type="radio" name="isUse_${i+1}"                   
					onchange="changeIsUse('${result[i].cateNo}');" checked>사용중 `;
				}
				else{
					str += `<input class="form-check-input" type="radio" name="isUse_${i+1}"                   
					onchange="changeIsUse('${result[i].cateNo}');">사용중 `;	
				}
				
				str += `</div>`;                                                                                           
				str += `<div class="form-check col">`;                                                                    
				
				if(result[i].isUse == 'N'){
					str += `<input class="form-check-input" type="radio" name="isUse_${i+1}"                  
					onchange="changeIsUse('${result[i].cateNo}');" checked>미사용`;
				}else{
					str += `<input class="form-check-input" type="radio" name="isUse_${i+1}"                  
					onchange="changeIsUse('${result[i].cateNo}');">미사용`;
				}
				
				str += `</div>`;                                                                                           
				str += `</div>`;                                                                                           
				str += `</td>`;                                                                                            
				                                                                                                             
				str += `<td><input type="button" value="삭제" class="btn btn-danger" onclick="location.href='/board/deleteCate?cateNo=${result[i].cateNo}';"></td>`;
				str += '</tr>';
			}
			
			tbodyTag.insertAdjacentHTML('afterbegin', str);
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

//카테고리 사용여부 변경
function changeIsUse(cateNo) {
	//ajax start
	$.ajax({
		url: '/board/changeIsUseAjax', //요청경로
		type: 'post',
		data: {'cateNo':cateNo}, //필요한 데이터
		success: function(result) {
			if(result==1){
				Swal.fire('사용여부가 변경되었습니다.', '', 'success');
			}
			else{
				alert('일시적 오류가 발생했습니다.');
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

function deleteCategory(cateNo) {
    Swal.fire({
        title: '삭제 하시겠습니까?',
        text: '',
        icon: 'question',
        
        showCancelButton: true, 
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: '확인',
		cancelButtonText: '취소',
		
		reverseButtons: false,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('삭제완료', '', 'success')
            .then(() => {
                location.href = `/board/deleteCate?cateNo=${cateNo}`;
            });
        }
    });
}

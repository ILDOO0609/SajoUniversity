init();

// login 함수
function login() {
	const memNo = document.querySelector('#loginModal #memNo').value;
	const memPw = document.querySelector('#loginModal #memPw').value;



	//ajax start
	$.ajax({
		url: '/member/login', //요청경로
		type: 'post',
		data: { 'memNo': memNo, 'memPw': memPw }, //필요한 데이터
		success: function(result) {

			// 로그인 성공 시
			if (result == 'success') {


				location.href = '/';
			}
			// 로그인 실패 시
			else {
				
				const error_div = document.querySelector('#errorDiv');
				if(error_div != null){
					error_div.remove();			
				}
				
				let str = '';
				str += '<div id="errorDiv" style="color: red; font-size: 0.95rem; text-align: center; margin-top: 20px;">';
				str += '로그인 정보를 확인하세요';
				str += '</div>';
					
				const login_error_div = document.querySelector('#loginErrorDiv');
				
				login_error_div.insertAdjacentHTML('beforeend',str)
				
				// id, pw input태그 초기화
				document.querySelectorAll('#loginModal input:not([type="button"])').forEach(function(t, index) {
					// console.log(`t = ${t.value} / index = ${index}`)
					t.value = '';

				});


				// const tags = document.querySelectorAll('#loginModal input:not([type="button"])');
				//for(const t of tags){
				//	t.value = '';
				//}

			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
								
}


// 회원가입 함수
function join() {
	// 유효성 검사 진행
	const isValid = joinValidate();
	if (!isValid) {
		return;
	}
	
	
	// 회원가입 진행
	document.querySelector('#joinForm').submit();

}


// 회원가입 버튼 비활성화
function setDisabled() {

	document.querySelector('#joinBtn').disabled = true;

}



// 중복 확인 버튼 클릭 시 실행
function isDuplicateMemNo() {
	
	const errorDivs = document.querySelectorAll('div[class="my-invalid"]');

	for (const errorDiv of errorDivs) {
		errorDiv.remove();
	}
	
	// 회원 id를 입력하는 태그
	const memNoTag = document.querySelector('#joinModal #memNo');
	const memNo = memNoTag.value;

	if (memNo.length != 8) {

		alert('8자리 번호를 입력 해주세요');
		return;
	}
	
	else if (memNo.length == 8) {
		
		//ajax start
		$.ajax({
			url: '/member/isDuplicateMemNoAjax', //요청경로
			type: 'post',
			async: false, // 동기방식 진행
			data: { 'memNo': memNo }, //필요한 데이터
			success: function(result) {
				if (result) {
					alert('해당 번호는 발급된 번호입니다. \n 다른 번호를 입력 해주세요.');
				}
				else {
					alert('사용가능');
	
					// join 버튼 disabled 속성 제거
					document.querySelector('#joinBtn').disabled = false;
	
					tag.value;
				}
	
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end

		
	}

	


}



// 우편번호 검색 api 사용
function searchAddr() {
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
			// 예제를 참고하여 다양한 활용법을 확인해 보세요.

			// 도로명 주소
			const roadAddr = data.roadAddress;

			// 도로명 주소 세팅
			document.querySelector('#memAddr').value = roadAddr;
		}
	}).open();
}



// 회원가입 버튼 비활성화
function setDisabled() {

	document.querySelector('#joinBtn').disabled = true;

}


// 인증번호 발송
function sendSMS() {
	//ajax start
	$.ajax({
		url: '/member/sendSMSAjax', //요청경로
		type: 'post',
		async: false, // 동기방식 진행
		data: { 'memTell': memTell }, //필요한 데이터
		success: function(result) {
			if (result) {
				alert('입력하신 연락처로 인증번호를 발급하였습니다. \n 제한 시간 내 인증번호를 입력 해 주세요.');
			}
			else {
				alert('사용가능');

				// join 버튼 disabled 속성 제거
				document.querySelector('#joinBtn').disabled = false;

				tag.value;
			}

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}


// validation 오류 메세지 div 전체 제거
function deleteErrorDiv() {
	// 기존의 오류 메시지 전부 삭제
	const errorDivs = document.querySelectorAll('div[class="my-invalid"]');

	for (const errorDiv of errorDivs) {
		errorDiv.remove();
	}
}


// 회원 가입 진행 시 데이터 유효성 검사
function joinValidate() {


	deleteErrorDiv();




	// 함수의 리턴 결과를 저장하는 변수
	let result_memNo = true;
	let result_memPw = true;


	// 오류 메세지
	let str_memNo = '';
	let str_memPw = '';

	// 회원가입 form 태그의 자식 div들 전체 선택
	const divs = document.querySelectorAll('#joinForm > div');

	// validation 처리
	const memNo = document.querySelector('#joinModal #memNo').value;
	if (memNo == '') {
		str_memNo = '번호는 필수 입력입니다!!!';
		result_memNo = false;
	}
	else if (memNo.length != 8) {
		str_memNo = '번호는 8자리여야 합니다.';

		result_memNo = false;
	}

	// 비밀번호 유효성 검사 ( PW )
	const memPw = document.querySelector('#joinModal #memPw').value;

	// 비밀번호 영문 숫자 조합 8자 정규식
	// 정규식에 부합하지 않다면 null을 반환함.
	const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/;
	// const aaa = memPw.match(regExp);
	// alert(aaa);


	if (memPw == '') {
		str_memPw = 'pw는 필수 입력 입니다.'
		result_memPw = false;
	}
	else if (memPw.match(regExp) == null) {
		str_memPw = 'pw는 숫자와 문자 포함 형태의 6~12자리 이내의 암호이여야 합니다.'
		result_memPw = false;
	}

	// 유효성 검사 실패 시 오류 메세지 출력
	if (!result_memNo) {
		const errorHTML = `<div class="my-invalid">${str_memNo}</div>`;
		divs[1].insertAdjacentHTML('afterend', errorHTML);
	}
	
	if (!result_memPw) {
		const errorHTML = `<div class="my-invalid">${str_memPw}</div>`;
		divs[2].insertAdjacentHTML('afterend', errorHTML);
	}
	
	return result_memNo && result_memPw;
	
	
}


// findPassword 함수
function findPw(btn) {
	
	btn.disabled = true;
	btn.querySelector('span').textContent = 'Loading...';
	
	const spinner = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
	btn.insertAdjacentHTML('afterbegin', spinner);
	
	
	
//ajax start
	$.ajax({
		url: '/member/findPwAjax',
		type: 'post',
		async: true, // 동기 true, 비동기 false
		// contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: $('#findPwForm').serialize(), // form 태그 안의 모든 데이터
		success: function(result) {
			
		   if(result) {
			   alert('이메일로 임시 비밀번호를 발급했습니다. \n 반드시 비밀번호 변경 후 사용하세요.');
		   }
		   else {
			   let str = '';
			   str += '<div class="col-12 error-findPw">';
			   str += '<span>';
			   str += 'ID와 이름을 확인해주세요.';
			   str += '</span>';
			   str += '</div>';
			   
			   document.querySelector('#findPwErrorDiv').insertAdjacentHTML('afterend', str);
			   
		   }
			   btn.disabled = false;
			   btn.querySelector('span:first-child').remove();
			   btn.querySelector('span').textContent = '비밀번호 찾기';
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end


	
								
}



















// js 실행시 바로 실행되는 함수

function init() {
	// LOGIN 모달(태그) 선택
	const loginModal = document.querySelector('#loginModal');


	// JOIN 모달 선택
	const joinModal = document.querySelector('#joinModal');

	// LOGIN 모달창이 닫힐 때 마다 실행되는 이벤트
	loginModal.addEventListener('hidden.bs.modal', function(e) {

		// LOGIN 모달창 안의 모든 input태그 초기화
		document.querySelector('#loginForm').reset();
		deleteErrorDiv()
		
		// 로그인 실패 시 추가되는 div 태그 삭제
		const error_div = document.querySelector('#errorDiv');
		if(error_div != null){
			error_div.remove();			
		}
	});

	// JOIN 모달창이 닫힐 때 마다 실행되는 이벤트
	joinModal.addEventListener('hidden.bs.modal', function(e) {

		// LOGIN 모달창 안의 모든 input태그 초기화
		document.querySelector('#joinForm').reset();
		deleteErrorDiv()
	});

	// find 모달창이 닫힐 때 실행
	findPwModal.addEventListener('hidden.bs.modal', function(event){
		document.querySelector('#findPwForm').reset();
		const error_tag = document.querySelector('.error-findPw');
		
		if(error_tag != null){
			error_tag.remove();
		}
		
		const find_pw_modal_div = event.target; 
		const find_pw_btn = find_pw_modal_div.querySelector('button');
		
		find_pw_btn.disabled = false;
		
		find_pw_btn.querySelector('span:last-child').textContent = '비밀번호 찾기';
		
		if(find_pw_btn.children.length > 1){
			find_pw_btn.firstElementChild.remove();
		}
		
	});

}

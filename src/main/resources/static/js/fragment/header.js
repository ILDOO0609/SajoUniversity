init();







				
// 로그인
function login() {
    const memNo = document.querySelector('#loginModal #memNo').value;
    const memPw = document.querySelector('#loginModal #memPw').value;

    // Ajax request
    $.ajax({
        url: '/member/login',
        type: 'post',
        data: { 'memNo': memNo, 'memPw': memPw },
        success: function(result) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'center-center',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });

            if (result == 'success') {
                Toast.fire({
                    icon: 'success',
                    title: '환영합니다.',
                }).then(() => {
                    location.href = '/member/main';
                });
            } else {
	
                Toast.fire({
                    icon: 'error',
                    title: '로그인 정보를 확인해주세요.',
                });

                // Clear input fields
                document.querySelectorAll('#loginModal input:not([type="button"])').forEach(function(t, index) {
                    t.value = '';
                });
            }
        },
        error: function() {
            alert('Login failed');
        }
    });
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

	 // document.querySelector('#joinBtn').disabled = true;

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
	let result_memQuest = true;
	let result_memName = true;
	let result_memBirthday = true;
	let result_memAddr = true;
	let result_memAddrDetail = true;
	let result_tell_2 = true;
	let result_tell_3 = true;
	let result_memImage = true;

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
		divs[3].insertAdjacentHTML('afterend', errorHTML);
	}
	
	
	// 비밀번호찾기 질문  유효성 검사
	const memQuest = document.querySelector('#joinModal #memQuest').value;
	if (memQuest == '') {
		str_memQuest = '필수 입력입니다!!!';
		result_memQuest = false;
	}
	
	
	if (!result_memQuest) {
		const errorHTML = `<div class="my-invalid">${str_memQuest}</div>`;
		divs[4].insertAdjacentHTML('afterend', errorHTML);
	}
	
	
	// 이름  유효성 검사
	const memName = document.querySelector('#joinModal #memName').value;
	if (memName == '') {
		str_memName = '필수 입력입니다!!!';
		result_memName = false;
	}
	
	if (!result_memName) {
		const errorHTML = `<div class="my-invalid">${str_memName}</div>`;
		divs[5].insertAdjacentHTML('afterend', errorHTML);
	}
	
	
	// 생일  유효성 검사
	const memBirthday = document.querySelector('#joinModal #memBirthday').value;
	if (memBirthday == '') {
		str_memBirthday = '필수 입력입니다!!!';
		result_memBirthday = false;
	}
	
	if (!result_memBirthday) {
		const errorHTML = `<div class="my-invalid">${str_memBirthday}</div>`;
		divs[9].insertAdjacentHTML('afterend', errorHTML);
	}
	
	
	// 연락처 중간자리  유효성 검사
	const tell_2 = document.querySelector('#joinModal #tell_2').value;
	if (tell_2 == '') {
		str_tell_2 = '필수 입력입니다!!!';
		result_tell_2 = false;
	}
	
	if (!result_tell_2) {
		const errorHTML = `<div class="my-invalid">${str_tell_2}</div>`;
		divs[12].insertAdjacentHTML('afterend', errorHTML);
	}
	
	
	// 연락처 마지막 자리  유효성 검사
	const tell_3 = document.querySelector('#joinModal #tell_3').value;
	if (tell_3 == '') {
		str_tell_3 = '필수 입력입니다!!!';
		result_tell_3 = false;
	}
	
	if (!result_tell_3) {
		const errorHTML = `<div class="my-invalid">${str_tell_3}</div>`;
		divs[12].insertAdjacentHTML('afterend', errorHTML);
	}
	
	// 주소 유효성 검사
	const memAddr = document.querySelector('#joinModal #memAddr').value;
	if (memAddr == '') {
		str_memAddr = '필수 입력입니다!!!';
		result_memAddr = false;
	}
	
	if (!result_memAddr) {
		const errorHTML = `<div class="my-invalid">${str_memAddr}</div>`;
		divs[13].insertAdjacentHTML('afterend', errorHTML);
	}
	
	// 상세 주소 유효성 검사
	const memAddrDetail = document.querySelector('#joinModal #memAddrDetail').value;
	if (memAddrDetail == '') {
		str_memAddrDetail = '상세주소필수 입력입니다!!!';
		result_memAddrDetail = false;
	}
	
	if (!result_memAddrDetail) {
		const errorHTML = `<div class="my-invalid">${str_memAddrDetail}</div>`;
		divs[14].insertAdjacentHTML('afterend', errorHTML);
	}
	
	
	
	// 이미지 유효성 검사
	const memImage = document.querySelector('#joinModal #memImage');
	const selectedFile = memImage.files[0];

	if (!selectedFile) {
		str_memImage = '이미지를 첨부하세요!';
		result_memImage = false;
	}
	
	if (!result_memImage) {
    const errorHTML = `<div class="my-invalid">${str_memImage}</div>`;
    divs[14].insertAdjacentHTML('afterend', errorHTML);
   }
	
	
	
	
	
	
	return result_memNo && result_memPw && result_memName && result_memQuest && tell_2 && tell_3 && memBirthday && memAddr && memAddrDetail && memImage;
	
	
}

// 비밀번호 찾기 -- 이메일
function findPw(btn) {
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Loading...';

    const spinner = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    btn.insertAdjacentHTML('afterbegin', spinner);

    // Ajax request
    $.ajax({
        url: '/member/findPwAjax',
        type: 'post',
        async: true,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: $('#findPwForm').serialize(),
        success: function(result) {
            if (result) {
                
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'center-center',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                    }
                });

                Toast.fire({
                    icon: 'success',
                    title: '임시 비밀번호가 발송되었습니다. \n 발급 받으신 비밀번호는 반드시 변경해주세요.',
                });
            } else {
                
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'center-center',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                    }
                });

                Toast.fire({
                    icon: 'error',
                    title: '교번, 또는 이름 정보를 다시한번 확인 해주세요.',
                });
            }

            btn.disabled = false;
            btn.querySelector('span:first-child').remove();
            btn.querySelector('span').textContent = '비밀번호 찾기';
        },
        error: function() {
            alert('Failed');
        }
    });
}






function findNo(btn) {
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Loading...';

    const spinner = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    btn.insertAdjacentHTML('afterbegin', spinner);

    // Ajax request
    $.ajax({
        url: '/member/findNoAjax',
        type: 'post',
        async: true,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: $('#findNoForm').serialize(),
        success: function(response) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'center-center',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });

            Toast.fire({
                icon: 'success',
                title: response
            });

            btn.disabled = false;
            btn.querySelector('span:first-child').remove();
            btn.querySelector('span').textContent = '아이디 찾기';
        },
        error: function(xhr) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'center-center',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });

            Toast.fire({
                icon: 'error',
                title: xhr.responseText
            });

            btn.disabled = false;
            btn.querySelector('span:first-child').remove();
            btn.querySelector('span').textContent = '아이디 찾기';
        }
    });
}


var authoMail;
var countdownTimer;

// 회원가입시 인증번호 이메일 인증
function authenMail() {
  var memEmail = document.querySelector('#memEmail').value;

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(memEmail)) {
    alert('이메일 형식을 확인해주세요.');
    return;
  }

  var btnAuth = document.querySelector('#btn-auth');

  $.ajax({
    url: '/member/authenMailAjax',
    type: 'post',
    async: true,
    contentType: 'application/json; charset=UTF-8',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: { 'memEmail': memEmail },
    success: function(result) {
	  authoMail = result.authoMail;
	  startTimer();
	  alert('이메일이 성공적으로 발송되었습니다.');
	  btnAuth.disabled = true;
	  // alert(authoMail)
	    var timeRemaining = 180;
		
		
		function startTimer() {
		  var timeRemainingInput = document.querySelector('#time-remaining');
		  countdownTimer = setInterval(function() {
		    var minutes = Math.floor(timeRemaining / 60);
		    var seconds = timeRemaining % 60;
		    timeRemainingInput.value = minutes + 'm ' + seconds + 's';
		
		    if (timeRemaining <= 0) {
		      clearInterval(countdownTimer);
		      timeRemainingInput.value = 'Time expired';
		      document.querySelector('#joinBtn').disabled = true;
		    }
		
		    timeRemaining--;
		  }, 1000);
		}
	},
    error: function() {
      alert('메일전송에 실패하였습니다..');
    },
    complete: function() {
     // btnAuth.disabled = false;
    }
  });
}




function checkVerificationCode() {
	// alert(authoMail);
  var authMail = document.querySelector('#auth_mail').value;
  var confirmBtn = document.querySelector('#confirmation');
  var timeRemainingInput = document.querySelector('#time-remaining');
  
  // alert(authMail)
  if (authMail === authoMail) {
    alert('인증번호가 일치합니다. \n 회원가입을 마저 진행 해주세요.');
    clearInterval(countdownTimer);
    timeRemainingInput.value = '인증이 완료되었습니다';
    confirmBtn.disabled = true;
	document.querySelector('#joinBtn').disabled = false;
  } else {
    alert('인증번호가 일치하지 않습니다. \n 발송된 인증번호를 다시 확인 해주세요.');
    document.querySelector('#joinBtn').disabled = true;
  }
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

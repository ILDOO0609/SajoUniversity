package com.study.test.member.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.member.service.memberService;
import com.study.test.member.vo.MemberVO;
import com.study.test.member.vo.StatisticsVO;
import com.study.test.util.DateUtill;
import com.study.test.util.MailService;
import com.study.test.util.MailVO;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Controller
@RequestMapping("/member")
public class MemberController {
	
	@Resource(name = "memberService")
	private memberService memberService;
	
	@Resource(name = "mailService")
	private MailService mailService;
	
	@Autowired 
	private PasswordEncoder encoder;
	

	@PostMapping("/logout")
	public String logout() {
		
		return "main";
	}
	
	// 로그인 페이지 이동
	@GetMapping("/loginForm")
	public String loginForm() {
		
		return "content//member/login_form";
	}
	
	
	// 교번 중복 체크
	@ResponseBody
	@PostMapping("/isDuplicateMemNoAjax")
	public boolean isDuplicateMemNo(int memNo) {
		return memberService.isDuplicateMemNo(memNo);
	}
	
	
	// 회원 가입
	@PostMapping("/join")
	public String join(MemberVO memberVO) {
				
		String encodedPw = encoder.encode(memberVO.getMemPw());
		
		memberVO.setMemPw(encodedPw);
		
		memberService.join(memberVO);
		
		
		return "redirect:/";
		
		
	}
	

	

	 
	
	
	@GetMapping("/game")
	public String game() {
		return "content//member/game";
	}
	
	// 회원가입 이메일인증
	@ResponseBody
	@PostMapping("/authenMailAjax")
	public Map<String, Object> authenMail(String memEmail) {
		
		Map<String, Object> response = new HashMap<>();
		
		if(memEmail != null) {
			String authoMail = mailService.createRandomPw();
			
			
			MailVO mailVO = new MailVO();
			mailVO.setTitle("인증번호 8자리 발송");
			
			List<String> emailList = new ArrayList<>();
			emailList.add(memEmail);
			
			mailVO.setRecipientList(emailList);
			mailVO.setContent("발급 된 인증번호는 : " + authoMail + "입니다. \n 복사해서 사용해주세요 !!" );
			
			mailService.sendSimpleEmail(mailVO);
			System.out.println(authoMail);
			
			 response.put("authoMail", authoMail);
		}
		
		response.put("result", memEmail != null);
	    return response;
	}
	
	// 비밀번호 찾기
	@ResponseBody
	@PostMapping("/findPwAjax")
	public boolean findPw(MemberVO memberVO) {
		
			String memEmail = memberService.getMemEmail(memberVO);
			if(memEmail != null) {
				String imsiPw = mailService.createRandomPw();
				
				String encodedPw = encoder.encode(imsiPw);
				memberVO.setMemPw(encodedPw);
				memberService.updateMemPw(memberVO);
				
				MailVO mailVO = new MailVO();
				mailVO.setTitle("임시 비밀번호 8자리 발송");
				
				List<String> emailList = new ArrayList<>();
				emailList.add(memEmail);
				
				mailVO.setRecipientList(emailList);
				mailVO.setContent("발급 된 임시 비밀번호는 : " + imsiPw + "입니다. \n 발급 후 반드시 비밀번호를 변경 해 주세요 !!" );
				
				mailService.sendSimpleEmail(mailVO);
			}
			
			return memEmail != null ? true : false;
		}
	
	
//	// 아이디 찾기 - 이메일
//	@ResponseBody
//	@PostMapping("/findNoAjax")
//	public boolean findNo(MemberVO memberVO) {
//		
//		
//		String memEmail = memberService.getMemEmail2(memberVO);
//		MemberVO loginInfo = memberService.loginInfo(memberVO);
//		String finded_no = loginInfo.getMemNo();
//		
//		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@" + loginInfo);
//		
//		
//			
//			if(memEmail != null) {
//				
//				MailVO mailVO = new MailVO();
//				mailVO.setTitle("사조대학 아이디(교번) 정보 발송");
//				
//				List<String> emailList = new ArrayList<>();
//				emailList.add(memEmail);
//				
//				mailVO.setRecipientList(emailList);
//				mailVO.setContent("발급 된 회원님의 아이디는 : " + finded_no +  "입니다.");
//				
//				mailService.sendSimpleEmail(mailVO);
//			}
//		
//		
//		
//		return memEmail != null ? true : false;
//	}

	
	
	// 아이디 찾기 - SMS
	@ResponseBody
	@PostMapping("/findNoAjax")
	public ResponseEntity<String> findNo(MemberVO memberVO) {
	    String memEmail = memberService.getMemEmail2(memberVO);
	    if (memEmail != null) {
	        MemberVO loginInfo = memberService.loginInfo(memberVO);
	        String trans_tell = loginInfo.getMemTell();
	        String found_no = loginInfo.getMemNo();

	        String tell = trans_tell.replaceAll("\\s+", "");
	        DefaultMessageService messageService = NurigoApp.INSTANCE.initialize("NCSFHN1XY1FX02NP", "B6URLZWJHLKFCHD7USZ9DWCWBMDUTDLV", "https://api.coolsms.co.kr");

	        Message message = new Message();
	        message.setFrom("01052990199"); // 발송번호 -- COOLSMS 연동 번호
	        message.setTo(tell); // 수신자 번호 --> 회원 연락처
	        message.setText("[사조대학팀]" + "\n" + "귀하의 아이디(교번)은 " + found_no + " 입니다.");

	        try {
	            messageService.send(message);
	            return ResponseEntity.ok("아이디(교번) 정보가 가입 연락처로 전송되었습니다.");
	        } catch (NurigoMessageNotReceivedException exception) {
	            System.out.println(exception.getFailedMessageList());
	            System.out.println(exception.getMessage());
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("아이디 정보 발신에 실패하였습니다.");
	        } catch (Exception exception) {
	            System.out.println(exception.getMessage());
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("아이디 정보 발신에 실패하였습니다.");
	        }
	    } else {
	        return ResponseEntity.badRequest().body("이름, 또는 이메일 정보를 다시 한번 확인해주세요.");
	    }
	}
	
//	// 인증번호 발송
//	@ResponseBody
//	@PostMapping("/sendSMSAjax")
//	public void sendSMS(MemberVO memberVO) {
//		
//		MemberVO loginInfo = memberService.loginInfo(memberVO);
//		String finded_no = loginInfo.getMemNo();
//		
//		DefaultMessageService messageService =  NurigoApp.INSTANCE.initialize("NCS7NPK8BJXHRZTS", "5SCHDJCK3NVOLXM1ZVYMSIQVQZGRBVRJ", "https://api.coolsms.co.kr");
//		
//		Message message = new Message();
//		message.setFrom("01012345678"); // 보내는 사람 번호
//		message.setTo(loginInfo.getMemTell()); //  받는 사람 번호
//		message.setText("요청하신 귀하의 아이디(교번)은" + ""); // 텍스트 내용
//		
//		try {
//			// send 메소드로 ArrayList<Message> 객체를 넣어도 동작합니다!
//			messageService.send(message);
//		} catch (NurigoMessageNotReceivedException exception) {
//			// 발송에 실패한 메시지 목록을 확인할 수 있습니다!
//			System.out.println(exception.getFailedMessageList());
//			System.out.println(exception.getMessage());
//		} catch (Exception exception) {
//			System.out.println(exception.getMessage());
//		}
//		
//	}
	
	

	
	
	// 팝업창1번
	@GetMapping("/pop1")
	public String pop1() {
		
		return "content/member/privacy_policy"; 
	}
	// 팝업창2번
	@GetMapping("/pop2")
	public String pop2() {
		return "content/member/email_collect_deny"; 
	}
	
	
	
	
	
	// 월별 등록 차트d
	@GetMapping("/stuRegPerMonth")
	public String stuRegPerMonth(Model model, @RequestParam(required = false, defaultValue = "0") int year) {
		
		// 올해 날짜
		if (year == 0) {
			year = DateUtill.getYear();
		}

		// 2. map으로 하기
		List<Map<String, Integer>> mapList = memberService.getMonthlyData2(year);

		List<Map<String, Integer>> resultList = new ArrayList<>();

		for (Map<String, Integer> map : mapList) {

			// 키는 문자열, 값은 숫자
			Map<String, Integer> map1 = new TreeMap<>(map); // 순번 추가
			resultList.add(map1);

			// map에 들어잇는 모든 키값
			Set<String> keySet = map1.keySet();

			for (String key : keySet) {
				System.out.println("key : " + key + " / value = " + map1.get(key));
			}
			System.out.println();

		}

		model.addAttribute("mapList", resultList);

		// year라는 이름으로 맨처음엔 올해년도를 넘기고, ajax를 타고 오면 해당연도를 넘긴다.
		model.addAttribute("year", year);

		// 올해 연도 넘기기
		model.addAttribute("sysYear", DateUtill.getYear());

		return "content/member/stu_reg_per_month";
	}
	
	
	// 월별 통계 - 차트
	@ResponseBody
	@PostMapping("/getChartDataAjax")
	public Map<String, List<Integer>> getChartDataAjax(int year) {
		
		
		List<StatisticsVO> list = memberService.getMonthlyData(year); 

		// 등록 학생 list
		List<Integer> cntList = list.get(0).getDataToList();
		System.out.println(cntList);
		// 추가사항 list
		// List<Integer> somethingElse = list.get(1).getDataToList();
		
		// 두 개의 리스트를 담을 수 있는 Map
		Map<String, List<Integer>> map = new HashMap<>();
		map.put("cntList", cntList);
		
		return map;
	}
	
	
}
	
	
	


























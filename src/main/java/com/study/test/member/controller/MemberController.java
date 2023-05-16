package com.study.test.member.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.member.service.memberService;
import com.study.test.member.vo.MemberVO;
import com.study.test.util.MailService;
import com.study.test.util.MailVO;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;

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
	
	// 비밀번호 찾기
	@ResponseBody
	@PostMapping("/findPwAjax")
	public boolean findPw(MemberVO memberVO) {
		
		String imsiPw = mailService.createRandomPw();
		
		String encodedPw = encoder.encode(imsiPw);
		memberVO.setMemPw(encodedPw);
		memberService.updateMemPw(memberVO);
		
		String memEmail = memberService.getMemEmail(memberVO);
		if(memEmail != null) {
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
	
	
	
	
}



























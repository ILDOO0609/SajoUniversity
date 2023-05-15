package com.study.test.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.member.service.memberService;
import com.study.test.member.vo.MemberVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/member")
public class MemberController {
	
	@Resource(name = "memberService")
	private memberService memberService;
	
	

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
		
		
		memberService.join(memberVO);
		
		return "redirect:/";
	}
}

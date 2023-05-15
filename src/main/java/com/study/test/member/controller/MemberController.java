package com.study.test.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.test.member.service.memberService;
import com.study.test.member.vo.MemberVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/member")
public class MemberController {
	
	@Resource(name = "memberService")
	private memberService memberService;
	
	@GetMapping("/loginForm")
	public String login() {
		
		return "main";
	}

	@PostMapping("/logout")
	public String logout() {
		
		return "main";
	}
	
	// 회원 가입
	@PostMapping("/join")
	public String join(MemberVO memberVO) {
		
		
		memberService.join(memberVO);
		
		return "redirect:/";
	}
}

package com.study.test.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member")
public class MemberController {
	@GetMapping("/loginForm")
	public String login() {
		
		return "main";
	}

	@PostMapping("/logout")
	public String logout() {
		
		return "main";
	}
}

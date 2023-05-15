package com.study.test.school.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/school")
public class SchoolController {

	
	@GetMapping("/main")
	public String schoolMain() {
		
		return "content/school/school_main";
	}

	
	@GetMapping("/info")
	public String schoolInfo() {
		
		return "content/school/school_info";
	}

}

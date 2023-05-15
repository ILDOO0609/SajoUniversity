package com.study.test.lecture.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import oracle.jdbc.proxy.annotation.GetProxy;

@Controller
@RequestMapping("/lecture")
public class LectureController {
	//강의 리스트로 이동
	@GetMapping("/lectureList")
	public String lectureList() {
		return "lecture_list";
	}
	
	//강의 등록
	@GetMapping("/regLecture")
	public String regLecture() {
		return "redirect:/lecture/lectureList";
	}
}

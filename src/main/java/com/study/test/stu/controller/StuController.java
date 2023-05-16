package com.study.test.stu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/stu")
public class StuController {

	// 학생 커뮤니티
	@GetMapping("/stuBoard")
	public String stuBoard() {
		
		return "content/stu/stu_board";
	}
	
	// 학생 정보 조회
	@GetMapping("/stuInfo")
	public String stuInfo() {
		
		
		
		return "content/stu/stu_info";
	}
	
	
	// 복수전공 신청
	@GetMapping("/stuMultimajor")
	public String stuMultimajor() {
		
		return "content/stu/stu_multimajor";
		
	}
	
	
	// 수강신청
	@GetMapping("/stuSemEnroll")
	public String stuSemEnroll() {
		
		return "content/stu/stu_sem_enroll";
		
	}
	
	
	// 휴학신청
	@GetMapping("/stuStatus")
	public String stuStatus() {
		
		return "content/stu/stu_status";
		
	}
	
	
	// 학생 시간표
	@GetMapping("/stuTimetable")
	public String stuTimetable() {
		
		return "content/stu/stu_timetable";
	}
	
	
	// 학생 커뮤니티 글쓰기
	@GetMapping("/stuBoardWriteForm")
	public String stuBoardWriteForm() {
		
		return "content/stu/stu_board_write_form";
	}
	
}

package com.study.test.stu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.test.board.service.BoardService;
import com.study.test.board.vo.BoardVO;
import com.study.test.stu.service.StuService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/stu")
public class StuController {
	@Resource(name="stuService")
	private StuService stuService;
	
	@Resource(name="boardService")
	private BoardService boardService;
	
	
	
	// 학생 커뮤니티
	@GetMapping("/stuBoard")
	public String stuBoard(BoardVO boardVO, Model model) {
		// 게시글 조회
		model.addAttribute("boardList", boardService.getBoard());
		
		
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

	
	// 학생 커뮤니티 글쓰기페이지로 이동
	@GetMapping("/stuBoardWriteForm")
	public String stuBoardWriteForm() {
		
		return "content/stu/stu_board_write_form";
	}
	
	// 게시글 등록 하기
	@PostMapping("/stuBoardWrite")
	public String stuBoardWrite(BoardVO boardVO) {
		
		return "content/stu/stu_board";
	}
	
	
}

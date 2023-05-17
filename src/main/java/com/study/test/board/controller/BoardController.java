package com.study.test.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.test.board.service.BoardService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/board")
public class BoardController {
	@Resource(name="boardService")
	private BoardService boardService;
	
	// 학생커뮤니티 게시글 상세보기
	@GetMapping("/boardDetail")
	public String boardDetail(Model model) {
		// 게시글 상세보기 조회
		model.addAttribute("boardDetailList");
		
		
		return "content/stu/stu_board_detail";
	}
	
	
}

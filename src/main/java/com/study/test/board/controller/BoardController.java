package com.study.test.board.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.test.board.service.BoardService;
import com.study.test.board.vo.BoardVO;
import com.study.test.member.service.memberService;
import com.study.test.stu.service.StuService;
import com.study.test.util.PageVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/board")
public class BoardController {
	@Resource(name="boardService")
	private BoardService boardService;
	
	@Resource(name="memberService")
	private memberService memberService;
	
	//전체 게시판 목록 페이지
	@GetMapping("/boardList")
	public String boardList(BoardVO boardVO, Model model, PageVO pageVO) {
		// 전체 데이터 수 조회
		pageVO.setTotalDataCnt(boardService.getBoardListCnt());
		pageVO.setPageInfo();
		
		// 게시글 조회 
		model.addAttribute("boardList", boardService.getBoard(pageVO));
		return "content/board/board_list";
	}
	
	//게시글 작성 페이지
	@GetMapping("/boardWriteForm")
	public String boardWriteForm() {
		return "content/board/board_write_form";
	}
	
	// 게시글 등록 하기
	@PostMapping("/boardWrite")
	public String boardWrite(BoardVO boardVO, Authentication authentication) {
		// 작성자 세팅
		boardVO.setBoardWriter(memberService.getMemInfoForStu(authentication.getName()).getMemName());
		
		
		if (boardVO.getIsSecret() == null) {
			boardVO.setIsSecret("N");
		}
		else {
			boardVO.setIsSecret("Y");
		}
		
		boardService.regBoard(boardVO);
		
		return "redirect:/board/boardList";
	}
	
	
	//게시글 상세보기
	@GetMapping("/boardDetail")
	public String boardDetail(Model model, BoardVO boardVO, String boardNo) {
		// 조회수 증가
		boardVO.setBoardReadCnt(boardService.getBoardReadCnt(boardNo));
		boardService.updateReadCnt(boardVO);
		
		// 게시글 상세보기 조회
		model.addAttribute("boardDetailList", boardService.getBoardDetail(boardNo));
		
		
		return "content/board/board_detail";
	}

	@GetMapping("/deleteBoard")
	public String deleteBoard(String boardNo) {
		boardService.deleteBoard(boardNo);
		
		
		return "redirect:/board/boardList";
	}
	
	@GetMapping("/updateBoard")
	public String updateBoard() {
		
		return "redirect:/board/boardList";
	}

	
	
}

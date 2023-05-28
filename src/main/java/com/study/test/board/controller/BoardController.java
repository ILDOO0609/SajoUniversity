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
	
	// 학생 커뮤니티
	@GetMapping("/stuBoard")
	public String stuBoard(BoardVO boardVO, Model model, PageVO pageVO) {
		
		// 전체 데이터 수 조회
		pageVO.setTotalDataCnt(boardService.getBoardListCnt());
		pageVO.setPageInfo();
		
		// 게시글 조회
		model.addAttribute("boardList", boardService.getBoard(pageVO));
		
		return "content/stu/stu_board";
	}
	
	// 학생 커뮤니티 글쓰기페이지로 이동
	@GetMapping("/stuBoardWriteForm")
	public String stuBoardWriteForm() {
		
		return "content/stu/stu_board_write_form";
	}
	
	
	
	// 게시글 등록 하기
	@PostMapping("/boardWrite")
	public String boardWrite(BoardVO boardVO, Authentication authentication) {
		boardVO.setCateNo("CATE_001");
		// 작성자 세팅
		boardVO.setBoardWriter(memberService.getMemInfoForStu(authentication.getName()).getMemName());
		
		
		if (boardVO.getIsSecret() == null) {
			boardVO.setIsSecret("N");
		}
		else {
			boardVO.setIsSecret("Y");
		}
		
		boardService.regBoard(boardVO);
		
		return "redirect:/board/stuBoard";
	}
	
	
	// 학생커뮤니티 게시글 상세보기
	@GetMapping("/boardDetail")
	public String boardDetail(Model model, BoardVO boardVO, String boardNo) {
		// 조회수 증가
		boardVO.setBoardReadCnt(boardService.getBoardReadCnt(boardNo));
		boardService.updateReadCnt(boardVO);
		
		// 게시글 상세보기 조회
		model.addAttribute("boardDetailList", boardService.getBoardDetail(boardNo));
		
		
		return "content/stu/stu_board_detail";
	}

	@GetMapping("/deleteBoard")
	public String deleteBoard(String boardNo) {
		boardService.deleteBoard(boardNo);
		
		
		return "redirect:/board/stuBoard";
	}
	
	@GetMapping("/updateBoard")
	public String updateBoard() {
		
		return "redirect:/board/stuBoard";
	}

	
	
}

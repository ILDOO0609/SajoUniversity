package com.study.test.board.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.study.test.board.service.BoardService;
import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.BoardImgVO;
import com.study.test.board.vo.BoardListSearchVO;
import com.study.test.board.vo.BoardVO;
import com.study.test.member.service.memberService;
import com.study.test.reply.service.ReplyService;
import com.study.test.stu.service.StuService;
import com.study.test.util.PageVO;
import com.study.test.util.UploadUtil;

import groovyjarjarantlr4.v4.parse.GrammarTreeVisitor.mode_return;
import jakarta.annotation.Resource;

@Controller
@RequestMapping("/board")
public class BoardController {
	@Resource(name="boardService")
	private BoardService boardService;
	
	@Resource(name="memberService")
	private memberService memberService;
	
	@Resource(name = "replyService")
	private ReplyService replyService;
	
	//게시판 카테고리 관리 페이지
	@GetMapping("/boardCateManage")
	public String boardCateManage(Model model) {
		
		// 카테고리 목록 조회
		model.addAttribute("cateList", boardService.getCateList());
		
		return "content/board/board_cate_manage";
	}
	
	// 카테고리 등록
	@ResponseBody
	@PostMapping("/regCategoryAjax")
	public void regCategory(String cateName) {
		boardService.regCategory(cateName);
	}

	// 카테고리명 중복체크
	@ResponseBody
	@PostMapping("/checkCateNameAjax")
	public int checkCateName(String cateName) {
		// 카테고리명 중복 여부 체크 쿼리
		return boardService.checkCateName(cateName);
	}

	// 카테고리 등록 후 실행되는 카테고리 목록 조회
	@ResponseBody
	@PostMapping("/getCateListAjax")
	public List<BoardCategoryVO> getCateListAjax() {
		return boardService.getCateList();
	}
	// 카테고리 사용여부 수정
	@ResponseBody
	@PostMapping("/changeIsUseAjax")
	public int changeIsUse(String cateNo) {
		return boardService.changeIsUse(cateNo);
	}

	// 카테고리 삭제
	@GetMapping("/deleteCate")
	public String deleteCate(String cateNo) {
		boardService.deleteCate(cateNo);
		return "redirect:/board/boardCateManage";
	}
	
	//전체 게시판 목록 페이지
	@GetMapping("/boardList")
	public String boardList(BoardVO boardVO, Model model, PageVO pageVO) {

		// 전체 데이터 수 조회
		pageVO.setTotalDataCnt(boardService.getBoardListCnt());
		pageVO.setPageInfo();
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("pageVO", pageVO);
		
		//카테고리 목록 조회
		model.addAttribute("cateList", boardService.getCateList());
		// 게시글 조회 
		model.addAttribute("boardList", boardService.getBoard(map));
		return "content/board/board_list";
	}
	
	//게시판 카테고리로 검색
	@ResponseBody
	@PostMapping("/cateSearchAjax")
	public List<BoardVO> boardList(String cateNo, PageVO pageVO){
		
		// 전체 데이터 수 조회
		pageVO.setTotalDataCnt(boardService.getBoardListCnt());
		pageVO.setPageInfo();
		
		HashMap<String, Object> map = new HashMap<>();
		
		map.put("pageVO", pageVO);
		map.put("cateNo", cateNo);
		return boardService.getBoard(map); 
	}
	
	
	//게시글 작성 페이지
	@GetMapping("/boardWriteForm")
	public String boardWriteForm(Model model) {
		model.addAttribute("cateList", boardService.getCateList());
		return "content/board/board_write_form";
	}
	
	// 게시글 등록 하기
	@PostMapping("/regBoard")
	public String boardWrite(BoardVO boardVO, Authentication authentication, MultipartFile mainImg) {
		User user = (User)authentication.getPrincipal();
		
		boardVO.setBoardImgVO(UploadUtil.uploadFile(mainImg)); 
		boardVO.setCateNo(boardVO.getBoardCategoryVO().getCateNo());
		// 작성자 세팅
		boardVO.setBoardWriter(user.getUsername());
		
		//게시글번호 세팅
		String nextBoardNo = boardService.getNextBoardNo();
		boardVO.setBoardNo(nextBoardNo);
		
		if(boardVO.getBoardImgVO() != null) {
			boardVO.getBoardImgVO().setBoardNo(nextBoardNo);
		}
		
		if (boardVO.getIsSecret() == null) {
			boardVO.setIsSecret("N");
		}
		else {
			boardVO.setIsSecret("Y");
		}
		
		if (boardVO.getIsNotice() == null) {
			boardVO.setIsNotice("N");
		}
		else {
			boardVO.setIsNotice("Y");
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
		model.addAttribute("boardDetail", boardService.getBoardDetail(boardNo));
		
		//댓글 목록 조회
		model.addAttribute("replyList",replyService.getReplyList(boardNo)); 
		
		return "content/board/board_detail";
	}

	@GetMapping("/deleteBoard")
	public String deleteBoard(String boardNo) {
		boardService.deleteBoard(boardNo);
		
		
		return "redirect:/board/boardList";
	}
	
	//게시글 수정 페이지
	@GetMapping("/updateBoard")
	public String updateBoard(String boardNo, Model model) {
		model.addAttribute("cateList", boardService.getCateList());
		model.addAttribute("boardDetail", boardService.getBoardDetail(boardNo));
		return "content/board/update_board_form";
	}
	
	//게시글 수정
	@PostMapping("/updateBoard")
	public String updateBoard(BoardVO boardVO, MultipartFile mainImg) {
		
		boardVO.setBoardImgVO(UploadUtil.uploadFile(mainImg)); 
		
		if (boardVO.getIsSecret() == null) {
			boardVO.setIsSecret("N");
		}
		else {
			boardVO.setIsSecret("Y");
		}
		
		if (boardVO.getIsNotice() == null) {
			boardVO.setIsNotice("N");
		}
		else {
			boardVO.setIsNotice("Y");
		} 
		
		System.out.println(boardVO);
		boardService.updateBoard(boardVO);
		return "redirect:/board/boardList";
	}

	//게시글 검색
	@ResponseBody
	@PostMapping("/searchBoardAjax")
	public List<BoardVO> searchBoardAjax(BoardListSearchVO boardListSearchVO, PageVO pageVO){
		System.out.println(boardListSearchVO);
		HashMap<String, Object> map = new HashMap<>();
		map.put("boardListSearchVO", boardListSearchVO);
		map.put("pageVO", pageVO);
		System.out.println(map);
		return boardService.getBoardForSearch(map); 
	}
	
}

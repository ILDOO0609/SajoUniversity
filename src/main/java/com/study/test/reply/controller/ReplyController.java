package com.study.test.reply.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.test.reply.service.ReplyService;
import com.study.test.reply.vo.ReplyVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/reply")
public class ReplyController {
	@Resource(name="replyService")
	private ReplyService replyService;
	
	//댓글 등록
	@PostMapping("/regReply")
	public String regReply(ReplyVO replyVO, Authentication authentication) {
		User user = (User) authentication.getPrincipal();
		replyVO.setReplyWriter(user.getUsername());
		//댓글 등록
		replyService.regReply(replyVO);
		return "redirect:/board/boardDetail?boardNo="+replyVO.getBoardNo();
	}
		
	//댓글 삭제
	@GetMapping("/deleteReply")
	public String deleteReply(int replyNo, String boardNo) {
		replyService.deleteReply(replyNo);
		return "redirect:/board/boardDetail?boardNo="+boardNo;
	}
	
	//댓글 수정
	@PostMapping("/updateReply")
	public String updateReply(ReplyVO replyVO) {
		replyService.updateReply(replyVO);
		
		return "redirect:/board/boardDetail?boardNo="+ replyVO.getBoardNo(); 
	}
}

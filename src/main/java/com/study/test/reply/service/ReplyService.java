package com.study.test.reply.service;

import java.util.List;

import com.study.test.reply.vo.ReplyVO;


public interface ReplyService {
	//댓글 등록
	void regReply(ReplyVO replyVO);
	
	//댓글 목록 조회
	List<ReplyVO> getReplyList(String boardNo);
	
	//댓글 삭제
	void deleteReply(ReplyVO replyVO);
	
	//댓글 수정
	void updateReply(ReplyVO replyVO);
}

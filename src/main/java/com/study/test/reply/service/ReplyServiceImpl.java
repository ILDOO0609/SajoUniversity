package com.study.test.reply.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.reply.vo.ReplyVO;


@Service("replyService")
public class ReplyServiceImpl implements ReplyService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Override
	public void regReply(ReplyVO replyVO) {
		sqlSession.insert("replyMapper.regReply", replyVO);
	}

	@Override
	public List<ReplyVO> getReplyList(String boardNo) {
		return sqlSession.selectList("replyMapper.getReplyList", boardNo);
	}

	@Override
	public void deleteReply(int replyNo) {
		sqlSession.delete("replyMapper.deleteReply", replyNo);
	}

	@Override
	public void updateReply(ReplyVO replyVO) {
		sqlSession.update("replyMapper.updateReply", replyVO);
	}
}

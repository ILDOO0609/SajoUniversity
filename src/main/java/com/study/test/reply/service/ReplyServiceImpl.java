package com.study.test.reply.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.test.reply.vo.ReplyVO;


@Service("replyService")
public class ReplyServiceImpl implements ReplyService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void regReply(ReplyVO replyVO) {
		sqlSession.insert("replyMapper.regReply", replyVO);
		sqlSession.update("boardMapper.increaseReplyCnt", replyVO);
	}

	@Override
	public List<ReplyVO> getReplyList(String boardNo) {
		return sqlSession.selectList("replyMapper.getReplyList", boardNo);
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void deleteReply(ReplyVO replyVO) {
		sqlSession.delete("replyMapper.deleteReply", replyVO);
		sqlSession.update("boardMapper.decreaseReplyCnt", replyVO);
	}

	@Override
	public void updateReply(ReplyVO replyVO) {
		sqlSession.update("replyMapper.updateReply", replyVO);
	}
}

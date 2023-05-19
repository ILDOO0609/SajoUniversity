package com.study.test.board.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.board.vo.BoardVO;
import com.study.test.util.PageVO;

@Service("boardService")
public class BoardServiceImpl implements BoardService{
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public List<BoardVO> getBoard(PageVO pageVO) {
		return sqlSession.selectList("boardMapper.getBoard", pageVO);
	}

	@Override
	public void regBoard(BoardVO boardVO) {
		sqlSession.insert("boardMapper.regBoard", boardVO);
		
	}

	@Override
	public BoardVO getBoardDetail(String boardNo) {
		return sqlSession.selectOne("boardMapper.getBoardDetail", boardNo);
	}

	@Override
	public void updateReadCnt(BoardVO boardVO) {
		sqlSession.update("boardMapper.updateReadCnt", boardVO);
		
	}

	@Override
	public int getBoardReadCnt(String boardNo) {
		return sqlSession.selectOne("boardMapper.getBoardReadCnt", boardNo);
	}

	@Override
	public void deleteBoard(String boardNo) {
		sqlSession.delete("boardMapper.deleteBoard", boardNo);
		
	}

	@Override
	public int getBoardListCnt() {
		return sqlSession.selectOne("boardMapper.getBoardListCnt");
	}
	
}

package com.study.test.board.service;

import java.util.HashMap;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.BoardListSearchVO;
import com.study.test.board.vo.BoardVO;
import com.study.test.util.PageVO;

@Service("boardService")
public class BoardServiceImpl implements BoardService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//카테고리 목록 조회
	@Override
	public List<BoardCategoryVO> getCateList() {
		return sqlSession.selectList("boardMapper.getCateList");
	}

	//카테고리 등록
	@Override
	public int regCategory(String cateName) {
		return sqlSession.insert("boardMapper.regCategory", cateName);
	}
	
	//카테고리명 중복 체크
	@Override
	public int checkCateName(String cateName) {
		return sqlSession.selectOne("boardMapper.checkCateName", cateName);
	}
	
	//카테고리 사용여부 수정
	@Override
	public int changeIsUse(String cateCode) {
		return sqlSession.update("boardMapper.changeIsUse", cateCode);
	}

	@Override
	public void deleteCate(String cateCode) {
		sqlSession.delete("boardMapper.deleteCate", cateCode);
	}
	
	@Override
	public List<BoardVO> getBoard(BoardListSearchVO boardListSearchVO) {
		return sqlSession.selectList("boardMapper.getBoard", boardListSearchVO);
	}
	
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void regBoard(BoardVO boardVO) {
		sqlSession.insert("boardMapper.regBoard", boardVO);
		if(boardVO.getBoardImgVO() != null) {
			sqlSession.insert("boardMapper.regBoardImg", boardVO.getBoardImgVO());
		}
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
	public int getBoardListCnt(BoardListSearchVO boardListSearchVO) {
		return sqlSession.selectOne("boardMapper.getBoardListCnt", boardListSearchVO);
	}

	@Override
	public String getNextBoardNo() {
		return sqlSession.selectOne("boardMapper.getNextBoardNo");
	}

	@Override
	public void updateBoard(BoardVO boardVO) {
		sqlSession.update("boardMapper.updateBoard", boardVO);
	}

	@Override
	public int getBoardPw(String boardNo) {
		return sqlSession.selectOne("boardMapper.getBoardPw", boardNo);
	}

	@Override
	public List<BoardVO> getBoardForSearch(HashMap<String, Object> map) {
		return sqlSession.selectList("boardMapper.getBoardForSearch", map);
	}

	@Override
	public List<BoardVO> getNotice() {
		return sqlSession.selectList("boardMapper.getNotice");
	}
	
}

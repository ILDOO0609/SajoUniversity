package com.study.test.board.service;

import java.util.List;

import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.BoardVO;
import com.study.test.util.PageVO;

public interface BoardService {
	// 학생커뮤니티 조회
	public List<BoardVO> getBoard(PageVO pageVO);
	
	// 학생커뮤니티 게시글 등록
	public void regBoard(BoardVO boardVO);
	
	// 게시글 상세보기
	public BoardVO getBoardDetail(String boardNo);
	
	// 조회수 증가
	public void updateReadCnt(BoardVO boardVO);
	
	// 조회수를 조회
	public int getBoardReadCnt(String boardNo);
	
	// 게시글 삭제
	public void deleteBoard(String boardNo);
	
	// 전체 데이터 수 조회
	public int getBoardListCnt();
	
	//다음에 조회될 게시판번호
	String getNextBoardNo();
	
	//카테고리 목록 조회
	List<BoardCategoryVO> getCateList();
	
	//카테고리 등록
	int regCategory(String cateName);
	
	//카테고리명 중복 체크
	int checkCateName(String cateName);
	
	//카테고리 사용여부 수정
	int changeIsUse(String cateCode);
	
	//카테고리 삭제
	void deleteCate(String cateCode);
	
}

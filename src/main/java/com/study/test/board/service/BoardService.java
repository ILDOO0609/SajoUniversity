package com.study.test.board.service;

import java.util.HashMap;
import java.util.List;

import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.BoardVO;
import com.study.test.util.PageVO;

public interface BoardService {
	//게시글 조회
	public List<BoardVO> getBoard(HashMap<String, Object>map);
	
	//게시글 검색후 조회
	public List<BoardVO> getBoardForSearch(HashMap<String, Object>map);
	
	//게시글 등록
	public void regBoard(BoardVO boardVO);
	
	// 게시글 상세보기
	public BoardVO getBoardDetail(String boardNo);
	
	// 조회수 증가
	public void updateReadCnt(BoardVO boardVO);
	
	// 조회수를 조회
	public int getBoardReadCnt(String boardNo);
	
	// 게시글 삭제
	public void deleteBoard(String boardNo);
	
	//게시판 수정
	void updateBoard(BoardVO boardVO);
	
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
	
	//비밀번호 조회
	int getBoardPw(String boardNo);
	
}

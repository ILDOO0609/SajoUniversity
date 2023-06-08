package com.study.test.library.service;

import java.util.List;

import com.study.test.library.vo.LibraryVO;

public interface LibraryService {
	// 신청현황 조회
	LibraryVO getLibInfo(String memNo);
	
	// 좌석 신청
	void regLibSeat(LibraryVO libraryVO);
	
	// 이용중인 좌석 조회
	List<LibraryVO> getSeatInfo();
	
	// 이용중 좌석 숫자 조회
	int getCountSeat();
}

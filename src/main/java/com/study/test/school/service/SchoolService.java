package com.study.test.school.service;

import java.util.List;

import com.study.test.school.vo.PrenextPageVO;
import com.study.test.school.vo.SchoolInfoVO;

public interface SchoolService {

	//학사안내 게시글 등록
	void insertSchoolInfo(SchoolInfoVO schoolInfoVO);

	//학사안내 게시글 목록
	List<SchoolInfoVO> getSchoolInfoList();
	
	//학사안내 게시글 -> 상세조회 
	SchoolInfoVO schoolBoardDetail(String schInfoCode);
	
	//학사안내 게시글 조회수
	void updateSchoolBoardReadCnt(String schInfoCode);
	
	//학사안내 게시글 이전글 다음글
	List<PrenextPageVO> detailPreNext();
	
	//학사안내 게시글 -> 상세 -> 수정페이지 이동
	String updateSchoolInfoForm(String schInfoCode);
	
	//학사안내 게시글 -> 상세 -> 수정
	void updateSchoolInfo(SchoolInfoVO schoolInfoVO);
	
	//학사안내 게시글 -> 상세 -> 삭제
	void deleteSchoolInfo(String schInfoCode); 
	
}

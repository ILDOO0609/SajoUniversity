package com.study.test.school.service;

import java.util.List;

import com.study.test.colleage.vo.DeptVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.school.vo.PrenextPageVO;
import com.study.test.school.vo.SchSearchVO;
import com.study.test.school.vo.SchoolInfoVO;
import com.study.test.util.PageVO;

public interface SchoolService {

	//학사안내 게시글 등록
	void insertSchoolInfo(SchoolInfoVO schoolInfoVO);

	//학사안내 게시글 목록
	List<SchoolInfoVO> getSchoolInfoList(PageVO pageVO);
	
	//학사안내 게시글 -> 상세조회 
	SchoolInfoVO schoolBoardDetail(String schInfoCode);
	
	//학사안내 게시글 조회수
	void updateSchoolBoardReadCnt(String schInfoCode);
	
	//학사안내 게시글 이전글 다음글
	SchoolInfoVO movePage(String schInfoCode);
	
	//학사안내 게시글 -> 상세 -> 수정페이지 이동
	String updateSchoolInfoForm(String schInfoCode);
	
	//학사안내 게시글 -> 상세 -> 수정
	void updateSchoolInfo(SchoolInfoVO schoolInfoVO);
	
	//학사안내 게시글 -> 상세 -> 삭제
	void deleteSchoolInfo(String schInfoCode); 
	
	//학사안내 게시글 전체 데이터 수 조회
	int schInfoListCnt();
	
	
// -------학사 조회------------------------------------------------------	
	//강의등록시 전공대학 선택시 해당하는 전공학과 이름 조회
	List<DeptVO> getDeptNameAjax(String collNo);
	
// -------회원메뉴 회원조회------------------------------------------------------
	List<MemberVO> selectMember();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

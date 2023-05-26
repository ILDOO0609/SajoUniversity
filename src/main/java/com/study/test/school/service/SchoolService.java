package com.study.test.school.service;

import java.util.List;

import com.study.test.colleage.vo.DeptVO;
import com.study.test.emp.vo.EmpVO;
import com.study.test.emp.vo.LectureVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.school.vo.CalendarVO;
import com.study.test.school.vo.SchoolInfoVO;
import com.study.test.stu.vo.StuVO;
import com.study.test.util.PageVO;

public interface SchoolService {

	//학사안내 게시글 등록
	void insertSchoolInfo(SchoolInfoVO schoolInfoVO);

	//학사안내 게시글 목록조회
	List<SchoolInfoVO> getSchoolInfoList(SchoolInfoVO schoolInfoVO);
	
	//학사안내 목록조회 -> 검색
	List<SchoolInfoVO> searchInfoListAjax(SchoolInfoVO schoolInfoVO);
	
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
	

	//학사일정 일정 목록
	List<CalendarVO> calendarList();
	
	
	
	
// -------학사 조회------------------------------------------------------	
	//강의등록시 전공대학 선택시 해당하는 전공학과 이름 조회
	List<DeptVO> getDeptNameAjax(String collNo);
	
	//학생 조회
	List<StuVO> checkStuList();
	
	//교수&교직원 조회
	List<EmpVO> checkProList();
	//교수&교직원 검색
	List<LectureVO> searchProListAjax(LectureVO lectureVO);
	
	
	
// -------회원메뉴 회원조회------------------------------------------------------
	List<MemberVO> selectMember();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

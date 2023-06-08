package com.study.test.school.service;

import java.util.List;

import com.study.test.colleage.vo.DeptVO;
import com.study.test.colleage.vo.SemesterVO;
import com.study.test.emp.vo.EmpVO;
import com.study.test.emp.vo.LectureVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.school.vo.CalendarVO;
import com.study.test.school.vo.ProbationStatusVO;
import com.study.test.school.vo.ProbationVO;
import com.study.test.school.vo.SchoolInfoVO;
import com.study.test.stu.vo.DeptManageVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;

public interface SchoolService {

	//학사안내 게시글 등록
	void insertSchoolInfo(SchoolInfoVO schoolInfoVO);

	//학사안내 게시글 목록조회
	List<SchoolInfoVO> getSchoolInfoList(SchoolInfoVO schoolInfoVO);
	//학사안내 목록조회 -> 검색
	List<SchoolInfoVO> searchInfoListAjax(SchoolInfoVO schoolInfoVO);
	//학사안내 목록조회 -> 월 셀렉박스 변경시 
	List<SchoolInfoVO> schInfoMonthAjax(int schInfoMonth);
	
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
	List<StuVO> checkStuList(StuVO stuVO);
	//학생 조회 -> 검색
	List<StuVO> searchStuListAjax(StuVO stuVO);
	//학생 조회 -> 회원클릭시 모달창
	List<StuVO> checkStuModal(String stuNo);
	//학생 수 조회
	int getStuListCnt();
	
	//교수 조회
	List<EmpVO> checkProList(LectureVO lectureVO);
	//교직원 조회
	List<MemberVO> checkStfList(MemberVO memberVO);
	
	//교수 검색
	List<LectureVO> searchProListAjax(LectureVO lectureVO);
	//교직원 검색
	List<MemberVO> searchStfListAjax(MemberVO memberVO);

	//교수 조회 -> 클릭시 모달창
	List<LectureVO> checkProModal(String empNo);
	
// -------학적변동------------------------------------------------------	
	
	//학적변동 -> 휴학관리 대기조회
	List<StatusInfoVO> getStatusInfoList();
	//학적변동 -> 휴학 승인완료조회
	List<StatusInfoVO> getStatusInfoAppList();
	//학적변동 -> 휴학 승인취소조회
	List<StatusInfoVO> getStatusInfoDeniedList();
	
	//학적변동 -> 휴학신청 회원조회
	String updateLeaveSelect(String statusNo);
	//학적변동 -> 휴학신청 승인완료
	void updateLeaveApp(StatusInfoVO statusInfoVO);
	//학적변동 -> 휴학신청 승인취소
	void updateLeaveDenied(StatusInfoVO statusInfoVO);
	//학적변동 -> 휴학신청 -> 상세모달
	List<StuVO> checkLeaveModal(String statusNo);
	
	
	//학적변동 -> 복학관리 대기조회
	List<StatusInfoVO> getStatusReturnList();
	//학적변동 -> 복학관리 승인완료조회
	List<StatusInfoVO> getStatusReturnAppList();
	//학적변동 -> 복학관리 승인취소조회
	List<StatusInfoVO> getStatusReturnDeniedList();
	
	//학적변동 -> 복학신청 회원조회
	String updateReturnSelect(String statusNo);
	//학적변동 -> 복학승인 승인완료
	void updateReturnApp(StatusInfoVO statusInfoVO);
	//학적변동 -> 복학승인 승인취소
	void updateReturnDenied(StatusInfoVO statusInfoVO);
	//학적변동 -> 복학관리 -> 회원클릭시 모달창
	List<StuVO> checkReturnModal(String statusNo);

	
// -------수업메뉴 ------------------------------------------------------	

	//수업메뉴 -> 복수전공관리 -> 승인대기 및 전체조회
	List<DeptManageVO> getDeptManageList();
	//수업메뉴 -> 복수전공관리 -> 승인완료 조회
	List<DeptManageVO> getDeptManageAppList();
	//수업메뉴 -> 복수전공관리 -> 승인취소 조회
	List<DeptManageVO> getDeptManageDeniedList();
	
	//수업메뉴 -> 복수전공관리 ->복수신청 회원조회
	String updateDoubleSelect(String applyNo);
	//수업메뉴 -> 복수전공관리 ->복수신청 승인완료
	void updateDoubleApp(DeptManageVO deptManageVO);
	//수업메뉴 -> 복수전공관리 ->복수신청 승인취소
	void updateDoubleDenied(DeptManageVO deptManageVO);
	//수업메뉴 -> 복수전공관리 ->회원클릭시 모달창
	List<DeptManageVO> checkDoubleModal(String applyNo);
	
	//수업메뉴 -> 학사징계관리 -> 징계사유 조회
	List<ProbationStatusVO> getProbStatusList();
	//수업메뉴 -> 학사징계관리 -> 학년학기 조회
	List<SemesterVO> getStuYearSem();
	//수업메뉴 -> 학사징계관리 -> 학생검색
	List<StuVO> searchProbStuList(StuVO stuVO);
	//수업메뉴 -> 학사징계관리 -> 학사경고 인서트
	void insertProbation(ProbationVO probationVO);
	//수업메뉴 -> 학사징계관리 -> 학생상세모달
	List<StuVO> getProbStuModal(String stuNo);
	
	
// -------회원메뉴 회원조회------------------------------------------------------
	//신규회원 전체조회
	List<MemberVO> selectMemberList();
	
	//신규회원 업데이트할 회원 조회
	MemberVO selectMember(String memNo);
	
	//신규회원(승인) 업데이트
	void updatePosition(String memNo);
	
	//신규회원(거절) 업데이트
	void updateXPosition(String memNo);
	
	//신규회원 업데이트 정보인서트 
	void insertStu(StuVO stuVO);
	void insertEmp(StuVO stuVO);
	
	//승인/취소 전체조회
	List<MemberVO> selectMemberTotalList(MemberVO memberVO);
	//승인/취소 조회 -> 승인완료 조회
	List<MemberVO> selectMemberAddList(MemberVO memberVO);
	//승인/취소 조회 -> 승인취소 조회
	List<MemberVO> selectMemberDeniedList(MemberVO memberVO);
	//승인/취소 전체 데이터 조회 -> 페이징
	int getMemberListCnt();
	//승인완료 전체 데이터 조회 -> 페이징
	int getMemberAddListCnt();
	//승인취소 전체 데이터 조회 -> 페이징
	int getMemberDeniedListCnt();
	
	//회원클릭시 회원상에 모달창
	List<MemberVO> getMemberModal(String memNo);
	
	
}

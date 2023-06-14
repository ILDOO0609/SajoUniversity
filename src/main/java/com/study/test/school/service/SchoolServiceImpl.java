package com.study.test.school.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.test.colleage.vo.DeptVO;
import com.study.test.colleage.vo.SemesterVO;
import com.study.test.emp.vo.EmpVO;
import com.study.test.emp.vo.LectureVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.school.vo.CalendarVO;
import com.study.test.school.vo.ProbationStatusVO;
import com.study.test.school.vo.ProbationVO;
import com.study.test.school.vo.SchInfoFileVO;
import com.study.test.school.vo.SchoolInfoVO;
import com.study.test.school.vo.SearchVO;
import com.study.test.stu.vo.DeptManageVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;
import com.study.test.util.PageVO;

import groovyjarjarpicocli.CommandLine.Help.Ansi.Style;

@Service("schoolService")
public class SchoolServiceImpl implements SchoolService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//학사안내 게시글 등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void insertSchoolInfo(SchoolInfoVO schoolInfoVO) {
		sqlSession.insert("schoolMapper.insertSchoolInfo", schoolInfoVO);
		//파일등록
		if(schoolInfoVO.getFileList().size() != 0) {
			sqlSession.insert("schoolMapper.insertInfoFile", schoolInfoVO);
		}
	}
	//학사안내 다음 등록될 글 조회
	@Override
	public String getNextInfoCode() {
		return sqlSession.selectOne("schoolMapper.getNextInfoCode");
	}
	
	//학사안내 게시글 목록조회
	@Override
	public List<SchoolInfoVO> getSchoolInfoList(SchoolInfoVO schoolInfoVO) {
		return sqlSession.selectList("schoolMapper.getSchoolInfo", schoolInfoVO);
	}
	//학사안내 게시글 목록조회 -> 검색
	@Override
	public List<SchoolInfoVO> searchInfoListAjax(SchoolInfoVO schoolInfoVO) {
		return sqlSession.selectList("schoolMapper.getSchoolInfo", schoolInfoVO);
	}
	//학사안내 게시글 월 셀렉박스 
	@Override
	public List<SchoolInfoVO> schInfoMonthAjax(int schInfoMonth) {
		return sqlSession.selectList("schoolMapper.schInfoMonthAjax", schInfoMonth);
	}
	
	//학사안내 게시글 -> 상세조회 
	@Override
	public SchoolInfoVO schoolBoardDetail(String schInfoCode) {
		return sqlSession.selectOne("schoolMapper.schoolBoardDetail", schInfoCode);
	}
	//학사안내 게시글 -> 파일조회 
	@Override
	public List<SchInfoFileVO> getFileList(String schInfoCode) {
		return sqlSession.selectList("schoolMapper.getFileList", schInfoCode);
	}
	//학사안내 게시글 조회수
	@Override
	public void updateSchoolBoardReadCnt(String schInfoCode) {
		sqlSession.update("schoolMapper.updateSchoolBoardReadCnt", schInfoCode);
	}
	
	//학사안내 게시글 이전글 다음글
	@Override
	public SchoolInfoVO movePage(String schInfoCode) {
		return sqlSession.selectOne("schoolMapper.movePage", schInfoCode);
	}
	
	//학사안내 게시글 -> 상세 -> 수정페이지 이동
	@Override
	public String updateSchoolInfoForm(String schInfoCode) {
		return sqlSession.selectOne("schoolMapper.schoolBoardDetail", schInfoCode);
	}
	
	//학사안내 게시글 -> 상세 -> 수정
	@Override
	public void updateSchoolInfo(SchoolInfoVO schoolInfoVO) {
		sqlSession.update("schoolMapper.updateSchoolInfo", schoolInfoVO);
	}
	
	//학사안내 게시글 -> 상세 -> 삭제
	@Override
	public void deleteSchoolInfo(String schInfoCode) {
		sqlSession.delete("schoolMapper.deleteSchoolInfo", schInfoCode);
	}
	
	//학사안내 게시글 전체 데이터 수 조회
	@Override
	public int schInfoListCnt() { 
		return sqlSession.selectOne("schoolMapper.schInfoListCnt");
	}
	
	//학사일정 일정 목록
	@Override
	public List<CalendarVO> calendarList() {
		return sqlSession.selectList("calendarMapper.calendarList");
	}
	
	
//-------------------학사조회-----------------------------------------------------------
	
	//전공대학 선택시 해당하는 전공학과 이름 조회
	@Override
	public List<DeptVO> getDeptNameAjax(String collNo) {
		return sqlSession.selectList("schoolMapper.getDeptNameAjax", collNo);
	}
	
	//학생 조회
	@Override
	public List<StuVO> checkStuList(StuVO stuVO) {
		return sqlSession.selectList("schoolMapper.checkStuList",stuVO);
	}
	//학생 조회 -> 검색
	@Override
	public List<StuVO> searchStuListAjax(StuVO stuVO) {
		return sqlSession.selectList("schoolMapper.checkStuList", stuVO);
	}
	//학생 조회 -> 회원클릭시 모달창
	@Override
	public List<StuVO> checkStuModal(String stuNo) {
		return sqlSession.selectList("schoolMapper.checkStuModal", stuNo);
	}
	//학생 수 조회
	@Override
	public int getStuListCnt() {
		return sqlSession.selectOne("schoolMapper.getStuListCnt");
	}

	
	
	
	
	//교수 조회
	@Override
	public List<EmpVO> checkProList(LectureVO lectureVO) {
		return sqlSession.selectList("schoolMapper.checkProList", lectureVO);
	}
	//교직원 조회
	@Override
	public List<MemberVO> checkStfList(MemberVO memberVO) {
		return sqlSession.selectList("schoolMapper.checkStfList", memberVO);
	}

	
	//교수 조회->검색
	@Override
	public List<LectureVO> searchProListAjax(LectureVO lectureVO) {
		return sqlSession.selectList("schoolMapper.checkProList", lectureVO);
	}
	//교직원 조회->검색
	@Override
	public List<MemberVO> searchStfListAjax(MemberVO memberVO) {
		return sqlSession.selectList("schoolMapper.checkStfList", memberVO);
	}
	
	//교수 조회 -> 클릭시 모달창
	@Override
	public List<LectureVO> checkProModal(String empNo) {
		return sqlSession.selectList("schoolMapper.checkProModal", empNo);
	}
	//교직원 조회 -> 클릭시 모달창
	@Override
	public List<MemberVO> checkStfModal(String memNo) {
		return sqlSession.selectList("schoolMapper.checkStfModal", memNo);
	}
	
	
	
// -------학적변동------------------------------------------------------	
	//학적변동 -> 휴학관리 대기조회
	@Override
	public List<StatusInfoVO> getStatusInfoList(SearchVO searchVO) {
		return sqlSession.selectList("schoolMapper.getStatusInfoList", searchVO);
	}
	//학적변동 -> 휴학승인 승인완료조회
	@Override
	public List<StatusInfoVO> getStatusInfoAppList() {
		// TODO Auto-generated method stub
		return sqlSession.selectList("schoolMapper.getStatusInfoAppList");
	}
	//학적변동 -> 휴학승인 승인취소조회
	@Override
	public List<StatusInfoVO> getStatusInfoDeniedList() {
		return sqlSession.selectList("schoolMapper.getStatusInfoDeniedList");
	}
	
	//학적변동 -> 휴학신청 회원조회
	@Override
	public String updateLeaveSelect(String statusNo) {
		return sqlSession.selectOne("schoolMapper.updateLeaveSelect", statusNo);
	}
	//학적변동 -> 휴학신청 승인완료
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void updateLeaveApp(StatusInfoVO statusInfoVO) {
		sqlSession.update("schoolMapper.updateLeaveApp", statusInfoVO);
		sqlSession.update("schoolMapper.updateLeaveAppStu",statusInfoVO);
	}
	//학적변동 -> 휴학신청 승인취소
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void updateLeaveDenied(StatusInfoVO statusInfoVO) {
		sqlSession.update("schoolMapper.updateLeaveDenied", statusInfoVO);
		sqlSession.update("schoolMapper.updateLeaveDeniedStu", statusInfoVO);
	}
	//학적변동 -> 휴학신청 -> 상세모달
	@Override
	public List<StuVO> checkLeaveModal(String statusNo) {
		return sqlSession.selectList("schoolMapper.checkLeaveModal", statusNo);
	}
	
	
	
	
	
	//학적변동 -> 복학관리 대기조회
	@Override
	public List<StatusInfoVO> getStatusReturnList(SearchVO searchVO) {
		return sqlSession.selectList("schoolMapper.getStatusReturnList", searchVO);
	}
	//학적변동 -> 복학관리 승인완료조회
	@Override
	public List<StatusInfoVO> getStatusReturnAppList() {
		return sqlSession.selectList("schoolMapper.getStatusReturnAppList");
	}
	//학적변동 -> 복학관리 승인취소조회
	@Override
	public List<StatusInfoVO> getStatusReturnDeniedList() {
		return sqlSession.selectList("schoolMapper.getStatusReturnDeniedList");
	}
	
	//학적변동 -> 복학신청 회원조회
	@Override
	public String updateReturnSelect(String statusNo) {
		return sqlSession.selectOne("schoolMapper.updateReturnSelect", statusNo);
	}
	//학적변동 -> 복학신청 승인완료
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void updateReturnApp(StatusInfoVO statusInfoVO) {
		sqlSession.update("schoolMapper.updateReturnApp", statusInfoVO);
		sqlSession.update("schoolMapper.updateReturnAppStu", statusInfoVO);
	}
	//학적변동 -> 복학신청 승인취소
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void updateReturnDenied(StatusInfoVO statusInfoVO) {
		sqlSession.update("schoolMapper.updateReturnDenied", statusInfoVO);
		sqlSession.update("schoolMapper.updateReturnDeniedStu", statusInfoVO);
	}
	//학적변동 -> 복학관리 -> 회원클릭시 모달창
	@Override
	public List<StuVO> checkReturnModal(String statusNo) {
		return sqlSession.selectList("schoolMapper.checkReturnModal", statusNo);
	}
	
	
	
	
	

// -------수업메뉴 ------------------------------------------------------	

	//수업메뉴 -> 복수전공관리 -> 승인대기 및 전체조회
	@Override
	public List<DeptManageVO> getDeptManageList(SearchVO searchVO) {
		return sqlSession.selectList("schoolMapper.getDeptManageList", searchVO);
	}
	//수업메뉴 -> 복수전공관리 -> 승인완료 조회
	@Override
	public List<DeptManageVO> getDeptManageAppList() {
		return sqlSession.selectList("schoolMapper.getDeptManageAppList");
	}
	//수업메뉴 -> 복수전공관리 -> 승인취소 조회
	@Override
	public List<DeptManageVO> getDeptManageDeniedList() {
		return sqlSession.selectList("schoolMapper.getDeptManageDeniedList");
	}
	
	
	//수업메뉴 -> 복수전공관리 ->복수신청 회원조회
	@Override
	public String updateDoubleSelect(String applyNo) {
		return sqlSession.selectOne("schoolMapper.updateDoubleSelect", applyNo);
	}
	//수업메뉴 -> 복수전공관리 ->복수신청 승인완료
	@Override
	public void updateDoubleApp(DeptManageVO deptManageVO) {
		sqlSession.update("schoolMapper.updateDoubleApp", deptManageVO);
	}
	//수업메뉴 -> 복수전공관리 ->복수신청 승인취소
	@Override
	public void updateDoubleDenied(DeptManageVO deptManageVO) {
		sqlSession.update("schoolMapper.updateDoubleDenied", deptManageVO);
	}
	
	//수업메뉴 -> 복수전공관리 ->회원클릭시 모달창
	@Override
	public List<DeptManageVO> checkDoubleModal(String applyNo) {
		return sqlSession.selectList("schoolMapper.checkDoubleModal", applyNo);
	}
	
	
	
	
	//수업메뉴 -> 학사징계관리 -> 징계사유 조회
	@Override
	public List<ProbationStatusVO> getProbStatusList() {
		return sqlSession.selectList("schoolMapper.getProbStatusList");
	}
	//수업메뉴 -> 학사징계관리 -> 학년학기 조회
	@Override
	public List<SemesterVO> getStuYearSem() {
		return sqlSession.selectList("schoolMapper.getStuYearSem");
	}
	
	//수업메뉴 -> 학사징계관리 -> 학생검색
	@Override
	public List<StuVO> searchProbStuList(StuVO stuVO) {
		return sqlSession.selectList("schoolMapper.searchProbStuList", stuVO);
	}
	//수업메뉴 -> 학사징계관리 -> 학사경고 인서트
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void insertProbation(ProbationVO probationVO) {
		sqlSession.insert("schoolMapper.insertProbation", probationVO);
		sqlSession.update("schoolMapper.updateProbation", probationVO);
	}
	//수업메뉴 -> 학사징계관리 -> 학생상세모달
	@Override
	public List<Map<String, Object>> getProbStuModal(String stuNo) {
		return sqlSession.selectList("schoolMapper.getProbStuModal", stuNo);
	}
	//수업메뉴 -> 학사징계관리 -> 징계데이터조회
	@Override
	public List<ProbationVO> getProbReasonListModal(String stuNo) {
		return sqlSession.selectList("schoolMapper.getProbReasonListModal", stuNo);
	}
	//수업메뉴 -> 학사징계관리 -> 징계카운터조회
	@Override
	public int getStuProbCnt(String stuNo) {
		return sqlSession.selectOne("schoolMapper.getStuProbCnt", stuNo);
	}
	//수업메뉴 -> 학사징계관리 -> 제적처리
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void updateStuProbAjax(String stuNo) {
		sqlSession.update("schoolMapper.updateStuProbAjax", stuNo);
		sqlSession.update("schoolMapper.updateStuInfoProbAjax", stuNo);
	}
	
	
// -------회원메뉴 ------------------------------------------------------
	//등록회원 전체조회
	@Override
	public List<MemberVO> selectMemberList() {
		return sqlSession.selectList("schoolMapper.selectMemberList");
	}

	//등록회원 업데이트할 회원 조회
	@Override
	public MemberVO selectMember(String memNo) {
		return sqlSession.selectOne("schoolMapper.selectMember", memNo);
	}
	//등록회원 업데이트
	@Override
	public void updatePosition(String memNo) {
		sqlSession.update("schoolMapper.updatePosition", memNo);
	}
	//등록회원(거절) 업데이트
	@Override
	public void updateXPosition(String memNo) {
		sqlSession.update("schoolMapper.updateXPosition", memNo);
	}
	//등록회원 업데이트 학생 정보인서트 
	@Override
	public void insertStu(StuVO stuVO) {
		sqlSession.insert("schoolMapper.insertStu", stuVO);
	}
	//등록회원 업데이트 교수 정보인서트
	@Override
	public void insertEmp(StuVO stuVO) {
		sqlSession.insert("schoolMapper.insertEmp", stuVO);
	}
	
	//승인/취소 전체조회
	@Override
	public List<MemberVO> selectMemberTotalList(MemberVO memberVO) {
		return sqlSession.selectList("schoolMapper.selectMemberTotalList", memberVO);
	}
	//승인/취소 조회 -> 승인완료 조회
	@Override
	public List<MemberVO> selectMemberAddList(MemberVO memberVO) {
		return sqlSession.selectList("schoolMapper.selectMemberAddList", memberVO);
	}
	//승인/취소 조회 -> 승인취소 조회
	@Override
	public List<MemberVO> selectMemberDeniedList(MemberVO memberVO) {
		return sqlSession.selectList("schoolMapper.selectMemberDeniedList", memberVO);
	}
	
	//회원클릭시 회원상에 모달창
	@Override
	public List<MemberVO> getMemberModal(String memNo) {
		return sqlSession.selectList("schoolMapper.getMemberModal", memNo);
	}
	//승인/취소 전체 데이터 조회 -> 페이징
	@Override
	public int getMemberListCnt() {
		return sqlSession.selectOne("schoolMapper.getMemberListCnt");
	}
	//승인/취소 승인완료 데이터 조회 -> 페이징
	@Override
	public int getMemberAddListCnt() {
		return sqlSession.selectOne("schoolMapper.getMemberAddListCnt");
	}
	//승인취소 전체 데이터 조회 -> 페이징
	@Override
	public int getMemberDeniedListCnt() {
		return sqlSession.selectOne("schoolMapper.getMemberDeniedListCnt");
	}
	
	// -------페이지 처리위한 데이터개수 조회------------------------------------------------------//
	@Override
	public int getStatusCntForLeave(SearchVO searchVO) {
		return sqlSession.selectOne("schoolMapper.getStatusCntForLeave", searchVO);
	}
	@Override
	public int getStatusCntForReturn(SearchVO searchVO) {
		return sqlSession.selectOne("schoolMapper.getStatusCntForReturn", searchVO);
	}
	@Override
	public int getStatusCntForDeptManage(SearchVO searchVO) {
		return sqlSession.selectOne("schoolMapper.getStatusCntForDeptManage", searchVO);
	}


	
	



	



}

	

	



	




	

	

	

	

	

	


	


	

	



	

	



	

	

	


	



	

	






	
	


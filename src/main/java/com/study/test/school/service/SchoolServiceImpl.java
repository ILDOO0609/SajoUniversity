package com.study.test.school.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.test.colleage.vo.DeptVO;
import com.study.test.emp.vo.EmpVO;
import com.study.test.emp.vo.LectureVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.school.vo.CalendarVO;
import com.study.test.school.vo.SchoolInfoVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;
import com.study.test.util.PageVO;

@Service("schoolService")
public class SchoolServiceImpl implements SchoolService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//학사안내 게시글 등록
	@Override
	public void insertSchoolInfo(SchoolInfoVO schoolInfoVO) {
		sqlSession.insert("schoolMapper.insertSchoolInfo", schoolInfoVO);
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
	
	//학사안내 게시글 -> 상세조회 페이지이동 
	@Override
	public SchoolInfoVO schoolBoardDetail(String schInfoCode) {
		return sqlSession.selectOne("schoolMapper.schoolBoardDetail", schInfoCode);
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
	
	
	//교수&교직원 조회
	@Override
	public List<EmpVO> checkProList(LectureVO lectureVO) {
		return sqlSession.selectList("schoolMapper.checkProList", lectureVO);
	}
	//교수&교직원 조회->검색
	@Override
	public List<LectureVO> searchProListAjax(LectureVO lectureVO) {
		return sqlSession.selectList("schoolMapper.checkProList", lectureVO);
	}
	
	
	
// -------학적변동------------------------------------------------------	
	//학적변동 -> 휴학관리 대기조회
	@Override
	public List<StatusInfoVO> getStatusInfoList() {
		return sqlSession.selectList("schoolMapper.getStatusInfoList");
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
	//학적변동 -> 휴학신청 승인
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void updateLeaveApp(StatusInfoVO statusInfoVO) {
		sqlSession.update("schoolMapper.updateLeaveApp", statusInfoVO);
		sqlSession.update("schoolMapper.updateLeaveAppStu",statusInfoVO);
	}
	//학적변동 -> 휴학신청 취소
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void updateLeaveDenied(StatusInfoVO statusInfoVO) {
		sqlSession.update("schoolMapper.updateLeaveDenied", statusInfoVO);
		sqlSession.update("schoolMapper.updateLeaveDeniedStu", statusInfoVO);
	}

	
	
	
	
	//학적변동 -> 복학관리 대기조회
	@Override
	public List<StatusInfoVO> getStatusReturnList() {
		return sqlSession.selectList("schoolMapper.getStatusReturnList");
	}

	
	
	
	
	
	
// -------회원메뉴 회원조회------------------------------------------------------
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
	//등록회원 업데이트 정보인서트 
	@Override
	public void insertStu(MemberVO memberVO) {
		sqlSession.insert("schoolMapper.insertStu", memberVO);
	}
	@Override
	public void insertEmp(MemberVO memberVO) {
		sqlSession.insert("schoolMapper.insertEmp", memberVO);
	}




	

	

	


	



	

	






	
	
}

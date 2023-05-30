package com.study.test.stu.service;

import java.util.List;

import com.study.test.colleage.vo.ColleageVO;
import com.study.test.colleage.vo.DeptVO;
import com.study.test.emp.vo.EnrollmentVO;
import com.study.test.emp.vo.LectureVO;
import com.study.test.stu.vo.DeptManageVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;

public interface StuService {
	// 학생 정보 조회
	StuVO getStuInfo(String memNo);
	
	// 학생 단과대학 조회
	ColleageVO getCollName(String memNo);
	
	// 학생 소속학과 조회
	DeptVO getDeptName(String memNo);
	
	// 수강신청용 강의 조회
	List<LectureVO> getLectureForStu(LectureVO lectureVO);
	
	// 수강신청
	int insertEnrollment(EnrollmentVO enrollmentVO);
	
	// 수강신청 내역 조회
	List<LectureVO> getEnrollmentNow(String stuNo);
	
	// 수강신청 시 중복 신청 불가
	int getLecForStu(EnrollmentVO enrollmentVO);
	
	// 강의 현재인원 +1
	void updateNowNum(EnrollmentVO enrollmentVO);
	
	// 수강신청 취소
	void deleteEnr(EnrollmentVO enrollmentVO);
	
	// 휴학 신청
	void applyAbsence(StatusInfoVO statusInfoVO);
	
	// 휴학 신청 시 현재 상태 확인
	int getIngStatus(String stuNo);
	
	// 복학 신청 가능여부 파악
	int getStatusRe(String stuNo);
	
	// 복학 신청
	void updateStatusStuForRe(String stuNo);
	
	// 복수전공 신청
	void insertMultiMajor(DeptManageVO deptManageVO);
	
	// 학적조회(복수전공)
	List<DeptManageVO> getDeptManageForStu(String stuNo);
	
	// 학적조회(휴학/복학상태)
	StatusInfoVO getStatusInfoForStu(String stuNo);
	
	// 휴학/복학신청 취소
	void deleteAbsence(String stuNo);
	
	// 복수전공 신청 취소
	void deleteMultiMajor(String stuNo);
}

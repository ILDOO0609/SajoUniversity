package com.study.test.stu.service;

import java.util.List;

import com.study.test.colleage.vo.ColleageVO;
import com.study.test.colleage.vo.DeptVO;
import com.study.test.emp.vo.LectureVO;
import com.study.test.stu.vo.StuVO;

public interface StuService {
	// 학생 정보 조회
	StuVO getStuInfo(String memNo);
	
	// 학생 단과대학 조회
	ColleageVO getCollName(String memNo);
	
	// 학생 소속학과 조회
	DeptVO getDeptName(String memNo);
	
	// 수강신청용 강의 조회
	List<LectureVO> getLectureForStu(String searchValue);
	
}

package com.study.test.colleage.service;

import java.util.List;

import com.study.test.colleage.vo.ColleageVO;
import com.study.test.colleage.vo.DeptVO;
import com.study.test.colleage.vo.GradeVO;
import com.study.test.colleage.vo.SemesterVO;


public interface ColleageService {
	//전공대학 정보 조회
	List<ColleageVO> getColleageList();
	
	//전공학부 정보 조회
	List<DeptVO> getDeptList();
	
	//전공학기 정보 조회
	List<SemesterVO> getSemesterList();
	
	//성적 테이블 조회
	List<GradeVO> getGradeList();
}

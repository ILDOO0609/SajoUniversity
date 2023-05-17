package com.study.test.emp.service;

import java.util.List;
import java.util.Map;

import com.study.test.emp.vo.LectureVO;

public interface EmpService {
	
	//강의 등록
	void insertLecture(LectureVO lectureVO);
	
	//강의 목록 조회
	List<Map<String, String>> getLectureList();
}

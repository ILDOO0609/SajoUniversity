package com.study.test.emp.service;

import java.util.List;
import java.util.Map;

import com.study.test.colleage.vo.DeptVO;
import com.study.test.emp.vo.LectureTimeVO;
import com.study.test.emp.vo.LectureVO;

public interface EmpService {
	
	//강의 등록
	void insertLecture(LectureVO lectureVO, LectureTimeVO lectureTimeVO);
	
	//강의 목록 조회
	List<Map<String, String>> getLectureList();
	
	//다음에 등록될 LEC_NO 조회
	String getNextLecNo();
	
	//강의 시간표 작성 위한 강의 및 강의시간 조회
	List<Map<String, String>> getLectureListForSchedule();
	
	//강의등록시 전공대학 선택시 해당하는 전공학과 이름 조회
	List<DeptVO> getDeptNameAjax(String collNo);
	
	//강의등록시 강의시간 중복체크 Ajax
	boolean timeDuplicationCheckAjax(LectureTimeVO lectureTimeVO);
}

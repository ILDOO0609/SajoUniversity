package com.study.test.school.service;

import java.util.List;

import com.study.test.school.vo.CalendarVO;

public interface CalendarService {
	
	//학사일정 일정추가
	void addSchedule(CalendarVO calendarVO);
	//학사일정 전체조회
	List<CalendarVO> showSchedule();
	
	// 학사일정 수정을 위한 조회
	CalendarVO getCalForUp(String calNo);
	
	// 학사일정 수정
	void updateCal(CalendarVO calendarVO);
	
	// 학사일정 삭제
	void deleteCal(String calNo);
	
}

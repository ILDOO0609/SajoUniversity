package com.study.test.school.service;

import java.util.List;

import com.study.test.school.vo.CalendarVO;

public interface CalendarService {
	
	//학사일정 일정추가
	void addSchedule(CalendarVO calendarVO);
	
	List<CalendarVO> showSchedule();
	
	
	
}

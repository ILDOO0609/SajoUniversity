package com.study.test.school.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.school.vo.CalendarVO;

@Service("calendarService")
public class CalendarServiceImpl implements CalendarService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//학사일정 일정추가
	@Override
	public void addSchedule(CalendarVO calendarVO) {
		sqlSession.insert("calendarMapper.addSchedule", calendarVO);
	}

	@Override
	public List<CalendarVO> showSchedule() {
		return sqlSession.selectList("calendarMapper.showSchedule");
	}

}

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
	//학사일정 전체조회
	@Override
	public List<CalendarVO> showSchedule() {
		return sqlSession.selectList("calendarMapper.calendarList");
	}
	@Override
	public void updateCal(CalendarVO calendarVO) {
		sqlSession.update("calendarMapper.updateCal", calendarVO);
		
	}
	@Override
	public CalendarVO getCalForUp(String calNo) {
		return sqlSession.selectOne("calendarMapper.getCalForUp", calNo);
	}
	@Override
	public void deleteCal(String calNo) {
		sqlSession.delete("calendarMapper.deleteCal", calNo);
	}

}

package com.study.test.emp.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.emp.vo.LectureVO;


@Service("empService")
public class EmpServiceImpl implements EmpService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//강의 등록 
	@Override
	public void insertLecture(LectureVO lectureVO) {
		sqlSession.insert("empMapper.insertLecture", lectureVO);
	}

	@Override
	public List<Map<String, String>> getLectureList() {
		return sqlSession.selectList("empMapper.getLectureList");
	}
}

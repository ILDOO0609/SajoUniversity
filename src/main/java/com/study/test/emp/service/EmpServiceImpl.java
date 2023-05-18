package com.study.test.emp.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.test.colleage.vo.DeptVO;
import com.study.test.emp.vo.LectureTimeVO;
import com.study.test.emp.vo.LectureVO;


@Service("empService")
public class EmpServiceImpl implements EmpService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//강의 및 강의시간 등록 
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void insertLecture(LectureVO lectureVO, LectureTimeVO lectureTimeVO) {
		sqlSession.insert("empMapper.insertLecture", lectureVO);
		sqlSession.insert("empMapper.regLectureTime", lectureTimeVO);
	}
	
	//강의 목록 조회
	@Override
	public List<Map<String, String>> getLectureList() {
		return sqlSession.selectList("empMapper.getLectureList");
	}
	
	//다음에 등록될 LEC_NO 조회
	@Override
	public String getNextLecNo() {
		return sqlSession.selectOne("empMapper.getNextLecNo");
	}
	
	//강의 시간표 작성 위한 강의 및 강의시간 조회
	@Override
	public List<Map<String, String>> getLectureListForSchedule() {
		return sqlSession.selectList("empMapper.getLectureListForSchedule");
	}
	
	//강의등록시 전공대학 선택시 해당하는 전공학과 이름 조회
	@Override
	public List<DeptVO> getDeptName(String collNo) {
		return sqlSession.selectList("empMapper.getDeptName", collNo);
	}
}

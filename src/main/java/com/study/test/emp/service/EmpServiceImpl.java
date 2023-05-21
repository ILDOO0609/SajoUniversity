package com.study.test.emp.service;

import java.util.HashMap;
import java.util.Iterator;
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
	
	//접속해 있는 교수의 EMP_NO조회
	@Override
	public String getNowEmpNo(String memNo) {
		return sqlSession.selectOne("empMapper.getNowEmpNo", memNo);
	}
	
	//강의 및 강의시간 등록 
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void insertLecture(HashMap<String, Object> map) {
		sqlSession.insert("empMapper.insertLecture", map.get("lectureVO"));
		sqlSession.insert("empMapper.regLectureTime", map);
	}
	
	//강의 목록 조회
	@Override
	public List<Map<String, String>> getLectureList(String empNo) {
		return sqlSession.selectList("empMapper.getLectureList", empNo);
	}
	
	//다음에 등록될 LEC_NO 조회
	@Override
	public String getNextLecNo() {
		return sqlSession.selectOne("empMapper.getNextLecNo");
	}
	
	//강의 시간표 작성 위한 강의 및 강의시간 조회
	@Override
	public List<Map<String, String>> getLectureListForSchedule(String memNo) {
		return sqlSession.selectList("empMapper.getLectureListForSchedule", memNo);
	}
	
	//강의등록시 전공대학 선택시 해당하는 전공학과 이름 조회
	@Override
	public List<DeptVO> getDeptNameAjax(String collNo) {
		return sqlSession.selectList("empMapper.getDeptNameAjax", collNo);
	}
	
	//강의등록시 강의시간 중복체크Ajax
	@Override
	public boolean timeDuplicationCheckAjax(HashMap<String, Object>lecTimeMap) {
		int result = sqlSession.selectOne("empMapper.timeDuplicationCheckAjax", lecTimeMap);
		return result == 1 ? true : false ;
	}

}

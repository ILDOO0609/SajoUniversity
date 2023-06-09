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
import com.study.test.emp.vo.StuGradeVO;


@Service("empService")
public class EmpServiceImpl implements EmpService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//접속해 있는 교수의 EMP_NO조회
	@Override
	public String getNowEmpNo(String memNo) {
		return sqlSession.selectOne("empMapper.getNowEmpNo", memNo);
	}
	
	//접속해 있는 교수의 이름 조회
	@Override
	public String getNowEmpName(String memNo) {
		return sqlSession.selectOne("empMapper.getNowEmpName", memNo);
	}
	
	//강의 및 강의시간 및 강의자료 등록 
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void insertLecture(HashMap<String, Object> map) {
		sqlSession.insert("empMapper.insertLecture", map.get("lectureVO"));
		sqlSession.insert("empMapper.regLectureTime", map);
		sqlSession.insert("empMapper.insertLecturePDF", map.get("lecturePDFVO"));
	}
	
	//강의 목록 조회
	@Override
	public List<LectureVO> getLectureList(LectureVO lectureVO) {
		return sqlSession.selectList("empMapper.getLectureList", lectureVO);
	}
	
	//강의 검색시 강의 목록 조회
	@Override
	public List<LectureVO> getLectureListAfterSearch(LectureVO lectureVO) {
		return sqlSession.selectList("empMapper.getLectureList", lectureVO);
	}
	
	//강의 폐강시 강의상태 수정
	@Override
	public boolean updateLecStatusAjax(String lecNo) {
		return sqlSession.update("empMapper.updateLecStatusAjax", lecNo) == 1 ? true : false;
	}
	
	//강의 수정
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void lecUpdate(LectureVO lectureVO) {
		sqlSession.update("empMapper.lecUpdate", lectureVO);
		sqlSession.update("empMapper.updateLectureTime", lectureVO);
	}
	
	//다음에 등록될 LEC_NO 조회
	@Override
	public String getNextLecNo() {
		return sqlSession.selectOne("empMapper.getNextLecNo");
	}
	
	//강의 시간표 작성 위한 강의 및 강의시간 조회
	@Override
	public List<Map<String, Object>> getLectureListForSchedule(String memNo) {
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
		return result >= 1 ? true : false ;
	}
	
	//성적 등록 위한 강의 목록 조회
	@Override
	public List<Map<String, String>> getLectureListForRegScore(String empNo) {
		return sqlSession.selectList("empMapper.getLectureListForRegScore", empNo);
	}
	
	//성적등록위한 강의 수강학생 조회
	@Override
	public List<Map<String, String>> getStuEnrForRegScore(String lecNo) {
		return sqlSession.selectList("empMapper.getStuEnrForRegScore", lecNo);
	}

	
	//학생성적 등록
	@Override
	public boolean insertStuGrade(StuGradeVO stuGradeVO) {
		return sqlSession.insert("empMapper.insertStuGrade", stuGradeVO) == 1 ? true : false;
		
	}
	
	//학생성적 변경
	@Override
	public boolean updateStuGrade(StuGradeVO stuGradeVO) {
		return sqlSession.update("empMapper.updateStuGrade", stuGradeVO) == 1 ? true : false;
	}

	

	

	
	
	

	
}

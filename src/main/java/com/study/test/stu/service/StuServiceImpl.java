package com.study.test.stu.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.test.colleage.vo.ColleageVO;
import com.study.test.colleage.vo.DeptVO;
import com.study.test.emp.vo.EnrollmentVO;
import com.study.test.emp.vo.LectureVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;

@Service("stuService")
public class StuServiceImpl implements StuService{
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public StuVO getStuInfo(String memNo) {
		return sqlSession.selectOne("stuMapper.getStuInfo", memNo);
	}

	@Override
	public ColleageVO getCollName(String memNo) {
		return sqlSession.selectOne("colleageMapper.getCollName", memNo);
	}

	@Override
	public DeptVO getDeptName(String memNo) {
		return sqlSession.selectOne("colleageMapper.getDeptName", memNo);
	}

	@Override
	public List<LectureVO> getLectureForStu(LectureVO lectureVO) {
		return sqlSession.selectList("empMapper.getLectureForStu", lectureVO);
	}

	@Override
	public int insertEnrollment(EnrollmentVO enrollmentVO) {
		return sqlSession.insert("empMapper.insertEnrollment", enrollmentVO);
	}

	@Override
	public List<LectureVO> getEnrollmentNow(String stuNo) {
		return sqlSession.selectList("empMapper.getEnrollmentNow", stuNo);
	}

	@Override
	public int getLecForStu(EnrollmentVO enrollmentVO) {
		return sqlSession.selectOne("empMapper.getLecForStu", enrollmentVO);
	}

	@Override
	public void updateNowNum(EnrollmentVO enrollmentVO) {
		
		sqlSession.update("empMapper.updateNowNum", enrollmentVO);
		
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void deleteEnr(EnrollmentVO enrollmentVO) {
		sqlSession.update("empMapper.updateNowNumForDelete", enrollmentVO);
		sqlSession.delete("empMapper.deleteEnr", enrollmentVO);
	}

	@Override
	public void applyAbsence(StatusInfoVO statusInfoVO) {
		sqlSession.insert("stuMapper.applyAbsence", statusInfoVO);
		
	}
	
	
	
}

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
import com.study.test.stu.vo.DeptManageVO;
import com.study.test.stu.vo.EnrollSearchListVO;
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
	public List<LectureVO> getLectureForStu(EnrollSearchListVO enrollSearchListVO) {
		return sqlSession.selectList("empMapper.getLectureForStu", enrollSearchListVO);
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

	@Override
	public int getIngStatus(String stuNo) {
		return sqlSession.selectOne("stuMapper.getIngStatus", stuNo);
	}

	@Override
	public int getStatusRe(String stuNo) {
		return sqlSession.selectOne("stuMapper.getStatusRe", stuNo);
	}

	@Override
	public void updateStatusStuForRe(String stuNo) {
		sqlSession.update("stuMapper.updateStatusStuForRe", stuNo);
		
	}

	@Override
	public void insertMultiMajor(DeptManageVO deptManageVO) {
		sqlSession.insert("stuMapper.insertMultiMajor", deptManageVO);
		
	}

	@Override
	public List<DeptManageVO> getDeptManageForStu(String stuNo) {
		return sqlSession.selectList("stuMapper.getDeptManageForStu", stuNo);
	}

	@Override
	public StatusInfoVO getStatusInfoForStu(String stuNo) {
		return sqlSession.selectOne("stuMapper.getStatusInfoForStu", stuNo);
	}

	@Override
	public void deleteAbsence(String stuNo) {
		sqlSession.delete("stuMapper.deleteAbsence", stuNo);
		
	}

	@Override
	public void deleteMultiMajor(String stuNo) {
		sqlSession.delete("stuMapper.deleteMultiMajor", stuNo);
		
	}

	@Override
	public List<LectureVO> getLectureListForStuTimeTable(String stuNo) {
		return sqlSession.selectList("empMapper.getLectureListForStuTimeTable", stuNo);
	}

	@Override
	public List<LectureVO> getStuGradeForStu(String stuNo) {
		return sqlSession.selectList("empMapper.getStuGradeForStu", stuNo);
	}

	@Override
	public double getAvg(String stuNo) {
		return sqlSession.selectOne("empMapper.getAvg", stuNo);
	}

	@Override
	public int getTotalScore(String stuNo) {
		return sqlSession.selectOne("empMapper.getTotalScore", stuNo);
	}

	@Override
	public List<LectureVO> getSumScoreForStu(String stuNo) {
		return sqlSession.selectList("empMapper.getSumScoreForStu", stuNo);
	}

	@Override
	public int getLecListCntForEnroll(EnrollSearchListVO enrollSearchListVO) {
		return sqlSession.selectOne("empMapper.getLecListCntForEnroll", enrollSearchListVO);
	}
	
	
	
}

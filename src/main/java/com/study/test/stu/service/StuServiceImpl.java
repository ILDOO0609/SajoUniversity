package com.study.test.stu.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.colleage.vo.ColleageVO;
import com.study.test.colleage.vo.DeptVO;
import com.study.test.emp.vo.LectureVO;
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
	public List<LectureVO> getLectureForStu(String searchValue) {
		return sqlSession.selectList("empMapper.getLectureForStu", searchValue);
	}
	
}

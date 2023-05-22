package com.study.test.colleage.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.colleage.vo.ColleageVO;
import com.study.test.colleage.vo.DeptVO;
import com.study.test.colleage.vo.SemesterVO;


@Service("colleageService")
public class ColleageServiceImpl implements ColleageService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//전공대학 정보 조회
	@Override
	public List<ColleageVO> getColleageList() {
		return sqlSession.selectList("colleageMapper.getColleageList");
	}

	@Override
	public List<DeptVO> getDeptList() {
		return sqlSession.selectList("colleageMapper.getDeptList");
	}

	@Override
	public List<SemesterVO> getSemesterList() {
		return sqlSession.selectList("colleageMapper.getSemesterList");
	}


}

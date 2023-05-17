package com.study.test.school.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.school.vo.SchoolInfoVO;

@Service("schoolService")
public class SchoolServiceImpl implements SchoolService{
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public void insertSchoolInfo(SchoolInfoVO schoolInfoVO) {
		sqlSession.insert("schoolMapper.insertSchoolInfo", schoolInfoVO);
	}

	@Override
	public List<SchoolInfoVO> getSchoolInfoList() {
		return sqlSession.selectList("schoolMapper.getSchoolInfo");
	}
	
	
}

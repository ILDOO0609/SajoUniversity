package com.study.test.stu.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("stuService")
public class StuServiceImpl {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
}

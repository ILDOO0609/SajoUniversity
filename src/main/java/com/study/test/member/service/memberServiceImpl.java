package com.study.test.member.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.member.vo.MemberVO;


@Service("memberService")
public class memberServiceImpl implements memberService{
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	// 회원가입
	@Override
	public void join(MemberVO memberVO) {
		sqlSession.insert("memberMapper.join" , memberVO);
	}

	



	
	
	
	
}

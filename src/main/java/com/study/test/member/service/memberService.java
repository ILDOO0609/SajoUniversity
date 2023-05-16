package com.study.test.member.service;

import com.study.test.member.vo.MemberVO;

public interface memberService {
	
	// 로그인
	MemberVO login(String memNo);
	
	// 회원 등록시 번호 중복 체크
	boolean isDuplicateMemNo(int memNo);
	
	// 회원 등록
	void join(MemberVO memberVO);
	
	// 비밀번호 찾기
	String getMemEmail(MemberVO memberVO);
	
	// 비밀번호 변경
	void updateMemPw(MemberVO memberVO);
}

package com.study.test.member.service;

import java.util.List;
import java.util.Map;

import com.study.test.member.vo.MemberVO;
import com.study.test.member.vo.StatisticsVO;

public interface memberService {
	
	// 로그인
	MemberVO login(String memNo);
	
	// 회원 등록시 번호 중복 체크
	boolean isDuplicateMemNo(int memNo);
	
	// 회원 등록
	void join(MemberVO memberVO);
	
	// 로그인 정보
	MemberVO loginInfo(MemberVO memberVO);
	
	// 비밀번호 찾기
	String getMemEmail(MemberVO memberVO);
	
	// 아이디 찾기
	String getMemEmail2(MemberVO memberVO);
	
	// 비밀번호 변경
	void updateMemPw(MemberVO memberVO);
	
	// 학생 정보조회용 
	MemberVO getMemInfoForStu(String memNo);
	
	// 학생 정보 수정
	void updateStuInfo(MemberVO memberVO);
	
	// 비밀번호 변경 유무
	String checkMemPw(MemberVO memberVO);
	
	// 통계 조회 map
	List<Map<String, Integer>> getMonthlyData(int year);
	
	// 통계 조회 pie
	List<Map<String, Object>> getMonthlyDataPie();
	
}

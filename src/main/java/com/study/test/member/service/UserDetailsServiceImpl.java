package com.study.test.member.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.study.test.member.vo.MemberVO;

import jakarta.annotation.Resource;

@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Resource(name = "memberService")
	private memberService memberService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		// 로그인 정보 조회
		MemberVO userInfo = memberService.login(username);
		
		// 없는 계정일때
		if(userInfo == null) {
			throw new UsernameNotFoundException("오류");
		}
		
		// 로그인 정보를 UserDetails 객체에 넣어준다.
		
		UserDetails user = User.withUsername(userInfo.getMemNo())
							   .password(userInfo.getMemPw())
							   .roles(userInfo.getMemRole())
							   .build();
		return user;
	}

}


















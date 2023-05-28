package com.study.test;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class IndexController {
	@GetMapping("/")
	public String index(Authentication authentication, HttpServletRequest request) {
		String previousPage = request.getHeader("ReFerer");
		String path = "";
		
		if (authentication == null) {
			path = "redirect:/member/loginForm3";
		}
		else {
			// 로그인한 사람의 권한 정보
			User user = (User) authentication.getPrincipal();
			List<GrantedAuthority> authoList = new ArrayList<>(user.getAuthorities());
			
			List<String> strAuthoList = new ArrayList<>();
			for (GrantedAuthority autho : authoList) {
				String strAutho = autho.getAuthority();
				strAuthoList.add(strAutho);
			}
			
			
			
			if (strAuthoList.contains("ROLE_ADMIN")) {
				
				path = "redirect:/member/loginForm3";
			}
			else {
				if (previousPage == null) {
					
					path = "redirect:/member/loginForm3";
				}
				else {
					path = "redirect:" + previousPage;
					if (previousPage.contains("/admin")) {
						path = "redirect:/member/loginForm3";
					}
				}
				
				
			}
			
		}
		
		return path;
	}
	
	
	
	
	
	
	
	// 미인가 시 이동할 페이지
	@GetMapping("/accessDeny")
	public String accessDeny() {
		
		return "content/access_deny";
	}
}

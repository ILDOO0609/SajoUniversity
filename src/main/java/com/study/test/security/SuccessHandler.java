package com.study.test.security;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class SuccessHandler extends SimpleUrlAuthenticationSuccessHandler{

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		
		System.out.println("SSSSSSSSSSSSUCCCCCCCCCCCCCEEEEEEEESSSSSSSSSSSSSSS HANDLER");
		
		PrintWriter p = response.getWriter();
		p.write("success");
		p.flush();
		
		//super.onAuthenticationSuccess(request, response, authentication);
	}
	
}

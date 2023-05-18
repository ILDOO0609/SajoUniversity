package com.study.test.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


import jakarta.annotation.security.PermitAll;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity security) throws Exception{
		security.csrf().disable()
				.authorizeHttpRequests()
				.requestMatchers("/"
								, "/main"
								, "/member/login"
								, "/member/join"

								, "/emp/**"
								, "/stu/**"
								, "/board/**"
								, "/member/isDuplicateMemNoAjax"
								, "/member/findPwAjax"
								, "/member/findNoAjax"
								, "/member/pop1"
								, "/member/pop2"

								, "/school/**"
								, "/member/sendSMSAjax"

								
								)
				.permitAll()
				.requestMatchers("/admin/**").hasRole("ADMIN")
				.anyRequest().authenticated()
			.and()
				.formLogin()
				.loginPage("/member/loginForm")
				.usernameParameter("memNo")
				.passwordParameter("memPw")
				.loginProcessingUrl("/member/login")
				.successHandler(getSuccessHandler())
				.failureHandler(getFailureHandler())
				.permitAll()
			.and()
				.logout()
				.logoutUrl("/member/logout")
				.invalidateHttpSession(true)
				.logoutSuccessUrl("/")
			.and()
				.exceptionHandling()
				.accessDeniedPage("/accessDeny");
		
		return security.build();
		
	}
	@Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/js/**", "/css/**", "/upload/**");
    }
	
	@Bean
	public PasswordEncoder getpasswordEncoder() {
		
		return new BCryptPasswordEncoder();
	}

	// 로그인 실패 시 실행되는 클래스 객체 생성
	@Bean
	public FailureHandler getFailureHandler() {
		
		return new FailureHandler();
	}
	
	// 로그인 실패 시 실행되는 클래스 객체 생성
	@Bean
	public SuccessHandler getSuccessHandler() {
		
		return new SuccessHandler();
	}
	
}

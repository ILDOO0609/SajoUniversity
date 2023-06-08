package com.study.test.library.controller;


import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.test.library.service.LibraryService;
import com.study.test.library.vo.LibraryVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/lib")
public class LibraryController {
	@Resource(name="libraryService")
	private LibraryService libraryService;
	
	
	@GetMapping("/libMain")
	public String libMain(Authentication authentication, Model model, LibraryVO libraryVO) {
		// 열람실 좌석 정보 조회
		model.addAttribute("libInfo", libraryService.getLibInfo(authentication.getName()));
		
		// 사용중인 좌석 조회
		model.addAttribute("seatInfo", libraryService.getSeatInfo());
	
		model.addAttribute("idx", libraryService.getCountSeat());
		
		return "content/library/lib_main";
	}
	


}

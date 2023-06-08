package com.study.test.library.controller;


import java.util.ArrayList;
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
	    // Query reading room seat information
	    model.addAttribute("libInfo", libraryService.getLibInfo(authentication.getName()));

	    // look up seats in use
	    List<LibraryVO> seatInfo = libraryService.getSeatInfo();
	    
	    List<Integer>seatNoArr = new ArrayList<>();
	    
	    System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+seatInfo);
	    
	    for(LibraryVO seat : seatInfo) {
	    	seatNoArr.add(seat.getSeatNo());
	    }
	    
	    model.addAttribute("seatNoArr", seatNoArr);

	    return "content/library/lib_main";
	}
	
	@PostMapping("getSeatInfoAjax")
	public void getSeatInfoAjax(Model model) {
		
		
	}
}

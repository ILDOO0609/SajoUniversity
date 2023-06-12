package com.study.test.library.controller;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
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
@EnableScheduling
@RequestMapping("/lib")
public class LibraryController {
	@Resource(name="libraryService")
	private LibraryService libraryService;
	
	// 열람실 좌석 페이지
	@GetMapping("/libMain")
	public String libMain(Authentication authentication, Model model, LibraryVO libraryVO) {
		// 열람실 좌석 정보 조회
		model.addAttribute("libInfo", libraryService.getLibInfo(authentication.getName()));
		
		// 사용중인 좌석 조회
	    List<LibraryVO> seatInfo = libraryService.getSeatInfo();
	    
	    List<Integer> seatNoArr = new ArrayList<>();
	    
	    for(LibraryVO seat : seatInfo) {
	    	seatNoArr.add(seat.getSeatNo());
	    }
	    
	    model.addAttribute("seatNoArr", seatNoArr);

	    return "content/library/lib_main";
		}
	
	// 열람실 좌석 등록
	@PostMapping("/regLibSeat")
	public String regLibSeat(Authentication authentication, LibraryVO libraryVO) {
		libraryVO.setMemNo(authentication.getName());
		
		// 좌석 배정
		libraryService.regLibSeat(libraryVO);
		
		return "redirect:/lib/libMain";
	}
	
	// 열람실 좌석 반납
	@PostMapping("/deleteLibSeat")
	public String deleteLibSeat(Authentication authentication) {
		// 좌석 반납
		libraryService.deleteLibSeat(authentication.getName());
		
		return "redirect:/lib/libMain";
	}
	

}

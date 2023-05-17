package com.study.test.emp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.colleage.service.ColleageService;
import com.study.test.emp.service.EmpService;
import com.study.test.emp.vo.LectureVO;

import jakarta.annotation.Resource;


@Controller
@RequestMapping("/emp")
public class EmpController {
	
	@Resource(name = "empService")
	private EmpService empService;
	@Resource(name = "colleageService")
	private ColleageService colleageService;
	
	//강의 리스트로 이동
	@GetMapping("/lectureList")
	public String lectureList(Model model) {
		List<Map<String, String>> mapList = empService.getLectureList();
		System.out.println("@@@@@@@@@@@@@@@@@@ "+mapList);
		model.addAttribute("mapList", mapList);
		return "content/emp/lecture_list";
	}
	
	//강의 등록페이지로 이동
	@GetMapping("/regLecture")
	public String regLectureForm(Model model) {
		//강의정보 조회 담기
		model.addAttribute("semesterList", colleageService.getSemesterList());
		
		//전공대학 정보 조회
		model.addAttribute("colleageList", colleageService.getColleageList());
		
		//전공학과 정보 조회
		model.addAttribute("deptList", colleageService.getDeptList());
		return "content/emp/reg_lecture";
	}
	
	//강의 등록
	@PostMapping("/regLecture")
	public String regLecture(LectureVO lectureVO) {
		System.out.println("@@@@@@@@@@@@@@@@@@@ "+lectureVO);
		
		
		//강의 등록
		empService.insertLecture(lectureVO);
		
		
		
		return "redirect:/emp/lectureList";
	}
	
	//강의 시간 중복 체크
	@ResponseBody
	@PostMapping("/timeCheckAjax")
	public String timeCheck() {
		return "";
	}
	
	//강의 시간표
	@GetMapping("/lecSchedule")
	public String regSchedule() {
		
		return "content/emp/lec_schedule";
	}
	
	//강의 시간표
	@GetMapping("/regScore")
	public String regScore() {
		
		return "content/emp/reg_score";
	}
	
	//게시판
	@GetMapping("/empBoard")
	public String empBoard() {
		return "content/emp/emp_board";
	}
	
	//학사 공지사항
	@GetMapping("/notice")
	public String notice() {
		return "content/emp/notice";
	}
	
	//Q&A 화면
	@GetMapping("/questionAndAnswer")
	public String questionAndAnswer() {
		return "content/emp/question_answer";
	}
	
	//게시글 작성 화면
	@GetMapping("/boardWrite")
	public String boardWrite() {
		return "content/emp/board_write_form";
	}
	
	//나의 게시글 조회
	@GetMapping("/selectMyBoard")
	public String getMyBoard() {
		return "content/emp/my_board";
	}
	
	//교수 달력화면 
	@GetMapping("/empCalender")
	public String empCalender() {
		return "content/emp/emp_calender";
	}
	
}

package com.study.test.stu.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.board.service.BoardService;
import com.study.test.board.vo.BoardVO;
import com.study.test.colleage.service.ColleageService;
import com.study.test.colleage.vo.DeptVO;
import com.study.test.emp.service.EmpService;
import com.study.test.stu.service.StuService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/stu")
public class StuController {
	@Resource(name="stuService")
	private StuService stuService;
	
	@Resource(name="boardService")
	private BoardService boardService;
	
	@Resource(name = "colleageService")
	private ColleageService colleageService;
	
	@Resource(name = "empService")
	private EmpService empService;
	
	// 학생 정보 조회
	@GetMapping("/stuInfo")
	public String stuInfo() {
		
		
		return "content/stu/stu_info";
	}
	
	
	// 복수전공 신청
	@GetMapping("/stuMultimajor")
	public String stuMultimajor() {
		
		return "content/stu/stu_multimajor";
		
	}
	
	
	// 수강신청
	@GetMapping("/stuSemEnroll")
	public String stuSemEnroll(Model model) {
		// 단과대학 조회
		model.addAttribute("colleageList", colleageService.getColleageList());
		// 소속학과 조회
		model.addAttribute("deptList", colleageService.getDeptList());
		
		return "content/stu/stu_sem_enroll";
		
	}
	
	// 수강신청에서 단과대학 변경시 소속학과 변경하는 Ajax
	@ResponseBody
	@PostMapping("/changeCollAjax")
	public List<DeptVO> changeCollAjax(String collNo){
		List<DeptVO> deptList = empService.getDeptNameAjax(collNo);
		
		return deptList;
	} 
	
	// 휴학신청
	@GetMapping("/stuStatus")
	public String stuStatus() {
		
		return "content/stu/stu_status";
		
	}
	
	
	// 학생 시간표
	@GetMapping("/stuTimetable")
	public String stuTimetable() {
		
		return "content/stu/stu_timetable";
	}

	
	
	
	
}

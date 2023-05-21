package com.study.test.emp.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.colleage.service.ColleageService;
import com.study.test.colleage.vo.DeptVO;
import com.study.test.emp.service.EmpService;
import com.study.test.emp.vo.LectureTimeVO;
import com.study.test.emp.vo.LectureVO;

import jakarta.annotation.Resource;
import oracle.jdbc.proxy.annotation.GetProxy;


@Controller
@RequestMapping("/emp")
public class EmpController {
	
	@Resource(name = "empService")
	private EmpService empService;
	@Resource(name = "colleageService")
	private ColleageService colleageService;
	
	//강의리스트 페이지로 이동
	@GetMapping("/lectureList")
	public String lectureList() {
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
	public String regLecture(LectureVO lectureVO, LectureTimeVO lectureTimeVO, Authentication authentication) {
		
		//LectureTimeVO를 여러개 담는 lecTimeList통 생성
		List<LectureTimeVO> lecTimeList = new ArrayList<>();
		
		//lectureTimeVO의 lecDay,fistTime,lastTime 값들을 배열로 ',' 제거후 배열로저장
		String[] lecDayArr = lectureTimeVO.getLecDay().split(",");
	    String[] firstTimeArr = lectureTimeVO.getFirstTime().split(",");
	    String[] lastTimeArr = lectureTimeVO.getLastTime().split(",");

	    //LectureTimeVO의 새로운 객체 timeVO 생성후 lecDayArr,firstTimeArr,lastTimeArr의 0번째,1번째... 값들을 저장후 lecTimeList에 저장
	    for (int i = 0; i < lecDayArr.length; i++) {
	        LectureTimeVO timeVo = new LectureTimeVO();
	        timeVo.setLecDay(lecDayArr[i]);
	        timeVo.setFirstTime(firstTimeArr[i]);
	        timeVo.setLastTime(lastTimeArr[i]);
	        lecTimeList.add(timeVo);
	    }
	    
		//다음에 등록될 LEC_NO 
		String getNextLectNo = empService.getNextLecNo();
		
		//LEC_NO 세팅
		lectureVO.setLecNo(getNextLectNo);
		
		//lecTimeList에 하나씩 뺀 lecTime객체 하나하나에 LEC_NO세팅
		for(LectureTimeVO lecTime : lecTimeList) {
			lecTime.setLecNo(getNextLectNo);
		}
		
		//EMP_NO세팅
		lectureVO.setEmpNo(getNowEmpNo(authentication));
		
		//lectureVO랑 lecTimeList를 데이터로 갖는 map 생성
		HashMap<String, Object> map = new HashMap<>();
		map.put("lectureVO", lectureVO);
		map.put("lecTimeList", lecTimeList);
		
		//강의 등록
		empService.insertLecture(map);
		
		return "redirect:/emp/lectureList";
	}
	
	//전공대학 변경시 실행되는 함수
	@ResponseBody
	@PostMapping("/changeCollAjax")
	public List<DeptVO> changeCollAjax(String collNo) {
		System.out.println("@@@@@@@@@@@@@@@@@@@@"+collNo);
		System.out.println("@@@@@@@@@@@@@@@@"+empService.getDeptNameAjax(collNo));
		
		//전공대학에 속하는 전공학과 리스트 담기
		List<DeptVO> deptList = empService.getDeptNameAjax(collNo);
		
		return deptList;
	}
	
	//강의 시간 중복 체크
	@ResponseBody
	@PostMapping("/timeDuplicationCheckAjax")
	public boolean timeCheck(Authentication authentication, @RequestBody HashMap<String, Object>map) {
		
		System.out.println("@@@@@@@@@@@@@@@@@@@@"+map);
		
		//LectureTimeVO를 여러개 담는 lecTimeList통 생성
		List<LectureTimeVO> lecTimeList = new ArrayList<>();
		
		// map에서 각 배열을 가져옴
		//map.get("firstTimeArr")은 Object타입이라 (List<String>)형식으로 변환
		
		List<String> firstTimeArr = (List<String>) map.get("firstTimeArr");
	    List<String> lastTimeArr = (List<String>) map.get("lastTimeArr");
	    List<String> lecDayArr = (List<String>) map.get("lecDayArr");
	    
	    // 배열의 길이만큼 반복하여 LectureTimeVO 객체를 생성하고 lecTimeList에 추가
	    for (int i = 0; i < firstTimeArr.size(); i++) {
	        LectureTimeVO lectureTimeVO = new LectureTimeVO();
	        lectureTimeVO.setFirstTime(firstTimeArr.get(i));
	        lectureTimeVO.setLastTime(lastTimeArr.get(i));
	        lectureTimeVO.setLecDay(lecDayArr.get(i));
	        lecTimeList.add(lectureTimeVO);
	    }
		
		HashMap<String, Object>lecTimeMap = new HashMap<>();
		lecTimeMap.put("lecTimeList", lecTimeList);
		lecTimeMap.put("empNo", getNowEmpNo(authentication));
		
		return empService.timeDuplicationCheckAjax(lecTimeMap);
	}
	
	//강의 시간표
	@GetMapping("/lecSchedule")
	public String regSchedule(Model model, Authentication authentication) {
		
		//시간표 작성위한 강의 및 시간정보 담기
		model.addAttribute("lectureList", empService.getLectureListForSchedule(getNowEmpNo(authentication)));
		
		return "content/emp/lec_schedule";
	}
	
	//학생성적등록 페이지로 이동
	@GetMapping("/regScore")
	public String lectureList(Model model, Authentication authentication) {
		List<Map<String, String>> mapList = empService.getLectureList(getNowEmpNo(authentication));
		System.out.println("@@@@@@@@@@@@@@@@@@ "+mapList);
		model.addAttribute("mapList", mapList);
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
	
	//현재 교수의 EMP_NO 조회
	public String getNowEmpNo(Authentication authentication) {
		User user = (User)authentication.getPrincipal(); 
		String empNo = empService.getNowEmpNo(user.getUsername());
		return empNo;
	}
	
}

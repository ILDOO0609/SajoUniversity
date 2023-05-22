package com.study.test.school.controller;

import java.time.Year;
import java.util.List;

import org.apache.catalina.authenticator.SpnegoAuthenticator.AuthenticateAction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.colleage.service.ColleageService;
import com.study.test.colleage.vo.DeptVO;
import com.study.test.emp.service.EmpService;
import com.study.test.school.service.SchoolService;
import com.study.test.school.vo.SchoolInfoVO;
import com.study.test.util.DateUtill;
import com.study.test.util.PageVO;

import jakarta.annotation.Resource;


@Controller
@RequestMapping("/school")
public class SchoolController {
	@Resource(name = "schoolService")
	private SchoolService schoolService;
	
	@Resource(name = "empService")
	private EmpService empService;
	@Resource(name = "colleageService")
	private ColleageService colleageService;
	
	
	//학사메뉴 클릭시 페이지
	@GetMapping("/main")
	public String schoolMain() {
		
		return "content/school/school/school_main";
	}
	
	//학사메뉴 -> 학사안내 페이지
	@RequestMapping("/info")
	public String schoolInfo(Model model, PageVO pageVO, @RequestParam(required = false, defaultValue = "0") int year) {
		//검색 년도
		if(year == 0) {
			year = DateUtill.getYear();
		}
		
		model.addAttribute("year", year);
		model.addAttribute("thisYear", DateUtill.getYear());
		
		//전체 데이터 수 조회
		pageVO.setTotalDataCnt(schoolService.schInfoListCnt());
		pageVO.setPageInfo();
		
		//게시글 조회
		model.addAttribute("infoList", schoolService.getSchoolInfoList(pageVO));
		
		return "content/school/school/school_info";
	}
	
	//학사메뉴 -> 학사안내 게시글 작성페이지
	@GetMapping("/regSchoolBoard")
	public String regSchoolBoard() {
		return "content/school/school/school_board_write";
	}
	
	//학사메뉴 -> 학사안내 글등록
	@PostMapping("/insertSchoolInfo")
	public String insertSchoolInfo(SchoolInfoVO schoolInfoVO, Authentication authentication) {
		//로그인 정보 security에서 가져오기. 리턴타입이 오브젝트이기때문에 형변환이 필요한다.
		User user = (User)authentication.getPrincipal();
		schoolInfoVO.setSchInfoWriter(user.getUsername());
		
		schoolService.insertSchoolInfo(schoolInfoVO);
		return "redirect:/school/info";
	}
	
	
	//학사메뉴 -> 학사안내 글 상세페이지
	@GetMapping("/schoolBoardDetail")
	public String schoolBoardDetail(String schInfoCode, Model model, SchoolInfoVO schoolInfoVO) {
		System.out.println("@#@#@#@#@#@#@#@#@#@#@#@#" + schoolInfoVO);
		
		//상세조회
		model.addAttribute("detailList", schoolService.schoolBoardDetail(schInfoCode));
		//조회수
		schoolService.updateSchoolBoardReadCnt(schInfoCode);
		//이전글다음글
		model.addAttribute("move", schoolService.movePage(schoolInfoVO.getSchInfoCode())); 
		
		
		return "content/school/school/school_board_detail";
	}

	//학사메뉴 -> 글 상세 -> 수정페이지이동
	@GetMapping("/schoolBoardUpdateForm")
	public String schoolBoardUpdateForm(String schInfoCode, Model model) {
		model.addAttribute("detailList", schoolService.schoolBoardDetail(schInfoCode));
		return "content/school/school/school_board_update";
	}
	//학사메뉴 -> 글 상세 -> 수정
	@PostMapping("/updateSchoolInfo")
	public String updateSchoolInfo(SchoolInfoVO schoolInfoVO) {
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@"+schoolInfoVO);
		schoolService.updateSchoolInfo(schoolInfoVO);
		return "redirect:/school/info";
	}
	//학사메뉴 -> 글 상세 -> 삭제
	@GetMapping("/deleteSchoolInfo")
	public String deleteSchoolInfo(String schInfoCode) {
		schoolService.deleteSchoolInfo(schInfoCode);
		return "redirect:/school/info";
	}

	
	
	
	
	
	//학사메뉴 -> 학사일정 페이지
	@GetMapping("/scheList")
	public String schoolBoardList() {
		return "content/school/school/school_sche_list";
	}
	
	
	
//-------------------------------학사조회--------------------------------------------
	
	
	
	
	
	//학사조회 -> 메인페이지
	@GetMapping("/checkMain")
	public String checkMain() {
		return "content/school/check/check_main";
	}
	
	//학사조회 -> 학생조회 페이지
	@GetMapping("/checkStu")
	public String checkStu(Model model) {
		//단과대학 정보 조회
		model.addAttribute("colleageList", colleageService.getColleageList());
		
		//전공학과 정보 조회
		model.addAttribute("deptList", colleageService.getDeptList());
		
		
		return "content/school/check/check_stu";
	}
	
	//전공대학 변경시 실행되는 함수
	@ResponseBody
	@PostMapping("/changeCollAjax")
	public List<DeptVO> changeCollAjax(String collNo) {
		List<DeptVO> deptList = empService.getDeptNameAjax(collNo);
		
		return deptList;
	}
	
	
	//학사조회 -> 교수조회 페이지
	@GetMapping("/checkPro")
	public String checkPro(Model model) {
		//단과대학 정보 조회
		model.addAttribute("colleageList", colleageService.getColleageList());
		//전공학과 정보 조회
		model.addAttribute("deptList", colleageService.getDeptList());
				
		return "content/school/check/check_pro";
	}
	
	//학사조회 -> 강의및학점 페이지
	@GetMapping("/checkLec")
	public String checkLec() {
		return "content/school/check/check_lec";
	}
	
	
	
	
	
	
	
	
	
	//학적변동 메인 페이지
	@GetMapping("/acamain")
	public String acaMain() {
		return "content/school/academic/aca_main";
	}
	
	//학적변동 -> 휴학페이지
	@GetMapping("/acaLeave")
	public String acaLeave() {
		return "content/school/academic/aca_leave";
	}
	
	//학적변동 -> 복학페이지 
	@GetMapping("/acaReturn")
	public String acaReturn() {
		return "content/school/academic/aca_return";
	}
	
	
	
	
	
	

	//수업 -> 메인 페이지
	@GetMapping("/lessonMain")
	public String lesonMain() {
		return "content/school/lesson/lesson_main";
	}
		
	//수업 -> 수강관리 페이지
	@GetMapping("/lessonEnrolment")
	public String lesonEnrolment() {
		return "content/school/lesson/lesson_enrolment";
	}
	
	//수업 -> 복수전공관리 페이지
	@GetMapping("/lessonMajorDouble")
	public String lessonMajorDouble() {
		return "content/school/lesson/lesson_major_double";
	}
	//수업 -> 학사경고관리 페이지
	@GetMapping("/lessonWarning")
	public String lessonWarning() {
		return "content/school/lesson/lesson_warning";
	}

	
	
	
	
	

	//회원 -> 회원관리 페이지
	@GetMapping("/memberList")
	public String memberList(Model model) {
		model.addAttribute("memberList", schoolService.selectMember()); 
		return "content/school/member/member_list";
	}
	
	


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}




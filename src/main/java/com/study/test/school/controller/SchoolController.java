package com.study.test.school.controller;

import java.time.Year;

import org.apache.catalina.authenticator.SpnegoAuthenticator.AuthenticateAction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.study.test.school.service.SchoolService;
import com.study.test.school.vo.PrenextPageVO;
import com.study.test.school.vo.SchoolInfoVO;
import com.study.test.util.DateUtill;

import jakarta.annotation.Resource;


@Controller
@RequestMapping("/school")
public class SchoolController {
	@Resource(name = "schoolService")
	private SchoolService schoolService;
	
	
	//학사메뉴 클릭시 페이지
	@GetMapping("/main")
	public String schoolMain() {
		
		return "content/school/school/school_main";
	}
	
	//학사메뉴 -> 학사안내 페이지
	@RequestMapping("/info")
	public String schoolInfo(Model model, @RequestParam(required = false, defaultValue = "0") int year) {
		model.addAttribute("infoList", schoolService.getSchoolInfoList());
		
		
		//검색 년도
		if(year == 0) {
			year = DateUtill.getYear();
		}
		
		model.addAttribute("year", year);
		model.addAttribute("thisYear", DateUtill.getYear());
		
		return "content/school/school/school_info";
	}
	
	//학사메뉴 -> 학사안내 게시글 작성페이지
	@GetMapping("/regSchoolBoard")
	public String regSchoolBoard() {
		return "content/school/school/school_board_write";
	}
	
	//학사메뉴 -> 학사안내 글 상세페이지
	@GetMapping("/schoolBoardDetail")
	public String schoolBoardDetail(String schInfoCode, Model model, PrenextPageVO prenextPageVO) {
		//상세조회
		model.addAttribute("detailList", schoolService.schoolBoardDetail(schInfoCode));
		//조회수
		schoolService.updateSchoolBoardReadCnt(schInfoCode);
		//이전글다음글
		model.addAttribute("prenextList", schoolService.detailPreNext()); 
		
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
		schoolService.updateSchoolInfo(schoolInfoVO);
		return "redirect:/school/schoolBoardDetail";
	}
	//학사메뉴 -> 글 상세 -> 삭제
	@GetMapping("/deleteSchoolInfo")
	public String deleteSchoolInfo(String schInfoCode) {
		schoolService.deleteSchoolInfo(schInfoCode);
		return "redirect:/school/info";
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
	
	
	
	
	//학사메뉴 -> 학사일정 게시판 리스트 페이지
	@GetMapping("/scheList")
	public String schoolBoardList() {
		return "content/school/school/school_sche_list";
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
	//학적변동 -> 자퇴페이지  
	@GetMapping("/acaDropOut")
	public String acaDropOut() {
		return "content/school/academic/aca_dropout";
	}
	
	//학적변동 -> 재입학페이지 
	@GetMapping("/acaReadmi")
	public String acaReadmi() {
		return "content/school/academic/aca_readmi";
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
		
	//수업 -> 수강신청 페이지
	@GetMapping("/lessonEnrolment")
	public String lesonEnrolment() {
		return "content/school/lesson/lesson_enrolment";
	}
	
	//수업 -> 수강취소 페이지
	@GetMapping("/lessonCancel")
	public String lessonCancel() {
		return "content/school/lesson/lesson_cancel";
	}
	
	//수업 -> 계절학기 페이지
	@GetMapping("/lessonSeason")
	public String lessonSeason() {
		return "content/school/lesson/lesson_season";
	}
	
	//수업 -> 재이수 페이지
	@GetMapping("/lessonRetake")
	public String lessonRetake() {
		return "content/school/lesson/lesson_retake";
	}
	
	//수업 -> 인터넷강의 페이지
	@GetMapping("/lessonIngang")
	public String lessonIngang() {
		return "content/school/lesson/lesson_ingang";
	}
	
	
	
	
	
	
	
	//성적 -> 메인페이지
	@GetMapping("/achieveMain")
	public String achieveMain() {
		return "content/school/achieve/achieve_main";
	}
	
	//성적 -> 학사경고
	@GetMapping("/achieveWarning")
	public String achieveWarning() {
		return "content/school/achieve/achieve_warning";
	}
	
	//성적 -> 성적관리
	@GetMapping("/achieveManage")
	public String achieveManage() {
		return "content/school/achieve/achieve_manage";
	}
	
	//성적 -> 시험성적평가
	@GetMapping("/achieveRating")
	public String achieveRating() {
		return "content/school/achieve/achieve_rating";
	}
	
	
	
	
	
	
	
	
	
	//전공.전과(부) -> 메인 페이지
	@GetMapping("/majorMain")
	public String majorMain() {
		return "content/school/major/major_main";
	}
	
	//전공.전과(부) -> 복수전공 페이지
	@GetMapping("/majorDouble")
	public String majorDouble() {
		return "content/school/major/major_double";
	}
	
	//전공.전과(부) -> 부전공 페이지
	@GetMapping("/majorMinor")
	public String majorMinor() {
		return "content/school/major/major_minor";
	}
	
	//전공.전과(부) -> 전과(부) 페이지
	@GetMapping("/majorChange")
	public String majorChange() {
		return "content/school/major/major_change";
	}
	
	
	
	
	
	
	
	
	//등록금납부 -> 메인페이지
	@GetMapping("/tuitionMain")
	public String tuitionMain() {
		return "content/school/tuition/tuition_main";
	}
	
	//등록금납부 -> 등록금납부 페이지
	@GetMapping("/tuitionInfo")
	public String tuitionInfo() {
		return "content/school/tuition/tuition_info";
	}
	
	//등록금납부 -> 분할납부 페이지
	@GetMapping("/tuitionSplit")
	public String tuitionSplit() {
		return "content/school/tuition/tuition_split";
	}
	
	//등록금납부 -> 등록금반환기준 페이지
	@GetMapping("/tuitionReturn")
	public String tuitionReturn() {
		return "content/school/tuition/tuition_return";
	}
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}




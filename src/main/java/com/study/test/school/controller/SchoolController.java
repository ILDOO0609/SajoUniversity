package com.study.test.school.controller;

import java.time.Year;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Profile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.colleage.service.ColleageService;
import com.study.test.colleage.vo.DeptVO;
import com.study.test.emp.service.EmpService;
import com.study.test.emp.vo.LectureVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.school.service.CalendarService;
import com.study.test.school.service.SchoolService;
import com.study.test.school.vo.CalendarVO;
import com.study.test.school.vo.SchoolInfoVO;
import com.study.test.stu.vo.DeptManageVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;
import com.study.test.util.DateUtill;

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
	
	@Resource(name = "calendarService")
	private CalendarService calendarService;
	
	//학사메뉴 클릭시 페이지
	@GetMapping("/main")
	public String schoolMain() {
		
		return "content/school/school/school_main";
	}
	
	//학사메뉴 -> 학사안내 페이지
	@RequestMapping("/info")
	public String schoolInfo(Model model, SchoolInfoVO schoolInfoVO, @RequestParam(required = false, defaultValue = "0") int year) {
		//검색 년도
		if(year == 0) {
			year = DateUtill.getYear();
		}
		
		model.addAttribute("year", year);
		model.addAttribute("thisYear", DateUtill.getYear());
		
		//전체 데이터 수 조회
		schoolInfoVO.setTotalDataCnt(schoolService.schInfoListCnt());
		schoolInfoVO.setPageInfo();
		
		//게시글 조회
		model.addAttribute("infoList", schoolService.getSchoolInfoList(schoolInfoVO));
		
		return "content/school/school/school_info";
	}
	
	//학사메뉴 -> 학사안내 -> 검색
	@ResponseBody
	@PostMapping("/searchInfoListAjax")
	public List<SchoolInfoVO> searchInfoListAjax(SchoolInfoVO schoolInfoVO){
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+schoolService.searchInfoListAjax(schoolInfoVO));
		return schoolService.searchInfoListAjax(schoolInfoVO);
	}
	//학사메뉴 -> 학사안내 -> 월 셀렉박스 변경시, ajax로 조회
	@ResponseBody
	@PostMapping("/schInfoMonthAjax")
	public List<SchoolInfoVO> schInfoMonthAjax(int schInfoMonth){
		System.out.println("@@@@@@@@@@@########@#@#@" + schInfoMonth);
		return schoolService.schInfoMonthAjax(schInfoMonth);
	}
	
	//학사메뉴 -> 학사안내 게시글 작성페이지
	@GetMapping("/regSchoolBoard")
	public String regSchoolBoard() {
		return "content/school/school/school_board_write";
	}
	
	//학사메뉴 -> 학사안내 글등록
	@PostMapping("/insertSchoolInfo")
	public String insertSchoolInfo(SchoolInfoVO schoolInfoVO, Authentication authentication) {
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
		String numberStr = schInfoCode.substring(9);
		int prevNumber = Integer.parseInt(schInfoCode.substring(9)) - 1;
		int nextNumber = Integer.parseInt(schInfoCode.substring(9)) + 1;
		
		String prevStr = schInfoCode.replace(numberStr, String.format("%03d", prevNumber)); // 숫자를 3자리로 포맷팅하여 대체
		String nextStr = schInfoCode.replace(numberStr, String.format("%03d", nextNumber)); // 숫자를 3자리로 포맷팅하여 대체
	
		SchoolInfoVO prevDetail = schoolService.schoolBoardDetail(prevStr);
		SchoolInfoVO nextDetail = schoolService.schoolBoardDetail(nextStr);
		
		System.out.println("@@@@@@@@@@@@@@@이전글" + prevDetail);
		System.out.println("@@@@@@@@@@@@다음글" + nextDetail);
	
		if(prevDetail == null) {
			prevDetail = new SchoolInfoVO();
			prevDetail.setSchInfoTitle("이전글이 없습니다.");
		}
		if(nextDetail == null) {
			nextDetail = new SchoolInfoVO();
			nextDetail.setSchInfoTitle("다음글이 없습니다.");
		}
		
		model.addAttribute("prevList", prevDetail); 
		model.addAttribute("nextList", nextDetail);
		
		System.out.println("@@@@@@@@@@@@@@@이전글" + schoolService.schoolBoardDetail(prevStr));
		System.out.println("@@@@@@@@@@@@다음글" + schoolService.schoolBoardDetail(nextStr));
		
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


	
	
	//학사메뉴 -> 학사일정 페이지 및 전체조회
	@GetMapping("/scheList")
	public String calendarList(Model model) {
		model.addAttribute("calendarList", schoolService.calendarList());
		
		return "content/school/school/school_sche_list";
	}
	//학사메뉴 -> 학사일정 -> 일정추가
	@PostMapping("/addSchedule")
	public String addSchedule(CalendarVO calendarVO) {
		calendarService.addSchedule(calendarVO);
		
		return "redirect:/school/scheList";
	}
	
	// 학사일정 수정을 위해 조회
	@PostMapping("/forUpdateCalAjax")
	@ResponseBody
	public CalendarVO forUpdateCalAjax(@RequestParam String calNo) {
		System.out.println(calNo);
	    
	    return calendarService.getCalForUp(calNo);
	}
	
	// 학사일정 수정
	@PostMapping("/updateCal")
	public String updateCal(CalendarVO calendarVO) {
		calendarService.updateCal(calendarVO);
		
		return "redirect:/school/scheList";
	}
	
	// 일정 삭제
	@PostMapping("/deleteCal")
	public String deleteCal(String calNo) {
		calendarService.deleteCal(calNo);
		
		return "redirect:/school/scheList";
	}
	
	
//-------------------------------학사조회--------------------------------------------
	
	
	
	
	//학사조회 -> 메인페이지
	@GetMapping("/checkMain")
	public String checkMain() {
		return "content/school/check/check_main";
	}
	
	//전공대학 변경시 실행되는 함수
	@ResponseBody
	@PostMapping("/changeCollAjax")
	public List<DeptVO> changeCollAjax(String collNo) {
		List<DeptVO> deptList = empService.getDeptNameAjax(collNo);
		
		return deptList;
	}
	
	//학사조회 -> 학생조회 페이지
	@RequestMapping("/checkStu")
	public String checkStu(Model model) {
		//단과대학 정보 조회
		model.addAttribute("colleageList", colleageService.getColleageList());
		//전공학과 정보 조회
		model.addAttribute("deptList", colleageService.getDeptList());
		//학생조회
		StuVO stuVO = new StuVO();
		model.addAttribute("stuList", schoolService.checkStuList(stuVO));
		return "content/school/check/check_stu";
	}
	//학사조회 -> 학생조회 -> 학생검색
	@ResponseBody
	@PostMapping("/searchStuListAjax")
	public List<StuVO> searchStuListAjax(StuVO stuVO, MemberVO memberVO){
		stuVO.setMemberVO(memberVO);
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2" + stuVO);
		return schoolService.searchStuListAjax(stuVO);
	}
	//학사조회 -> 학생조회 -> 상세모달창
	@ResponseBody
	@PostMapping("/getStuModalAjax")
	public List<StuVO> getStuModalAjax(String stuNo){
		return schoolService.checkStuModal(stuNo);
	}
	
	
	
	
	//학사조회 -> 교수&교직원 조회 페이지
	@GetMapping("/checkPro")
	public String checkPro(Model model, LectureVO lectureVO, MemberVO memberVO) {
		//단과대학 정보 조회
		model.addAttribute("colleageList", colleageService.getColleageList());
		//전공학과 정보 조회
		model.addAttribute("deptList", colleageService.getDeptList());
		//교수 조회
		model.addAttribute("proList", schoolService.checkProList(lectureVO));
		//교직원 조회
		model.addAttribute("stfList", schoolService.checkStfList(memberVO));
		
		return "content/school/check/check_pro";
	}
	
	//학사조회 -> 교수&교직원 조회 -> 교수검색
	@ResponseBody
	@PostMapping("/searchProListAjax")
	public List<LectureVO> searchProListAjax(LectureVO lectureVO){
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + lectureVO);
		return schoolService.searchProListAjax(lectureVO);
	}
	//학사조회 -> 교수&교직원 조회 -> 교직원검색
	@ResponseBody
	@PostMapping("/searchStfListAjax")
	public List<MemberVO> searchStfListAjax(MemberVO memberVO, Model model){
		System.out.println("@#@#@#@@@@@@@@@@@@@@#@#@##" + memberVO);
		return schoolService.searchStfListAjax(memberVO);
	}
	//학사조회 -> 교수&교직원 조회 -> 교수/교직원 모달
	@ResponseBody
	@PostMapping("/getProModalAjax")
	public List<LectureVO> checkProModal(String empNo){
		return schoolService.checkProModal(empNo);
	}
	
	
	
	
	//학사조회 -> 강의및학점 페이지
	@GetMapping("/checkLec")
	public String checkLec() {
		return "content/school/check/check_lec";
	}
	
	
	
	
	
	
//-------------------------------학적변동--------------------------------------------
		
	
	
	//학적변동 메인 페이지
	@GetMapping("/acamain")
	public String acaMain() {
		return "content/school/academic/aca_main";
	}
	
	//학적변동 -> 휴학페이지 조회
	@GetMapping("/acaLeave")
	public String acaLeave(Model model) {
		//승인대기조회
		model.addAttribute("statuslist", schoolService.getStatusInfoList());
		//승인완료조회
		model.addAttribute("statusApplist", schoolService.getStatusInfoAppList());
		//승인취소조회
		model.addAttribute("statusDeniedlist", schoolService.getStatusInfoDeniedList());
		
		return "content/school/academic/aca_leave";
	}
	//학적변동 -> 휴학관리 승인완료처리
	@ResponseBody
	@PostMapping("/updateLeaveAppAjax")
	public void updateLeaveApp(String statusNo) {
		
		String stuNo = schoolService.updateLeaveSelect(statusNo);
		StatusInfoVO statusInfoVO = new StatusInfoVO();
		statusInfoVO.setStatusNo(statusNo);
		statusInfoVO.setStuNo(stuNo);
		
		schoolService.updateLeaveApp(statusInfoVO);
	}
	
	//학적변동 -> 휴학관리 승인취소처리
	@ResponseBody
	@PostMapping("/updateLeaveDeniedAjax")
	public void updateLeaveAppDenied(String statusNo) {
		
		String stuNo = schoolService.updateLeaveSelect(statusNo);
		StatusInfoVO statusInfoVO = new StatusInfoVO();
		statusInfoVO.setStatusNo(statusNo);
		statusInfoVO.setStuNo(stuNo);
		
		schoolService.updateLeaveDenied(statusInfoVO);
		
	}
	//학사조회 -> 휴학관리 -> 상세모달창
	@ResponseBody
	@PostMapping("/getLeaveModalAjax")
	public List<StuVO> getLeaveModalAjax(String statusNo){
		return schoolService.checkLeaveModal(statusNo);
	}
	
	
	
	
	
	
	//학적변동 -> 복학페이지 조회
	@GetMapping("/acaReturn")
	public String acaReturn(Model model) {
		//승인대기조회
		model.addAttribute("returnList", schoolService.getStatusReturnList());
		//승인완료조회
		model.addAttribute("returnAppList", schoolService.getStatusReturnAppList());
		//승인취소조회
		model.addAttribute("returnDeniedList", schoolService.getStatusReturnDeniedList());
		
		return "content/school/academic/aca_return";
	}
	
	//학적변동 -> 복학신청 승인완료처리
	@ResponseBody
	@PostMapping("/updateReturnAppAjax")
	public void updateReturnApp(String statusNo) {
		String stuNo = schoolService.updateReturnSelect(statusNo);
		StatusInfoVO statusInfoVO = new StatusInfoVO();
		statusInfoVO.setStatusNo(statusNo);
		statusInfoVO.setStuNo(stuNo);
		
		schoolService.updateReturnApp(statusInfoVO);
	}
		
	//학적변동 -> 복학신청 승인취소처리
	@ResponseBody
	@PostMapping("/updateReturnDeniedAjax")
	public void updateReturnDenied(String statusNo) {
		
		String stuNo = schoolService.updateReturnSelect(statusNo);
		StatusInfoVO statusInfoVO = new StatusInfoVO();
		statusInfoVO.setStatusNo(statusNo);
		statusInfoVO.setStuNo(stuNo);
		
		schoolService.updateReturnDenied(statusInfoVO);
	}
	
	//학사조회 -> 복학관리 -> 상세모달창
	@ResponseBody
	@PostMapping("/getReturnModalAjax")
	public List<StuVO> getReturnModalAjax(String statusNo){
		return schoolService.checkReturnModal(statusNo);
	}
	
	
	
// -------수업메뉴 ------------------------------------------------------	

	
	//수업 -> 메인 페이지
	@GetMapping("/lessonMain")
	public String lesonMain() {
		return "content/school/lesson/lesson_main";
	}
	
	//수업메뉴 -> 복수전공관리 -> 승인대기 및 전체조회
	@GetMapping("/lessonMajorDouble")
	public String lessonMajorDouble(Model model) {
		//승인대기조회
		model.addAttribute("majorList", schoolService.getDeptManageList());
		//승인완료조회
		model.addAttribute("majorAppList", schoolService.getDeptManageAppList());
		//승인취소조회
		model.addAttribute("majorDeniedList", schoolService.getDeptManageDeniedList());
		return "content/school/lesson/lesson_major_double";
	}
	
	//수업메뉴 -> 복수전공관리 -> 승인완료처리
	@ResponseBody
	@PostMapping("/updateDoubleAppAjax")
	public void updateDoubleApp(String applyNo) {
		String stuNo = schoolService.updateDoubleSelect(applyNo);
		DeptManageVO deptManageVo = new DeptManageVO();
		deptManageVo.setApplyNo(applyNo);
		deptManageVo.setStuNo(stuNo);
		schoolService.updateDoubleApp(deptManageVo);
	}
	//수업메뉴 -> 복수전공관리 -> 승인취소처리
	@ResponseBody
	@PostMapping("/updateDoubleDeniedAjax")
	public void updateDoubleDenied(String applyNo) {
		String stuNo = schoolService.updateDoubleSelect(applyNo);
		DeptManageVO deptManageVO = new DeptManageVO();
		deptManageVO.setApplyNo(applyNo);
		deptManageVO.setStuNo(stuNo);
		schoolService.updateDoubleDenied(deptManageVO);
	}
	
	//수업 -> 학사경고관리 페이지
	@GetMapping("/lessonWarning")
	public String lessonWarning() {
		return "content/school/lesson/lesson_warning";
	}

	
	
	
	
//-------------------------------회원메뉴--------------------------------------------

	//회원메뉴 -> 신규회원 페이지
	@GetMapping("/memberList")
	public String memberList(Model model) {
		//단과대학 정보 조회
		model.addAttribute("colleageList", colleageService.getColleageList());
		//전공학과 정보 조회
		model.addAttribute("deptList", colleageService.getDeptList());
		//회원등록 전체 조회
		model.addAttribute("memberList", schoolService.selectMemberList()); 
		return "content/school/member/member_list";
	}
	
	
	
	 //회원메뉴 -> 신규회원 -> 승인완료
	 @ResponseBody
	 @PostMapping("/updatePositionAjax") 
	 public void updatePosition(String memNo, StuVO stuVO) {
		MemberVO memberVO = schoolService.selectMember(memNo);
		stuVO.setMemberVO(memberVO);
		System.out.println("@##@#################" + stuVO);
		
		if(memberVO.getMemRole().equals("학생")) {
			schoolService.insertStu(stuVO);
		}
		else {
			schoolService.insertEmp(stuVO);
		}
		
		schoolService.updatePosition(memNo);
	 }
	
	//회원메뉴 -> 승인/취소 전체조회 페이지
	@GetMapping("/memberSelectList")
	public String memberSelectList(Model model) {
		model.addAttribute("memberList", schoolService.selectMemberTotalList());
		return "content/school/member/member_select_list";
	}
	//회원메뉴 -> 승인/취소 승인조회
	@ResponseBody
	@PostMapping("/approveOAjax")
	public List<MemberVO> approveO(String isConfirmed) {
		return schoolService.selectMemberAddList(isConfirmed);
	}
	//회원메뉴 -> 승인/취소 취소조회
	@ResponseBody
	@PostMapping("/approveXAjax")
	public List<MemberVO> approveX(String isConfirmed) {
		return schoolService.selectMemberDeniedList(isConfirmed);
	}
	
	
	//회원메뉴 -> 회원상세 모달창
	@ResponseBody
	@PostMapping("/getMemberModalAjax")
	public List<MemberVO> getMemberModal(String memNo){
		return schoolService.getMemberModal(memNo);
	}
	
	
	
	
	 //회원메뉴 -> 신규회원 -> 승인거절
	 @ResponseBody
	 @PostMapping("/updateXPositionAjax") 
	 public void updateXPosition(String memNo, StuVO stuVO) {
		MemberVO memberVO = schoolService.selectMember(memNo);
		
		stuVO.setMemberVO(memberVO);
		
		System.out.println("@##@#################" + stuVO);
		
		schoolService.updateXPosition(memNo);
	 }
	
	
	
	
	
	
	
	
	
	
	
}




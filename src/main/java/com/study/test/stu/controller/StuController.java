package com.study.test.stu.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.board.service.BoardService;
import com.study.test.board.vo.BoardVO;
import com.study.test.colleage.service.ColleageService;
import com.study.test.colleage.vo.DeptVO;
import com.study.test.emp.service.EmpService;
import com.study.test.emp.vo.EnrollmentVO;
import com.study.test.emp.vo.LectureVO;
import com.study.test.member.service.memberService;
import com.study.test.member.vo.MemberVO;
import com.study.test.stu.service.StuService;
import com.study.test.stu.vo.DeptManageVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;
import com.study.test.util.TimeTableForTime;

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
	
	@Resource(name="memberService")
	private memberService memberService;
	
	// 학생 학적 기본조회
	@GetMapping("/stuInfoForSc")
	public String stuInfoForSc(Authentication authentication, String stuNo, Model model, String memNo) {
		stuNo = stuService.getStuInfo(authentication.getName()).getStuNo();
		// 휴학복학상태 조회
		model.addAttribute("statusInfo", stuService.getStatusInfoForStu(stuNo));
		// 복수전공 신청 조회
		model.addAttribute("getDeptInfo", stuService.getDeptManageForStu(stuNo));
		
		memNo = authentication.getName();
		model.addAttribute("collInfo", stuService.getCollName(memNo));
		model.addAttribute("deptInfo", stuService.getDeptName(memNo));
		
		return "content/stu/stu_info_for_sc";
	}
	
	// 학생 성적 조회
	@GetMapping("/stuGetGrade")
	public String stuGetGrade(Authentication authentication, String stuNo, Model model) {
		stuNo = stuService.getStuInfo(authentication.getName()).getStuNo();
		
		model.addAttribute("gradeList", stuService.getStuGradeForStu(stuNo));
		model.addAttribute("stuAvg", stuService.getAvg(stuNo));
		model.addAttribute("totalScoreForStu", stuService.getTotalScore(stuNo));
		
		return "content/stu/stu_get_grade";
	}
	
	
	// 학생 정보 조회
	@GetMapping("/stuInfo")
	public String stuInfo(Authentication authentication, Model model, String memNo) {
		// 학생 정보 조회
		memNo = authentication.getName();
		model.addAttribute("memInfo", memberService.getMemInfoForStu(memNo));
		model.addAttribute("stuInfo", stuService.getStuInfo(memNo));
		model.addAttribute("collInfo", stuService.getCollName(memNo));
		model.addAttribute("deptInfo", stuService.getDeptName(memNo));
		
		return "content/stu/stu_info";
	}
	
	// 학생 정보 수정 페이지
	@GetMapping("/updateStuInfoForm")
	public String updateStuInfo(Authentication authentication, String memNo, Model model) {
		// 학생 정보 조회
		memNo = authentication.getName();
		model.addAttribute("memInfo", memberService.getMemInfoForStu(memNo));
		model.addAttribute("stuInfo", stuService.getStuInfo(memNo));
		model.addAttribute("collInfo", stuService.getCollName(memNo));
		model.addAttribute("deptInfo", stuService.getDeptName(memNo));
		
		return "content/stu/stu_update_info";
	}
	
	// 학생 정보 수정
	@PostMapping("/updateStuInfo")
	public String updateStuInfo(Authentication authentication, MemberVO memberVO) {
		memberVO.setMemNo(authentication.getName());
		
		memberService.updateStuInfo(memberVO);
		
		return "redirect:/stu/stuInfo";
	}
	
	// 복수전공 신청
	@GetMapping("/stuMultimajor")
	public String stuMultimajor(Authentication authentication, Model model, String memNo) { 
		// 학생 정보 조회
		memNo = authentication.getName();
		model.addAttribute("memInfo", memberService.getMemInfoForStu(memNo));
		model.addAttribute("stuInfo", stuService.getStuInfo(memNo));
		model.addAttribute("collInfo", stuService.getCollName(memNo));
		model.addAttribute("deptInfo", stuService.getDeptName(memNo));
		
		// 단과대학 조회
		model.addAttribute("colleageList", colleageService.getColleageList());
		// 소속학과 조회
		model.addAttribute("deptList", colleageService.getDeptList());
		
		
		return "content/stu/stu_multimajor";
		
	}
	
	
	//  복수전공 신청 처리
	@PostMapping("/confirmMulti")
	public String confirmMulti(DeptManageVO deptManageVO) {
		stuService.insertMultiMajor(deptManageVO);
		
		return "redirect:/stu/stuInfoForSc";
	}
	
	
	// 수강신청
	@RequestMapping("/stuSemEnroll")
	public String stuSemEnroll(Model model, LectureVO lectureVO, Authentication authentication, MemberVO memberVO, StuVO stuVO, EnrollmentVO enrollmentVO, String stuNo) {
		// 단과대학 조회
		model.addAttribute("colleageList", colleageService.getColleageList());
		// 소속학과 조회
		model.addAttribute("deptList", colleageService.getDeptList());
		// 강의 조회
		model.addAttribute("lecList", stuService.getLectureForStu(lectureVO));
		
		return "content/stu/stu_sem_enroll";
		
	}
	
	// 수강신청에서 단과대학 변경시 소속학과 변경하는 Ajax
	@ResponseBody
	@PostMapping("/changeCollAjax")
	public List<DeptVO> changeCollAjax(String collNo){
		List<DeptVO> deptList = empService.getDeptNameAjax(collNo);
		
		return deptList;
	} 
	
	// 수강신청 내역 조회 페이지
	@GetMapping("/stuSemEnrollNow")
	public String stuSemEnrollNow(Model model, Authentication authentication, String stuNo) {
		stuNo = stuService.getStuInfo(authentication.getName()).getStuNo();
		
		model.addAttribute("enrList", stuService.getEnrollmentNow(stuNo));
		
		return "content/stu/stu_sem_enroll_now";
	}
	
	@PostMapping("/stuSemEnrollNowForDelete")
	public String stuSemEnrollNowForDelete(EnrollmentVO enrollmentVO, Authentication authentication) {
		enrollmentVO.setStuNo(stuService.getStuInfo(authentication.getName()).getStuNo());
		
		stuService.deleteEnr(enrollmentVO);
		
		return "redirect:/stu/stuSemEnrollNow";
	}
	
	// 수강신청 시 검색 버튼 클릭 시 실행 되는 Ajax
	@ResponseBody
	@PostMapping("/searchEnrollAjax")
	public List<LectureVO> searchEnrollAjax(LectureVO lectureVO) {
		
		return stuService.getLectureForStu(lectureVO);
	}
	
	// 수강신청 버튼 클릭 시 실행되는 Ajax
	@ResponseBody
	@PostMapping("/applyEnrollmentAjax")
	public boolean applyEnrollmentAjax(String lecNo, String semNo, EnrollmentVO enrollmentVO, Authentication authentication) {
		enrollmentVO.setLecNo(lecNo);
		enrollmentVO.setSemNo(semNo);
		enrollmentVO.setStuNo(stuService.getStuInfo(authentication.getName()).getStuNo());
		
		// 수강신청 테이블에 insert쿼리
		int result = stuService.insertEnrollment(enrollmentVO);

		// 현재신청인원 추가
		stuService.updateNowNum(enrollmentVO);
		
		return result == 1 ? true : false;
	}
	
	// 수강신청 버튼 활성화/비활성화 Ajax
	@ResponseBody
	@PostMapping("/checkEnrollmentAjax")
	public boolean checkEnrollmentAjax(String lecNo, Authentication authentication, EnrollmentVO enrollmentVO, String stuNo) {
		// stuNo 세팅 -> 중복수강신청 막기위함
		stuNo = stuService.getStuInfo(authentication.getName()).getStuNo();
		enrollmentVO.setLecNo(lecNo);
		enrollmentVO.setStuNo(stuNo);
		// 중복수강신청 금지를 위한 조회 
		int result = stuService.getLecForStu(enrollmentVO);
		
		return result >= 1 ? true : false;
		
	}
	
	// 휴학신청
	@GetMapping("/stuStatus")
	public String stuStatus(Authentication authentication, Model model, String memNo) {
		// 학생 정보 조회
		memNo = authentication.getName();
		model.addAttribute("memInfo", memberService.getMemInfoForStu(memNo));
		model.addAttribute("stuInfo", stuService.getStuInfo(memNo));
		model.addAttribute("collInfo", stuService.getCollName(memNo));
		model.addAttribute("deptInfo", stuService.getDeptName(memNo));
		
		return "content/stu/stu_status";
		
	}
	
	// 휴학신청 진행중인 학생 중복신청 x
	@ResponseBody
	@PostMapping("/forStatusSubmitAjax")
	public int forStatusSubmitAjax(Authentication authentication) {
		
		return stuService.getIngStatus(stuService.getStuInfo(authentication.getName()).getStuNo());
	}
	
	// 휴학처리
	@PostMapping("/stuAbsence")
	public String stuAbsence(StatusInfoVO statusInfoVO, Authentication authentication) {
		statusInfoVO.setStuNo(stuService.getStuInfo(authentication.getName()).getStuNo());
		
		stuService.applyAbsence(statusInfoVO);
		
		return "redirect:/stu/stuInfoForSc";
	}
	
	// 복학신청 페이지
	@GetMapping("/stuStatusRe")
	public String stuStatusRe(Authentication authentication, Model model, String memNo) {
		// 학생 정보 조회
		memNo = authentication.getName();
		model.addAttribute("memInfo", memberService.getMemInfoForStu(memNo));
		model.addAttribute("stuInfo", stuService.getStuInfo(memNo));
		model.addAttribute("collInfo", stuService.getCollName(memNo));
		model.addAttribute("deptInfo", stuService.getDeptName(memNo));
		
		return "content/stu/stu_status_re";
	}
	
	
	// 복학 처리가능한지 검사
	@ResponseBody
	@PostMapping("/stuAbsenceReAjax")
	public boolean stuAbsenceReAjax(Authentication authentication, String stuNo) {
		stuNo = stuService.getStuInfo(authentication.getName()).getStuNo();
		
		return stuService.getStatusRe(stuNo) >= 1 ? true : false;
	}
	
	// 복학 처리
	@GetMapping("/stu/stuAbsenceRe")
	public String stuAbsenceRe(Authentication authentication, String stuNo) {
		stuService.updateStatusStuForRe(stuNo);
		
		return "redirect:/stu/stuInfoForSc";
	}
	
	
	// 휴학/복학 신청 취소
	@GetMapping("/deleteAbsence")
	public String deleteAbsence(Authentication authentication ,String stuNo) {
		stuNo = stuService.getStuInfo(authentication.getName()).getStuNo();
		
		stuService.deleteAbsence(stuNo);
		
		return "redirect:/stu/stuInfoForSc";
	}
	
	// 복수전공 신청 취소
	@GetMapping("/deleteMultiMajor")
	public String deleteMultiMajor(Authentication authentication ,String stuNo) {
		stuNo = stuService.getStuInfo(authentication.getName()).getStuNo();
		
		stuService.deleteMultiMajor(stuNo);
		
		return "redirect:/stu/stuInfoForSc";
	}
	
	// 학생 시간표
	@GetMapping("/stuTimetable")
	public String stuTimetable(Authentication authentication, String stuNo, Model model) {
		stuNo = stuService.getStuInfo(authentication.getName()).getStuNo();
		
		model.addAttribute("lecList", stuService.getLectureListForStuTimeTable(stuNo));

		model.addAttribute("timeTableForTime", new TimeTableForTime());
		
		return "content/stu/stu_timetable";
	}
	
	@ModelAttribute("timeTableForTime")
    public TimeTableForTime getTimeTableForTime() {
        return new TimeTableForTime();
    }

   


}

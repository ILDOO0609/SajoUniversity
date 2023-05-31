package com.study.test.emp.controller;

import java.util.ArrayList;
import java.util.HashMap;
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
import org.springframework.web.multipart.MultipartFile;

import com.study.test.colleage.service.ColleageService;
import com.study.test.colleage.vo.DeptVO;
import com.study.test.colleage.vo.GradeVO;
import com.study.test.emp.service.EmpService;
import com.study.test.emp.vo.LecturePDFVO;
import com.study.test.emp.vo.LectureTimeVO;
import com.study.test.emp.vo.LectureVO;
import com.study.test.emp.vo.StuGradeVO;
import com.study.test.util.UploadUtil;

import jakarta.annotation.Resource;


@Controller
@RequestMapping("/emp")
public class EmpController {
	
	@Resource(name = "empService")
	private EmpService empService;
	@Resource(name = "colleageService")
	private ColleageService colleageService;
	
	//강의리스트 페이지로 이동
	@GetMapping("/lectureList")
	public String lectureList(Model model, Authentication authentication, LectureVO lectureVO) {
		lectureVO.setEmpNo(getNowEmpNo(authentication));
		model.addAttribute("lectureList", empService.getLectureList(lectureVO));
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@"+empService.getLectureList(lectureVO));
		return "content/emp/lecture_list";
	}
	
	//강의리스트에서 강의폐강
	@ResponseBody
	@PostMapping("/regCloseAjax")
	public boolean regCloseAjax(String lecNo, Model model) {
	    return empService.updateLecStatusAjax(lecNo);
	}
	
	//강의 폐강시 강의 리스트 목록 조회 Ajax
	@ResponseBody
	@PostMapping("/getLectureListAjax")
	public List<LectureVO> getLectureListAjax(Authentication authentication, LectureVO lectureVO){
		lectureVO.setEmpNo(getNowEmpNo(authentication));
		return empService.getLectureList(lectureVO);
	}
	
	//강의 수정위한 목록 조회
	@ResponseBody
	@PostMapping("/getLectureListForUpdateAjax")
	public List<LectureVO> getLectureListForUpdateAjax(LectureVO lectureVO, Authentication authentication){
		lectureVO.setEmpNo(getNowEmpNo(authentication));
		return empService.getLectureList(lectureVO);
	}
	
	//강의 수정
	@PostMapping("/lecUpdate")
	public String lecUpdate(LectureVO lectureVO, LectureTimeVO lectureTimeVO) {
		System.out.println("@@@@@@@@@@@@@"+lectureVO);
		System.out.println("@@@@@@@@@@@@@"+lectureTimeVO);
		
		String timeNos = lectureTimeVO.getTimeNo();
		String lecDays = lectureTimeVO.getLecDay();
		String firstTimes = lectureTimeVO.getFirstTime();
		String lastTimes = lectureTimeVO.getLastTime();

		String[] timeNoArray = timeNos.split(",");
		String[] lecDayArray = lecDays.split(",");
		String[] firstTimeArray = firstTimes.split(",");
		String[] lastTimeArray = lastTimes.split(",");

		List<LectureTimeVO> lectureTimeList = new ArrayList<>();

		for(int i = 0; i < timeNoArray.length; i++) {
		    LectureTimeVO lt = new LectureTimeVO();
		    lt.setTimeNo(timeNoArray[i]);
		    lt.setLecDay(lecDayArray[i]);
		    lt.setFirstTime(firstTimeArray[i]);
		    lt.setLastTime(lastTimeArray[i]);
		    lectureTimeList.add(lt);
		}

		lectureVO.setLectureTimeList(lectureTimeList);
		empService.lecUpdate(lectureVO);
		return "redirect:/emp/lectureList";
	}
	
	//강의 검색
	@ResponseBody
	@PostMapping("/searchLectureAjax")
	public List<LectureVO> searchLectureAjax(Authentication authentication, LectureVO lectureVO){
		System.out.println("@@@@@@@@@@@@@@@@"+lectureVO);
		lectureVO.setEmpNo(getNowEmpNo(authentication));
		
		return empService.getLectureListAfterSearch(lectureVO);
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
	public String regLecture(LectureVO lectureVO, LecturePDFVO lecturePDFVO, MultipartFile pdfFile, LectureTimeVO lectureTimeVO, Authentication authentication) {
		//--파일 첨부--//
		//pdf파일 업로드
		lecturePDFVO = UploadUtil.uploadPdfFile(pdfFile);
		
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
		//lecturePDFVO에 LEC_NO세팅
		lecturePDFVO.setLecNo(getNextLectNo);
		
		//EMP_NO세팅
		lectureVO.setEmpNo(getNowEmpNo(authentication));
		
		//lectureVO랑 lecTimeList를 데이터로 갖는 map 생성
		HashMap<String, Object> map = new HashMap<>();
		map.put("lectureVO", lectureVO);
		map.put("lecTimeList", lecTimeList);
		map.put("lecturePDFVO", lecturePDFVO);
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+map);
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
		System.out.println("1111111111111111111111");
		List<String> lecNoArr = (List<String>) map.get("lecNoArr");
		List<String> firstTimeArr = (List<String>) map.get("firstTimeArr");
	    List<String> lastTimeArr = (List<String>) map.get("lastTimeArr");
	    List<String> lecDayArr = (List<String>) map.get("lecDayArr");
	    
	    // 배열의 길이만큼 반복하여 LectureTimeVO 객체를 생성하고 lecTimeList에 추가
	    System.out.println("22222222222222222");
	    for (int i = 0; i < firstTimeArr.size(); i++) {
	        LectureTimeVO lectureTimeVO = new LectureTimeVO();
	        lectureTimeVO.setFirstTime(firstTimeArr.get(i));
	        lectureTimeVO.setLastTime(lastTimeArr.get(i));
	        lectureTimeVO.setLecDay(lecDayArr.get(i));
	        if(lecNoArr.size()!=0) {
	        	lectureTimeVO.setLecNo(lecNoArr.get(i));
	        }
	        lecTimeList.add(lectureTimeVO);
	    }
		HashMap<String, Object>lecTimeMap = new HashMap<>();
		lecTimeMap.put("lecTimeList", lecTimeList);
		lecTimeMap.put("empNo", getNowEmpNo(authentication));
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!"+lecTimeMap);
		System.out.println("@@@@@@@@@@@@@@@@@@"+empService.timeDuplicationCheckAjax(lecTimeMap));
		return empService.timeDuplicationCheckAjax(lecTimeMap);
	}
	
	//강의 시간표
	@GetMapping("/lecSchedule")
	public String lecSchedule() {
		return "content/emp/lec_schedule";
	}
	
	//강의 시간표
	@ResponseBody
	@PostMapping("/lecScheduleAjax")
	public List<Map<String, Object>> lecSchedule(Authentication authentication) {
		return empService.getLectureListForSchedule(getNowEmpNo(authentication));
	}
	
	//학생성적등록 페이지로 이동
	@GetMapping("/regScore")
	public String regScore(Model model, Authentication authentication) {
		List<Map<String, String>> map = empService.getLectureListForRegScore(getNowEmpNo(authentication));
		model.addAttribute("mapList", map);
		return "content/emp/reg_score";
	}
	
	//학생성적등록 위한 수강생목록 조회
	@ResponseBody
	@PostMapping("/getStuEnrListAjax")
	public Map<String, Object> getStuEnrListAjax(String lecNo) {
		List<GradeVO>gradeList = colleageService.getGradeList();
		List<Map<String, String>>stuList = empService.getStuEnrForRegScore(lecNo);
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("gradeList", gradeList);
		map.put("stuList", stuList);
		
		return map;
	}
	
	//학생성적 등록 Ajax
	@ResponseBody
	@PostMapping("/regScoreAjax")
	public boolean regScoreAjax(StuGradeVO stuGradeVO) {
		return empService.insertStuGrade(stuGradeVO);
	}
	
	//학생성적 변경 Ajax
	@ResponseBody
	@PostMapping("/updateScoreAjax")
	public boolean updateScoreAjax(StuGradeVO stuGradeVO) {
		return empService.updateStuGrade(stuGradeVO);
	}
	
	//현재 교수의 EMP_NO 조회
	public String getNowEmpNo(Authentication authentication) {
		User user = (User)authentication.getPrincipal(); 
		String empNo = empService.getNowEmpNo(user.getUsername());
		return empNo;
	}
}

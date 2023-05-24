package com.study.test.emp.vo;

import java.util.List;

import com.study.test.colleage.vo.ColleageVO;
import com.study.test.colleage.vo.DeptVO;
import com.study.test.colleage.vo.SemesterVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.stu.vo.StuVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LectureVO {
	private String lecNo;
	private String lecName;
	private int lecScore;
	private String createDate;
	private int maxNum;
	private int nowNum;
	private String lecStatus;
	private String empNo;
	private String semNo;
	private String collNo;
	private String deptNo;
	
	// 학생 수강신청용 추가
	private SemesterVO semesterVO;
	private StuVO stuVO;
	private EnrollmentVO enrollmentVO;
	private MemberVO memberVO;
	private EmpVO empVO;
	private DeptVO deptVO;
	private ColleageVO colleageVO;
	private List<LectureTimeVO> lectureTimeList;
	private String searchValue;
}

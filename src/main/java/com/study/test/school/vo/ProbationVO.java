package com.study.test.school.vo;

import com.study.test.colleage.vo.SemesterVO;
import com.study.test.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ProbationVO {
	private String probNo;
	private String probDate;
	private String memNo;
	private String stuNo;
	private String semNo;
	private String probStatusCode;
	private String probCnt;
	
	private ProbationStatusVO probationStatusVO;
	private MemberVO memberVO;
	private SemesterVO semesterVO;
	
}

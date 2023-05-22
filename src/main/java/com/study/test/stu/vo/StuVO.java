package com.study.test.stu.vo;

import com.study.test.colleage.vo.ColleageVO;
import com.study.test.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class StuVO {
	private String stuNo;
	private String stuYear;
	private String stuSem;
	private String stuStatus;
	private String memNo;
	private String collNo;
	private String deptNo;
	private String multiNo;
	
	private MemberVO memberVO;
	private ColleageVO colleageVO;
}

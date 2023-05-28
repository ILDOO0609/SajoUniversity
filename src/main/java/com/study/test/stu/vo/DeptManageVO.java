package com.study.test.stu.vo;

import com.study.test.colleage.vo.ColleageVO;
import com.study.test.colleage.vo.DeptVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class DeptManageVO {
	private String applyNo;
	private String applyDate;
	private String applyReason;
	private String approvalDate;
	private String processStatus;
	private String stuYear;
	private String stuSem;
	private String stuNo;
	private String multiMajorColl;
	private String multiMajorDept;
	
	private DeptVO deptVO;
	private StuVO stuVO;
	private ColleageVO colleageVO;
	
}	

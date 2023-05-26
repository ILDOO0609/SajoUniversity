package com.study.test.stu.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class DeptManageVO {
	private String applyNo;
	private String applyCode;
	private String applyDate;
	private String applyReason;
	private String approvalDate;
	private String processStatus;
	private String stuYear;
	private String stuSem;
	private String stuNo;
	private String fromColl;
	private String toColl;
	private String fromDept;
	private String toDept;
	private String multiMajorColl;
	private String multiMajorDept;
	
}

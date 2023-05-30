package com.study.test.stu.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StatusInfoVO {
	private String statusNo;
	private String nowStatus;
	private String afterStatus;
	private String applyDate;
	private String approvalDate;
	private String ingStatus;
	private String stuNo;
	private String statusContent;
	
	private StuVO stuVO;
}

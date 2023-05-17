package com.study.test.school.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SchoolInfoVO {
	private String schInfoCode;
	private String schInfoTitle;
	private String schInfoContent;
	private String schInfoWriter;
	private String schInfoDate;
	private String schInfoStartDate;
	private String schInfoEndDate;
	private int schInfoReadCnt;
	
	private String regDate;
	private String startDate;
	private String endDate;
	
}

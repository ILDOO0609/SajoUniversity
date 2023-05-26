package com.study.test.school.vo;

import com.study.test.util.PageVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SchoolInfoVO extends PageVO{
	private String schInfoCode;
	private String schInfoTitle;
	private String schInfoContent;
	private String schInfoWriter;
	private String schInfoDate;
	private String schInfoStartDate;
	private String schInfoEndDate;
	private String regDate;
	private String startDate;
	private String endDate;
	private int schInfoReadCnt;
	private String schInfoNum;
	
	private String schInfoSearch;
	
	private String prevNum;
	private String prevTitle;
	private String nextNum;
	private String nextTitle;
	
}

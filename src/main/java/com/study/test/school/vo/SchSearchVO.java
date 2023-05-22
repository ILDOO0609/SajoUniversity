package com.study.test.school.vo;

import com.study.test.util.PageVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class SchSearchVO extends PageVO{
	private String searchValue;
	private String searchYear;
	private String searchMonth;
	
}

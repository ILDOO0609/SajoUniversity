package com.study.test.school.vo;

import com.study.test.util.PageVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SearchVO extends PageVO{
	private String searchFromDate;
	private String searchToDate;
	private String searchKeyword;
	private String searchValue;
}

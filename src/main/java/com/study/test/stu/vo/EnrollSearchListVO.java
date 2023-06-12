package com.study.test.stu.vo;

import com.study.test.util.PageVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EnrollSearchListVO extends PageVO{
	
	private String searchValue;
	private String collNo;
	private String deptNo;

	

}

package com.study.test.school.vo;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SchInfoFileVO {
	private String schFileCode;
	private String schOriginFileName;
	private String schAttachedFileName;
	private String schIsMain;
	private String schInfoCode;
}

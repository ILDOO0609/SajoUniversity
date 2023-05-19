package com.study.test.school.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PrenextPageVO {
	private String prevNo;
	private String prevTitle;
	private String nextNo;
	private String nextTitle;
	private String schInfoCode;
	private String schInfoTitle;
}

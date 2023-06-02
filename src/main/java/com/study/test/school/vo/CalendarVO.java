package com.study.test.school.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CalendarVO {
	private String calNo;
	private String title;
	private String regDate;
	private String startDate;
	private String endDate;
	private String calContent;
}

package com.study.test.util;

import java.util.Calendar;

public class DateUtill {

	//올해의 년도 문자열로 리턴
	public static int getYear() {
		Calendar cal = Calendar.getInstance();
		return cal.get(Calendar.YEAR);
	}
	
}

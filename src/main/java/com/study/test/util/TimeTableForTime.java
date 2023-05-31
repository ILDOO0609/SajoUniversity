package com.study.test.util;

import org.thymeleaf.exceptions.TemplateProcessingException;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class TimeTableForTime {
	
	public static String getTimeString(final Integer time, final LocalTime startTime) {
	    if (time >= 1 && time <= 9) {
	        int minutesToAdd = (time - 1) * 50; // 교시별 시간 계산
	        LocalTime endTime = startTime.plusMinutes(minutesToAdd + 50); // 종료 시간 계산
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm"); // 출력 형식 지정
	        return startTime.format(formatter) + " ~ " + endTime.format(formatter);
	    } else {
	        throw new TemplateProcessingException("Invalid time value: " + time);
	    }
	}
}

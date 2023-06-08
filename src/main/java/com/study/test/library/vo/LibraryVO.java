package com.study.test.library.vo;

import com.study.test.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class LibraryVO {
	private String libNo;
	private String memNo;
	private String libIsUse;
	private int seatNo;
	private String startTime;
	private String endTime;
	
	private MemberVO memberVO;

}

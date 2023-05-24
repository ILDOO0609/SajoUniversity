package com.study.test.member.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
public class MemberVO {
	private String memNo;
	private String memPw;
	private String memPwUpdate;
	private String memName;
	private String memGender;
	private String memTell;
	private String memAddr;
	private String memAddrDetail;
	private String memRole;
	private String memBirthday;
	private String memEmail;
	private String memImage;
	private String memQuest;
	private String regDate;

	private String[] memTells;
}

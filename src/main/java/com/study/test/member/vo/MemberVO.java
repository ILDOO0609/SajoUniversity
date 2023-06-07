package com.study.test.member.vo;

import java.util.Arrays;

import com.study.test.util.PageVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
public class MemberVO extends PageVO{
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
	private String searchValue;

	private String[] memTells;
	
	private String isConfirmed;

	@Override
	public String toString() {
		return "MemberVO [memNo=" + memNo + ", memPw=" + memPw + ", memPwUpdate=" + memPwUpdate + ", memName=" + memName
				+ ", memGender=" + memGender + ", memTell=" + memTell + ", memAddr=" + memAddr + ", memAddrDetail="
				+ memAddrDetail + ", memRole=" + memRole + ", memBirthday=" + memBirthday + ", memEmail=" + memEmail
				+ ", memImage=" + memImage + ", memQuest=" + memQuest + ", regDate=" + regDate + ", searchValue="
				+ searchValue + ", memTells=" + Arrays.toString(memTells) + ", isConfirmed=" + isConfirmed
				+ ", toString()=" + super.toString() + "]";
	}

	
	
	
	
	
	
}



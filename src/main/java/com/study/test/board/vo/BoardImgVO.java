package com.study.test.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardImgVO {
	private String imgCode;
	private String originName;
	private String attachedName;
	private String isMain;
	private String boardNo;
}

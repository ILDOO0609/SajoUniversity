package com.study.test.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class BoardVO {
	private String boardNo;
	private String boardTitle;
	private String boardContent;
	private String boardWriter;
	private String boardCreateDate;
	private int boardReadCnt;
	private int replyCnt;
	private String isSecret;
	private String isNotice;
	private String cateNo;
}

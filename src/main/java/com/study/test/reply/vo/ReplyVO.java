package com.study.test.reply.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ReplyVO {
	private int replyNo;
	private String replyContent;
	private String replyWriter;
	private String isPrivate;
	private String replyCreateDate;
	private String boardNo;
}
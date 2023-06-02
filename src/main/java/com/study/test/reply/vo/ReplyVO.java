package com.study.test.reply.vo;

import com.study.test.member.vo.MemberVO;

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
	private String replyCreateDate;
	private String boardNo;
	private MemberVO memberVO;
}

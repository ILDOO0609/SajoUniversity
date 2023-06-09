package com.study.test.board.vo;

import java.util.List;

import com.study.test.member.vo.MemberVO;
import com.study.test.reply.vo.ReplyVO;

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
	private int secretPw;
	private String isSecret;
	private String isNotice;
	private String cateNo;
	
	private List<ReplyVO> replyList;
	private BoardImgVO boardImgVO;
	private BoardCategoryVO boardCategoryVO;
	private MemberVO memberVO;
	private String searchValue;
	
}

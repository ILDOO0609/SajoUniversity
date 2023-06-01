package com.study.test.board.vo;

import com.study.test.util.PageVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardListSearchVO extends PageVO{
	private String inputValue;
	private String selectValue;
	private String checkValue;
	private String cateNo;
}

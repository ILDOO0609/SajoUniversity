package com.study.test.emp.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LecturePDFVO {
	private String pdfNo;
	private String originPdfName;
	private String attachedPdfName;
	private String lecNo;
}

package com.study.test.school.service;

import java.util.List;

import com.study.test.school.vo.SchoolInfoVO;

public interface SchoolService {

	//학사안내 게시글 등록
	void insertSchoolInfo(SchoolInfoVO schoolInfoVO);

	//학사안내 게시글 목록
	List<SchoolInfoVO> getSchoolInfoList();
	
}

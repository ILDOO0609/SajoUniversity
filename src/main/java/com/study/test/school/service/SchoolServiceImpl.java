package com.study.test.school.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.colleage.vo.DeptVO;
import com.study.test.school.vo.PrenextPageVO;
import com.study.test.school.vo.SchoolInfoVO;

@Service("schoolService")
public class SchoolServiceImpl implements SchoolService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//학사안내 게시글 등록
	@Override
	public void insertSchoolInfo(SchoolInfoVO schoolInfoVO) {
		sqlSession.insert("schoolMapper.insertSchoolInfo", schoolInfoVO);
	}
	
	//학사안내 게시글 목록
	@Override
	public List<SchoolInfoVO> getSchoolInfoList() {
		return sqlSession.selectList("schoolMapper.getSchoolInfo");
	}
	
	//학사안내 게시글 -> 상세조회 페이지이동 
	@Override
	public SchoolInfoVO schoolBoardDetail(String schInfoCode) {
		return sqlSession.selectOne("schoolMapper.schoolBoardDetail", schInfoCode);
	}
	
	//학사안내 게시글 조회수
	@Override
	public void updateSchoolBoardReadCnt(String schInfoCode) {
		sqlSession.update("schoolMapper.updateSchoolBoardReadCnt", schInfoCode);
	}
	
	//학사안내 게시글 이전글 다음글
	@Override
	public List<PrenextPageVO> detailPreNext() {
		return sqlSession.selectList("schoolMapper.detailPreNext");
	}
	
	//학사안내 게시글 -> 상세 -> 수정페이지 이동
	@Override
	public String updateSchoolInfoForm(String schInfoCode) {
		return sqlSession.selectOne("schoolMapper.schoolBoardDetail", schInfoCode);
	}
	
	//학사안내 게시글 -> 상세 -> 수정
	@Override
	public void updateSchoolInfo(SchoolInfoVO schoolInfoVO) {
		sqlSession.update("schoolMapper.updateSchoolInfo", schoolInfoVO);
	}
	
	//학사안내 게시글 -> 상세 -> 삭제
	@Override
	public void deleteSchoolInfo(String schInfoCode) {
		sqlSession.delete("schoolMapper.deleteSchoolInfo", schInfoCode);
	}
	
//-------------------학사조회-----------------------------------------------------------
	
	//강의등록시 전공대학 선택시 해당하는 전공학과 이름 조회
	@Override
	public List<DeptVO> getDeptNameAjax(String collNo) {
		return sqlSession.selectList("schoolMapper.getDeptNameAjax", collNo);
	}
	
}

package com.study.test.library.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.library.vo.LibraryVO;

@Service("libraryService")
public class LibraryServiceImpl implements LibraryService{
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public LibraryVO getLibInfo(String memNo) {
		
		return sqlSession.selectOne("libraryMapper.getLibInfo", memNo);
	}

	@Override
	public void regLibSeat(LibraryVO libraryVO) {
		sqlSession.insert("libraryMapper.regLibInfo", libraryVO);
		
	}

	@Override
	public List<LibraryVO> getSeatInfo() {
		return sqlSession.selectList("libraryMapper.getSeatInfo");
	}

	@Override
	public int getCountSeat() {
		return sqlSession.selectOne("libraryMapper.getCountSeat");
	}
	

}

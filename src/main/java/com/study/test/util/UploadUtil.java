package com.study.test.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.study.test.board.vo.BoardImgVO;
import com.study.test.emp.vo.LecturePDFVO;


public class UploadUtil {
	
	//단일 파일 업로드 메소드
	public static BoardImgVO uploadFile(MultipartFile img) {
		BoardImgVO imgVO = null;
		
		if (!img.isEmpty()) {
			imgVO = new BoardImgVO();
			
			String originFileName = img.getOriginalFilename();
			String uuid = UUID.randomUUID().toString();
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			String attachedFileName = uuid + extension;
			
			try {
				File file = new File(ConstVariable.UPLOAD_PATH + attachedFileName);
				img.transferTo(file);
				
				imgVO.setAttachedName(attachedFileName);
				imgVO.setOriginName(originFileName);
				imgVO.setIsMain("Y");
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}
		return imgVO;
	}
	
	
	//다중 파일 업로드 메소드
		public static List<BoardImgVO> multiFileUpload(MultipartFile[] imgs) {
			//첨부된 파일정보를 다 담을 수 있는 통
			List<BoardImgVO> result = new ArrayList<>();
			
			for (MultipartFile img : imgs) {
				BoardImgVO vo = uploadFile(img);
				vo.setIsMain("N");
				result.add(vo);
				
			}
			return result;
		}
		
	//pdf파일 업로드 메소드
	public static LecturePDFVO uploadPdfFile(MultipartFile pdfFile) {
		LecturePDFVO pdfvo = null;
		
		if (!pdfFile.isEmpty()) {
			pdfvo = new LecturePDFVO();
			
			String originFileName = pdfFile.getOriginalFilename();
			String uuid = UUID.randomUUID().toString();
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			String attachedFileName = uuid + extension;
			
			try {
				File file = new File(ConstVariable.PDF_UPLOAD_PATH + attachedFileName);
				pdfFile.transferTo(file);
				
				pdfvo.setAttachedPdfName(attachedFileName);
				pdfvo.setOriginPdfName(originFileName);
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}
		return pdfvo;
	}
}

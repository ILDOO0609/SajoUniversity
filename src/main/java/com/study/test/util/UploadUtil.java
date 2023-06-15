package com.study.test.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.file.FileAlreadyExistsException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.study.test.board.vo.BoardImgVO;
import com.study.test.emp.vo.LecturePDFVO;
import com.study.test.school.vo.SchInfoFileVO;

import jakarta.servlet.http.HttpServletResponse;


public class UploadUtil {
	
	//단일 파일 업로드 메소드
	public static BoardImgVO uploadFile(MultipartFile mainImg) {
		BoardImgVO imgVO = null;
		
		if (!mainImg.isEmpty()) {
			imgVO = new BoardImgVO();
			
			String originFileName = mainImg.getOriginalFilename();
			String uuid = UUID.randomUUID().toString();
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			String attachedFileName = uuid + extension;
			
			try {
				File file = new File(ConstVariable.UPLOAD_PATH + attachedFileName);
				mainImg.transferTo(file);
				
				imgVO.setAttachedName(attachedFileName);
				imgVO.setOriginName(originFileName);
				imgVO.setIsMain("Y");
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}
		return imgVO;
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
	
	
	//학사안내 글작성 단일 파일 업로드
	public static SchInfoFileVO uploadSchFile(MultipartFile schFile) {
		SchInfoFileVO schInfoFileVO = null;
		System.out.println("@@@@@@@@@@@@@@" + schFile);
		if(!schFile.isEmpty()) {
			schInfoFileVO = new SchInfoFileVO();
			
			String originFileName = schFile.getOriginalFilename();
			String uuid = UUID.randomUUID().toString();
			String extention = originFileName.substring(originFileName.lastIndexOf("."));
			String attachedFileName = uuid + extention;
			
			try {
				File file = new File(ConstVariable.INFO_UPLOAD_PATH + attachedFileName);
				schFile.transferTo(file);
				
				schInfoFileVO.setSchOriginFileName(originFileName);
				schInfoFileVO.setSchAttachedFileName(attachedFileName);
				schInfoFileVO.setSchIsMain("Y");
			} catch (Exception e) {
				e.printStackTrace();
			}
		
		}
		return schInfoFileVO;
		
	}
	
	//학사안내 글작성 다중파일 업로드
	public static List<SchInfoFileVO> multiUploadSchFile(MultipartFile[] schFiles) {
		System.out.println("@#@#@#@#@#" + schFiles.length);
		
		List<SchInfoFileVO> result = new ArrayList<>();
		
		for(MultipartFile file : schFiles) {
			SchInfoFileVO vo = uploadSchFile(file);
			if(vo != null) {
				vo.setSchIsMain("N");
				result.add(vo);
			}
		}
		return result;
	}

	
	//학사안내 업로드파일 다운로드
	public static void downloadFile(SchInfoFileVO schInfoFileVO, HttpServletResponse response) {
		//원본 파일명
		String originFileName = schInfoFileVO.getSchOriginFileName();
		//첨부된 파일명(생성된 파일명)
		String attachedFileName = schInfoFileVO.getSchAttachedFileName();
		
		File file = new File(ConstVariable.INFO_UPLOAD_PATH + attachedFileName);
		System.out.println("@@@@@@@@@@데이터확인 " + file);
		
		if(file.exists()) {
			try (FileInputStream fis = new FileInputStream(file);
				OutputStream out = response.getOutputStream()) {
				
				String encodeFileName = URLEncoder.encode(originFileName, "UTF-8");
				
				// 응답이 파일 타입이라는 것을 명시
				response.addHeader("Content-Disposition", "attachment;filename=\"" + encodeFileName + "\";");
				response.setHeader("Content-Transfer-Encoding", "binary");
				response.setContentType("application/octet-stream");
				response.setHeader("Pragma", "no-cache;");
				response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
				
				int readCount = 0;
				byte[] buffer = new byte[1024];
				
				while((readCount = fis.read(buffer)) != -1 ) {
					out.write(buffer, 0, readCount);
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
	}	
	
	
	
}

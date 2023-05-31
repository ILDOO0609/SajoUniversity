
function pdf(){
	//시간표 pdf로 새창 띄우기
   const body_tag = document.querySelector('.timetable');
   // 현재 document.body의 html을 A4 크기에 맞춰 PDF로 변환
   html2canvas(document.querySelector('.timetable'), {
      scale:3,
      onrendered: function(body_tag) {
      
      
         // 캔버스를 이미지로 변환
         var imgData = body_tag.toDataURL('image/png');

         var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
         var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
         var imgHeight = body_tag.height * imgWidth / body_tag.width;
         var heightLeft = imgHeight;

         var doc = new jsPDF('p', 'mm');
         var position = 0;

         // 첫 페이지 출력
         doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
         heightLeft -= pageHeight;

         // 한 페이지 이상일 경우 루프 돌면서 출력
         while (heightLeft >= 20) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
         }

         // 파일 저장
         doc.save('강의시간표.pdf');


         //이미지로 표현
         //document.write('<img src="'+imgData+'" />');
      }

   });

}
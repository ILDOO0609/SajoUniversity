lecScheduleAjax();
function lecScheduleAjax() {
    $.ajax({
        url: '/emp/lecScheduleAjax', 
        type: 'post',
        async: true,
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {},
        success: function(lecTimeList) {
			
            lecTimeList.forEach(function(lecTime, index) {
                lecTimeList[index]['FIRST_TIME'] = parseInt(lecTime['FIRST_TIME']);
                lecTimeList[index]['LAST_TIME'] = parseInt(lecTime['LAST_TIME']);
                lecTimeList[index]['LEC_DAY'] = parseInt(lecTime['LEC_DAY']);
            });
            console.log(lecTimeList);
            
			let str = '';          
			
			for(let t = 1; t<10; t++){
				str += `<tr style="height: 60px;">`;  
				str += `	<td>`;  
				str += `    	${t+'교시'}`;  
				str += `    </td> `;  
				for(let num = 1; num<6; num++){
					str += `<td> `;  
					for(let i = 0; i<lecTimeList.length; i++){
						if(lecTimeList[i]['LEC_DAY']==num && lecTimeList[i]['FIRST_TIME']<=t && lecTimeList[i]['LAST_TIME']>=t){
							str += `${lecTimeList[i]['LEC_NAME']}`;
						}
					}
					str += `</td>`;
				}
				str += `</tr>`;
			}
          	document.querySelector('#tbodyTag').insertAdjacentHTML('afterend', str);
            
        },
        error: function() {
            alert('실패');
        }
    });
}
function pdf(){
	//시간표 pdf로 새창 띄우기
   const body_tag = document.querySelector('.schedule-table');
   // 현재 document.body의 html을 A4 크기에 맞춰 PDF로 변환
   html2canvas(document.querySelector('.schedule-table'), {
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


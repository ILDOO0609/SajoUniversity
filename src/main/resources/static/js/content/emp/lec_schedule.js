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

function pdf() {
   // 캡쳐 라이브러리를 통해서 canvas 오브젝트를 받고 이미지 파일로 리턴한다.
   html2canvas(document.querySelector(".schedule-table")).then(canvas => {
      saveAs(canvas.toDataURL('image/png'), `시간표.png`);
   });
}


function saveAs(uri, filename) {
   // 캡쳐된 파일을 이미지 파일로 내보낸다.
   var link = document.createElement('a');
   if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   } else {
      window.open(uri);
   }
}

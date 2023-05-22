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
			
			for(let t = 1; t<9; t++){
				str += `<tr style="height: 40px;">`;  
				str += `	<td class="text-start">`;  
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


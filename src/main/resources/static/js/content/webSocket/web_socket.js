alert('hi');
let socket = new WebSocket("ws://localhost:8081/websocket");

        socket.onopen = function (e) {
            console.log('open server!')
        };

        socket.onerror = function (e){
            console.log(e);
        }
        
        socket.onmessage = function (e) {
            console.log(e.data);
            let msgArea = document.querySelector('.msgArea');
            let newMsg = document.createElement('div');
            newMsg.innerText=e.data;
            msgArea.append(newMsg);
        }

function sendMsg() {
    let content=document.querySelector('.content').value;
    socket.send(content);
}
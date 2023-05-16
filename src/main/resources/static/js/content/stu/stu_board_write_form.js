function togglePw() {
        const toggleDiv = document.querySelector('#toggleDiv');
        const isPrivateCheckbox = document.querySelector('#isSecret');
        document.querySelector('#boardPw').value='';
        
        if (isPrivateCheckbox.checked) {
            toggleDiv.classList.remove('hide');
        } 
        else {
            toggleDiv.classList.add('hide');
        }
}
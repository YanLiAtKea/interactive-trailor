let choices = document.querySelectorAll('.choice');
let finishedConversation = document.querySelector('.finishedConversation');
let conversationCount = 1;

choices.forEach(finishThisLine);
function finishThisLine(choice){
    choice.addEventListener('click', getContent);
    function getContent(){
        let newLine = document.createElement('p');
        newLine.textContent = choice.textContent;
        finishedConversation.appendChild(newLine);
        //conversation area moves up
        if (conversationCount ==1){
            conversationCount++;
            choices[0].textContent = "44444";
            choices[1].textContent = "5555";
            choices[2].textContent = "666";
        } else if (conversationCount ==2) {
            conversationCount++;
            choices[0].textContent = "777";
            choices[1].textContent = "8888";
            choices[2].textContent = "999999";
        }
    }
}

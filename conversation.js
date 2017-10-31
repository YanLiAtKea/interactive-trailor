let russia = document.querySelector('div.russiaP img');
let topic = document.querySelector('.topic');
let choices = document.querySelectorAll('.choice');
let finishedConversation = document.querySelector('.finishedConversation');
let conversationCount = 1;
// russia gets closer to the trigger all the time
function lowerRussia(){
    let currentBottom = window.getComputedStyle(russia).getPropertyValue('bottom');
    let bottom = parseInt(currentBottom);
    bottom -=.3;
    russia.style.bottom = bottom + "px";
}
function lowerRussiaMore(){
    let currentBottom = window.getComputedStyle(russia).getPropertyValue('bottom');
    let bottom = parseInt(currentBottom);
    bottom-=7;
    russia.style.bottom = bottom + "px";
    ;
}
function RiseRussia(){
    let currentBottom = window.getComputedStyle(russia).getPropertyValue('bottom');
    let bottom = parseInt(currentBottom);
    bottom+=3;
    russia.style.bottom = bottom + "px";
    ;
}

window.onload = function(){
    setInterval(lowerRussia, 1000);
    choices.forEach(finishThisLine);
    function finishThisLine(choice){
        choice.addEventListener('click', getContent);
        function getContent(){
            let newLine = document.createElement('p');
            newLine.textContent = choice.textContent;
            finishedConversation.appendChild(newLine);
            if (choice.textContent.indexOf(3)>-1){
                lowerRussiaMore();
            }
            if (choice.textContent.indexOf(4)>-1){
                RiseRussia();
            }
            if (conversationCount == 1){
                topic.textContent = "to tell the opposite side that some from your own troops are attacking them?";
                conversationCount++;
                choices[0].textContent = "44444";
                choices[1].textContent = "5555";
                choices[2].textContent = "666";
            } else if (conversationCount == 2) {
                topic.textContent = "if the attack is about to happen real soon but you don't want the opposite to get angry?";
                conversationCount++;
                choices[0].textContent = "777";
                choices[1].textContent = "8888";
                choices[2].textContent = "999999";
            } else if (conversationCount == 3) {
                topic.textContent = "if the opposite doesn't understand you";
                conversationCount++;
                choices[0].textContent = "aaaa";
                choices[1].textContent = "bbbbb";
                choices[2].textContent = "ccccccc";
            }
        }
    }
}

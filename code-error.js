history.pushState(null, null, location.href);
window.onpopstate = function(event) {
    history.go(1);
};

let startTime = [0, 0, 0, 0];
let alarmAudio = document.querySelector('audio#alarm');
let timeToDisplay = document.querySelector('.timerDiv');
let checkButton = document.querySelector('div.check');
let hint = document.querySelector('.hintP');

// timer run down
function timer(){
    function addZero(num){
        if (num <= 9){
            num = "0" + num;
        }
        return num;
    }
    let timer = addZero(startTime[0]) + ":" + addZero(startTime[1]) + ":" + addZero(startTime[2]);
    timeToDisplay.textContent = timer;
    startTime[3]++;
    if (startTime[3] < 12000){
        let minPast = Math.floor((startTime[3]/100)/60);
        let secPast = Math.floor((startTime[3]/100) - minPast*60);
        let mmsPast = Math.floor(startTime[3] - secPast * 100 - minPast * 6000);
        startTime[0] = 1- minPast;
        startTime[1] = 59 - secPast;
        startTime[2] = 99 - mmsPast;
        if (startTime[0] == 0){
            timeToDisplay.classList.add('flash');
        }
        if (startTime[0] == 0 && startTime[1] == 30) {
            alarmAudio.play();
        }

        if (startTime[0] == 0 && startTime[1] == 0 && startTime[2] == 0) {
            redirectToStaticLose();
        }
    }
}
function updateHint(){ // set a timeout on this, so each time validation runs, hint will blink once even though the hint it self might stay the same. for user experience
    hint.style.display = "inherit";
}
function validate(){
    let nr1 = document.getElementById('nr1');
    let nr2 = document.getElementById('nr2');
    let nr3 = document.getElementById('nr3');
    if (!nr1.value || !nr2.value || !nr3.value) {
        hint.textContent = ""; // together with the next line, so that each validation will flash a bit even thought the hint stays the same
        setTimeout(must3, 30);
        function must3(){
            hint.textContent = "the code should be 3 letters";
        }
    } else {
        nr1 = nr1.value.toUpperCase();
        nr2 = nr2.value.toUpperCase();
        nr3 = nr3.value.toUpperCase();
        let answer = ["P","O","E"];
        let guess = [nr1, nr2, nr3];
        let uniqueLetters = guess.filter(function(letter, index, self){
            return index == self.indexOf(letter); // filter the duplicated letter(s), create new array of unique letters in the user guess; otherwise "pop" would get hint as " all 3 letters are right"
        });
        let right = 0;
        let rightRight = 0;
        for(i=0; i<uniqueLetters.length; i++){
            if (answer.indexOf(guess[i]) > -1){
                right++;
            }
        }
        for(i=0; i<uniqueLetters.length; i++){
            if (answer[i] == guess[i]){
                rightRight++;
            }
        }
        if (right == 3 && rightRight == 3){
            hint.textContent = "Congrats! You got the code!!";
            clearInterval(timerRunDown);
            setTimeout(redirectToStatic, 2500);
        } else if (right == 3 && rightRight !=3){
            hint.style.display = "none";
            setTimeout(updateHint, 30);
            hint.textContent = "The 3 letters are here and " + rightRight + " of them is/are in the right order";
        } else if (right == 2 && rightRight == 2){
            hint.style.display = "none";
            setTimeout(updateHint, 30);
            hint.textContent = "You got 2 of the letters and they are in the right order";
        } else if (right == 2 && rightRight != 2){
            hint.style.display = "none";
            setTimeout(updateHint, 30);
            hint.textContent = "2 of the letters are correct and " + rightRight + " of them is/are in the right order";
        } else if (right == 1 && rightRight == 1){
            hint.style.display = "none";
            setTimeout(updateHint, 30);
            hint.textContent = "You got 1 correct letter and it's in the right order";
        } else if (right == 1 && rightRight == 0){
            hint.style.display = "none";
            setTimeout(updateHint, 30);
            hint.textContent = "You got 1 of the letters correct but it's not in the right order";
        } else {
            hint.style.display = "none";
            setTimeout(updateHint, 30);
            hint.textContent = "not even close!";
        }
    }
}
// redirect in case of win
function redirectToStatic(){
    window.location = "http://onestepfurther.science/kea/02-animation/strangelove/static-plane.html";
}
// redirect in case of lose
function redirectToStaticLose(){
    window.location = "http://onestepfurther.science/kea/02-animation/strangelove/static-plane-lose.html";
}

window.onload = function(){
    let timerRunDown = setInterval(timer, 10);
    checkButton.addEventListener('click', validate);
    window.addEventListener('keyup', enterKey);
    function enterKey(e){
        if (e.key == "Enter"){
            validate();
        }
    }
}

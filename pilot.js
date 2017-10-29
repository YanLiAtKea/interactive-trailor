let pilot = document.querySelector('#pilotOnBomb');
let bomb = document.querySelector('#bombWrapper');
let timeToDisplay = document.querySelector('.timerDiv');
let startTime = [0, 0, 0, 0];
let moveBombInt1;
function generateRandomTo(){
    let randomTimeTo = Math.random();
    let timeoutTo = randomTimeTo * 3000 + 2000; // so moveBomb runs after 2-5s
    setTimeout(moveBomb, timeoutTo);
}
// move bomb after random timeout, check user feedback, then move back to centre after random time, chech user feedback again
function moveBomb(){
    let classes = ["swingLeft", "swingRight", "leanForward", "leanBackward"];
    let index = Math.floor(Math.random()*4);
    let newBombClass = classes[index];
    let currentClass = bomb.className;
    bomb.className = newBombClass;
    pilot.className = newBombClass + "Fall"; // if no key is pressed, then die;
    let currentTime = startTime[3];
    window.addEventListener('keydown', checkUser);
    function checkUser(e){
        let keyPressed = e.key;
        let allKeys = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"];
        let pressKeyTime = startTime[3];
        if (pressKeyTime - currentTime < 37){
            console.log(pressKeyTime-currentTime);
            pilot.className = newBombClass;
            window.removeEventListener('keydown', checkUser);
            generateRandomTo();
        } else {
            pilot.className = newBombClass + "Fall";
            window.removeEventListener('keydown', checkUser);
            console.log('dead');
        }
    }
}
// timer runs
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
        if (startTime[0] == 0 && startTime[1] == 0 && startTime[2] == 0) {
        // time runs out
        }
    }
}

window.onload= function(){
    setInterval(timer, 10);
    generateRandomTo();

    let randomTimeBack = Math.random();
    // check user reaction
}

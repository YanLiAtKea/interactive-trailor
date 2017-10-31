let pilot = document.querySelector('#pilotOnBomb');
let bomb = document.querySelector('#bombWrapper');
let timeToDisplay = document.querySelector('.timerDiv');
let startTime = [0, 0, 0, 0];
let moveBombInt1;
// in case user failed
function redirectToStatic(){
    window.location.replace("http://onestepfurther.science/kea/02-animation/strangelove/static-plane.html");
}
// start game with a random timeout for bomb class
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
    if (pilot.className.indexOf('Fall')>-1){ // if after 1s no other key is pressed to save the pilot, redirect to static
        let duration = 0;
        let checkFallDurationInt = setInterval(checkFallDuration, 10);
        function checkFallDuration(){
            console.log(duration);
            duration +=10;
            if ((pilot.className.indexOf('Fall')>-1) && duration == 1000){
                redirectToStatic();
            }
        }
    }
    let currentTime = startTime[3];
    window.addEventListener('keydown', checkUser);
    function checkUser(e){
        let keyPressed = e.key;
        let allKeys = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"];
        let pressKeyTime = startTime[3];
        let keyIndex = allKeys.indexOf(keyPressed);
        let classIndex = classes.indexOf(newBombClass);
        if (currentTime < 3000){
            if (pressKeyTime - currentTime < 100){
                console.log(pressKeyTime-currentTime);
                pilot.className = newBombClass;
                window.removeEventListener('keydown', checkUser);
                generateRandomTo();
            } else {
                pilot.className = newBombClass + "Fall";
                window.removeEventListener('keydown', checkUser);
                setTimeout(redirectToStatic, 1000);
            }
        } else if (3000 <= currentTime < 10000){
            stage1.style.display = "none";
            stage2.style.display = "inherit";
            stage2.style.color = "green";
            console.log(keyIndex, classIndex);
            if ((keyIndex == classIndex)&&(pressKeyTime - currentTime < 100)){
                console.log(pressKeyTime-currentTime);
                pilot.className = newBombClass;
                window.removeEventListener('keydown', checkUser);
                generateRandomTo();
            } else {
                pilot.className = newBombClass + "Fall";
                window.removeEventListener('keydown', checkUser);
                setTimeout(redirectToStatic, 1000);
            }
        } else if (10000 <= currentTime < 12000) {
            stage2.style.display = "none";
            stage3.style.display = "inherit";
            stage3.style.color = "red";
            if ((keyIndex == classIndex)&&(pressKeyTime - currentTime < 50)){
                console.log(pressKeyTime-currentTime);
                pilot.className = newBombClass;
                window.removeEventListener('keydown', checkUser);
                generateRandomTo();
            } else {
                pilot.className = newBombClass + "Fall";
                window.removeEventListener('keydown', checkUser);
                setTimeout(redirectToStatic, 1000);
            }
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
            planAudio.pause();
        }
    } else { // in case time run out
        redirectToStatic();
        window.removeEventListener('keydown', checkUser);
    }
}

window.onload= function(){
    let timerRunDown = setInterval(timer, 10);
    generateRandomTo();

    let randomTimeBack = Math.random();
    // check user reaction
}

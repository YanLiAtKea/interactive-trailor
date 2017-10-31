let planeAudio = document.querySelector('audio#planes');
let pilot = document.querySelector('#pilotOnBomb');
let bomb = document.querySelector('#bombWrapper');
let timeToDisplay = document.querySelector('.timerDiv');
let startTime = [0, 0, 0, 0];
let randomTime;
let timeoutBetweenMovement;
let classes = ["swingLeft", "swingRight", "leanForward", "leanBackward"];
let index; // index in the classes
let checkFallDurationInt;
let newBombClass;
let currentClass;
let fallDuration = 0;
let fail = 0;
let moveBombInt1;
// redirect to Static
function redirectToStatic(){
    window.location.replace("http://onestepfurther.science/kea/02-animation/strangelove/static-plane.html");
}
// start game with a random timeout for bomb class
function generateRandomMovement(){
    console.log('generate random timeout for movement');
//    pilot.className = "";
//    bomb.className = "";
    randomTime = Math.random();
    timeoutBetweenMovement = randomTime * 3000 + 2000; // so moveBomb runs bewteen 2-5s
    setTimeout(moveBomb, timeoutBetweenMovement);
    console.log(timeoutBetweenMovement);
}
// move bomb after random timeout, check user feedback, then move back to centre after random time, chech user feedback again
function moveBomb(){
    index = Math.floor(Math.random()*4);
    newBombClass = classes[index];
    bomb.className = newBombClass;
    pilot.className = newBombClass + "Fall"; // if no key is pressed, then will die by default
    currentClass = bomb.className;
    console.log("current class: " +currentClass);
    if (pilot.className.indexOf('Fall')>-1){
        console.log('fall');
        checkFallDurationInt = setInterval(checkFallDuration, 10);
        function checkFallDuration(){
            console.log('checkFall');

            fallDuration += 1;
            if ((pilot.className.indexOf('Fall')>-1) && fallDuration > 99){ // if after 1s no other key is pressed to save the pilot, redirect to static
//                redirectToStatic();
                console.log(fallDuration);
                fail++;
                console.log(fail);
                clearInterval(checkFallDurationInt);
                generateRandomMovement();
            }
        }
    }
    let currentTime = startTime[3];
    window.addEventListener('keydown', checkUser);
    // check user key press
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
            planeAudio.pause();
        }
    } else { // in case time run out
        redirectToStatic();
//        window.removeEventListener('keydown', checkUser);
    }
}


window.onload= function(){
    let timerRunDown = setInterval(timer, 10);
    generateRandomMovement();
}

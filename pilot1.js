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
let fail = 0;
let moveBombInt1;
// redirect to Static
function redirectToStatic(){
    window.location.replace("http://onestepfurther.science/kea/02-animation/strangelove/static-plane.html");
}
// generate random timeout for bomb to move
function generateRandomMovement(){
    console.log('new movement');
    randomTime = Math.random();
    timeoutBetweenMovement = randomTime * 2000 + 3000; // so moveBomb runs bewteen 3-5s
    setTimeout(moveBomb, timeoutBetweenMovement);
}
// move bomb after random timeout, check user feedback
function moveBomb(){
    currentClass = bomb.className;
    index = Math.floor(Math.random()*4);
    newBombClass = classes[index];
    bomb.className = newBombClass;
    console.log(newBombClass);
    pilot.className = newBombClass + "Fall"; // if no key is pressed, then will die by default
    let fallDuration = 0;
    console.log(fail);
    if (pilot.className.indexOf('Fall')>-1){
        checkFallDurationInt = setInterval(checkFallDuration, 10);
        function checkFallDuration(){
            fallDuration += 1;
            if ((pilot.className.indexOf('Fall')>-1) && fallDuration > 99){ // if after 1s no other key is pressed to save the pilot, redirect to static
                fail++;
                clearInterval(checkFallDurationInt);
                generateRandomMovement();
            }
            if (fail == 5){
//                redirectToStatic();
            }
        }
        let currentTime = startTime[3];
        window.addEventListener('keydown', checkUser);
        // check user key press
        function checkUser(e){
            console.log('check key');
            let keyPressed = e.key;
            let allKeys = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"];
            let pressKeyTime = startTime[3];
            let keyIndex = allKeys.indexOf(keyPressed);
            let classIndex = classes.indexOf(newBombClass);
            if (currentTime < 10000){
                console.log(keyIndex, classIndex);
                if ((keyIndex == classIndex)&&(pressKeyTime - currentTime < 200)){ // animation self has 1s delay, so as long as user react within 2s is ok
                    console.log("right key in " + pressKeyTime-currentTime);
                    pilot.className = newBombClass;
                    window.removeEventListener('keydown', checkUser);
                    generateRandomMovement();
                } else {
                    console.log("wrong key 1");
                    window.removeEventListener('keydown', checkUser);
                    fail++;
                    generateRandomMovement();
                }
            } else if (10000 <= currentTime < 12000) {
                if ((keyIndex == classIndex)&&(pressKeyTime - currentTime < 150)){
                    console.log("right key in " + pressKeyTime-currentTime);
                    pilot.className = newBombClass;
                    window.removeEventListener('keydown', checkUser);
                    generateRandomMovement();
                } else {
                    console.log("wrong key 2");
                    window.removeEventListener('keydown', checkUser);
                    fail++;
                    generateRandomMovement();
                }
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
//        redirectToStatic(); // !!!!!!!!!!! remember to turn on
    }
}

window.onload= function(){
    // timer running
    let timerRunDown = setInterval(timer, 10);
    // start game with a random timeout for bomb class
    generateRandomMovement();
}

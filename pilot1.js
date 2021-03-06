history.pushState(null, null, location.href);
window.onpopstate = function(event) {
    history.go(1);
};

let demo = document.querySelector('.demo');
let h1 = document.querySelector('h1');
let planeAudio = document.querySelector('audio#planes');
let alarmAudio = document.querySelector('audio#alarm');
let heart1 = document.querySelector('#heart1');
let heart2 = document.querySelector('#heart2');
let heart3 = document.querySelector('#heart3');
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
let currentTime;
let moveBombInt1;
let fallDuration = 0;
let fallDurationInt;
let state = true;
let run = true;
let checkUser;
/// redirect in case of win
function redirectToStatic(){
    window.location = "http://onestepfurther.science/kea/02-animation/strangelove/static-plane.html";
}
// redirect in case of lose
function redirectToStaticLose(){
    window.location = "http://onestepfurther.science/kea/02-animation/strangelove/static-plane-lose.html";
}
// generate random timeout for bomb to move
function generateRandomMovement(){
    if (run == true){
        randomTime = Math.random();
        timeoutBetweenMovement = randomTime * 3000 + 2000; // so moveBomb runs bewteen 3-6s
        setTimeout(moveBomb, timeoutBetweenMovement);
    }
}
// move bomb after random timeout, check user feedback
function moveBomb(){
    if (run == true){
        clearInterval(fallDurationInt);
        fallDuration = 0;
        currentClass = bomb.className;
        index = Math.floor(Math.random()*4);
        newBombClass = classes[index];
        if (newBombClass != currentClass){ // avoid the case that no change in class hence no movement displayed
            bomb.className = newBombClass;
            currentTime = startTime[3]; // when class is changed
            console.log(newBombClass);
            pilot.className = newBombClass + "DefaultFall"; // already begins to fall when bomb moves, and if no key is pressed, this fall
            checkKeypress();
            fallDurationInt = setInterval(checkFallDuration, 10);
            function checkFallDuration(){
                fallDuration++;
                if (fallDuration == 223 && (pilot.className.indexOf('DefaultFall')>-1)){ // 223 because animation has delay 1.23s, and runs for 1s, so after 2230, if class hasn't change, then means no key has beed pressed
                    state = false;
                    fail++;
                    console.log('no key pressed; fail: '+ fail);
                    window.removeEventListener('keydown', checkUser);
                    clearInterval(fallDurationInt);
                    fallDuration = 0;
                    generateRandomMovement();
                } else if (pilot.className.indexOf('DefaultFall')<0){
                    clearInterval(fallDurationInt);
                    console.log('int cleared');
                }
            }
            // check user key press after each bomb movement
            function checkKeypress(){
                window.addEventListener('keydown', checkUser);
                function checkUser(e){
                    clearInterval(fallDurationInt); // as long as user press a key, reset fallDuration
                    let keyPressed = e.key;
                    let allKeys = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"];
                    let pressKeyTime = startTime[3];
                    let keyIndex = allKeys.indexOf(keyPressed);
                    let classIndex = classes.indexOf(newBombClass);
                    if (currentTime <= 6000){
                        if ((keyIndex == classIndex)&&(pressKeyTime - currentTime < 170)){ // class change is before animation starts; animation self has 1s delay, so as long as user react within 2s is ok
                            state = true;
                            pilot.className = newBombClass;
                            window.removeEventListener('keydown', checkUser);
                            if (fail<3){
                                generateRandomMovement();
                            }
                        } else if ((keyIndex != classIndex)&&(pressKeyTime - currentTime < 170)){
                            state = false;
                            fail++;
                            console.log('stage1; wrong key; fail: ' + fail);
                            window.removeEventListener('keydown', checkUser);
                            if (fail<3){
                                generateRandomMovement();
                            }
                        } else if ((keyIndex == classIndex)&&(pressKeyTime - currentTime >= 170)) {
                            state = false;
                            fail++;
                            console.log('stage1; too late; fail: ' + fail);
                            window.removeEventListener('keydown', checkUser);
                            if (fail<3){
                                generateRandomMovement();
                            }
                        } else if ((keyIndex != classIndex)&&(pressKeyTime - currentTime >= 170)){
                            state = false;
                            fail++;
                            console.log('stage1; both wrong; fail: ' + fail);
                            window.removeEventListener('keydown', checkUser);
                            if (fail<3){
                                generateRandomMovement();
                            }
                        }
                    } else {
                        console.log('stage 2');
                    }
                }
            }
        } else {
            console.log('same as before');
            moveBomb(); // get a new class, avoid the case that no change in class hence no movement displayed
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
    if (startTime[3] < 6000){
        let minPast = Math.floor((startTime[3]/100)/60);
        let secPast = Math.floor((startTime[3]/100) - minPast*60);
        let mmsPast = Math.floor(startTime[3] - secPast * 100 - minPast * 6000);
        startTime[0] = 0- minPast;
        startTime[1] = 59 - secPast;
        startTime[2] = 99 - mmsPast;
        if (startTime[1] == 30){
            timeToDisplay.classList.add('flash');
        }
        if (startTime[1] == 15){
            alarmAudio.play();
        }
        if ((startTime[0] == 0 && startTime[1] == 0 && startTime[2] == 0) && state){
            planeAudio.pause();
            run = false;
            console.log(run);
            redirectToStatic();
        }
        if ((startTime[0] == 0 && startTime[1] == 0 && startTime[2] == 0) && !state) {
            planeAudio.pause();
            run = false;
            console.log(run);
            redirectToStaticLose();
        }
    }
}

window.onload= function(){
    // demo starts with left/right, after 3s show lean
    setTimeout(demoLean, 3700);
    function demoLean(){
        pilot.className = "lean";
        bomb.className = "lean";
        setTimeout(startGame, 5700);
    }
    function startGame(){
        pilot.className = "";
        bomb.className = "";
        demo.textContent = "GO!";
        setTimeout(hideDemo, 1500);
        function hideDemo(){
            demo.style.display = "none";
        }
        setTimeout(runGame, 1500);
        function runGame(){
    // timer running
    let timerRunDown = setInterval(timer, 10);
    // start game with a random timeout for bomb class
    generateRandomMovement();
    let checkFailInt = setInterval(checkFail, 10);
    function checkFail(){
        if (fail == 1){
            heart3.style.display = "none";
        }
        if (fail == 2){
            heart2.style.display = "none";
        }
        if (fail >= 3){
            heart1.style.display = "none";
            pilot.style.display = "none";
            bomb.style.display = "none";
            clearInterval(checkFailInt);
            clearInterval(timerRunDown);
            run = false;
            console.log(run);
            setTimeout(redirectToStaticLose, 2500);
            clearTimeout(moveBomb);
            alarmAudio.pause();
            planeAudio.pause();
            timeToDisplay.classList.remove('flash');
        }
    }

        }
    }
}

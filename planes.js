let planeAudio = document.querySelector('audio#planes');
let alarmAudio = document.querySelector('audio#alarm');
let shotAudio = document.querySelector('#gunfire');
let explosionAudio = document.querySelector('#explosion');
let planeLeft = document.querySelector('.planeCount p');
let timeToDisplay = document.querySelector('.timerDiv');
let startTime = [0, 0, 0, 0];
let shootingTime = []; // for each shooting, in order to restrict timeout in between
let hitTime = []; // for each plant got hit, in order to restrict timeout in between
let nthShooting = -1; // will ++ later, array index starts at 0
let nthHit = -1; // will ++ later, array index starts at 0
let sky = document.querySelector('.sky');
let hintPlane = document.querySelector('.hintPlane');
let planes = document.querySelectorAll('.plane');
let extraPlanes = document.querySelectorAll('.planeExtra');
let plane1 = document.querySelector('.plane1');
let plane2 = document.querySelector('.plane2');
let plane3 = document.querySelector('.plane3');
let plane4 = document.querySelector('.plane4');
let plane5 = document.querySelector('.plane5');
let plane6 = document.querySelector('.plane6');
let plane7 = document.querySelector('.plane7');
let planeNr = 4;
let cockpit = document.querySelector('img#cockpit');
// change position of the planes
let changePositionInt1 = setInterval(changePosition, 1700);
let changePositionInt2; // need to set these here to avoid "undefined" when clearInterval later in different scopes
let changePositionInt3;
let changePositionInt4;
let changePositionInt5;
let changePositionInt6;
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
        if (startTime[0] == 0 && startTime[1] == 30) {
            alarmAudio.play();
        }
        if (startTime[0] == 0 && startTime[1] == 0 && startTime[2] == 0) { // in case time run out
            alarmAudio.pause();
            planeAudio.pause();
            redirectToStaticLose();
            window.removeEventListener('mousedown', gunfire);
            window.removeEventListener('keypress', moveSky);
        }
    }
}
// redirect in case of win
function redirectToStatic(){
    window.location.replace("http://onestepfurther.science/kea/02-animation/strangelove/static-plane.html");
}

// redirect in case of lose
function redirectToStaticLose(){
    window.location.replace("http://onestepfurther.science/kea/02-animation/strangelove/static-plane-lose.html");
}

// hide plane hint
function hintGone(){
    hintPlane.textContent = "";
}
// change planes position and size
function changePosition(){
    let X1 = Math.random()*190;
    let Y1 = Math.random()*61;
    let size1 = Math.random();
    if (size1 >.7){
        plane1.style.transform = "scale(" + size1+ ")";
    }
    plane1.style.left = X1 +"vw";
    plane1.style.top = Y1 +"vw"; // use vw so that planes stay inside the cockpit view
    let X2 = Math.random()*190;
    let Y2 = Math.random()*61;
    let size2 = Math.random();
    if (size2 >.7){
        plane2.style.transform = "scale(" + size2+ ")";
    }
    plane2.style.left = X2 +"vw";
    plane2.style.top = Y2 +"vw";
    let X3 = Math.random()*190;
    let Y3 = Math.random()*61;
    let size3 = Math.random();
    if (size3 >.7){
        plane3.style.transform = "scale(" + size3+ ") rotateY(180deg)";
    }
    plane3.style.left = X3 +"vw";
    plane3.style.top = Y3 +"vw";
    let X4 = Math.random()*190;
    let Y4 = Math.random()*61;
    let size4 = Math.random();
    if (size4 >.7){
        plane4.style.transform = "scale(" + size4+ ") rotateY(180deg)";
    }
    plane4.style.left = X4 +"vw";
    plane4.style.top = Y4 +"vw";
    let X5 = Math.random()*190;
    let Y5 = Math.random()*61;
    let size5 = Math.random();
    if (.9 > size5 > .5){
        plane5.style.transform = "scale(" + size5+ ")";
    }
    plane5.style.left = X5 +"vw";
    plane5.style.top = Y5 +"vw";
    let X6 = Math.random()*190;
    let Y6 = Math.random()*61;
    let size6 = Math.random();
    if (.9 > size6 >.5){
        plane6.style.transform = "scale(" + size6+ ")";
    }
    plane6.style.left = X6 +"vw";
    plane6.style.top = Y6 +"vw";
    let X7 = Math.random()*190;
    let Y7 = Math.random()*61;
    let size7 = Math.random();
    if (.9 > size7 >.5){
        plane7.style.transform = "scale(" + size7+ ") rotateY(180deg)";
    }
    plane7.style.left = X7 +"vw";
    plane7.style.top = Y7 +"vw";
}
// sky movement
function moveSky(e){
    switch (e.key) {
        case "a":
            moveLeft();
            cockpit.classList.add('tiltRight');
            break;
        case "d":
            moveRight();
            cockpit.classList.add('tiltLeft');
            break;
        case "w":
            moveUp();
            break;
        case "s":
            moveDown();
            break;
        default:
    }
    function moveLeft(){
        let currentPositionLeft = document.scrollingElement.scrollLeft; // must use scrollingElement!!! check the scrolling ele's parent doesn't work
        if (currentPositionLeft >= 20){
            currentPositionLeft-=20;
            document.scrollingElement.scrollLeft = currentPositionLeft;
        }
    }
    function moveRight(){
        let widthOfSky = parseInt(window.getComputedStyle(sky).getPropertyValue('width'));
        let viewportWidth = window.innerWidth;
        let currentPositionLeft = document.scrollingElement.scrollLeft; // must use scrollingElement!!! check the scrolling ele's parent doesn't work
        if (currentPositionLeft < (widthOfSky-viewportWidth)){
            currentPositionLeft+=20;
            document.scrollingElement.scrollLeft = currentPositionLeft;
        }
    }
    function moveUp(){
        let currentPositionTop = document.scrollingElement.scrollTop; // must use scrollingElement!!! check the scrolling ele's parent doesn't work
        if (currentPositionTop >= 13){
            currentPositionTop-=13;
            document.scrollingElement.scrollTop = currentPositionTop;
        }
    }
    function moveDown(){
        let heightOfSky = parseInt(window.getComputedStyle(sky).getPropertyValue('height'));
        let viewportHeight = window.innerHeight;
        let currentPositionTop = document.scrollingElement.scrollTop; // must use scrollingElement!!! check the scrolling ele's parent doesn't work
        if (currentPositionTop < (heightOfSky-viewportHeight)){
            currentPositionTop+=13;
            document.scrollingElement.scrollTop = currentPositionTop;
        }
    }
}
// gun fire
function gunfire(){
    // get the timing for each gun fire
    nthShooting++;
    shootingTime[nthShooting] = startTime[3];
    if ((nthShooting >= 1 && (shootingTime[nthShooting]-shootingTime[(nthShooting-1)]>100)) || nthShooting ==0){
        shotAudio.play();
        cockpit.classList.add('shake');
        cockpit.addEventListener('animationend', afterShake);
        function afterShake(){
            if (cockpit.className == "tiltLeft shake") {
                cockpit.className = "afterTiltLeftAndShake"; // otherwise (only remove shake from classList) will run tilt animation again as tilt is considered the new class
                cockpit.removeEventListener('animationend', afterShake)
            } else if (cockpit.className == "tiltRight shake") {
                cockpit.className = "afterTiltRightAndShake";
            } else {
                cockpit.classList.remove('shake');
                cockpit.removeEventListener('animationend', afterShake)
            }
        }
    } else if (nthShooting >= 1 && (shootingTime[nthShooting]-shootingTime[(nthShooting-1)]<=100)){
        hintPlane.textContent = "you can't fire continuously";
        setTimeout(hintGone, 1000);
    }
}

window.onload = function(){
    // timer run down every 10mms
    let timerRunDown = setInterval(timer, 10);
    // scroll the sky img based on key stroke
    window.addEventListener('keypress', moveSky);
    // tilt plane back when key released
    window.addEventListener('keyup', tiltBack);
    function tiltBack(e){
        cockpit.className = "";
    }
    // gunfire everytime mouse is clicked, must wait 1s between 2 shots
    window.addEventListener('mousedown', gunfire);
    // randomly change position and size of the planes
    changePosition(); // run first time without interval/timeout so that planes don't start at the same position on the webpage
    changePositionInt1; // start interval1
    // plane got shot
    planes.forEach(checkAllPlanes);
    function checkAllPlanes(plane) {
        plane.addEventListener('click', hit);
        function hit(){
            // get the timing for each gun fire
            nthHit++;
            hitTime[nthHit] = startTime[3];
            if ((nthHit >= 1 && (hitTime[nthHit]-hitTime[(nthHit-1)]>100)) || nthHit ==0){
                console.log(nthHit, hitTime);
                setTimeout(hitDelay, 500); // need delay cuz plane is in distance, need some time for the bullet to reach
                function hitDelay(){
                    let planeImg = plane.children[0];
                    explosionAudio.play();
                    planeImg.style.height = "0";
                    planeNr--;
                    if (planeNr == 3){
                        clearInterval(changePositionInt1); //need to clear so doesn't fire multiple times
                        changePositionInt2 = setInterval(changePosition, 1500); // need to give a new id so can be cleared later
                        hintPlane.textContent = '1 down, 3 to go';
                        planeLeft.textContent = "1/4";
                        setTimeout(hintGone, 2000);
                    } else if (planeNr == 2){
                        clearInterval(changePositionInt2);
                        changePositionInt3 = setInterval(changePosition, 1000);
                        hintPlane.textContent = 'half way done, 2 to go';
                        planeLeft.textContent = "2/4";
                        setTimeout(hintGone, 2000);
                    } else if (planeNr == 1){
                        clearInterval(changePositionInt3);
                        changePositionint4 = setInterval(changePosition, 700);
                        hintPlane.textContent = '3 down, finish the last one';
                        planeLeft.textContent = "3/4";
                        setTimeout(hintGone, 2000);
                    }  else if (planeNr ==0 && timeToDisplay.innerHTML[1] != 0) { // finished too fast, add extra planes
                        hintPlane.textContent = '4 down! WELL DONE! But 3 backup planes just joined the battle!';
                        planeLeft.textContent = "4/7";
                        setTimeout(hintGone, 4000);
                        extraPlanes.forEach(showExtra);
                        function showExtra(extraPlane){
                            extraPlane.style.display = "inherit";
                        }
                    } else if (planeNr ==0 && timeToDisplay.innerHTML[1] == 0){
                        clearInterval(changePositionInt4);
                        changePositionint5 = setInterval(changePosition, 1100);
                        planeLeft.textContent = "4/4";
                        clearInterval(timerRunDown);
                        timeToDisplay.classList.remove('flash');
//                        timeToDisplay.style.transform = "scale(1.5)";
                        window.removeEventListener('mousedown', gunfire);
                        window.removeEventListener('keypress', moveSky);
                        setTimeout(redirectToStatic, 2500);
                    } else if (planeNr == -1){
                        clearInterval(changePositionInt5);
                        changePositionint6 = setInterval(changePosition, 900);
                        hintPlane.textContent = 'bonus 1 !';
                        planeLeft.textContent = "5/7";
                        setTimeout(hintGone, 2000);
                    } else if (planeNr == -2){
                        clearInterval(changePositionInt6);
                        changePositionint7 = setInterval(changePosition, 700);
                        hintPlane.textContent = 'bonus 2 !';
                        planeLeft.textContent = "6/7";
                        setTimeout(hintGone, 2000);
                    }else if (planeNr == -3) {
                        clearInterval(changePositionInt);
                        hintPlane.textContent = 'bonus 3 !';
                        planeLeft.textContent = "7/7";
                        clearInterval(timerRunDown);
                        timeToDisplay.classList.remove('flash');
                        window.removeEventListener('mousedown', gunfire);
                        window.removeEventListener('keypress', moveSky);
                        setTimeout(redirectToStatic, 2500);
                    }
                }
            } else {
                console.log('too close');
            }
        }
    }
}

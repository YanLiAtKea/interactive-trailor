let shotAudio = document.querySelector('#gunfire');
let explosionAudio = document.querySelector('#explosion');
let sky = document.querySelector('.sky');
let hintPlane = document.querySelector('.hintPlane');
let planes = document.querySelectorAll('.plane');
let plane1 = document.querySelector('.plane1');
let plane2 = document.querySelector('.plane2');
let plane3 = document.querySelector('.plane3');
let plane4 = document.querySelector('.plane4');
let planeNr = 4;
let cockpit = document.querySelector('img#cockpit');
// change position of the planes
let changePositionInt1 = setInterval(changePosition, 1700);
let changePositionInt2; // need to set these here to avoid "undefined" when clearInterval later in different scopes
let changePositionInt3;
let changePositionInt4;

function hintGone(){
    hintPlane.textContent = "";
}
function changePosition(){
    let X1 = Math.random()*190;
    let Y1 = Math.random()*61;
    let size1 = Math.random();
    if (size1>.5){
        plane1.style.transform = "scale(" + size1+ ")";
    }
    plane1.style.left = X1 +"vw";
    plane1.style.top = Y1 +"vw"; // use vw so that planes stay inside the cockpit view
    let X2 = Math.random()*190;
    let Y2 = Math.random()*61;
    let size2 = Math.random();
    if (size2>.5){
        plane2.style.transform = "scale(" + size2+ ")";
    }
    plane2.style.left = X2 +"vw";
    plane2.style.top = Y2 +"vw";
    let X3 = Math.random()*190;
    let Y3 = Math.random()*61;
    let size3 = Math.random();
    if (size3>.5){
        plane3.style.transform = "scale(" + size3+ ") rotateY(180deg)";
    }
    plane3.style.left = X3 +"vw";
    plane3.style.top = Y3 +"vw";
    let X4 = Math.random()*190;
    let Y4 = Math.random()*61;
    let size4 = Math.random();
    if (size4>.5){
        plane4.style.transform = "scale(" + size4+ ") rotateY(180deg)";
    }
    plane4.style.left = X4 +"vw";
    plane4.style.top = Y4 +"vw";
}

window.onload = function(){
    // scroll the sky img based on key stroke
    window.addEventListener('keydown', moveSky);
    function moveSky(e){
        switch (e.key) {
            case "a":
                moveLeft();
                break;
            case "d":
                moveRight();
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
            if (currentPositionTop >= 10){
                currentPositionTop-=10;
                document.scrollingElement.scrollTop = currentPositionTop;
            }
        }
        function moveDown(){
            let heightOfSky = parseInt(window.getComputedStyle(sky).getPropertyValue('height'));
            let viewportHeight = window.innerHeight;
            let currentPositionTop = document.scrollingElement.scrollTop; // must use scrollingElement!!! check the scrolling ele's parent doesn't work
            if (currentPositionTop < (heightOfSky-viewportHeight)){
                currentPositionTop+=10;
                document.scrollingElement.scrollTop = currentPositionTop;
            }
        }
    }
    // tilt plane
    setInterval(generateRandom, 3000);
    function generateRandom(){
        let randomNr = Math.random();
        if (randomNr>.5){
            if (cockpit.className !== "afterTiltAndShake" && cockpit.className !== "tiltLeft"){
                let timeout = Math.random()*20;
                setTimeout(tiltPlane, timeout);
                function tiltPlane(){
                    cockpit.className = 'tiltLeft';
                }
            }
        }
    }
    // tilt plane back to horizontal with B key
    window.addEventListener('keyup', tiltBack);
    function tiltBack(e){
        if (e.key == "b"){
            cockpit.className = "";
        }
    }
    // gunfire everytime mouse is clicked
    window.addEventListener('mousedown', gunfire);
    function gunfire(){
        shotAudio.play();
        cockpit.classList.add('shake');
        cockpit.addEventListener('animationend', afterShake);
        function afterShake(){
            if (cockpit.className == "tiltLeft shake") {
                cockpit.className = "afterTiltAndShake"; // otherwise (only remove shake from classList) will run tilt animation again as tilt is considered the new class
                cockpit.removeEventListener('animationend', afterShake)
            } else {
                cockpit.classList.remove('shake');
                cockpit.removeEventListener('animationend', afterShake)
            }
        }
    }
    // randomly change position of the planes
    changePosition(); // run first time without interval/timeout so that planes don't start at the same position on the webpage
    changePositionInt1; // start interval
    planes.forEach(checkAllPlanes);
    function checkAllPlanes(plane){
        plane.addEventListener('click', hit);
        function hit(){
            setTimeout(hitDelay, 700); // need delay cuz plane is in distance, need some time for the bullet to reach
            function hitDelay(){
                let planeImg = plane.children[0];
                explosionAudio.play();
                planeImg.style.height = "0";
                planeNr--;
                if (planeNr == 3){
                    clearInterval(changePositionInt1); //need to clear so doesn't fire multiple times
                    changePositionInt2 = setInterval(changePosition, 1500); // need to give a new id so can be cleared later
                    hintPlane.textContent = '1 down, 3 to go';
                    setTimeout(hintGone, 2000);
                } else if (planeNr == 2){
                    clearInterval(changePositionInt2);
                    changePositionInt3 = setInterval(changePosition, 1000);
                    hintPlane.textContent = 'half way done, 2 to go';
                    setTimeout(hintGone, 2000);
                } else if (planeNr == 1){
                    clearInterval(changePositionInt3);
                    changePositionint4 = setInterval(changePosition, 700);
                    hintPlane.textContent = '3 down, finish the last one';
                    setTimeout(hintGone, 2000);
                }  else {
                    clearInterval(changePositionInt4);
                    setTimeout(redirectToStatic, 700);
                    function redirectToStatic(){
                        window.location.replace("http://onestepfurther.science/kea/02-animation/strangelove/static-plane.html");
                    }
                }
            }
        }
    }
}

let shotAudio = document.querySelector('#gunfire');
let explosionAudio = document.querySelector('#explosion');
let hintPlane = document.querySelector('.hintPlane');
let planes = document.querySelectorAll('.plane');
let plane1 = document.querySelector('.plane1');
let plane2 = document.querySelector('.plane2');
let plane3 = document.querySelector('.plane3');
let plane4 = document.querySelector('.plane4');
let planeNr = 4;
let cockpit = document.querySelector('img#cockpit');

let changePositionInt1 = setInterval(changePosition, 1700);
let changePositionInt2; // need to set these here to avoid "undefined" when clearInterval later in different scopes
let changePositionInt3;
let changePositionInt4;

function changePosition(){
    let X1 = Math.random()*190;
    let Y1 = Math.random()*61;
    plane1.style.left = X1 +"vw";
    plane1.style.top = Y1 +"vw"; // use vw so that planes stay inside the cockpit view
    let X2 = Math.random()*190;
    let Y2 = Math.random()*61;
    plane2.style.left = X2 +"vw";
    plane2.style.top = Y2 +"vw";
    let X3 = Math.random()*190;
    let Y3 = Math.random()*61;
    plane3.style.left = X3 +"vw";
    plane3.style.top = Y3 +"vw";
    let X4 = Math.random()*190;
    let Y4 = Math.random()*61;
    plane4.style.left = X4 +"vw";
    plane4.style.top = Y4 +"vw";
}

window.onload = function(){
    // gunfire everytime mouse is clicked
    window.addEventListener('mousedown', gunfire);
    function gunfire(){
        shotAudio.play();
        cockpit.classList.add('shake');
        cockpit.addEventListener('animationend', removeClass);
        function removeClass(){
            cockpit.classList.remove('shake')
        }
    }
    changePosition(); // run first time without interval/timeout so that planes don't start at the same position on the webpage
    changePositionInt1;
    planes.forEach(gotHit);
    function gotHit(plane){
        plane.addEventListener('click', hit);
        function hit(){
            planeNr--;
            if (planeNr == 3){
                clearInterval(changePositionInt1); //need to clear so doesn't fire multiple times
                changePositionInt2 = setInterval(changePosition, 1300); // need to give a new id so can be cleared later
                hintPlane.textContent = '1 down, 3 to go';
            } else if (planeNr == 2){
                clearInterval(changePositionInt2);
                changePositionInt3 = setInterval(changePosition, 1300);
                hintPlane.textContent = 'half way done, 2 to go';
            } else if (planeNr == 1){
                clearInterval(changePositionInt3);
                changePositionint4 = setInterval(changePosition, 1300);
                hintPlane.textContent = '3 down, finish the last one';
            }  else {
                clearInterval(changePositionInt4);
                setTimeout(redirectToStatic, 2000);
                function redirectToStatic(){
                    window.location.replace("http://127.0.0.1:51156/static-plane.html"); // !! need to change to http
                }
            }
            setTimeout(hitDelay, 700);
            function hitDelay(){
                let planeImg = plane.children[0];
                explosionAudio.play();
                planeImg.style.height = "0";
            }
        //    smokeAnimation.display: getting bigger

        }
    }
}

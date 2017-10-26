let shotAudio = document.querySelector('#gunfire');
let planes = document.querySelectorAll('.plane');
let plane1 = document.querySelector('.plane1');
let plane2 = document.querySelector('.plane2');
let plane3 = document.querySelector('.plane3');
let plane4 = document.querySelector('.plane4');
let planeNr = 4;
let cockpit = document.querySelector('img#cockpit');

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
    setInterval(changePosition, 1900);
    function changePosition(){
        let X1 = Math.random()*190;
        let Y1 = Math.random()*70;
        plane1.style.left = X1 +"vw";
        plane1.style.top = Y1 +"vh";
        let X2 = Math.random()*190;
        let Y2 = Math.random()*70;
        plane2.style.left = X2 +"vw";
        plane2.style.top = Y2 +"vh";
        let X3 = Math.random()*190;
        let Y3 = Math.random()*70;
        plane3.style.left = X3 +"vw";
        plane3.style.top = Y3 +"vh";
        let X4 = Math.random()*190;
        let Y4 = Math.random()*70;
        plane4.style.left = X4 +"vw";
        plane4.style.top = Y4 +"vh";
    }
    planes.forEach(gotHit);
    function gotHit(plane){
        plane.addEventListener('click', hit);
        function hit(){
            setTimeout(hitDelay, 500);
            function hitDelay(){
                let planeImg = plane.children[0];
                planeImg.style.height = "0";
                planeNr--;
                if (planeNr == 3){
                    setInterval(changePosition, 1500);
                    console.log('1 down, 3 to go');
                } else if (planeNr == 2){
                    setInterval(changePosition, 1000);
                    console.log('half way done, 2 to go');
                } else if (planeNr == 1){
                    setInterval(changePosition, 700);
                    console.log('3 down, shot the last one');
                }  else {
                    console.log('well done!');
                }
            }
        //    audio.play();
        //    smokeAnimation.display: getting bigger

        }
    }
}


/*
setInterval(changePosition2, 1000);
function changePosition2(){
    let X = Math.random()*200;
    let Y = Math.random()*70;
    plane2.style.left = X +"vw";
    plane2.style.top = Y +"vh";
}
setInterval(changePosition3, 1000);
function changePosition3(){
    let X = Math.random()*200;
    let Y = Math.random()*70;
    plane3.style.left = X +"vw";
    plane3.style.top = Y +"vh";
}
setInterval(changePosition4, 1000);
function changePosition4(){
    let X = Math.random()*200;
    let Y = Math.random()*70;
    plane4.style.left = X +"vw";
    plane4.style.top = Y +"vh";
}
*/

let bomb = document.querySelector('div.staticWrapper span');
let staticDiv = document.querySelector('div.static');
let line1 = document.querySelector('.staticPlaneP1');
let line2 = document.querySelector('.staticPlaneP2');
let line3 = document.querySelector('.staticPlaneP3');
let line4 = document.querySelector('.staticPlaneP4');
let line5 = document.querySelector('.staticPlaneP5');
let restart =document.querySelector('.restart');
let rollUp = document.querySelector('.rollUp');
let staticSound = document.querySelector('audio#static');
let lowerVolumeF = setInterval(lowerVolume, 300);
let volume = 1;
function lowerVolume(){
    volume *= .79; // use * for gradual change without sudden stop of music
    staticSound.volume = volume;
    if (volume <.03 ){
        staticSound.pause();
        clearInterval(lowerVolumeF);
        staticDiv.classList.add('turnBlack');
        setTimeout(showLine1, 500);
        line1.addEventListener('animationend', hideCursorAndShowLine2);
        function showLine1(){
            line1.classList.add('type');
        }
        function hideCursorAndShowLine2(){
            line1.style.borderRight = "none";
            setTimeout(showLine2, 1000);
            function showLine2(){
                line2.classList.add('type');
                line2.addEventListener('animationend', hideCursorAndShowLine3);
            }
        }
        function hideCursorAndShowLine3(){
            line2.style.borderRight = "none";
            setTimeout(showLine3, 2000);
            function showLine3(){
                line3.classList.add('type');
                line3.addEventListener('animationend', hideCursorAndShowLine4)
            }
        }
        function hideCursorAndShowLine4(){
            setTimeout(showLine4, 3000);
            function showLine4(){
                line3.style.borderRight = "none";
                line4.classList.add('type');
                line4.addEventListener('animationend', hideCursorAndShowLine5)
            }
        }
        function hideCursorAndShowLine5(){
            setTimeout(showLine5, 1000);
            function showLine5(){
                line4.style.borderRight = "none";
                line5.classList.add('type');
                line5.addEventListener('animationend', hideCursorAndEnlarge);
                bomb.classList.add('flash');
            }
        }
        function hideCursorAndEnlarge(){
            line5.style.borderRight = "none";
            rollUp.classList.add('roll');
            setTimeout(showRestart, 3000);
            function showRestart(){
                restart.style.display = "inherit";
                restart.addEventListener('click', backToPickCharacter);
                function backToPickCharacter(){
                    window.location.replace("http://onestepfurther.science/kea/02-animation/strangelove/map.html");
                }
            }
        }
    }
};

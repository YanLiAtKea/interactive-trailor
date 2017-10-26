let bomb = document.querySelector('div.staticWrapper span');
let staticDiv = document.querySelector('div.static');
let line1 = document.querySelector('.staticPlaneP1');
let line2 = document.querySelector('.staticPlaneP2');
let line3 = document.querySelector('.staticPlaneP3');
let line4 = document.querySelector('.staticPlaneP4');
let staticSound = document.querySelector('audio#static');
let lowerVolumeF = setInterval(lowerVolume, 300);
let volume = 1;
function lowerVolume(){
    volume *= .91; // use * for gradual change without sudden stop of music
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
            line2.classList.add('type');
            line2.addEventListener('animationend', hideCursorAndShowLine3)
        }
        function hideCursorAndShowLine3(){
            line2.style.borderRight = "none";
            line3.classList.add('type');
            line3.addEventListener('animationend', hideCursorAndShowLine4)
        }
        function hideCursorAndShowLine4(){
            line3.style.borderRight = "none";
            line4.classList.add('type');
            line4.addEventListener('animationend', hideCursorAndEnlarge)
        }
        function hideCursorAndEnlarge(){
            line4.style.borderRight = "none";
//            bomb.classList.add('enlarge');
        }
    }
};

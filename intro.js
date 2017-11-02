let line1 = document.querySelector('.introP1');
let line2 = document.querySelector('.introP2');
let typingSound = document.querySelector('audio#typing');
let phone = document.querySelector('img.phone');
// let backgroundMusic = document.querySelector('audio#bgMusic');
let phoneCall = document.querySelector('audio#phoneRing');

window.onload = function(){
    setTimeout(showLine1, 1000);
}
function showLine1(){
    line1.classList.add('type');
    typingSoundPlay();
    line1.addEventListener('animationend', showLine2);
}
function typingSoundPlay() {
    typingSound.play();
}
function showLine2(){
    line2.classList.add('type');
    setTimeout(phoneRing, 7950);
    setTimeout(blinkPhone, 8000);
}
function phoneRing(){
//    backgroundMusic.pause();
    phoneCall.play();
    phoneCall.playbackRate = 1.21;
}
function blinkPhone(){
    phone.classList.add('blink');
    // phone ring audio
    phone.addEventListener('click', pickUpPhone);
}
function pickUpPhone(e) {
    window.location ='http://onestepfurther.science/kea/02-animation/strangelove/intro_video.html';
}

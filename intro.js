let line1 = document.querySelector('.introP1');
let line2 = document.querySelector('.introP2');
let typingSound = document.querySelector('audio#typing');
let phone = document.querySelector('img.phone');
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
    setTimeout(blinkPhone, 5000);
}
function blinkPhone(){
    phone.classList.add('blink');
    // phone ring audio
    window.addEventListener('keyup', pickUpPhone);
}
function pickUpPhone(e) {
    if(e.keyCode == 32){
    console.log('space');
//        window.location.replace('http://') //!! need to change to http
    }
}

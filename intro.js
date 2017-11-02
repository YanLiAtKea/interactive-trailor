let line1 = document.querySelector('.introP1');
let line2 = document.querySelector('.introP2');
let typingSound = document.querySelector('audio#typing');
let typingSound2 = document.querySelector('audio#typing2');
let phone = document.querySelector('img.phone');
// let backgroundMusic = document.querySelector('audio#bgMusic');
let phoneCall = document.querySelector('audio#phoneRing');
let answer = document.querySelector('.pickup');
let typing;
window.onload = function(){
    setTimeout(showLine1, 1000);
}
function showLine1(){
    line1.classList.add('type');
    line1.addEventListener('animationend', showLine2);
    typingSoundPlay();
}
function typingSoundPlay() {
    typingSound.play();
}
function showLine2(){
    line2.classList.add('type');
    typingSound2.play();
    setTimeout(phoneRing, 5150);
    setTimeout(blinkPhone, 5200);
}
function phoneRing(){
    phoneCall.play();
    phoneCall.playbackRate = 1.21;
}
function blinkPhone(){
    phone.classList.add('blink');
    phone.addEventListener('click', pickUpPhone);
    answer.style.display = "inherit";
    window.addEventListener('keyup', pickUpPhone1);

}
function pickUpPhone(e) {
    window.location ='http://onestepfurther.science/kea/02-animation/strangelove/intro_video.html';
}
function pickUpPhone1(e) {
    if(e.keyCode == 32){
        window.location.replace('http://onestepfurther.science/kea/02-animation/strangelove/intro_video.html');
    }
}

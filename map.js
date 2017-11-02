let president = document.querySelector('.character1');
let codeguy = document.querySelector('.character2');
let pilot = document.querySelector('.character3');
let russia = document.querySelector('.character4');
president.addEventListener('click', redirectToPresident);
codeguy.addEventListener('click', redirectToCodeGuy);
pilot.addEventListener('click', redirectToPilot);
russia.addEventListener('click', redirectToPlane);
function redirectToPresident(){
    window.location.replace('http://onestepfurther.science/kea/02-animation/strangelove/conversation.html');
}
function redirectToCodeGuy(){
    window.location.replace('http://onestepfurther.science/kea/02-animation/strangelove/code.html');
}
function redirectToPilot(){
    window.location.replace('http://onestepfurther.science/kea/02-animation/strangelove/pilot1.html');
}
function redirectToPlane(){
    window.location.replace('http://onestepfurther.science/kea/02-animation/strangelove/planes.html');
}

let video = document.querySelector("video");
let p = document.querySelectorAll("p")

p[1].addEventListener('animationend', hideMe1);

function hideMe1() {
    p[0].classList.add("hide");
    p[1].classList.add("hide");
    p[2].classList.replace("hide", "intro3");
}

p[2].addEventListener('animationend',hideMe2)
function hideMe2(){
    p[2].classList.add("hide")
    p[3].classList.replace("hide", "intro4")
    p[3].addEventListener('animationend', p[4].classList.replace("hide", "intro5"))

}
p[4].addEventListener('animationend', hideMe3)
function hideMe3(){
    p[3].classList.add("hide");
    p[4].classList.add("hide");
    p[5].classList.replace("hide", "intro6");
    p[5].addEventListener('animationend',p[6].classList.replace("hide", "intro7"))
}

p[6].addEventListener('animationend', hideMeLast);

function hideMeLast(){
    p[5].classList.add("hide");
    p[6].classList.add("hide");
    p[7].classList.replace("hide", "intro8");


}

video.addEventListener('ended', chooseCharacter);

function chooseCharacter() {
    window.location = "http://onestepfurther.science/kea/02-animation/strangelove/map.html";
}

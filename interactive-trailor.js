let time = document.querySelector('.time');
let place = document.querySelector('.place');
let boss = document.querySelector('.boss');
let dots = document.querySelector('.dots');
time.addEventListener('animationend', hideCursorAndShowPlace);
function hideCursorAndShowPlace(){
    time.style.borderRight = "none";
    place.classList.add('type');
    place.addEventListener('animationend', hideCursorAndShowBoss);
}
function hideCursorAndShowBoss(){
    place.style.borderRight = "none";
    boss.classList.add('type');
    boss.addEventListener('animationend', hideCursorAndShowDots);
}
function hideCursorAndShowDots(){
    boss.style.borderRight = "none";
    dots.classList.add('type');
    dots.addEventListener('animationend', blinkCursor);
}
function blinkCursor(){
    setTimeout(blinkHide, 500);
    function blinkHide(){
        dots.style.borderRight = "none";
    }
}

let nrArea = document.getElementById('nr');
let checkButton = document.querySelector('button.check');
let hint = document.querySelector('.hintP');

checkButton.addEventListener('click', validate);
function validate(){
    let nr = nrArea.value;
    let digitNr = nr.length;
    if (digitNr != 3) {
        hint.textContent = "the code should be 3 letters";
    } else {
        let nr1 = nr[0].toUpperCase();
        let nr2 = nr[1].toUpperCase();
        let nr3 = nr[2].toUpperCase();
        if ((nr1 == "P" && nr2 != "O" && nr3 != "E")||(nr1 != "P" && nr2 == "O" && nr3 != "E")||(nr1 != "P" && nr2 != "O" && nr3 == "E")){
            hint.textContent = "one letter is correct, keep trying"
        } else if ((nr1 == "P" && nr2 == "O" && nr3 != "E")||(nr1 != "P" && nr2 == "O" && nr3 == "E")||(nr1 == "P" && nr2 != "O" && nr3 == "E")) {
            hint.textContent = "two letters are correct, keep trying"

        } else if (nr1 == "P" && nr2 == "O" && nr3 == "E") {
            hint.textContent = "Congrats! All 3 letters are correct."

        } else {
            hint.textContent = "not even close, keep trying!"
        }
    }
}







/*

nr1Area.addEventListener('keyup', getValue1);
function getValue1(e){
    let nr1 = e.key;
    if (nr1 == "o" || nr1 == "O"){
        hint.textContent = "The first letter is right";
    }
    nr1Area.value = nr1;
}
nr2Area.addEventListener('keyup', getValue2);
function getValue2(e){
    let nr2 = e.key;
    nr2Area.value = nr2;
}
nr3Area.addEventListener('keyup', getValue3);
function getValue3(e){
    let nr3 = e.key;
    nr3Area.value = nr3;
}
*/

let nrArea = document.getElementById('nr');
let checkButton = document.querySelector('div.check');
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

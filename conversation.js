history.pushState(null, null, location.href);
window.onpopstate = function(event) {
    history.go(1);
};

let russia = document.querySelector('div.russiaP img');
let topic = document.querySelector('.topic');
let choices = document.querySelectorAll('.choice');
let finishedConversation = document.querySelector('.finishedConversation');
let conversationCount = 1;
let tipMe = document.querySelector('.tip');
let tipButton = document.querySelector('button');
let conversationSound = document.querySelectorAll('audio');
let hintCounter = document.querySelector('.hint')

// redirect in case of win
function redirectToStatic(){
    window.location = "http://onestepfurther.science/kea/02-animation/strangelove/static-plane.html";
}
// redirect in case of lose
function redirectToStaticLose(){
    window.location = "http://onestepfurther.science/kea/02-animation/strangelove/static-plane-lose.html";
}



// russia gets closer to the trigger all the time
tipButton.addEventListener('click', showHint);
let clickCounter = 3

function showHint() {
    clickCounter--
    if (clickCounter < 0) {
        clickCounter = 0
    } else if (clickCounter > 0 || clickCounter == 0) {
        tipMe.classList.remove('hide');
    }
    hintCounter.textContent = "Hints: " + clickCounter + "/3"

}

function lowerRussia() {
    let currentBottom = window.getComputedStyle(russia).getPropertyValue('bottom');
    let bottom = parseInt(currentBottom);
    bottom -= .3;
    russia.style.bottom = bottom + "px";
    if (bottom < 50) {
        conversationSound[10].play()
    }
    if (bottom < 20) {
        redirectToStaticLose();
    }
}



function lowerRussiaMore() {
    let currentBottom = window.getComputedStyle(russia).getPropertyValue('bottom');
    let bottom = parseInt(currentBottom);
    bottom -= 50;
    russia.style.bottom = bottom + "px";;

}

function lowerRussiaMed() {
    let currentBottom = window.getComputedStyle(russia).getPropertyValue('bottom');
    let bottom = parseInt(currentBottom)
    bottom -= 20
    russia.style.bottom = bottom + "px"

}

function RiseRussia() {
    let currentBottom = window.getComputedStyle(russia).getPropertyValue('bottom');
    let bottom = parseInt(currentBottom);
    bottom += 15;
    russia.style.bottom = bottom + "px";;
}


window.onload = function () {
    setInterval(lowerRussia, 500);

    choices.forEach(finishThisLine);

    function finishThisLine(choice) {

        choice.addEventListener('click', getContent);


        function getContent() {
            let newLine = document.createElement('p');
            newLine.textContent = choice.textContent;
            finishedConversation.appendChild(newLine);
            console.log("GC")


            if (choice.classList.contains("horribleChoice") == true) {
                lowerRussiaMore();

            } else if (choice.classList.contains("rightChoice") == true) {
                RiseRussia();
            } else if (choice.classList.contains("wrongChoice") == true) {
                lowerRussiaMed();
            }


            if (choice.classList.contains("rightChoice") && conversationCount !=11) { // so the last sentence, all rightchoice, doesn't play the 10th audio, which is the alarm
                conversationSound[conversationCount-1].play();
            }
            if (conversationCount == 1) {
                topic.textContent = "You know how...";
                conversationCount++;
                choices[0].textContent = 'Usa and USSR relations have deteriorated overtime';
                choices[0].classList.replace("rightChoice", "wrongChoice");
                choices[1].textContent = 'We slaughtered each other\'s troops for generations.';
                choices[1].classList.replace("wrongChoice", "horribleChoice");
                choices[2].textContent = 'We always talked about the possibility of something going wrong with the bomb.';
                choices[2].classList.replace("horribleChoice", "rightChoice");

                tipMe.textContent = ' HINT: Better not remind him of your difficult past';

                if (tipMe.classList.contains("hide") == false) {
                    tipMe.classList.add("hide")
                }



            } else if (conversationCount == 2) {

                topic.textContent = "So one of our - Base Commanders...";
                conversationCount++;
                choices[0].textContent = ' is gonna attack you and you are all gonna die';
                choices[0].classList.replace("wrongChoice", "horribleChoice");
                choices[1].textContent = 'is attacking your Country and there\'s nothing you can do about it';
                choices[1].classList.replace("horribleChoice", "wrongChoice");
                choices[2].textContent = 'One of our base commanders got a little funny in the head...and attacked your country';

                tipMe.textContent = ' HINT: Russians prefers things to be explained with caution and with no hostile words';
                if (tipMe.classList.contains("hide") == false) {
                    tipMe.classList.add("hide")
                }

            } else if (conversationCount == 3) {


                topic.textContent = "Well listen...";
                conversationCount++;
                choices[0].textContent = 'Do you imagine how I feel about it?';
                choices[0].classList.replace("horribleChoice", "rightChoice");
                choices[1].textContent = 'Stop whining you big baby and listen to me!';
                choices[1].classList.replace("wrongChoice", "horribleChoice");
                choices[2].textContent = 'We really need to find a solution so let\'s figure it out!';
                choices[2].classList.replace("rightChoice", "wrongChoice");

                tipMe.textContent = ' HINT: Russian leader is very sensitive and needs to feel emotionally close to you';
                if (tipMe.classList.contains("hide") == false) {
                    tipMe.classList.add("hide")
                }


            } else if (conversationCount == 4) {
                topic.textContent = "Of course...";
                conversationCount++;
                choices[0].textContent = 'I love Russia!';
                choices[0].classList.replace("rightChoice", "wrongChoice");
                choices[1].textContent = 'I like to speak to you, of course I like to say hello!';
                choices[1].classList.replace("horribleChoice", "rightChoice");
                choices[2].textContent = 'my mom is doing fine, she is not the one that\'s gonna be nuclearly bombed today'
                choices[2].classList.replace("wrongChoice", "horribleChoice");
                tipMe.textContent = ' HINT: Russian can be insecure, they need to know you care!';
                if (tipMe.classList.contains("hide") == false) {
                    tipMe.classList.add("hide")
                }


            } else if (conversationCount == 5) {
                topic.textContent = "They will...";
                conversationCount++;
                choices[0].textContent = 'Not reach their target for at least another hour';
                choices[0].classList.replace("wrongChoice", "rightChoice");
                choices[1].textContent = 'Kill you all so that we can take over Russia!';
                choices[1].classList.replace("rightChoice", "horribleChoice");
                choices[2].textContent = 'Explode if I won\'t say hello to you'
                choices[2].classList.replace("horribleChoice", "wrongChoice");
                tipMe.textContent = ' HINT: Giving Russian intel about the attack will help ';
                if (tipMe.classList.contains("hide") == false) {
                    tipMe.classList.add("hide")
                }



            } else if (conversationCount == 6) {
                topic.textContent = "We would like to give...";
                conversationCount++;
                choices[0].textContent = 'you our sincere apologies for this unfortunate event Dimitri';
                choices[0].classList.replace("rightChoice", "wrongChoice");
                choices[1].textContent = ' your air staff a complete rundown of the targets';
                choices[1].classList.replace("horribleChoice", "rightChoice");
                choices[2].textContent = 'you a guest key to the White House...and maybe a gift card to McDonalds!!'
                choices[2].classList.replace("wrongChoice", "horribleChoice");
                tipMe.textContent = ' HINT: Giving Russian intel about the attack will help more than an apology';


            } else if (conversationCount == 7) {
                topic.textContent = "If we can't recall the planes..."
                conversationCount++;
                choices[0].textContent = 'You should use that McDonald gift card right now, wouldn\'t wanna let it go to waste';
                choices[0].classList.replace("wrongChoice", "horribleChoice");
                choices[1].textContent = 'your country is a goner';
                choices[1].classList.replace("rightChoice", "wrongChoice");
                choices[2].textContent = 'we will have to help you destroy them';
                choices[2].classList.replace("horribleChoice", "rightChoice")
                tipMe.textContent = ' HINT: Any help you can offer will be appreciated';
                if (tipMe.classList.contains("hide") == false) {
                    tipMe.classList.add("hide")
                }


            } else if (conversationCount == 8) {
                topic.textContent = "I am so sorry...";
                conversationCount++;
                choices[0].textContent = 'that I will not be able to see your country blow up myself!';
                choices[1].textContent = '...too, Dimitri. I am very sorry';
                choices[1].classList.replace("wrongChoice", "rightChoice");
                choices[2].textContent = 'that our friendship has to be tested this way';
                choices[2].classList.replace("rightChoice", "wrongChoice")
                tipMe.textContent = ' HINT: Both of them are sorry about the turn of the events';
                if (tipMe.classList.contains("hide") == false) {
                    tipMe.classList.add("hide")
                }

            } else if (conversationCount == 9) {
                topic.textContent = "No, really, I am as sorry as...";
                conversationCount++;
                choices[0].textContent = 'as Julius Caesar, after adopting Brutus';
                choices[0].classList.replace("horribleChoice", "wrongChoice");
                choices[1].textContent = 'as Stalin after sending all those people in the labor camps';
                choices[1].classList.replace("rightChoice", "horribleChoice")
                choices[2].textContent = 'as you are, Dimitri'
                choices[2].classList.replace("wrongChoice", "rightChoice");
                tipMe.textContent = ' HINT: Both of them are sorry about the turn of the events';
                if (tipMe.classList.contains("hide") == false) {
                    tipMe.classList.add("hide")
                }

            } else if (conversationCount == 10) {
                topic.textContent = "Say something in his languange to appear more invested in Russia's future!";
                conversationCount++;
                choices[0].textContent = 'да, што?';
                choices[0].classList.replace("wrongChoice", "rightChoice");
                choices[1].textContent = 'мы захватим эту бомбу!';
                choices[1].classList.replace("horribleChoice", "rightChoice");
                choices[2].textContent = 'мы уничтожим Америку!'
                tipMe.textContent = ' HINT: You shouldn\'t worry about this one, whichever you choose the US president has a terible pronunciation and the Russian will just appreciate the gesture, without understanding anything that s been said!';
                if (tipMe.classList.contains("hide") == false) {
                    tipMe.classList.add("hide")
                }
            }

   else if (conversationCount == 11)
    {
        redirectToStatic();
    }
}
}
}

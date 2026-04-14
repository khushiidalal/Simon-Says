let gameSeq = [];
let userSeq = [];

const btns = ["orange", "green", "yellow", "blue"];
let started = false;
let level = 0;
const h2 = document.querySelector("h2");

function startOver() {
    level = 0;
    gameSeq = [];
    started = false;
}

function playNextSequence() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    const randIdx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIdx];
    const randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        h2.innerText = `Level ${level}`;
        playNextSequence();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function btnPress() {
    if (!started) return;

    const btn = this;
    userFlash(btn);

    const userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns();
}

function checkAns() {
    const idx = userSeq.length - 1;

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(playNextSequence, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br/>Press any key to start again`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
            h2.innerHTML = `Game over! Your score was <b>${level}</b> <br/>Press any key to start again`;
            startOver();
        },150);
        startOver();
    }}

const allBtns = document.querySelectorAll(".btn");
for (const btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function startOver(){
    started= false;
    gameSeq = [];
    userSeq = [];
    level = 0;
   
}

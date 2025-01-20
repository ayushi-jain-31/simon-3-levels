let soundflash = new Audio("../sounds/soundflash.mp3");
let soundbuttonpress = new Audio("../sounds/soundbuttonpress.mp3");
let soundgameover = new Audio("../sounds/soundgameover.mp3");

let gameSeq = [];
let userSeq = [];

let start = false;
let level = 0;

let btns = ["oval1","square1","circle1","rectangle1","rectangle2","circle2","square2","oval2",
    "oval3","rectangle3","circle3","square3","square4","circle4","rectangle4","oval4"];

let highestScore = 0;
let highestScoreDisplay = document.querySelector("h3");

let levelNo = document.querySelector("span");

let startButton = document.querySelector('.start');

startButton.addEventListener("click",function(){
    if(start == false){
        console.log("game started");
        start=true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("gameflash");
    soundflash.play();
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250);
};
function userFlash(btn){
    btn.classList.add("userflash");
    soundbuttonpress.play();
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
};

function levelUp(){
    userSeq = [];
    level++;
    levelNo.innerText = `Level ${level}`;

    if(level > highestScore){
        highestScore = level;
        highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
    }

    let randomIdx = Math.floor(Math.random() * 16);
    let randomshape = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomshape}`);
    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randomBtn);
    gameSeq.push(randomshape);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        //console.log("same value");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        soundgameover.play();
        levelNo.innerHTML= (`Game Over!! <br> Your score was {${level}} <br> Click here to start.`);
        document.querySelector(".start").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector(".start").style.backgroundColor = "rgb(255, 208, 0)";
        } , 500);
        reset();
    }
}
function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
}

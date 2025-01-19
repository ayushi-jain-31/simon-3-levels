let soundflash = new Audio("https://ayushi-jain-31.github.io/simon-3-levels/sounds/soundflash.mp3");
let soundbuttonpress = new Audio("https://ayushi-jain-31.github.io/simon-3-levels/sounds/soundbuttonpress.mp3");
let soundgameover = new Audio("https://ayushi-jain-31.github.io/simon-3-levels/sounds/soundgameover.mp3");

let gameSeq = [];
let userSeq = [];

let start = false;
let level = 0;

let btns = ["green","pink","yellow","blue"];

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
    },200);
};
function userFlash(btn){
    btn.classList.add("userflash");
    soundbuttonpress.play();
    setTimeout(function(){
        btn.classList.remove("userflash");
    },200);
};

function levelUp(){
    userSeq = [];
    level++;
    levelNo.innerText = `Level ${level}`;
    
    if(level > highestScore){
        highestScore = level;
        highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
    }

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randomBtn);
    gameSeq.push(randomColor);
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
        } , 1000);
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

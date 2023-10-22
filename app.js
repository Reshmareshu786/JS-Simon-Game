let gameSeq = [];
let userSeq = [];
let level = 0;
let start = false;
let colors = ["red","green","yellow","purple"];
let h2 = document.querySelector("h2");
document.addEventListener("DOMContentLoaded",function(){
    highestScore = parseInt(localStorage.getItem("highestScore")) || 0;
})
document.addEventListener("keypress",function()
{
    if(start == false)
    {
        console.log("Key pressed!");
        start = true;
    }
    levelUp();
})

function gameFlash(btn)
{
    btn.classList.add("gameFlash");
    setTimeout(function(){
        btn.classList.remove("gameFlash");
    },250)
}

function userFlash(btn)
{
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250)
}

function checkAns(indx)
{
    if(gameSeq[indx] === userSeq[indx])
    {
        if(gameSeq.length == userSeq.length)
        {
            setTimeout(levelUp,1000);
        }
    }
    else
    {
        h2.innerHTML = `Game over! <b>Your score was:${level}</b><br>Highest Score:<b>${highestScore}</b><br>
        Press any key to start!`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },250)
        reset();
    }
}
function btnPress()
{
    let btn = this;
    console.log(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    userFlash(btn);
    checkAns(userSeq.length-1);
}
let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn)
{
    btn.addEventListener("click",btnPress);
}



function levelUp()
{
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    let randomIndx = Math.floor(Math.random() * 4);
    let randomColor = colors[randomIndx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    // console.log(randomIndx);
    // console.log(randomColor);
    // console.log(randomBtn);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function reset()
{
    start = false;
    gameSeq = [];
    userSeq = [];
    if(level > highestScore)
    {
        highestScore = level;
        localStorage.setItem("highestScore",highestScore);
    }
    level = 0;
}
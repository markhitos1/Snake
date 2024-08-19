

const playBoard = document.querySelector(".play-board");
const scoreElement  = document.querySelector(".score");
const higtScoreElement  = document.querySelector(".high-score");
const board = document.querySelector('.game-over');
const restart = document.querySelector('.restart');
var myElement = document.querySelector('body');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);

// listen to events...
mc.on("panleft panright panup pandown ", function(ev) {
    if(ev.type === "panup" && velocityy != 1){
        velocityx = 0;
        velocityy = -1;
    }else if (ev.type === "pandown" && velocityy != -1){
        velocityx = 0;
        velocityy = 1;
    }else if(ev.type === "panleft" && velocityx != 1){
        velocityx = -1;
        velocityy = 0;
    }else if(ev.type === "panright" && velocityx != -1){
        velocityx = 1;
        velocityy = 0;
    }    
});

let gamOver = false ;
let foodx, foody;
let snakex = 5, snakey = 10;
let snakeBody = [];
let velocityx = 0, velocityy = 0;
let setIntervalId;
let score = 0;

let higtScore = localStorage.getItem("high-score") || 0 ;
higtScoreElement.innerHTML = `high score : ${higtScore}`;

const changFoodPosition = () => {
    foodx = Math.floor(Math.random()*30) +1;
    foody = Math.floor(Math.random()*30) +1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    board.style.visibility= 'visible';
}

restart.addEventListener('click',function(){
    location.reload();
})

const changeDirection = (e) => {
    console.log(e);
    if(e.key === "ArrowUp" && velocityy != 1){
        velocityx = 0;
        velocityy = -1;
    }else if (e.key === "ArrowDown" && velocityy != -1){
        velocityx = 0;
        velocityy = 1;
    }else if(e.key === "ArrowLeft" && velocityx != 1){
        velocityx = -1;
        velocityy = 0;
    }else if(e.key === "ArrowRight" && velocityx != -1){
        velocityx = 1;
        velocityy = 0;
    }    
    //initGame();
}    

const initGame = () => {
    if(gamOver) return handleGameOver();
    let htmlMarkup = `<div class= "food" style="grid-area: ${foody} / ${foodx}" ></div>`;
    
    if(snakex === foodx && snakey === foody){
        changFoodPosition();
        snakeBody.push([foodx, foody]);
        score++;

        higtScore = score >= higtScore ? score : higtScore;
        localStorage.setItem("high-score" , higtScore)
        scoreElement.innerHTML = `Score: ${score}`;

        higtScoreElement.innerHTML = `high score : ${higtScore}`;
        //puntaje MAX

    }

    for(let i = snakeBody.length -1 ; i > 0 ; i--){
       snakeBody[i] = snakeBody [i - 1];
       //agranda la cola
    }

    snakeBody[0] = [snakex, snakey]

    snakex += velocityx;
    snakey += velocityy;

    if(snakex <= 0 || snakex > 30 || snakey <= 0 || snakey > 30){
      gamOver = true ;
    }

    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class= "head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}" ></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gamOver = true;
            //gameOver al comer cola
        }
    }

   
    playBoard.innerHTML = htmlMarkup;
}

changFoodPosition();
// initGame();
setIntervalId = setInterval(initGame,125);
document.addEventListener("keydown" , changeDirection);
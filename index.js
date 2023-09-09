const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");


let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody= [];
let velX=0, velY=0;
let gameOver1 = false;
let gameOver2 = false;
let setIntervalID;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPos = () =>{    //generating random numbers to change the position of the food
    foodY = Math.floor(Math.random()*30)+1;
    foodX = Math.floor(Math.random()*30)+1;
}

const gameOverHandler1 = () =>{  //every 125ms, game checks for game over situation, and if it's found true, this function is run
    clearInterval(setIntervalID);
    alert("It's a brick wall lil bro. Not platform 9 3/4");
    location.reload();
}

const gameOverHandler2 = () =>{  //every 125ms, game checks for game over situation, and if it's found true, this function is run
    clearInterval(setIntervalID);
    alert("I'm hungry, thus I'll eat myself.");
    location.reload();
}

const changeDir = (k) =>{   //changing direction of the snake according to the input
    if(velY!=1 && k.key === "ArrowUp"){
        velY=-1;
        velX=0;
    }else if(velY!=-1 && k.key === "ArrowDown"){
        velY=1;
        velX=0;
    }else if(velX!=-1 && k.key === "ArrowRight"){
        velX=1;
        velY=0;
    }else if(velX!=1 && k.key === "ArrowLeft"){
        velX=-1;
        velY=0;
    }
    initGame();
}


function initGame() {
    if(gameOver1)
        return gameOverHandler1();
    if(gameOver2)
        return gameOverHandler2();

    let htmlMarkup = `<div class="food bg-red-400" style="grid-area: ${foodY}/${foodX}"></div>`;
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPos();
        snakeBody.push([foodX, foodY]);
        score++;
        highScore = Math.max(score, highScore);
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    
    

    snakeX+=velX;
    snakeY+=velY;

    for(let i=snakeBody.length-1; i>0; i--){
        snakeBody[i]=snakeBody[i-1];
    }

    snakeBody[0] = [snakeX, snakeY];

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30)
        gameOver1 = true;

    for(let i=0; i<snakeBody.length; i++){
        htmlMarkup += `<div class="head bg-purple-600" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        if(i != 0 && snakeBody[i][1] === snakeBody[0][1] && snakeBody[i][0] === snakeBody[0][0])
            gameOver2=true;
    }

    playBoard.innerHTML = htmlMarkup;

}

changeFoodPos();
setIntervalID = setInterval(initGame, 125);
document.addEventListener("keyup", changeDir);
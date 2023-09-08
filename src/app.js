const playBoard = document.querySelector(".play-board");

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody= [];
let velX=0, velY=0;
let gameOver = false;
let setIntervalID;

const changeFoodPos = () =>{    //generating random numbers to change the position of the food
    foodY = Math.floor(Math.random()*30)+1;
    foodX = Math.floor(Math.random()*30)+1;
}

const gameOverHandler = () =>{  //every 125ms, game checks for game over situation, and if it's found true, this function is run
    clearInterval(setIntervalID);
    alert("Game Over! Little bro thinks he can run into a wall -_-");
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
    if(gameOver)
        return gameOverHandler();

    let fx, fy;
    let htmlMarkup = `<div class="food bg-red-400" style="grid-area: ${foodY}/${foodX}"></div>`;
    if(snakeX === foodX && snakeY === foodY){
        snakeBody.push([foodX, foodY]);
        fx=foodX; fy=foodY;
        changeFoodPos();
    }
    
    snakeBody[0] = [snakeX, snakeY];

    snakeX+=velX;
    snakeY+=velY;

    for(let i=snakeBody.length-1; i>0; i--){
        snakeBody[i]=snakeBody[i-1];
    }

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30)
        gameOver = true;


    for(let i=0; i<snakeBody.length; i++){
        htmlMarkup += `<div class="head bg-purple-600" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        // if(i !=0 && snakeBody[i][1] === snakeBody[0][1] && snakeBody[i][0] === snakeBody[0][0])
        //     gameOver=true;
    }

    playBoard.innerHTML = htmlMarkup;

}

changeFoodPos();
setIntervalID = setInterval(initGame, 100);
document.addEventListener("keyup", changeDir);
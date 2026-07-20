var w = window.innerWidth,
    h = window.innerHeight,
    canvas = document.getElementById('gameCanvas'),
    ctx = canvas.getContext('2d'),
    rate = 60,
    arc = 100,
    time,
    count,
    size = 7,
    speed = 20,
    parts = new Array,
    colors = ['red','#f57900','yellow','#ce5c00','#5c3566'];
var mouse = { x: 0, y: 0 };

canvas.setAttribute('width',w);
canvas.setAttribute('height',h);

function create() {
  time = 0;
  count = 0;

  for(var i = 0; i < arc; i++) {
    parts[i] = {
      x: Math.ceil(Math.random() * w),
      y: Math.ceil(Math.random() * h),
      toX: Math.random() * 5 - 1,
      toY: Math.random() * 2 - 1,
      c: colors[Math.floor(Math.random()*colors.length)],
      size: Math.random() * size
    }
  }
}

function particles() {
  ctx.clearRect(0,0,w,h);
   canvas.addEventListener('mousemove', MouseMove, false);
  for(var i = 0; i < arc; i++) {
    var li = parts[i];
    var distanceFactor = DistanceBetween( mouse, parts[i] );
    var distanceFactor = Math.max( Math.min( 15 - ( distanceFactor / 10 ), 10 ), 1 );
    ctx.beginPath();
    ctx.arc(li.x,li.y,li.size*distanceFactor,0,Math.PI*2,false);
    ctx.fillStyle = li.c;
    ctx.strokeStyle=li.c;
    if(i%2==0)
      ctx.stroke();
    else
      ctx.fill();
    
    li.x = li.x + li.toX * (time * 0.05);
    li.y = li.y + li.toY * (time * 0.05);
    
    if(li.x > w){
       li.x = 0; 
    }
    if(li.y > h) {
       li.y = 0; 
    }
    if(li.x < 0) {
       li.x = w; 
    }
    if(li.y < 0) {
       li.y = h; 
    }
   
     
  }
  if(time < speed) {
    time++;
  }
  setTimeout(particles,1000/rate);
}
function MouseMove(e) {
   mouse.x = e.layerX;
   mouse.y = e.layerY;

   
}
function DistanceBetween(p1,p2) {
   var dx = p2.x-p1.x;
   var dy = p2.y-p1.y;
   return Math.sqrt(dx*dx + dy*dy);
}
create();
particles();

function getComputerChoice() {
let choices = ["Rock", "Paper", "Scissors"];
return choices[Math.floor(Math.random()*choices.length)]

      
}

function getHumanChoice() {
   let choices = ["Rock", "Paper", "Scissors"];
   
    document.getElementById("rock").addEventListener("click", function() {

        if (choices[0]) {
            let ImageSpace = document.querySelector('.container3 .ImageSpace')
            ImageSpace.innerHTML = '<img src="images/rock.png" alt="Rock">';

             let computerSelection = getComputerChoice();

            playRound("Rock", computerSelection)
        
        }
    })

    document.getElementById("paper").addEventListener("click", function() {
         if (choices[1]) {
            let ImageSpace = document.querySelector('.container3 .ImageSpace')
            ImageSpace.innerHTML = '<img src="images/paper.png" alt="Paper">';

             let computerSelection = getComputerChoice();

            playRound("Paper", computerSelection)
        }
     }) 

    document.getElementById("scissors").addEventListener("click", function() {
 if (choices[2]) {
            let ImageSpace = document.querySelector('.container3 .ImageSpace')
            ImageSpace.innerHTML = '<img src="images/scissors.png" alt="Scissors">';

            let computerSelection = getComputerChoice();

            playRound("Scissors", computerSelection)
        }
})
}


let humanScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

function playRound(humanChoice, computerChoice) {
    roundsPlayed++;

    if (computerChoice === "Rock"){
       let ImageSpace = document.querySelector('.container4 .ImageSpace')
            ImageSpace.innerHTML = '<img src="images/rock.png" alt="Rock">';  
    }
    else if (computerChoice === "Paper"){
         let ImageSpace = document.querySelector('.container4 .ImageSpace')
            ImageSpace.innerHTML = '<img src="images/paper.png" alt="Paper">';
    }
    else if(computerChoice === "Scissors"){
         let ImageSpace = document.querySelector('.container4 .ImageSpace')
            ImageSpace.innerHTML = '<img src="images/scissors.png" alt="Scissors">';
    }



    if (humanChoice === computerChoice){
        console.log("Draw!");
    }

    else if (humanChoice === "Scissors" && computerChoice === "Paper" 
        || humanChoice === "Rock" && computerChoice === "Scissors"
        || humanChoice === "Paper" && computerChoice === "Rock"
    ) {
        humanScore++;
        
    }

    else if (humanChoice === "Scissors" && computerChoice === "Rock" 
        || humanChoice === "Rock" && computerChoice === "Paper"
        || humanChoice === "Paper" && computerChoice === "Scissors"
    ) {
        computerScore++;
    }


    
    document.getElementById('computerScore').textContent = computerScore; 
     document.getElementById('score').textContent = humanScore;

   if (roundsPlayed === 5 && humanScore > computerScore){
    console.log("You win the game!")
    roundsPlayed = 0;
    humanScore = 0;
    computerScore = 0;
   }
   else if (roundsPlayed === 5 && computerScore > humanScore){
    console.log("The computer wins the game!")
    roundsPlayed = 0;
    humanScore = 0;
    computerScore = 0;
   }
   else if (roundsPlayed === 5 && computerScore === humanScore){
    console.log("Draw!")
    roundsPlayed = 0;
    humanScore = 0;
    computerScore = 0;
   }
}




const choices = ["rock","paper","scissors"];
let playerScore = 0, computerScore = 0, tieScore = 0;

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const tieScoreEl = document.getElementById('tie-score');
const roundTextEl = document.getElementById('round-text');

const playerHandEl = document.getElementById('player-hand').querySelector('img');
const computerHandEl = document.getElementById('computer-hand').querySelector('img');

const resetBtn = document.getElementById('reset-btn');

const handImages = {
  rock: "https://i.ibb.co/ZXv7xVx/rock-computer.png",
  paper: "https://i.ibb.co/5BGr6hV/paper.png",
  scissors: "https://i.ibb.co/4TxB9xq/scissors.png"
};

function pickRandom() {
  return choices[Math.floor(Math.random()*choices.length)];
}

function geniusAI(history) {
  if(!history || history.length===0) return pickRandom();
  const last = history[history.length-1];
  if(last==='rock') return Math.random()<0.7?'paper':pickRandom();
  if(last==='paper') return Math.random()<0.7?'scissors':pickRandom();
  if(last==='scissors') return Math.random()<0.7?'rock':pickRandom();
}

function decideWinner(player, computer){
  if(player===computer) return 'tie';
  if((player==='rock' && computer==='scissors')||
     (player==='paper' && computer==='rock')||
     (player==='scissors' && computer==='paper')) return 'player';
  return 'computer';
}

function updateScores(winner){
  if(winner==='player') playerScore++;
  else if(winner==='computer') computerScore++;
  else tieScore++;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  tieScoreEl.textContent = tieScore;
}

let history = [];

function playRound(playerChoice){
  history.push(playerChoice);
  const computerChoice = geniusAI(history);

  // Reset to rock for shake
  playerHandEl.src = handImages.rock;
  computerHandEl.src = handImages.rock;

  // Shake animation
  playerHandEl.classList.add('shake');
  computerHandEl.classList.add('shake');

  setTimeout(()=>{
    playerHandEl.classList.remove('shake');
    computerHandEl.classList.remove('shake');

    // Reveal actual hands
    playerHandEl.src = handImages[playerChoice];
    computerHandEl.src = handImages[computerChoice];

    const winner = decideWinner(playerChoice, computerChoice);
    updateScores(winner);

    if(winner==='player') roundTextEl.textContent = '🎉 You win!';
    else if(winner==='computer') roundTextEl.textContent = '🤖 Computer wins!';
    else roundTextEl.textContent = "😐 It's a tie!";
  }, 900);
}

document.querySelectorAll('.choice').forEach(btn=>{
  btn.addEventListener('click',()=>playRound(btn.dataset.choice));
});

resetBtn.addEventListener('click',()=>{
  playerScore = computerScore = tieScore = 0;
  playerScoreEl.textContent = computerScoreEl.textContent = tieScoreEl.textContent = 0;
  roundTextEl.textContent = 'Choose your move!';
  playerHandEl.src = handImages.rock;
  computerHandEl.src = handImages.rock;
  history=[];
});

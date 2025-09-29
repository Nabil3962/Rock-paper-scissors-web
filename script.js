const choices = ["rock","paper","scissors"];
let playerScore = 0, computerScore = 0, tieScore = 0;

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const tieScoreEl = document.getElementById('tie-score');
const playerPlayEl = document.getElementById('player-play');
const computerPlayEl = document.getElementById('computer-play');
const roundTextEl = document.getElementById('round-text');
const resetBtn = document.getElementById('reset-btn');

const history = [];

// Sound effects
const clickSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3");
const winSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2011/2011-preview.mp3");
const loseSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");
const tieSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2026/2026-preview.mp3");

function pickRandom(){
  return choices[Math.floor(Math.random()*choices.length)];
}

// "Genius AI" that predicts your last move
function geniusAI(){
  if(history.length === 0) return pickRandom();
  const last = history[history.length-1];
  if(last === 'rock') return Math.random()<0.7 ? 'paper' : pickRandom();
  if(last === 'paper') return Math.random()<0.7 ? 'scissors' : pickRandom();
  if(last === 'scissors') return Math.random()<0.7 ? 'rock' : pickRandom();
}

function decideWinner(player, computer){
  if(player === computer) return 'tie';
  if((player === 'rock' && computer === 'scissors') ||
     (player === 'paper' && computer === 'rock') ||
     (player === 'scissors' && computer === 'paper')) return 'player';
  return 'computer';
}

function updateScores(winner){
  if(winner === 'player') playerScore++;
  else if(winner === 'computer') computerScore++;
  else tieScore++;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  tieScoreEl.textContent = tieScore;
}

function prettyName(choice){
  if(!choice) return '—';
  if(choice === 'rock') return '🪨 Rock';
  if(choice === 'paper') return '📄 Paper';
  return '✂️ Scissors';
}

function playRound(playerChoice){
  clickSound.play();
  history.push(playerChoice);
  const computerChoice = geniusAI();
  const winner = decideWinner(playerChoice, computerChoice);
  updateScores(winner);

  playerPlayEl.textContent = prettyName(playerChoice);
  computerPlayEl.textContent = prettyName(computerChoice);

  if(winner === 'player'){
    roundTextEl.textContent = '🎉 You win this round!';
    winSound.play();
  } else if(winner === 'computer'){
    roundTextEl.textContent = '🤖 Computer wins this round!';
    loseSound.play();
  } else {
    roundTextEl.textContent = "😐 It's a tie.";
    tieSound.play();
  }
}

document.querySelectorAll('.choice').forEach(btn=>{
  btn.addEventListener('click', ()=> playRound(btn.dataset.choice));
});

resetBtn.addEventListener('click', ()=>{
  playerScore = computerScore = tieScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  tieScoreEl.textContent = tieScore;
  roundTextEl.textContent = 'Scores reset — Make your move!';
  playerPlayEl.textContent = '—';
  computerPlayEl.textContent = '—';
  history.length = 0;
});

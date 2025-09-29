const choices = ["rock","paper","scissors"];
let playerScore = 0, computerScore = 0, tieScore = 0;

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const tieScoreEl = document.getElementById('tie-score');
const roundTextEl = document.getElementById('round-text');
const resetBtn = document.getElementById('reset-btn');

const playerHand = document.getElementById('player-hand');
const computerHand = document.getElementById('computer-hand');

const history = [];

function pickRandom(){
  return choices[Math.floor(Math.random()*choices.length)];
}
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
function prettySymbol(choice){
  if(choice === 'rock') return '✊';
  if(choice === 'paper') return '✋';
  return '✌️';
}

function playRound(playerChoice){
  history.push(playerChoice);
  const computerChoice = geniusAI();

  // Reset hands to fists
  playerHand.textContent = '✊';
  computerHand.textContent = '✊';

  // Shake animation
  playerHand.classList.add('shake');
  computerHand.classList.add('shake');

  setTimeout(()=>{
    playerHand.classList.remove('shake');
    computerHand.classList.remove('shake');

    // Reveal results
    playerHand.textContent = prettySymbol(playerChoice);
    computerHand.textContent = prettySymbol(computerChoice);

    const winner = decideWinner(playerChoice, computerChoice);
    updateScores(winner);

    if(winner === 'player'){
      roundTextEl.textContent = '🎉 You win this round!';
    } else if(winner === 'computer'){
      roundTextEl.textContent = '🤖 Computer wins this round!';
    } else {
      roundTextEl.textContent = "😐 It's a tie.";
    }
  }, 900);
}

document.querySelectorAll('.choice').forEach(btn=>{
  btn.addEventListener('click', ()=> playRound(btn.dataset.choice));
});
resetBtn.addEventListener('click', ()=>{
  playerScore = computerScore = tieScore = 0;
  playerScoreEl.textContent = computerScoreEl.textContent = tieScoreEl.textContent = 0;
  roundTextEl.textContent = "Scores reset — Make your move!";
  playerHand.textContent = '✊';
  computerHand.textContent = '✊';
  history.length = 0;
});

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
  rock: "https://i.ibb.co/3S0mZ4d/rock.png",
  paper: "https://i.ibb.co/0BCvVfS/paper.png",
  scissors: "https://i.ibb.co/4TxB9xq/scissors.png"
};

// Sounds
const shakeSound = document.getElementById('shake-sound');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const tieSound = document.getElementById('tie-sound');

function pickRandom() {
  return choices[Math.floor(Math.random()*choices.length)];
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

function playRound(playerChoice){
  const computerChoice = pickRandom();

  // Reset hands to rock for shake
  playerHandEl.src = handImages.rock;
  computerHandEl.src = handImages.rock;

  // Shake animation
  playerHandEl.classList.add('shake');
  computerHandEl.classList.add('shake');
  shakeSound.currentTime=0; shakeSound.play();

  setTimeout(()=>{
    playerHandEl.classList.remove('shake');
    computerHandEl.classList.remove('shake');

    // Reveal actual hands
    playerHandEl.src = handImages[playerChoice];
    computerHandEl.src = handImages[computerChoice];

    const winner = decideWinner(playerChoice, computerChoice);
    updateScores(winner);

    if(winner==='player'){
      roundTextEl.textContent = '🎉 You win!';
      winSound.play();
    } else if(winner==='computer'){
      roundTextEl.textContent = '🤖 Computer wins!';
      loseSound.play();
    } else {
      roundTextEl.textContent = "😐 It's a tie!";
      tieSound.play();
    }
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
});

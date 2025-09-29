const choices = ["rock", "paper", "scissors"];
let playerScore = 0, computerScore = 0, tieScore = 0;

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const tieScoreEl = document.getElementById('tie-score');
const roundTextEl = document.getElementById('round-text');
const resetBtn = document.getElementById('reset-btn');

const playerHand = document.getElementById('player-hand');
const computerHand = document.getElementById('computer-hand');

const history = [];

function pickRandom() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function geniusAI() {
  if (history.length === 0) return pickRandom();
  const last = history[history.length - 1];
  if (last === 'rock') return Math.random() < 0.7 ? 'paper' : pickRandom();
  if (last === 'paper') return Math.random() < 0.7 ? 'scissors' : pickRandom();
  if (last === 'scissors') return Math.random() < 0.7 ? 'rock' : pickRandom();
}

function decideWinner(player, computer) {
  if (player === computer) return 'tie';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'player';
  return 'computer';
}

function updateScores(winner) {
  if (winner === 'player') playerScore++;
  else if (winner === 'computer') computerScore++;
  else tieScore++;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  tieScoreEl.textContent = tieScore;
}

function handEmoji(choice) {
  if (choice === 'rock') return '✊';
  if (choice === 'paper') return '✋';
  if (choice === 'scissors') return '✌';
}

function playRound(playerChoice) {
  history.push(playerChoice);
  const computerChoice = geniusAI();

  // reset to rock before shaking
  playerHand.textContent = '✊';
  computerHand.textContent = '✊';

  playerHand.classList.add('shake-bottom');
  computerHand.classList.add('shake-top');

  setTimeout(() => {
    playerHand.classList.remove('shake-bottom');
    computerHand.classList.remove('shake-top');

    playerHand.textContent = handEmoji(playerChoice);
    computerHand.textContent = handEmoji(computerChoice);

    const winner = decideWinner(playerChoice, computerChoice);
    updateScores(winner);

    if (winner === 'player') roundTextEl.textContent = '🎉 You win!';
    else if (winner === 'computer') roundTextEl.textContent = '🤖 Computer wins!';
    else roundTextEl.textContent = "😐 It's a tie.";
  }, 2000); // 2s shake
}

document.querySelectorAll('.choice').forEach(btn => {
  btn.addEventListener('click', () => playRound(btn.dataset.choice));
});

resetBtn.addEventListener('click', () => {
  playerScore = computerScore = tieScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  tieScoreEl.textContent = tieScore;
  roundTextEl.textContent = 'Scores reset — Make your move!';
  playerHand.textContent = '✊';
  computerHand.textContent = '✊';
  history.length = 0;
});

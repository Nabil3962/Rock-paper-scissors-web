const choices = ['rock', 'paper', 'scissors'];

function play(playerChoice) {
  const aiChoice = choices[Math.floor(Math.random() * 3)];
  document.getElementById('ai-choice').textContent = `AI's Choice: ${aiChoice.charAt(0).toUpperCase() + aiChoice.slice(1)}`;

  let result = '';
  if (playerChoice === aiChoice) {
    result = 'It\'s a Tie!';
  } else if (
    (playerChoice === 'rock' && aiChoice === 'scissors') ||
    (playerChoice === 'paper' && aiChoice === 'rock') ||
    (playerChoice === 'scissors' && aiChoice === 'paper')
  ) {
    result = 'You Win!';
  } else {
    result = 'You Lose!';
  }

  document.getElementById('result').textContent = result;
}

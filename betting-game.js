var bank;


var gameLoop = function(money) {
  bank = money;
  while(bank >= 5) {
    bet = askForBet();
    guess = askForGuess();
    gamble(bet, guess);
  }

}

var askForBet = function(text) {
  if (text == null) {
    text = "Place a bet between $5 and $10."
  }
  bet = prompt(text, "7");
  if ((bet < 5) || (bet > 10) || (bet > bank)) {
    if (bet > bank) {
      text = ("You cannot bet more than $" + bank + " because that's all you have. Place a bet between $5 and " + bank + ".")
    }
    bet = askForBet(text);
  }
  return bet;
}

var askForGuess = function() {
  guess = prompt("Guess an integer between 1 and 10.", "3");
  if ((guess > 10) || (guess < 1)) {
    guess = askforGuess();
  }
  return guess;
}

var gamble = function(bet, guess) {
  var answer = Math.floor(Math.random() * 10) + 1;
  var status = "The anwer was " + answer + ". ";
  if (guess == answer) {
    bank += (bet * 2);
    status += "Correct! You won $" + (bet * 2) + "!";
  } else if (Math.abs(guess - answer) == 1) {
    status += "You were soooooo close. Keep your bet.";
  } else {
    bank -= bet 
    status += "Better luck next time.";
  }
  
  if (bank < 5) {
    status = status + " It's GAME OVER, man!";
  } else {
    status = status + " You now have $" + bank + ".";
  }

  alert(status);
}

gameLoop(100);

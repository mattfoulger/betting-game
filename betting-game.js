var bank = 100;
var guess = 7;
var answer;
var status;

$(".bet-group-item").click(function(e) {
  e.preventDefault();
  $(".bet-group-item").removeClass("active");
  $(this).addClass("active");
  guess = $(this).attr("id");
});

$("#betting-form").submit(function(e) {
  e.preventDefault();
  bet = $("#amount").val();
  $(".bet-group-item").removeClass("correct").removeClass("incorrect").removeClass("closecall")
  gamble(bet, guess);
});

$("#reset-form").submit(function(e) {
  e.preventDefault();
  newGame();
});


var gamble = function(bet, guess) {
  answer = Math.floor(Math.random() * 10) + 1;
  status = "The anwer was " + answer + ". ";
  if (guess == answer) {
    bank += (bet * 2);
    status += "Correct! You won $" + (bet * 2) + "!";
  } else if (Math.abs(guess - answer) == 1) {
    status += "You were soooooo close. Keep your bet.";
  } else {
    bank -= bet 
    status += "Better luck next time.";
  }
  spinner();
}

var gameOver = function() {
  $("#betting-form").slideUp(400, function() {
    $("#reset-form").toggle(200);
  });
}

var newGame = function() {
  $("#reset-form").toggle(100, function() {
    $("#betting-form").slideDown(400);
  });
  bank = 100;
  $("#status").text("New game... Good luck!");
  $("#bank").text("$"+bank);
}

var spinner = function() {
  var total_spins = 3;
  for (var i = 1; i <= total_spins; i++) {
    queueSpin(i, total_spins);
  }
};

var queueSpin = function(iteration, total_spins) {
  setTimeout(function() {
      spin(iteration, total_spins);
    }, 2000 * (iteration-1));
}

// use .delay() !!

var spin = function(current_spin, last_spin) {
  $(".bet-group-item").each(function(i, el) {
    setTimeout(function(){
     $(el).animate({ 'height': "+=20px", 'width': "+=20px"}, 250)
     .animate({ 'height': "-=20px", 'width': "-=20px" }, 250);
    
      if ( ($(el).attr("id") == answer) && (current_spin == last_spin) ) {
        if ($(el).attr("id") == guess) {
          $(el).addClass("correct");
          $(el).removeClass("active");
        } else if (Math.abs($(el).attr("id") - guess) == 1) {
          $(el).addClass("closecall");
        } else {
          $(el).addClass("incorrect");
        }
      }
    },200 + ( i * 200 ));

    if ( ($(el).attr("id") == answer) && (current_spin == last_spin) ) {
      resolveGuess();
      return false;
    }
  });
}

var resolveGuess = function() {
  if (bank < 5) {
  status = status + " It's GAME OVER, man!";
  gameOver();
  }

  $("#status").text(status);
  $("#bank").text("$"+bank);

}



// var gameLoop = function(money) {
//   bank = money;
//   while(bank >= 5) {
//     bet = askForBet();
//     guess = askForGuess();
//     gamble(bet, guess);
//   }

// }

// var askForBet = function(text) {
//   if (text == null) {
//     text = "Place a bet between $5 and $10."
//   }
//   bet = prompt(text, "7");
//   if ((bet < 5) || (bet > 10) || (bet > bank)) {
//     if (bet > bank) {
//       text = ("You cannot bet more than $" + bank + " because that's all you have. Place a bet between $5 and " + bank + ".")
//     }
//     bet = askForBet(text);
//   }
//   return bet;
// }

// var askForGuess = function() {
//   guess = prompt("Guess an integer between 1 and 10.", "3");
//   if ((guess > 10) || (guess < 1)) {
//     guess = askforGuess();
//   }
//   return guess;
// }



var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var userTryIndex = 0;

//while (gameStarted & !gameOver) {
//
//  while (userClickedPattern.length < gamePattern.length) {
//  }
//  if (testSequence()) {
//    nextSequence();
//  } else {
//    gameOver = true;
//  }
//}

$(document).on("keydown", function() {
  if (!gameStarted) {
    gameStarted = true;
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    userTryIndex = 0;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
})

$(".btn").on("click", function() {
  if (gameStarted) {
    userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    if (userChosenColor == gamePattern[userTryIndex]) {
    userClickedPattern.push(userChosenColor);
    userTryIndex++;

    if (userTryIndex == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      console.log(gamePattern);
      userClickedPattern = [];
      userTryIndex = 0;

    }
  } else { // user input was wrong
    gameStarted = false;
    $("#level-title").text("Game Over, Press any key to restart");
    playSound("wrong")
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },400)
  }
}
})


function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(colorName) {
  var playButtonSound = new Audio("sounds/" + colorName + ".mp3");
  playButtonSound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}

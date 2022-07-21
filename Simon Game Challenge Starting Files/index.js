var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = []
var gamePattern = [];
var level = 0
var started = false;

//detect first time keyboard key click and Start
$(document).keypress(function() {
  if (gamePattern.length==0) {
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});




//detect a button clicked
$('.btn').click(function(event) {
  var userChosenColour = event.currentTarget.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1)
});









//function of random number selection
function nextSequence() {
  userClickedPattern = [];
  level = level + 1;
  $('#level-title').html('Level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//function for checking answer
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('correct');
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('wrong');
    playSound('wrong');
    $('body').addClass("game-over");
    $('#level-title').html('Game Over, Press Any Key to Restart');

    setTimeout(function() {
      $('body').removeClass("game-over");
    }, 200);

    startover();
  }
}

//function of startover
function startover() {
  gamePattern = [];
  level = 0;
}







//function of play sounds
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}


//animation pess
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


var buttonColours= ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userSequence = [];
var level = 0;
var flag = false;

$(document).keydown(function(){
  if(!flag){
    $("#level-title").text("Level "+ level);
    nextSequence();
    flag = true;
  }
});

function nextSequence(){
  userSequence = [];
  level++;
  $("#level-title").text("Level "+ level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  // nextSequence();

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click( function(){
  var userChoosenColor =$(this).attr("id");
  userSequence.push(userChoosenColor);
  // console.log(userSequence);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAns(userSequence.length-1);
});

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+ currentColour).removeClass("pressed");
  },150);
}

function checkAns(curlevel){
  if(userSequence[curlevel] === gamePattern[curlevel]){
    if(userSequence.length ===  gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },150);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern =[];
  userSequence = [];
  flag = false;
}

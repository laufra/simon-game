
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern=[];

var started = false;

var level = 0;

//Detecting when user clicks a button
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
});

//Detecting when user presses a key to start/ restart the game
$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }


});

//function to show next sequence
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//function to play sound
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

//function to animate the key press of the colour
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");},100);
}

//function to check the answer of the user
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }
    else{
        playSound("wrong");
        $(document).addClass("game-over");

        setTimeout(function(){
            $(document).removeClass("game-over");},200);
        
        $("#level-title").text("Game over, Press any key to Restart"); 
        startOver();   
    }   
}

//function to start over when game is over
function startOver(){
    level = 0;
    gamePattern =[]
    started = false;
}
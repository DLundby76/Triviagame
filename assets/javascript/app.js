$(document).ready(function() {
  $("#current-card").hide()
  $("#game-finished").hide()

	var timerEl = $("#timer")
  var currentDeck = []
  var currentCard = {}
  var wrongAnswer = 0
  var rightAnswer = 0
  var timer = 0

  var questions = [
  {
    question: "What is the capitol of Alabama?",
    choices: ["Birmingham", "Mobile" , "Huntsville" , "Montgomery" , "Madison"],
    correctAnswer: "Montgomery"
  },

  {
  	question: "What is the capitol of Alaska?",
    choices: ["Juneau", "Fairbanks", "Homer", "Nome", "Anchorage"],
    correctAnswer: 'Juneau'
  },

  {
  	question: "What is the capitol of Arizona?",
    choices: ["Tucson", "Phoenix", "Mesa", "Gilbert", "Tempe"],
    correctAnswer: "Phoenix"
  },

  {
  	question: "What is the capitol of Arkansas?",
    choices: ["Fort Smith", "Rogers" , "Jonesboro", "North Little Rock", "Little Rock"],
    correctAnswer: "Little Rock"
  },

  {
  	question: "What is the capitol of California?",
    choices: ["Sacramento", "Los Angeles", "Fresno", "Oakland", "San Fransisco"],
    correctAnswer: "Sacramento"
  },

  {
  	question: "What is the capitol of Colorado?",
    choices: ["Colorado Springs" , "Fort Collins", "Denver", "Aurora", "Boulder"],
    correctAnswer: "Denver"
   },

  {
  	question: "What is the capitol of Connecticut?",
    choices: ["Bridgeport", "Hartford", "New Haven", "Stamford", "Waterbury"],
    correctAnswer: "Hartford"
  },

  {
  	question: "What is the capitol of Delaware?",
    choices: ["Wilmington", "Newark", "Middletown", "Dover", "Georgetown" ],
    correctAnswer: "Dover"
  },

  {
  	question: "What is the capitol of Flordia?",
    choices: ["Orlando", "Tampa", "Tallahassee", "Miami", "Saint Petersburg" ],
    correctAnswer: "Tallahassee"
  },

  {
  	question: "What is the capitol of Georgia?",
    choices: ["Atlanta", "Macon", "Savannah", "Athens", "Roswell"],
    correctAnswer: "Atlanta"
  },

  {
  	question: "What is the capitol of Hawaii?",
    choices: ["Pearl City", "Waipahu", "Honolulu", "Hilo", "Kailua"],
    correctAnswer: "Honolulu"
  },
 
  {
  	question: "What is the capitol of Idaho?",
    choices: ["Meridian", "Nampa", "Idaho Falls", "Eagle", "Boise"],
    correctAnswer: "Boise"
  },
  
  {
  	question: "What is the capitol of Illinois?",
    choices: ["Chicago", "Des Plaines", "Springfield", "Elgin", "Champaign"],
    correctAnswer: "Springfield"
  },

  {
  	question: "What is the capitol of Indiana?",
    choices: ["Indianapolis", "Fort Wayne" , "Evansville", "South Bend", "Bloomington"],
    correctAnswer: "Indianapolis"
  },

  {
  	question: "What is the capitol of Iowa?",
    choices: ["Cedar Rapids", "Iowa City", "Des Moines", "Waterloo", "Cedar Falls"],
    correctAnswer: "Des Moines"
  },

  {
  	question: "What is the capitol of Kansas?",
    choices: ["Wichita", "Kansas City", "Lawrence", "Topeka", "Manhattan"],
    correctAnswer: "Topeka"
  },

  {
  	question: "What is the capitol of Kentucky?",
    choices: ["Louisville", "Lexington", "Owensboro", "Richmond", "Frankfort"],
    correctAnswer: "Frankfort"
  },

  {
  	question: "What is the capitol of Louisiana?",
    choices: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Kenner"],
    correctAnswer: "Baton Rouge"
  },

  {
    question: "What is the capitol of Maine?",
    choices: ["Portland", "Lewiston", "Bangor", "Augusta", "Saco"],
    correctAnswer: "Augusta"
  },

  {
    question: "What is the capitol of Maryland?",
    choices: ["Annapolis", "Baltimore", "Frederick", "Bowie", "Laurel"],
    correctAnswer: "Annapolis"
  },

  {
    question: "What is the capitol of Massachusetts?",
    choices: ["Worcester", "Lowell", "Boston", "Quincy", "Lynn"],
    correctAnswer: "Boston"
  },

  {
    question: "What is the capitol of Michigan?",
    choices: ["Detroit", "Grand Rapids", "Warren", "Lansing", "Marquette"],
    correctAnswer: "Lansing"
  },

  {
    question: "What is the capitol of Minnesota?",
    choices: ["Minneapolis", "Saint Paul", "Rochester", "Bloomington", "Duluth"],
    correctAnswer: "Saint Paul"
  },

  {
    question: "What is the capitol of Mississippi?",
    choices: ["Gulfport", "Southaven", "Jackson", "Biloxi", "Pearl"],
    correctAnswer: "Jackson"
  },

  {
    question: "What is the capitol of Missouri?",
    choices: ["Saint Louis", "Kansas City", "Springfield", "Jefferson City", "Joplin"],
    correctAnswer: "Jefferson City"
  },

  {
    question: "What is the capitol of Montana?",
    choices: ["Billings", "Missoula", "Helena", "Butte", "Bozman"],
    correctAnswer: "Helena"
  },

  {
    question: "What is the capitol of Nebraska?",
    choices: ["Omaha", "Lincoln", "Bellevue", "Kearney", "Norfolk"],
    correctAnswer: "Lincoln"
  }

];
function shuffle(array, limit) {
  var totalQuestions = [];
  var arrayCopy = array.slice(0);
  var currentIndex = arrayCopy.length, temporaryValue, randomIndex;
  console.log(arrayCopy, "working")
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
  	if(totalQuestions.length < limit){
  			    // Pick a remaining element...
    	randomIndex = Math.floor(Math.random() * currentIndex);
    	currentIndex -= 1;
  		    // And swap it with the current element.
		    temporaryValue = arrayCopy[currentIndex];
		    totalQuestions.push(arrayCopy[randomIndex]);
		    arrayCopy.splice(randomIndex, 1);
	} else { 
		return totalQuestions;
	}


  }
}

// function startTimer(duration, display) {
//     timer = duration, minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);
//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.text(minutes + ":" + seconds);

//         if (--timer < 0) {
//           gameOver()
//         }
//     }, 1000);
// }
 var startTimer;
function newTimer(seconds){
  var nextSecond = seconds - 1;
  var minutes = parseInt(seconds / 60, 10);
  var currentSeconds = parseInt(seconds % 60, 10);
  console.log("Current SECONDSSSSSSS", currentSeconds)
  console.log("Seconds", seconds, "Formated Seconds", currentSeconds,"Minutes", minutes)
      currentSeconds = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;
  var time = "" + minutes + ":" + currentSeconds;

  $("#timer").text(time);

  if (nextSecond === 0 ) {
    gameOver();
  }else {
    startTimer = setTimeout(function(){
      newTimer(nextSecond);
    }, 1000)
  }
}

function pullQuestion(){
  var i = Math.floor(Math.random() * currentDeck.length);
  currentCard = currentDeck[i]
  currentDeck.splice(i,1)
  $("#display-question").text(currentCard.question)
  for(var j = 0; j < 5; j++){
    $("#option-" + (j+1) ).text(currentCard.choices[j])
  }
}

function checkAnswer(optionNumber){
  var selectedAnswer = $("#option-" + optionNumber).text()
  if (selectedAnswer === currentCard.correctAnswer){
    rightAnswer ++

  } else{
    wrongAnswer ++
  }
  if (currentDeck.length > 0){
    pullQuestion()
  }else {
    console.log("game over")
    gameOver()
  }

}

function gameOver(){
   $("#current-card").hide()
   $("#game-finished").show();
   $("#wins").text(rightAnswer)
   $("#losses").text(wrongAnswer)
    clearTimeout(startTimer)
}

function newGame(){
  rightAnswer = 0
  wrongAnswer = 0
  $("#game-finished").hide()
  $("#start-screen").show()


}


function easy(){
	var easyTime = 75;
  clearTimeout(startTimer);
	newTimer(easyTime);
  currentDeck = shuffle(questions, 10)
  $("#start-screen").hide();
  $("#current-card").show();
  pullQuestion()
}

function medium(){
	var mediumTime = 60;
  clearTimeout(startTimer);
	newTimer(mediumTime)
  currentDeck = shuffle(questions, 15)
  $("#start-screen").hide();
  $("#current-card").show();
  pullQuestion()
}

function hard(){
	var hardTime = 45
  clearTimeout(startTimer);
	newTimer(hardTime)
  currentDeck = shuffle(questions, 20)
  $("#start-screen").hide();
  $("#current-card").show();
  pullQuestion()
}

$("#easy-button").click(function(){
	easy()
})

$("#medium-button").click(function(){
	medium()
})

$("#hard-button").click(function(){
	hard()
})

$("#option-1").click(function(){
  checkAnswer(1)

})

$("#option-2").click(function(){
  checkAnswer(2)
})

$("#option-3").click(function(){
  checkAnswer(3)

})

$("#option-4").click(function(){
checkAnswer(4)

})

$("#option-5").click(function(){
  checkAnswer(5)


})

$("#new-game").click(function(){
  newGame()
})








})
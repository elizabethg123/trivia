const next = document.getElementById("next");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");

start.addEventListener("click",startTrivia);
next.addEventListener("click",renderQuestion);
let correctA = "";
let answersA = [];
let questionA = "";
let category = "10";
function startTrivia(){
	category = document.getElementById("categories").value;
	document.getElementById("start").style.display = "none";
	document.getElementById("categories").style.display = "none";
	renderQuestion();
}

function renderQuestion(){
//  e.preventDefault();  
  let url = "https://opentdb.com/api.php?amount=2&category=" + category + "&type=multiple";
  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the Numbers API service: " + response.statusText
        }
      }
      return response.json();
      
    }).then(function(json) {
      answersA = [];
      for(let i = 0; i < json.results[0].incorrect_answers.length; i++){
        answersA.push(json.results[0].incorrect_answers[i]);
        console.log(answersA);
      }
      answersA.push(json.results[0].correct_answer);      
      questionA = json.results[0].question;
      correctA = json.results[0].correct_answer;
      shuffle(answersA);
	document.getElementById("next").style.display = "none";
	choiceA.style.background = "white";
	choiceB.style.background = "white";
	choiceC.style.background = "white";
	choiceD.style.background = "white";
       console.log(questionA);
       console.log("answerA" + answersA[0]);
       question.innerHTML = questionA;
       choiceA.innerHTML = answersA[0];
       choiceB.innerHTML = answersA[1];
       choiceC.innerHTML = answersA[2];
       choiceD.innerHTML = answersA[3];
   });
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


function checkAnswer(answer){
    if(document.getElementById(answer).innerHTML === correctA){
        console.log("correct");
        document.getElementById(answer).style.background = "green";
	document.getElementById("next").style.display = "block";
    }else{
        document.getElementById(answer).style.background = "red";
        console.log("incorrect");
    }
}



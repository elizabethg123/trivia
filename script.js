const next = document.getElementById("next");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");

start.addEventListener("click",startTrivia);
change.addEventListener("click",beginGame);
next.addEventListener("click",renderQuestion);
let correctA = "";
let answersA = [];
let questionA = "";
let category = "10";

function beginGame(){
	document.getElementById("question").style.display = "none";
	document.getElementById("A").style.display = "none";
	document.getElementById("B").style.display = "none";
	document.getElementById("C").style.display = "none";
	document.getElementById("D").style.display = "none";
	document.getElementById("change").style.display = "none";
	document.getElementById("next").style.display = "none";

	document.getElementById("categories").style.display = "flex";
	document.getElementById("start").style.display = "flex";
}

function startTrivia(){
	category = document.getElementById("categories").value;
	document.getElementById("question").style.display = "flex";
        document.getElementById("A").style.display = "flex";
        document.getElementById("B").style.display = "flex";
        document.getElementById("C").style.display = "flex";
        document.getElementById("D").style.display = "flex";
        document.getElementById("change").style.display = "none";
        document.getElementById("next").style.display = "none";

        document.getElementById("categories").style.display = "none";
        document.getElementById("start").style.display = "none";
	renderQuestion();
}

function renderQuestion(){
//  e.preventDefault();  
  let url = "https://opentdb.com/api.php?amount=2&category=" + category + "&type=multiple";
  // call API
  fetch(url)
    .then(function(response) {
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
      }
      answersA.push(json.results[0].correct_answer);      
      questionA = json.results[0].question;
      correctA = json.results[0].correct_answer;
      shuffle(answersA);
	document.getElementById("next").style.display = "none";
        document.getElementById("change").style.display = "none";
	choiceA.style.background = "white";
	choiceB.style.background = "white";
	choiceC.style.background = "white";
	choiceD.style.background = "white";
  
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

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function checkAnswer(answer){
    if(document.getElementById(answer).innerHTML === decodeHtml(correctA)){
        document.getElementById(answer).style.background = "green";
	document.getElementById("change").style.display = "flex";
	document.getElementById("next").style.display = "flex";
    }else{
        document.getElementById(answer).style.background = "red";
    }
}


window.onload = beginGame();

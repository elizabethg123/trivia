
let score = 0;
let correctA = "hi";
function onClick(e) {
  e.preventDefault();
  // setup URL
  let url = "https://opentdb.com/api.php?amount=10&category=10";
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
      // update DOM with response
      updateResult(json.results[0].question);

      let answers = [];
      for(let i = 0; i < json.results[0].incorrect_answers.length; i++){
        console.log("wrong" + json.results[0].incorrect_answers[i]);
        answers.push(json.results[0].incorrect_answers[i]);  
      }
      correctA = json.results[0].correct_answer;
      answers.push(json.results[0].correct_answer);
      shuffle(answers);
      updateAnswers(answers);        
    });
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function updateResult(info) {
  document.getElementById('result').textContent = info;
}

function updateAnswers(info) {
  document.getElementById("c1").style.display = "block";
  document.getElementById("c2").style.display = "block";
  document.getElementById("c3").style.display = "block";
  document.getElementById("c4").style.display = "block";
  document.getElementById("w1").style.display = "block";
  document.getElementById("w2").style.display = "block";
  document.getElementById("w3").style.display = "block";
  document.getElementById("w4").style.display = "block";
  document.getElementById("woo").style.display = "none";
  document.getElementById("submit").style.display = "block";
  document.getElementById("answer").style.display = "none";
  
  document.getElementById("c1").value = info[0];
  document.getElementById("w1").textContent = info[0];

  document.getElementById("c2").value = info[1];
  document.getElementById("w2").textContent = info[1];

  document.getElementById("c3").value = info[2];
  document.getElementById("w3").textContent = info[2];

  document.getElementById("c4").value = info[3];
  document.getElementById("w4").textContent = info[3];
}

function submitAnswer(correct) {
  var radios = document.getElementsByName("choice");
  var i = 0, len = radios.length;
  var checked = false;
  var userAnswer;
  
  for( ; i < len; i++ ) {
     if(radios[i].checked) {
       checked = true;
       userAnswer = radios[i].value;
       console.log("user" + userAnswer);
     }
  }
console.log("correct1" + correct); 
  // if user click submit button without selecting any option, alert box should be say "please select choice answer".
  if(!checked) {
    alert("please select choice answer");
    return;
  }
  // incorrect answer
  else {
	document.getElementById("c1").style.display = "none";
  document.getElementById("c2").style.display = "none";
  document.getElementById("c3").style.display = "none";
  document.getElementById("c4").style.display = "none";
  document.getElementById("w1").style.display = "none";
  document.getElementById("w2").style.display = "none";
  document.getElementById("w3").style.display = "none";
  document.getElementById("w4").style.display = "none";
  document.getElementById("woo").style.display = "block";
  document.getElementById("submit").style.display = "none";
  document.getElementById("answer").style.display = "block";
  if(userAnswer === correct) {
	document.getElementById("answer").textContent = "You were correct! The correct answer was " + correct;	
  }
  else{
	document.getElementById("answer").textContent = "You were incorrect! The correct answer was " + correct;
  }
}

  
}

window.onload = onClick;
document.getElementById('woo').addEventListener('click', onClick);
document.getElementById('submit').addEventListener('click', function(){submitAnswer(correctA);});




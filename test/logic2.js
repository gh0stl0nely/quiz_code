var question_and_answer = [
    {
        question: "How do you prevent an execution of a default behaviour of some elements?",
        "1": "preventDefault(event)",
        "2": "event.preventDefault()",
        "3": "stopDefault(event)",
        "4": "event.stopDefault()",
        "5": "None of the above",
        answer: "event.preventDefault()"

    },

    {
        question: "How do you store an element called ‘myName’ on client-side storage with the value ‘Andy’?",
        "1": "localStorage.setName(‘myName’, ‘Andy’)",
        "2": "localStorage.set(‘myName’, ‘Andy’)",
        "3": "webStorage.set(‘myName’, ‘Andy’)",
        "4": "webAPI.store(‘myName’, ‘Andy’)",
        "5": "None of the above",
        answer: "None of the above"
    },
    {
        question: "What does DOM stand for in web development?",
        "1": "Document Object Model",
        "2": "Documentation Object Model",
        "3": "Document Oriented Model",
        "4": 'Documentation Orientation Model',
        "5": "None of the above",
        answer: "Document Object Model"
    },
    {
        question: "Which of the following returns only Element children?",
        "1": "The ‘children’ property",
        "2": "The ‘childNodes’ property",
        "3": "The ‘childList’ property’",
        "4": "The ‘childrenNodes’ property",
        "5": "None of the above",
        answer: "The ‘children’ property"
    },
    {
        question: "Which of the following returns both Element and Nodes children?",
        "1": "The ‘children’ property",
        "2": "The ‘childNodes’ property",
        "3": "The ‘childList’ property’",
        "4": "The ‘childrenNodes’ property",
        "5": "None of the above",
        answer: "The 'childNodes' property"
    },
    {
        question: "Which of the following returns both Element and Nodes children?",
        "1": "Local storage stores data on the browser forever and cannot be deleted, while session storage stores data on the browser temporarily and data will be deleted upon moving to another website",
        "2": "Local storage stores data on the browser for 24 hours only while session storage stores data on the browser forever",
        "3": "Session storage stores data on the browser forever and cannot be deleted, while local storage stores data on the browser temporarily and data will be deleted upon moving to another website",
        "4": "There is no difference",
        "5": "None of the above",
        answer: "None of the above"

    },
    {
        question: "How do you store an empty array on client side storage with the key ‘array’?",
        "1": "clientStorage.setItem(‘array’, [])",
        "2": "clientStorage.setItem(‘array’, ‘[]’)",
        "3": "localStorage.setItem(‘array’, [])",
        "4": "sessionStorage.setItem(‘array’, ‘[]’)",
        "5": "None of the above",
        answer: "None of the above"
    }
    ,
    {
        question: "What is the difference between setTimeout and setInterval?",
        "1": "There is no difference",
        "2": "setTimeout runs the handler function once and setInterval runs the handler function continuously",
        "3": "setTimeout runs the handler function runs the handler function continuously and setInterval runs the handler function once",
        "4": "setTimeout requires no handler function but setInterval requires a handler function",
        "5": "setInterval requires no handler function but setTimeout requires a handler function",
        answer: "setTimeout runs the handler function once and setInterval runs the handler function continuously"
    },
    {
        question: "What type of data does web storage store?",
        "1": "String",
        "2": "Tree",
        "3": "Object",
        "4": "Array",
        "5": "List",
        answer: "String"
    },
    {
        question: "What should a developer do before getting an array from a web storage?",
        "1": "Nothing",
        "2": "Convert it into a string",
        "3": "Convert it into an object",
        "4": "Parse it",
        "5": "None of the above",
        answer: "String"
    }
    
]

console.log(question_and_answer.length);

//Done
function startQuiz(){
    //Set score to 0
    document.getElementById('current').innerHTML = localStorage.getItem('current_score');
    //Set timer and start counting down
    tick();
    // Display questions
    displayQuestion();
}


function tick(){
    var seconds = Number(localStorage.getItem('time_limit')); // Got from Local Storage
    document.getElementById('countDown').textContent = seconds;
    

    if(seconds > 0){
        seconds--;
        localStorage.setItem('time_limit', seconds);  
        setTimeout(tick,1000);
    } else {
        endGame();
    }
}; 



//Done
function displayQuestion(){
    // Display the first question
    // 1 
    var questions = localStorage.getItem('questions'); // A number of question user pre-selected
    var randomized_array = shuffle(question_and_answer).slice(0,Number(questions)); // Randoming question and answer variable
    sessionStorage.setItem('randomized_array', JSON.stringify(randomized_array)); // Store this random array in a session storage

    document.getElementById('questionNumber').innerHTML = 1;
    sessionStorage.setItem('questionNumber', 1); // Store the order of question

    document.getElementById('question').innerHTML = randomized_array[0]['question'];

    for(var i = 1; i <= 5; i++){
        document.getElementById('answer'+i).innerHTML = randomized_array[0][i];
    }
    
}

function chooseAnswer(i){
   
    var l = document.getElementsByClassName('answer');
    for(var j = 0; j < l.length; j++){
        l[j].style.width = "50%";
    }
    
    var user_choice = document.getElementById('answer'+ i).innerHTML; // A string

    //Applies styling to selected answer
    document.getElementById('answer'+i).style.transition = '0.5s';
    document.getElementById('answer'+i).style.width = '60%';

    //Store their answer to access later before moving to another question 
    localStorage.setItem('user_choice', user_choice);
    
}

//Done
function nextQuestion(){
    var questions = Number(localStorage.getItem('questions')); // A Number of question user pre-selected
    //Check this is the last question, if the current question is the last question, which is equal to the number
    // that the user chose, then end game
    var currentQuestion = Number(sessionStorage.getItem('questionNumber')); // Game begins with 1, and then 2
    var randomized_array = JSON.parse(sessionStorage.getItem('randomized_array')); // Get the random array that was stored
    var user_choice = localStorage.getItem('user_choice'); 

    var new_current_score = Number(localStorage.getItem('current_score'));
    
    if(user_choice == randomized_array[currentQuestion-1]['answer']){
        new_current_score++;
        localStorage.setItem('current_score', new_current_score);
        document.getElementById('current').innerHTML = new_current_score;
    } else {
        // clearTimeout(tick);
        var goes_down_by = Number(localStorage.getItem('goes_down_by'));
        var reduced_time = Number(localStorage.getItem('time_limit')) - goes_down_by; // Get the current time limit
        localStorage.setItem('time_limit',reduced_time);
        document.getElementById('countDown').textContent = reduced_time + 1;
    }

    if(currentQuestion == questions){
        endGame();
        return;
    }

    document.getElementById('questionNumber').innerHTML = currentQuestion + 1; // Update the current question
    sessionStorage.setItem('questionNumber', currentQuestion + 1); // Update current question in storage

    document.getElementById('question').innerHTML = randomized_array[currentQuestion]['question'];

    for(var i = 1; i <= 5; i++){
        document.getElementById('answer'+i).innerHTML = randomized_array[currentQuestion][i];
        document.getElementById('answer'+i).style.transition = 'none';
        document.getElementById('answer'+i).style.width = '50%';
    }

    localStorage.setItem('user_choice', null);

}

function endGame(){
    var high_score = Number(localStorage.getItem('highest_score')); // First time setting high score will be 0 ! 
    var current_score = Number(localStorage.getItem('current_score'));
    var name = localStorage.getItem('name');

    var record = {'name': name, 'score':current_score}; // A record object

    var score_board_array = JSON.parse(localStorage.getItem('score_board_array'));

    // When end game, push the current score to the score board array stored

    score_board_array.push(record);
    localStorage.setItem('score_board_array', JSON.stringify(score_board_array));
    
    //Store highest score and display it 

    window.location.href = '../result/result.html';

    // Check if there is an existing highest score, if yes, compare it to current score, if not just set it
    if(current_score > high_score){
        localStorage.setItem('highest_score', current_score);
        alert('Congratulations! A new record is set at : ' + current_score);
        window.location.href = '../result/result.html';
    } 
}

// Helper to randomize the question array order

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

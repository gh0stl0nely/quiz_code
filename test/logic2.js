var question_and_answer = [
    {
        question: "What is 1+1",
        "1": 4,
        "2": 5,
        "3": 1,
        "4": 2,
        answer: 2
    },

    {
        question: "What is 2+2",
        "1": 3,
        "2": 1,
        "3": 4,
        "4": 8,
        answer: 4
    },
    {
        question: "What is 3+3",
        "1": 3,
        "2": 1,
        "3": 4,
        "4": 'None',
        answer: 'None'
    },
    {
        question: "What is 4+4",
        "1": 3,
        "2": 1,
        "3": 4,
        "4": 8,
        answer: 8
    },
    {
        question: "What is 5+5",
        "1": 3,
        "2": 1,
        "3": 10,
        "4": 'None',
        answer: 10
    }
    ,
    {
        question: "What is 6+6",
        "1": 3,
        "2": 1,
        "3": 10,
        "4": 'None',
        answer: 'None'
    }
]

//Done
function startQuiz(){
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

    for(var i = 1; i <= 4; i++){
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
    sessionStorage.setItem('user_choice', user_choice);
    
}

//Done
function nextQuestion(){
    var questions = Number(localStorage.getItem('questions')); // A Number of question user pre-selected
    //Check this is the last question, if the current question is the last question, which is equal to the number
    // that the user chose, then end game
    var currentQuestion = Number(sessionStorage.getItem('questionNumber')); // Game begins with 1, and then 2
    var randomized_array = JSON.parse(sessionStorage.getItem('randomized_array')); // Get the random array that was stored
    var user_choice = sessionStorage.getItem('user_choice'); 

    var new_current_score = Number(localStorage.getItem('current_score'));
    
    if(user_choice == randomized_array[currentQuestion-1]['answer']){
        new_current_score++;
        localStorage.setItem('current_score', new_current_score);
    } else {
        // clearTimeout(tick);
        var goes_down_by = Number(localStorage.getItem('goes_down_by'));
        var reduced_time = Number(localStorage.getItem('time_limit')) - goes_down_by; // Get the current time limit
        localStorage.setItem('time_limit',reduced_time);
        document.getElementById('countDown').textContent = reduced_time + 1;
    }

    // } else {
    //     alert('Wrong answer');
    //     // Stop the clicking , set the timer to thing and stop ticking again
    // 

    if(currentQuestion == questions){
        endGame();
        return;
    }

    document.getElementById('questionNumber').innerHTML = currentQuestion + 1; // Update the current question
    sessionStorage.setItem('questionNumber', currentQuestion + 1); // Update current question in storage

    document.getElementById('question').innerHTML = randomized_array[currentQuestion]['question'];

    for(var i = 1; i <= 4; i++){
        document.getElementById('answer'+i).innerHTML = randomized_array[currentQuestion][i];
        document.getElementById('answer'+i).style.transition = 'none';
        document.getElementById('answer'+i).style.width = '50%';
    }

}

function endGame(){
    var high_score = Number(localStorage.getItem('highest_score'));
    var current_score = Number(localStorage.getItem('current_score'));
    var name = localStorage.getItem('name');
    var record = {'name': name, 'score':current_score}; // A record object

    var score_board_array = JSON.parse(localStorage.getItem('score_board_array'));

    // When end game, push the current score to the score board array stored

    // alert(typeof JSON.parse(score_board_array)); // It is an object   

    score_board_array.push(record);

    localStorage.setItem('score_board_array', JSON.stringify(score_board_array));
    
    //Store highest score and display it 

    window.location.href = '../result/result.html';


    // Check if there is an existing highest score, if yes, compare it to current score, if not just set it
    if(high_score){
        if(current_score > high_score){
            localStorage.setItem('highest_score', current_score);
            alert('You got a new Score!');
            window.location.href = '../result/result.html';
        } 
    } 
    
    else {
       localStorage.setItem('highest_score', current_score); 
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

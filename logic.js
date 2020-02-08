

function resetScore(){
    var time_limit = document.getElementById('time_limit').value;
    var question_limit = document.getElementById('question_limit').value;
    var name = document.getElementById('name').value;
    var count = document.getElementById('time-reduction');
    var reduce = count.value; // x Seconds

    if(name == "" || (/\d/.test(name)) || name.length != 2){
        alert('Please enter first letter of your first and last name');
    } else if(time_limit > 100 || time_limit < 20 || isNaN(time_limit)){
        alert('Please enter time limit between 20 and 100');
    } else if(question_limit > 10 || question_limit < 5 || isNaN(question_limit)){
        alert('Please enter number of question between 5 and 20');
    } else {
        localStorage.setItem('time_limit', time_limit); // Store time_limit to Web Storage
        localStorage.setItem('goes_down_by', reduce); // Store how many second will timer go down by to Web Storage
        localStorage.setItem('questions', question_limit); // Store number of questions user wants to Web Storage
        localStorage.setItem('name',name);
        localStorage.setItem('user_choice', null);

        if(!localStorage.getItem('score_board_array')){
            var score_board_array = [];
            localStorage.setItem('score_board_array', JSON.stringify(score_board_array));
        }

        localStorage.setItem('current_score', 0);

        window.location.href='test/test.html';
    }
    
}

// JQuery for toggling tool tip

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

function displayScore(){
    // Display high score by comparing 
    var high_score = localStorage.getItem('highest_score');
    var current_score = localStorage.getItem('current_score');
    document.getElementById('high_score').innerHTML = high_score;
    document.getElementById("score").innerHTML = current_score;

    // Add score to score board
    addToScoreBoardAndSave();
     
}

function addToScoreBoardAndSave(){

    //This returns a score board
    var score_board_array = JSON.parse(localStorage.getItem('score_board_array'));

    // Sort the score board from top to bottom
    var sorted_score_board = sortBoard(score_board_array);

    // Use it to display the score board
    // 

    for(var i = sorted_score_board.length- 1; i >= 0; i--){
        var li = document.createElement('li');
        var span = document.createElement('span'); //Name
        var span2 = document.createElement('span') // Score
        var vertical = document.createElement('span'); // Vertical line
        span.className += 'name';
        vertical.className += 'vertical';

        span.innerHTML = sorted_score_board[i]['name'];
        span.appendChild(vertical);
        span2.innerHTML = sorted_score_board[i]['score'];
        // span.className += 'delete'; // Make sure it can be deleted
        // span.addEventListener('click', () => {
        //     span.parentNode.remove();
        // })

        li.appendChild(span);
        li.appendChild(span2);
        document.getElementById('score_board').appendChild(li);
    }
}

function sortBoard(nums){
    // nums == array 
    // {name}
    for (let i = 1; i < nums.length; i++) {
        let j = i - 1;
        let tmp = nums[i];
        while (j >= 0 && nums[j]['score'] > tmp['score']) {
          nums[j + 1]= nums[j];
          j--;
        }
        nums[j+1] = tmp;
      }
      return nums;

    // for(var i = 1; i < scoreBoard.length;i++){
    //     // If this number is less than the first , the move it to the first
    //     if(scoreBoard[i] < scoreBoard[0]){
    //         curr = scoreBoard[i];
    //         scoreBoard.splice(i,0);
    //         scoreBoard.unshift(curr);
    //     } else {
    //         curr = scoreBoard[i]; // Grab the current number we are on, and then from the beginning// j = 2nd loop
    //         for(j = 0; j < i; j++){
    //             if(curr < scoreBoard[j]){
    //                 var temp = scoreBoard.splice(i,0);
    //                 var tempj = scoreBoard.slice(j-1,0);
    //                 scoreBoard.splice(j-1,0,tempj,temp);     
    //                 break;
    //             }
    //         }
    //     }
    // }

    // return scoreBoard;
}


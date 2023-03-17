var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "database-1.ct0hp60mxd97.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Rudypatrick33",
    database: "database-1",
});


exports.handler = async (event, context, callback) => {
    
    var response;
    let body = JSON.parse(event.body);
   
    //Call function based off of event type
    switch(body.req){
        case 'generatePuzzle':
            response = {
              statusCode: 200,
              body: await generatePuzzle(body.sessionID)
            }; 
            break;
        case 'checkAnswer':
            checkAnswer(event.guess, event.sessionID)
            break;
        case 'updateLeaderboard':
            // code
            break;
        case 'getLeaderboard':
            // code
            break;
        case 'getSessionID':
            response = {
              statusCode: 200,
              body: JSON.stringify({"sessionID":await getSessionID()})
            }; 
            break;
        default:
            //code
    }
    
    callback(null, response);
};

const signs = ['+','-','*','/'];

/* Generate a unique id to identify a session */
async function getSessionID(){
   
   var id;
   
   //Current time of request
   
   //Random number
   var random = randomIntFromInterval(0,10000);
   
   //Technically not collision proof, but whatever
   
   //If ID already exists in RDS, get new random number
   
   return random;
}

/* Generate Puzzle- Given SessionID, generate a number and equation. Store equation in RDS, and return number and length to user */
async function generatePuzzle(sessionID){
    //Generate random number as puzzle hint
    var number = randomIntFromInterval(1,999);
    
    //Generate random number for sign (0-3)
    var sign = signs[randomIntFromInterval(0,signs.length-1)];
    
    //Find two numbers, X and Y, s.t. (x sign y) = number
    var x,y;
    switch (sign) {
        case '+':
            // Addition
            x = randomIntFromInterval(0,number);
            y = number - x;
            break;
        case '-':
            // Subtraction
            x = randomIntFromInterval(number,999);
            y = number + x;
            break;
        case '*':
            // Multiplication - Make sure whole number
            while(number%x != 0){
                x = randomIntFromInterval(0,number);
            }
            y = number/x;
            break;
        case '/':
            // Division - Make sure whole 
            while(number%y != 0){
                y = randomIntFromInterval(0,number);
            }
            x = number*y;
            break;
        default:
            // code
    }
    
    //Create answer string
    var solution = x.toString() + sign + y.toString();
    
    var length = solution.toString().length;
    
    //Store answer in database using sessionID as key

    
    //Return the generated number and the length of the answer
    return JSON.stringify({"number":number, "solutionLength":length});
}

function checkAnswer(guess, sessionID){
    
    //Get solution with session key
    var solution; //TO DO
    
    if(guess.equals(solution)){
        return true;
    }
    else{
        return false;
    }
        
}

/* Leaderboard Functions */
function updateLeaderboard(){
    
}

function getLeaderboard(){
    
}

/* Helper Functions */
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

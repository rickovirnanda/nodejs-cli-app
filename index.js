// import readline from 'readline';
const readline = require("readline");
// class....
// rl = readline.createInterface({ ...
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
});
rl.prompt();
// listArr:any[] = [];
let listArr = [];
// gameLen:number = 0;
let gameLen = 0;
let userScore=0;
let comScore=0;

const startWording = "Pick a number from most left or right";

function eliminateCom(){
    let randIndex = Math.floor(Math.random() * (listArr.length - 1 + 1) + 1) -1;
    let pick = listArr[randIndex];
    comScore+=pick;

    listArr.splice(randIndex,1);

    console.log('AI Pick : ', pick);
}

function generateList(len){
    for(let i =0; i<len; i++)
    {
        listArr.push(Math.floor(Math.random() * (20 - 10 + 1) + 10))
    }
}

function eleminateUser(input){
    if(listArr.length > 0)
    {
        console.log('User Pick : ', input);
        let indexCom = listArr.indexOf(input);
        if(indexCom > -1)
            listArr.splice(indexCom,1);
    }
}

function endGame()
{
    if(userScore > comScore)
        console.log("Congratulation you Win !!");
    else if(userScore == comScore)
        console.log("You have same score as computer, try again !");
    else
        console.log("Game Over you Lose !!");
}

function testCall(x, callback){
    cin = x+1;
    callback(x);
}

// main()
rl.question("Pick a number between no 10-20 (even) ", (pickNumber) => {
    gameLen = parseInt(pickNumber);
    let isAbleStart = (gameLen % 2 == 0) && gameLen >= 10 && gameLen <= 20;

    if(isAbleStart)
    {
        generateList(gameLen);
        console.log('List ', listArr.join(" "));
        rl.prompt();

        rl.on('line', (input) => {
            let intInput = parseInt(input)
            userScore+=intInput;
            eleminateUser(intInput);
            eliminateCom();
            console.log('User Score : ', userScore);
            console.log('AI Score : ', comScore);
            console.log('List ', listArr.join(" "));
            rl.prompt();

            if(listArr.length ==0)
            {
                endGame();
                rl.close();
            }
        });
    }
    else
    {
        console.log("The game can only be started if the pick number is even and between 10 - 20 !");
        rl.close()
    }    
});
//end main

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
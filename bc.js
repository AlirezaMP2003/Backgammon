var white1 = document.getElementById("w-1");
var white2 = document.getElementById("w-2");
var white3 = document.getElementById("w-3");
var white4 = document.getElementById("w-4");
var white5 = document.getElementById("w-5");
var white6 = document.getElementById("w-6");
var white7 = document.getElementById("w-7");
var white8 = document.getElementById("w-8");
var white9 = document.getElementById("w-9");
var white10 = document.getElementById("w-10");
var white11 = document.getElementById("w-11");
var white12 = document.getElementById("w-12");
var white13 = document.getElementById("w-13");
var white14 = document.getElementById("w-14");
var white15 = document.getElementById("w-15");

var black1 = document.getElementById("b-1");
var black2 = document.getElementById("b-2");
var black3 = document.getElementById("b-3");
var black4 = document.getElementById("b-4");
var black5 = document.getElementById("b-5");
var black6 = document.getElementById("b-6");
var black7 = document.getElementById("b-7");
var black8 = document.getElementById("b-8");
var black9 = document.getElementById("b-9");
var black10 = document.getElementById("b-10");
var black11 = document.getElementById("b-11");
var black12 = document.getElementById("b-12");
var black13 = document.getElementById("b-13");
var black14 = document.getElementById("b-14");
var black15 = document.getElementById("b-15");

var turn = "Black";

var turnOfBlack = document.getElementById("blackTurn");
var turnOfWhite = document.getElementById("whiteTurn");

var Whites = [white1,white2,white3,white4,white5,white6,white7,white8,
              white9,white10,white11,white12,white13,white14,white15,];
var Blacks = [black1,black2,black3,black4,black5,black6,black7,black8,
              black9,black10,black11,black12,black13,black14,black15]

var blackWinner = 0;
var whiteWinner = 0;              

var nuts = [
    [white1 , white2],
    [],[],[],[],
    [black11 , black12 , black13 , black14 , black15],
    [],
    [black8 , black9 , black10],
    [],[],[],
    [white3 , white4 , white5 , white6 , white7],
    [black3 , black4 , black5 , black6 , black7],
    [],[],[],
    [white8 , white9 , white10],[],
    [white11 , white12 , white13 , white14 , white15],
    [],[],[],[],
    [black1 , black2]
];

var blackWins = 0;
var whiteWins = 0;

var blackPoints = 0;
var whitePoints = 0;

var blackNutRemoved = [];
var whiteNutRemoved = [];

var moves = [];

var leftH = document.getElementById("leftDice");
var rightH = document.getElementById("rightDice");
var roleButton = document.getElementById("diceBtn");
roleButton.setAttribute("onclick" , "roleDice()");

window.onload = function() {
    disableWhites();
    disableBlacks();
    showTurn();
}

function showTurn() {
    if (turn == "Black") {
        turnOfBlack.style.backgroundColor = "black";
        turnOfWhite.style.backgroundColor = "#854E23";
    }
    else{
        turnOfWhite.style.backgroundColor = "white";
        turnOfBlack.style.backgroundColor = "#854E23";
    }
}

function roleDice() {
    document.getElementById("LLL1").innerHTML = "";
    document.getElementById("LLL2").innerHTML = "";
    document.getElementById("RRR1").innerHTML = "";
    document.getElementById("RRR2").innerHTML = "";

    let first = Math.floor((Math.random() * 6) + 1);
    let second = Math.floor((Math.random() * 6) + 1);

    if (first == second) {
        moves.push(first);
        moves.push(first);
        moves.push(second);
        moves.push(second);
    }
    else{
        moves.push(first);
        moves.push(second);
    }

    // leftH.innerHTML = first;
    // rightH.innerHTML = second;
    

    disableButton();

    if (turn == "Black") {
        document.getElementById("LLL1").innerHTML = first;
        document.getElementById("LLL2").innerHTML = second;
        enableBlacks();
        if (blackNutRemoved.length > 0) {
            returnBtoGame(moves[0]);
        }
    }
    else{
        document.getElementById("RRR1").innerHTML = first;
        document.getElementById("RRR2").innerHTML = second;
        enableWhites();
        if (whiteNutRemoved.length > 0) {
            returnWtoGame(moves[0]);
        }
    }

}

function disableWhites() {
    for (let i = 0; i < 15; i++){
        Whites[i].style.cursor = "default"; 
        Whites[i].removeAttribute("onclick");      
    }
}
function enableWhites() {
    for (let i = 0; i < 15; i++){
        Whites[i].style.cursor = "pointer"; 
        Whites[i].setAttribute("onclick" , "moveWhite("+i+")");      
    }
}

function disableBlacks() {
    for (let i = 0; i < 15; i++){
        Blacks[i].style.cursor = "default";    
        Blacks[i].removeAttribute("onclick");      
    }
}
function enableBlacks() {
    for (let i = 0; i < 15; i++){
        Blacks[i].style.cursor = "pointer";    
        Blacks[i].setAttribute("onclick" , 'moveBlack('+(i)+')');      
    }
}

function disableButton() {
        roleButton.style.cursor = "default";    
        roleButton.removeAttribute("onclick");      
}
function enableButton() {
        roleButton.style.cursor = "pointer";    
        roleButton.setAttribute("onclick" , "roleDice()");      
}

//black
function moveBlack(blackNut) {
    let index = findNut(Blacks[blackNut]);
    let distance = moves[0];
    let final = index - distance;
    if (scanBlack() == false) {canBContinue();}

    if (blackNutRemoved.length > 0) {
        returnBtoGame(distance);
    }

    else{
        if (final < 0) {
            let canOut = scanBlack();
            if (canOut) {
                let thisNut = nuts[index].pop();
                moves.shift();
                blackPoints++;
                document.getElementById("blackPoints").innerHTML = blackPoints;
                document.getElementById("col-"+(index+1)+"").removeChild(thisNut);

                if (moves.length == 0) {
                    turn = "White";
                    showTurn();
                    disableWhites();
                    enableButton();
                }

                blackWinner++;
                if (blackWinner == 15) {
                    disableWhites();
                    disableButton();
                    disableBlacks();
                    if (document.getElementById("whitePoints").innerHTML == 0) {
                        blackWins = blackWins + 2;
                    }
                    else{
                        blackWins++;
                    }
                    document.getElementById("blackPoints").innerHTML = 0;       
                    document.getElementById("whitePoints").innerHTML = 0;  
                    leftH.innerHTML = blackWins;
                    moves = [];
                    turn = "Black";
                    enableButton();
                    showTurn();
                    again();
                }

            }
            else{
                return;
            }
        }
        else if (nuts[final].length > 1 && nuts[final][0].className == 'white') {
            return;
        }
        else if (nuts[final].length == 1 && nuts[final][0].className == 'white') {
            moves.shift();

            let removed = nuts[final][0];
            document.getElementById("col-"+(final+1)+"").removeChild(removed);
            whiteNutRemoved.push(nuts[final].pop());
            let last = whiteNutRemoved.length;
            document.getElementById("downCenterContainer").appendChild(whiteNutRemoved[last-1]);

            let x = nuts[index].pop();
            nuts[final].push(x);
            changePlace(index+1 , final+1 , x);

            // whiteWinner++;

            if (moves.length == 0) {
                turn = "White";
                showTurn();
                disableBlacks();
                enableButton();
            }

        }
        else{
            moves.shift();
            let x = nuts[index].pop();
            nuts[final].push(x);

            changePlace(index+1 , final+1 , x);

            if (moves.length == 0) {
                turn = "White";
                showTurn();
                disableBlacks();
                enableButton();
            }
        }
    }
}

function returnBtoGame(final) {
    disableBlacks();
    for (let i = 0; i < blackNutRemoved.length; i++) {
        blackNutRemoved[i].style.cursor = "pointer";
        blackNutRemoved[i].setAttribute("onclick" , "returnBlacktoGame("+(final)+")");        
    }
}
function returnBlacktoGame(final) {
    final = 25 - final;
    // final = final + 18;
    
    if (nuts[final-1].length > 1 && nuts[final-1][0].className == "white") {
        moves.shift();
        if (moves.length == 0) {
            turn = "White";
            showTurn();
            disableBlacks();
            enableButton();
        }
        else returnBtoGame(moves[0]);
    }
    else if (nuts[final-1].length == 1 && nuts[final-1][0].className == "white") {
        let before = nuts[final-1].pop();
        let after = blackNutRemoved[0];
        nuts[final-1].push(blackNutRemoved.shift());
        moves.shift();

        let destination = document.getElementById("col-"+(final)+"");
        destination.removeChild(before);
        document.getElementById("upCenterContainer").removeChild(after);
        destination.appendChild(after);

        whiteNutRemoved.push(before);
        let last = whiteNutRemoved.length;
        document.getElementById("downCenterContainer").appendChild(whiteNutRemoved[last-1]);

        if (blackNutRemoved.length == 0) {
            disableBlacks();
            enableBlacks();
        }

        if (moves.length == 0) {
            turn = "White";
            showTurn();
            disableBlacks();
            enableButton();
        }
        if (moves.length != 0 && blackNutRemoved.length != 0) {
            returnBtoGame(moves[0]);
        }
        if (moves.length != 0 && blackNutRemoved.length == 0) {
            disableBlacks();
            enableBlacks();
        }

    }
    else{
        let after = blackNutRemoved[0];
        nuts[final-1].push(blackNutRemoved.shift());
        moves.shift();
        let destination = document.getElementById("col-"+(final)+"");
        document.getElementById("upCenterContainer").removeChild(after);

        destination.appendChild(after);
        if (blackNutRemoved.length == 0) {
            disableBlacks();
            enableBlacks();
        }
        if (moves.length == 0) {
            turn = "White";
            showTurn();
            disableBlacks();
            enableButton();
        }
        if (moves.length != 0 && blackNutRemoved.length != 0) {
            returnBtoGame(moves[0]);
        }
        if (moves.length != 0 && blackNutRemoved.length == 0) {
            disableBlacks();
            enableBlacks();
        }
    }
    
}

////////////////////////////////////
function changePlace(origin , destination , value) {

    let org = document.getElementById("col-"+origin+"");
    let des = document.getElementById("col-"+destination+"");

    org.removeChild(value);
    des.appendChild(value);

}

//white
function moveWhite(whitekNut) {
    let index = findNut(Whites[whitekNut]);
    let distance = moves[0];
    let final = index + distance;
    if (scanWhite() == false) { canWContinue();}

    if (whiteNutRemoved.length > 0) {
        returnWtoGame(distance);
    }

    else{
        if (final > 23) {
            let canOut = scanWhite();
            if (canOut) {
                let thisNut = nuts[index].pop();
                moves.shift();
                whitePoints++;
                document.getElementById("whitePoints").innerHTML = whitePoints;
                document.getElementById("col-"+(index+1)+"").removeChild(thisNut);

                if (moves.length == 0) {
                    turn = "Black";
                    showTurn();
                    disableWhites();
                    enableButton();
                }

                whiteWinner++;
                if (whiteWinner == 15) {
                    disableBlacks();
                    disableButton();
                    disableWhites();
                    if (document.getElementById("blackPoints").innerHTML == 0) {
                        whiteWins = whiteWins + 2;
                    }else{
                        whiteWins++;
                    }
                    document.getElementById("whitePoints").innerHTML = 0
                    document.getElementById("blackPoints").innerHTML = 0
                    rightH.innerHTML = whiteWins;
                    turn = "White";
                    moves = [];
                    enableButton();
                    showTurn();
                    again();
                }

            }
            else{
                return;
            }
        }
        else if (nuts[final].length > 1 && nuts[final][0].className == 'black') {
            return;
        }
        else if (nuts[final].length == 1 && nuts[final][0].className == 'black') {
            moves.shift();

            let removed = nuts[final][0];
            document.getElementById("col-"+(final+1)+"").removeChild(removed);
            blackNutRemoved.push(nuts[final].pop());
            let last = blackNutRemoved.length;
            document.getElementById("upCenterContainer").appendChild(blackNutRemoved[last-1]);

            let x = nuts[index].pop();
            nuts[final].push(x);
            changePlace(index+1 , final+1 , x);

            // blackWinner++;

            if (moves.length == 0) {
                turn = "Black";
                showTurn();
                disableWhites();
                enableButton();
            }

        }
        else{
            moves.shift();
            let x = nuts[index].pop();
            nuts[final].push(x);

            changePlace(index+1 , final+1 , x);

            if (moves.length == 0) {
                turn = "Black";
                showTurn();
                disableWhites();
                enableButton();
            }
        }
    }
}
function returnWtoGame(final) {
    disableWhites();
    for (let i = 0; i < whiteNutRemoved.length; i++) {
        whiteNutRemoved[i].style.cursor = "pointer";
        whiteNutRemoved[i].setAttribute("onclick" , "returnWhitetoGame("+(final)+")");        
    }
}
function returnWhitetoGame(final) {
    
    if (nuts[final-1].length > 1 && nuts[final-1][0].className == "black") {
        moves.shift();
        if (moves.length == 0) {
            turn = "Black";
            showTurn();
            disableWhites();
            enableButton();
        }
        else returnWtoGame(moves[0]);
    }
    else if (nuts[final-1].length == 1 && nuts[final-1][0].className == "black") {
        let before = nuts[final-1].pop();
        let after = whiteNutRemoved[0];
        nuts[final-1].push(whiteNutRemoved.shift());
        moves.shift();

        let destination = document.getElementById("col-"+(final)+"");
        destination.removeChild(before);
        document.getElementById("downCenterContainer").removeChild(after);
        destination.appendChild(after);

        blackNutRemoved.push(before);
        let last = blackNutRemoved.length;
        document.getElementById("upCenterContainer").appendChild(blackNutRemoved[last-1]);

        if (whiteNutRemoved.length == 0) {
            disableWhites();
            enableWhites();
        }

        if (moves.length == 0) {
            turn = "Black";
            showTurn();
            disableWhites();
            enableButton();
        }
        if (moves.length != 0 && whiteNutRemoved.length != 0) {
            returnWtoGame(moves[0]);
        }
        if (moves.length != 0 && whiteNutRemoved.length == 0) {
            disableWhites();
            enableWhites();
        }

    }
    else{
        let after = whiteNutRemoved[0];
        nuts[final-1].push(whiteNutRemoved.shift());
        moves.shift();
        let destination = document.getElementById("col-"+(final)+"");
        document.getElementById("downCenterContainer").removeChild(after);

        destination.appendChild(after);
        if (whiteNutRemoved.length == 0) {
            disableWhites();
            enableWhites();
        }
        if (moves.length == 0) {
            turn = "Black";
            showTurn();
            disableWhites();
            enableButton();
        }
        if (moves.length != 0 && whiteNutRemoved.length != 0) {
            returnWtoGame(moves[0]);
        }
        if (moves.length != 0 && whiteNutRemoved.length == 0) {
            disableWhites();
            enableWhites();
        }
    }
    
}

function findNut(nut) {
    let index;
    for (let i = 0; i < nuts.length; i++) {
        for (let j = 0; j < nuts[i].length; j++) {
            if (nuts[i][j] == nut) {
                index = i;
            }            
        }        
    }
    return index;
}

function scanWhite() {
    let can = true;
    for (let i = 0; i < Whites.length; i++) {        
        let x = Whites[i];
        let index;
        for (let j = 0; j < nuts.length; j++) {
            for (let k = 0; k < nuts[j].length; k++) {
                if (nuts[j][k] == x) {
                    index = j;
                    if (index < 18) {
                        return false;
                    }
                }            
            }        
        }
    }
    return can;
}

function scanBlack() {
    let can = true;
    for (let i = 0; i < Blacks.length; i++) {        
        let x = Blacks[i];
        let index;
        for (let j = 0; j < nuts.length; j++) {
            for (let k = 0; k < nuts[j].length; k++) {
                if (nuts[j][k] == x) {
                    index = j;
                    if (index > 5) {
                        return false;
                    }
                }            
            }        
        }
    }
    return can;
}

function canWContinue() {
    let results = [];
    let can = 0;
    for (let i = 0; i < Whites.length; i++) {
        let index = findNut(Whites[i]);
        let dest = index + moves[0];   
        if (dest > 23) {
            results.push(0);
            can++;
        }     
        else{
            if (nuts[dest].length == 0 || (nuts[dest].length >= 1 && nuts[dest][0].className == "white")
            || (nuts[dest].length == 1 && nuts[dest][0].className == "black")) {
                results.push(1);
            }
            else if (nuts[dest].length > 1 && nuts[dest][0].className == "black") {
                results.push(0);
                can++;
            }
        }
    }
    if (can == results.length) {
        moves.shift();
        if (moves.length == 0) {
            turn = "Black";
            showTurn();
            disableWhites();
            enableButton();
        }
    }
}
function canBContinue() {
    let results = [];
    let can = 0;
    for (let i = 0; i < Blacks.length; i++) {
        let index = findNut(Blacks[i]);
        let dest = index - moves[0];   
        if (dest < 0) {
            results.push(0);
            can++;
        }     
        else{
            if (nuts[dest].length == 0 || (nuts[dest].length >= 1 && nuts[dest][0].className == "black")
            || (nuts[dest].length == 1 && nuts[dest][0].className == "white")) {
                results.push(1);
            }
            else if (nuts[dest].length > 1 && nuts[dest][0].className == "white") {
                results.push(0);
                can++;
            }
        }
    }
    if (can == results.length) {
        moves.shift();
        if (moves.length == 0) {
            turn = "White";
            showTurn();
            disableBlacks();
            enableButton();
        }
    }
}

function again() {
    blackNutRemoved = [];
    whiteNutRemoved = [];
    blackWinner = 0;
    blackPoints = 0;
    whiteWinner = 0;
    whitePoints = 0;
    nuts = [
        [white1 , white2],
        [],[],[],[],
        [black11 , black12 , black13 , black14 , black15],
        [],
        [black8 , black9 , black10],
        [],[],[],
        [white3 , white4 , white5 , white6 , white7],
        [black3 , black4 , black5 , black6 , black7],
        [],[],[],
        [white8 , white9 , white10],[],
        [white11 , white12 , white13 , white14 , white15],
        [],[],[],[],
        [black1 , black2]
    ];
    
    document.getElementById("LLL1").innerHTML = "";
    document.getElementById("LLL2").innerHTML = "";
    document.getElementById("RRR1").innerHTML = "";
    document.getElementById("RRR2").innerHTML = "";

    document.getElementById("col-1").appendChild(white1);
    document.getElementById("col-1").appendChild(white2);
    document.getElementById("col-6").appendChild(black11);
    document.getElementById("col-6").appendChild(black12);
    document.getElementById("col-6").appendChild(black13);
    document.getElementById("col-6").appendChild(black14);
    document.getElementById("col-6").appendChild(black15);
    document.getElementById("col-8").appendChild(black8);
    document.getElementById("col-8").appendChild(black9);
    document.getElementById("col-8").appendChild(black10);
    document.getElementById("col-12").appendChild(white3);
    document.getElementById("col-12").appendChild(white4);
    document.getElementById("col-12").appendChild(white5);
    document.getElementById("col-12").appendChild(white6);
    document.getElementById("col-12").appendChild(white7);
    document.getElementById("col-13").appendChild(black3);
    document.getElementById("col-13").appendChild(black4);
    document.getElementById("col-13").appendChild(black5);
    document.getElementById("col-13").appendChild(black6);
    document.getElementById("col-13").appendChild(black7);
    document.getElementById("col-17").appendChild(white8);
    document.getElementById("col-17").appendChild(white9);
    document.getElementById("col-17").appendChild(white10);
    document.getElementById("col-19").appendChild(white11);
    document.getElementById("col-19").appendChild(white12);
    document.getElementById("col-19").appendChild(white13);
    document.getElementById("col-19").appendChild(white14);
    document.getElementById("col-19").appendChild(white15);
    document.getElementById("col-24").appendChild(black1);
    document.getElementById("col-24").appendChild(black2);
}
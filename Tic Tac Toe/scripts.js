let trackBoard;
const huPlayer = 'O';
const comPlayer = 'X';
const winCombos = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,4,8],
	[2,4,6],
	[0,3,6],
	[2,5,8],
	[1,4,7]
];
const cells = document.querySelectorAll('.cell');
startGame();

function startGame(){
	document.querySelector('.endgame').style.display='none';
	trackBoard = Array.from(Array(9).keys());
	for(let i=0;i<cells.length;i++){
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click',boardClick,false);
	}
}

function boardClick(square){
	if(typeof trackBoard[square.target.id] === 'number'){
		turn(square.target.id,huPlayer);
		if(!checkWin(trackBoard,huPlayer) && !checkTie()) turn(selectSpot(),comPlayer);
	}
}

function turn(squareId,player){
	trackBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(trackBoard,player);
	if(gameWon){
		gameOver(gameWon);
	}
}

function checkWin(boardState,player){
	let gamePlays = boardState.reduce((acc,el,index) =>
		(el === player) ? acc.concat(index) : acc
	,[]);
	let gameWon = null;
	for(let[index,winArr] of winCombos.entries()){
		if(winArr.every(element => gamePlays.indexOf(element)>-1)){
			gameWon={index:index,player:player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameData){
	for(let index of winCombos[gameData.index]){
		document.getElementById(index).style.backgroundColor = gameData.player===huPlayer?'#fc34fe':'#3fef45'; 
	}
	for(let i=0; i<cells.length;i++){
		cells[i].removeEventListener('click',boardClick,false);
	}
	displayWinner(gameData.player ===huPlayer?'You Win!':'You Lose!');
}

function checkTie(){
	if(emptySpots().length === 0){
		for(let i=0;i<cells.length;i++){
			cells[i].style.backgroundColor = '#00ff00';
			cells[i].removeEventListener('click',boardClick,false);
		}
		displayWinner('It Was a Tie!');
		return true;
	}
	return false;
}

function selectSpot(){
	return minimax(trackBoard,comPlayer);
}

function emptySpots(){
	return trackBoard.filter(el =>
		typeof el === 'number'
	);
}

function displayWinner(msg){
	document.querySelector('.endgame').style.display = 'block';
	document.querySelector('.endgame .text').innerText = msg;
}

function minimax(board,player){
	let availSpots = emptySpots();
	if(checkWin(board,huPlayer)){
		return -10;
	}else if(checkWin(board,comPlayer)){
		return 10;
	}else if(availSpots.length === 0){
		return 0;
	}
	let possibleMoves = [];
	for(let i=0; i<availSpots.length; i++){
		let currentMove = {};
		currentMove.pos =  availSpots[i];
		availSpots[i] = player;
		if(player === huPlayer){
			currentMove.outcome = minimax(board,comPlayer);
		}else{
			currentMove.outcome = minimax(board,huPlayer);
		}
		possibleMoves.push(currentMove);
	}
	let bestMove;
	if(player === huplayer){
		bestOutcome = 99999;
		for(let i=0; i<possibleMoves.length; i++){
			if(possibleMoves[i].outcome < bestOutcome){
				bestOutcome = possibleMoves[i].outcome;
				bestMove = possibleMoves[i].pos;
			}
		}
	}else{
		bestOutcome = -99999;
		for(let i=0; i<possibleMoves.length;i++){
			if(possibleMoves[i].outcome > bestOutcome){
				bestOutcome = possibleMoves[i].outcome;
				bestMove = possibleMoves[i].pos;
			}
		}
	}
	return bestMove;
}
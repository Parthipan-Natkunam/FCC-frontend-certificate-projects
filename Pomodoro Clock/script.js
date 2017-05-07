const step = 1.6666666; 
const timer = document.querySelector('#timer');
var fillPercent = 0;

const sessionSelect= document.querySelector('#session-min');
const breakSelect = document.querySelector('#break-min');
var sessionMinutes = 25;
var breakMinutes = 5;
sessionSelect.innerHTML = sessionMinutes;
breakSelect.innerHTML = breakMinutes;

const sessionPlusBtn = document.querySelector('#wPlus');
const sessionMinusBtn = document.querySelector('#wMinus');
const breakPlusBtn = document.querySelector('#bPlus');
const breakMinusBtn = document.querySelector('#bMinus');

function addMinutes(isBreak=false){
	if(isBreak) {
		breakMinutes +=1;
		breakSelect.innerHTML = breakMinutes;
	}
	else {
		sessionMinutes +=1;
		sessionSelect.innerHTML = sessionMinutes;
	}
}

function subMinutes(isBreak=false){
	if(isBreak) {
		if(breakMinutes>1){
			breakMinutes -=1;
			breakSelect.innerHTML = breakMinutes;
		}
	}
	else {
		if(sessionMinutes>1){
			sessionMinutes -=1;
			sessionSelect.innerHTML = sessionMinutes;
		}
	}
}

function updateFillColor(){
	var dt = new Date();
	var mins = dt.getMinutes() < 10 ? '0'+dt.getMinutes() : dt.getMinutes();
	var sec = dt.getSeconds() < 10 ? '0'+dt.getSeconds() : dt.getSeconds();
	fillPercent >=100 ? fillPercent = 0 : fillPercent += step;
	document.documentElement.style.setProperty('--fillPercent',fillPercent+'%');
	timer.textContent = mins+':'+sec;
}

sessionPlusBtn.addEventListener('click',()=>addMinutes());
breakPlusBtn.addEventListener('click',()=>addMinutes(true));
sessionMinusBtn.addEventListener('click',()=>subMinutes());
breakMinusBtn.addEventListener('click',()=>subMinutes(true));

//setInterval(updateFillColor,1000);
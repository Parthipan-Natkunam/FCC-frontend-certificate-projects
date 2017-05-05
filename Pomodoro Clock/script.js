var fillPercent = 0;
const step = 1.6666666; 
const timer = document.querySelector('#timer');
function updateFillColor(){
	var dt = new Date();
	var mins = dt.getMinutes() < 10 ? '0'+dt.getMinutes() : dt.getMinutes();
	var sec = dt.getSeconds() < 10 ? '0'+dt.getSeconds() : dt.getSeconds();
	fillPercent >=100 ? fillPercent = 0 : fillPercent += step;
	document.documentElement.style.setProperty('--fillPercent',fillPercent+'%');
	timer.textContent = mins+':'+sec;
}
//setInterval(updateFillColor,1000);
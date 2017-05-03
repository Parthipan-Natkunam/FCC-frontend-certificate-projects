const btns = document.querySelectorAll('.key');
const display = document.querySelector('.display td');

function getInput(){
	this.classList.add('pressed');
	this.addEventListener('transitionend',function(){
		this.classList.remove('pressed');
	});
	switch(this.dataset.number){
		case "=":
			if(!!display.innerHTML){
				var isDecimal = String(eval(display.innerHTML)).indexOf('.')>=0;
				if(isDecimal) display.innerHTML = eval(display.innerHTML).toFixed(7);
				else display.innerHTML = eval(display.innerHTML);
				break;
			}
			else{
				display.innerHTML = '';
				break;
			}
		case "C":
			display.innerHTML = '';
			break;
		default:
			display.innerHTML += this.dataset.number;
	}
}

btns.forEach(btn => btn.addEventListener('click',getInput));

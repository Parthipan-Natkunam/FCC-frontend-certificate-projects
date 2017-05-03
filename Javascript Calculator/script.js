const btns = document.querySelectorAll('.key');
const display = document.querySelector('.display td');

function getInput(){
	this.classList.add('pressed');
	this.addEventListener('transitionend',function(){
		this.classList.remove('pressed');
	});
	switch(this.dataset.number){
		case "=":
			display.innerHTML = eval(display.innerHTML);
			break;
		case "C":
			display.innerHTML = '';
			break;
		default:
			display.innerHTML += this.dataset.number;
	}
}

btns.forEach(btn => btn.addEventListener('click',getInput));


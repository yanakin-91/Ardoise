/**
 * Récupérer la position de la souris lors du clic dans le canvas
 * Lors d'un clic sur le bouton haut, on crée un ligne vers le haut
 * Lors d'un clic sur le bouton bas, on crée un ligne vers le bas
 * Lors d'un clic sur le bouton droit, on crée un ligne vers la droite
 * Lors d'un clic sur le bouton gauche, on crée un ligne vers la gauche
*/
class Slate {
	constructor () {
		this.canvas = document.getElementById("slate");
		this.context = this.canvas.getContext("2d");
		this.btnUp = document.getElementById("up");
		this.btnDown = document.getElementById("down");
		this.btnLeft = document.getElementById("left");
		this.btnRight = document.getElementById("right");
		this.btnErase = document.getElementById("erase");
		this.colors = document.querySelectorAll('.colors div');
		this.strokeStyle = "#000000";
		this.currentLocation = null;
	}

	run () {
		this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
		this.draw();
		this.onKeyUp();
		this.btnErase.addEventListener('click', this.erase.bind(this));
		this.pickColor();
	}

	setCurrentPositionY (y) {
		this.currentLocation.y = y;
		return this.currentLocation.y;
	}
	setCurrentPositionX (x) {
		this.currentLocation.x = x;
		return this.currentLocation.x;
	}

	getLocation (event) {
		let square;
		let location;
		square = this.canvas.getBoundingClientRect();
		location = {
			x: event.clientX - square.left,
        	y: event.clientY - square.top
		}
		return location;
	}

	onMouseDown (event) {
		this.currentLocation = this.getLocation(event);
		console.log(this.currentLocation)
		this.context.beginPath();
		this.context.fillRect(this.currentLocation.x, this.currentLocation.y, 1, 1);
		this.context.closePath();
	}

	draw () {
		document.addEventListener('keypress', event => {
			let key = event.which;
			console.log(key)
			let newPos;
			if (this.currentLocation == null) {
				alert("Vous devez IMPERATIVEMENT déterminer un point de départ avant de commencer à déssiner");
			} 
			else {
				this.context.beginPath();
				this.context.moveTo(this.currentLocation.x, this.currentLocation.y);
				switch (key) {
					case 56: 
						console.log(this.currentLocation.y)
						if (this.currentLocation.y > 0) {
							this.btnUp.classList.add('draw');
							newPos = this.currentLocation.y - 1;
							this.context.lineTo(this.currentLocation.x, this.setCurrentPositionY(newPos));
						}	
						break;
					case 50: 
						console.log(this.currentLocation.y)
						if (this.currentLocation.y <= 400) {
							this.btnDown.classList.add('draw');
							newPos = this.currentLocation.y + 1;
							this.context.lineTo(this.currentLocation.x, this.setCurrentPositionY(newPos));
						}
						break;
					case 54:
						console.log(this.currentLocation.x)
						if (this.currentLocation.x < 600) {
							this.btnRight.classList.add('draw');
							newPos = this.currentLocation.x + 1;
							this.context.lineTo(this.setCurrentPositionX(newPos), this.currentLocation.y);
						}
						break;
					case 52:
						console.log(this.currentLocation.x)
						if (this.currentLocation.x > 0) {
							this.btnLeft.classList.add('draw');
							let newPos = this.currentLocation.x - 1;
							this.context.lineTo(this.setCurrentPositionX(newPos), this.currentLocation.y);
						}
						break;
				}
				this.context.closePath();
				this.context.strokeStyle = this.strokeStyle;
				this.context.stroke();

			}
			
		})
	}

	setColor (color) {
		this.strokeStyle = color;
	}

	erase () {
		let parent = document.querySelector('.border');
		let index = 0;
		let animate = setInterval( () => {
			index++;
			if (index === 5) {
				clearInterval(animate);
				parent.style.left = '0';
			}
			if (index % 2 == 0) {
				parent.style.left = '-5px';
			}
			else {
				parent.style.left = '5px';
			}
			console.log(index)
		}, 200);
    	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	pickColor () {
		colors
		for (let i = 0 ; i < this.colors.length ; i++) {
			this.colors[i].addEventListener('click', () => {
				let background = this.colors[i].style.backgroundColor;
				this.setColor(background);
			});
		}

	}

	onKeyUp () {
		document.addEventListener('keyup', event => {
			console.log('tetetetet')
			let key = event.which;

				console.log('match')
				let buttons = document.querySelectorAll('button');
				for (let i = 0 ; i < buttons.length ; i++) {
					buttons[i].classList.remove('draw');
				}

		});
	}
}
window.Game = function(canvas) {

	var canvas = canvas || document.getElementsByTagName('canvas')[0],
		context = canvas.getContext('2d'),
		ball = new window.objects.Ball(canvas, 10, -6, -6),
		paddleLeft = new window.objects.Paddle(0, 0),
		paddleRight = new window.objects.Paddle(0, 0),
		score = 0,
		gameLoop = undefined;

	this.startGame = function() {
		gameLoop = setInterval(this.draw, 10);
	}

	this.endGame = function() {
		clearInterval(gameLoop);
        context.fillText('The End!!!!',canvas.width/2,canvas.height/2);
	}

	this.draw = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		ball.draw(context);
		paddleLeft.draw(context);
		paddleRight.draw(context);
	}

	this.resizeCanvas = function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

        this.draw();
	}
};
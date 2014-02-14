window.Game = function(canvas) {

	var canvas = canvas || document.getElementsByTagName('canvas')[0],
		context = canvas.getContext('2d'),
		ball = new window.objects.Ball(10),
		paddleLeft = new window.objects.Paddle(0, 0),
		paddleRight = new window.objects.Paddle(0, 0),
		score = 0,
		gameLoop = undefined,
		that = this;

	this.startGame = function() {
		that.initBallSpeed();

		gameLoop = setInterval(that.draw, 10);
	}

	this.endGame = function() {
		clearInterval(gameLoop);
	}

	this.draw = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		that.moveBall();

		ball.draw(context);
		paddleLeft.draw(context);
		paddleRight.draw(context);
	}

	this.initBallSpeed = function() {
		ball.deltaX = -6;
		ball.deltaY = -6;
	}

	this.moveBall = function() {
		if (ball.positionY + ball.deltaY - ball.ballRadius < 0 || ball.positionY + ball.deltaY + ball.ballRadius > canvas.height){
            ball.deltaY = -ball.deltaY;
        }
     
        if ((ball.positionX + ball.deltaX - ball.ballRadius < 0) || (ball.positionX + ball.deltaX + ball.ballRadius > canvas.width)){  
            ball.deltaX = -ball.deltaX;
        }

        ball.move();
	}

	this.resizeCanvas = function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

        that.draw();
	}
};
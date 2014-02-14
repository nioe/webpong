window.Game = function(canvas) {

	var canvas = canvas || document.getElementsByTagName('canvas')[0],
		context = canvas.getContext('2d'),
		ball = new window.objects.Ball(10),
		paddleLeft = new window.objects.Paddle(),
		paddleRight = new window.objects.Paddle(),
		score = 0,
		gameLoop = undefined,
		that = this;

	this.startGame = function() {
		that.initGame();

		gameLoop = setInterval(that.draw, 10);
	}
    
    this.initGame = function() {
        that.initBallSpeed();
        paddleLeft.positionX = 0;
        paddleRight.positionY =100;
        paddleRight.positionX = canvas.width - paddleRight.width;
    }

	this.endGame = function() {
		clearInterval(gameLoop);
        console.log("Game Stopped");
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
     
        if ((ball.positionX + ball.deltaX - ball.ballRadius <= paddleLeft.positionX + paddleLeft.width) && 
            (ball.positionY + ball.deltaY >= paddleLeft.positionY && ball.positionY + ball.deltaY <= paddleLeft.positionY + paddleLeft.height) || 
            (ball.positionX + ball.deltaX + ball.ballRadius >= paddleRight.positionX) && 
            (ball.positionY + ball.deltaY >= paddleRight.positionY && ball.positionY + ball.deltaY <= paddleRight.positionY + paddleLeft.height)){
            ball.deltaX = -ball.deltaX;
        } else if((ball.positionX + ball.deltaX <= 0) || (ball.positionX + ball.deltaX >= canvas.width)) {
            this.endGame();
        }

        ball.move();
	}

	this.resizeCanvas = function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

        that.initGame();
	}
};
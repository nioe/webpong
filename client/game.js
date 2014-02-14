window.Game = function(canvas) {

	var canvas = canvas || document.getElementsByTagName('canvas')[0],
		context = canvas.getContext('2d'),
		ball = new window.objects.Ball(10),
		paddleLeft = new window.objects.Paddle(),
		paddleRight = new window.objects.Paddle(),
		score = 0,
		gameLoop = undefined,
		that = this
        paddleSpeed = 10,
        paddleMoving = { 
            leftUp: false,
            leftDown: false,
            rightUp: false,
            rightDown: false
        };

	this.startGame = function() {
		that.initGame();
        that.initEventListeners();
        
		gameLoop = setInterval(that.draw, 10);
	}
    
    this.initGame = function() {
        that.initBallSpeed();
        paddleLeft.positionX = 0;
        paddleRight.positionX = canvas.width - paddleRight.width;
    }
    
    this.initEventListeners = function() {
        document.addEventListener('keydown', that.handleKeyEvent);
        document.addEventListener('keyup', that.handleKeyEvent);
    }

	this.endGame = function() {
		clearInterval(gameLoop);
        console.log("Game Stopped");
	}

	this.draw = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		that.moveBall();

        if (paddleMoving.rightUp) that.movePaddle(paddleSpeed * -1, paddleRight);
        else if (paddleMoving.rightDown) that.movePaddle(paddleSpeed, paddleRight);
        
        if (paddleMoving.leftUp) that.movePaddle(paddleSpeed * -1, paddleLeft);
        else if (paddleMoving.leftDown) that.movePaddle(paddleSpeed, paddleLeft);
        
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
    
    this.movePaddle = function(step, paddle) {
        paddle.positionY = Math.max(Math.min(paddle.positionY + step, canvas.height - paddle.height), 0);
    }
    
    this.handleKeyEvent = function(event) {
        var keys = { 
                ARROWUP: 38,
                ARROWDOWN: 40,
                W: 87,
                S: 83
            };
        
        switch(event.keyCode) {
            case keys.ARROWUP:
                paddleMoving.rightUp = (event.type == 'keydown');
                break;
            case keys.ARROWDOWN:
                paddleMoving.rightDown = (event.type == 'keydown');
                break;
            case keys.W:
                paddleMoving.leftUp = (event.type == 'keydown');
                break;
            case keys.S:
                paddleMoving.leftDown = (event.type == 'keydown');
                break;
        }        
    }

	this.resizeCanvas = function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

        that.initGame();
	}
};
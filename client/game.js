window.Game = function(canvas) {

	var canvas = canvas || document.getElementsByTagName('canvas')[0],
		context = canvas.getContext('2d'),
		ball = new window.objects.Ball(context),
		paddleLeft = new window.objects.Paddle(context),
		paddleRight = new window.objects.Paddle(context),
		score = 0,
        isStopped = false,
		that = this,
        paddleSpeed = 10,
        paddleMoving = { 
            leftUp: false,
            leftDown: false,
            rightUp: false,
            rightDown: false
        };

	this.startGame = function() {
        isStopped = false;
        
		that.initGame();
        that.initEventListeners();
        
		window.requestAnimationFrame(that.draw);
        console.log("Game started");
	}
    
    this.initGame = function() {
        that.initBallSpeed();
        paddleLeft.positionX = 0;
        paddleRight.positionX = canvas.width - paddleRight.width;
    }
    
    this.initEventListeners = function() {
        if(that.isTouchDevice()) {
            document.addEventListener('touchstart', that.handleTouchEvent);
            document.addEventListener('touchmove', that.handleTouchEvent);
        } else {
            document.addEventListener('keydown', that.handleKeyEvent);
            document.addEventListener('keyup', that.handleKeyEvent);
        }
    }

	this.draw = function(timestamp) {
        context.clearRect(0, 0, canvas.width, canvas.height);

		that.moveBall();
        
        if (paddleMoving.rightUp) that.movePaddle(paddleSpeed * -1, paddleRight);
        else if (paddleMoving.rightDown) that.movePaddle(paddleSpeed, paddleRight);

        if (paddleMoving.leftUp) that.movePaddle(paddleSpeed * -1, paddleLeft);
        else if (paddleMoving.leftDown) that.movePaddle(paddleSpeed, paddleLeft);
        
		ball.draw();
		paddleLeft.draw();
		paddleRight.draw();
        
        if(!isStopped) {
            window.requestAnimationFrame(that.draw);
        } else {
            if(confirm("Play again?")) {
                that.startGame();
            }
        }
	}

	this.initBallSpeed = function() {
        ball.positionX = canvas.width/2;
        ball.positionY = canvas.height/2;
        
		ball.deltaX = -6;
		ball.deltaY = -6;
	}

	this.moveBall = function() {
        if((ball.positionX + ball.deltaX -ball.ballRadius <= 0) || (ball.positionX + ball.deltaX + ball.ballRadius >= canvas.width)) {
            isStopped = true;
        } else if (that.ballHitsPaddle()) {
            ball.deltaX = -ball.deltaX;
        }
        
        if (ball.positionY + ball.deltaY - ball.ballRadius < 0 || ball.positionY + ball.deltaY + ball.ballRadius > canvas.height){
            ball.deltaY = -ball.deltaY;
        }

        ball.move();
	}
    
    this.ballHitsPaddle = function() {
        return (
            (ball.positionX + ball.deltaX - ball.ballRadius <= paddleLeft.positionX + paddleLeft.width) && 
            (ball.positionY + ball.deltaY >= paddleLeft.positionY && ball.positionY + ball.deltaY <= paddleLeft.positionY + paddleLeft.height) ||
            (ball.positionX + ball.deltaX + ball.ballRadius >= paddleRight.positionX) && 
            (ball.positionY + ball.deltaY >= paddleRight.positionY && ball.positionY + ball.deltaY <= paddleRight.positionY + paddleLeft.height)
        );
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
    
    this.handleTouchEvent = function(event) {
        var paddle = undefined;
        
        event.preventDefault(); // Prevent Scrolling
        
        if(event.targetTouches.length > 0) {
            for(var i = 0; i < event.targetTouches.length; i++) {
                if(event.targetTouches[i].pageX < canvas.width/2) {
                    paddle = paddleLeft;   
                } else {
                    paddle = paddleRight;
                }

                switch(event.type) {
                    case 'touchstart':
                        paddle.touchY = event.targetTouches[i].pageY;
                        break;
                    case 'touchmove':
                        that.movePaddle(event.targetTouches[i].pageY - paddle.touchY, paddle);
                        paddle.touchY = event.targetTouches[i].pageY;
                        break;
                }
            }
        }
    }

	this.resizeCanvas = function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
        
        if(isStopped) {
            that.startGame();
        } else {
            that.initGame();
        }
	}
    
    this.isTouchDevice = function() {
        return 'ontouchstart' in window || 'onmsgesturechange' in window; // IE 10 fix
    }

};
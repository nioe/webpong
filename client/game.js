window.Game = function (canvas) {
    "use strict";

    var context = canvas.getContext('2d'),
        ball = new window.objects.Ball(context),
        paddleLeft = new window.objects.Paddle(context),
        paddleRight = new window.objects.Paddle(context),
        fps = 0,
        fpsAvg = undefined,
        fpsAvgAcc = 0,
        fpsAvgCount = 0,
        lastFrameTimestamp = undefined,
        deltaTime = 0,
        speed = 400,
        speedPerFrame = 0,
        isStopped = false,
        paddleSpeed = 10,
        paddleMoving = {
            leftUp: false,
            leftDown: false,
            rightUp: false,
            rightDown: false
        },
        that = this;

    this.startGame = function () {
        isStopped = false;

        this.initGame();
        this.initEventListeners();

        window.requestAnimationFrame(this.draw);
    };

    this.initGame = function () {
        this.initBall();
        paddleLeft.positionX = 0;
        paddleRight.positionX = canvas.width - paddleRight.width;

        paddleMoving.leftUp = false;
        paddleMoving.leftDown = false;
        paddleMoving.rightUp = false;
        paddleMoving.rightDown = false;
    };

    this.initEventListeners = function () {
        if (this.isTouchDevice()) {
            document.addEventListener('touchstart', this.handleTouchEvent);
            document.addEventListener('touchmove', this.handleTouchEvent);
        } else {
            document.addEventListener('keydown', this.handleKeyEvent);
            document.addEventListener('keyup', this.handleKeyEvent);
        }
    };

    this.draw = function (timestamp) {
        deltaTime = lastFrameTimestamp ? ((timestamp - lastFrameTimestamp)/1000.0) : 0.016;
        lastFrameTimestamp = timestamp;

        speedPerFrame = fpsAvg ? speed * (1/fpsAvg) : speed * 0.016;

        context.clearRect(0, 0, canvas.width, canvas.height);

        that.moveBall(speedPerFrame);

        if (paddleMoving.rightUp) {
            paddleRight.direction = -1;
            paddleRight.move(speedPerFrame);
        } else if (paddleMoving.rightDown) {
            paddleRight.direction = 1;
            paddleRight.move(speedPerFrame);
        }

        if (paddleMoving.leftUp) {
            paddleLeft.direction = -1;
            paddleLeft.move(speedPerFrame);
        } else if (paddleMoving.leftDown) {
            paddleLeft.direction = 1;
            paddleLeft.move(speedPerFrame);
        }

        ball.draw();
        paddleLeft.draw();
        paddleRight.draw();

        if (!isStopped) {
            window.requestAnimationFrame(that.draw);
        } else {
            if (confirm("Play again?")) {
                that.startGame();
            }
        }

        that.updateFPS();
    };

    this.updateFPS = function () {
        fps = 1 / deltaTime;
        fpsAvgAcc += fps;
        fpsAvgCount++;

        if(fpsAvgCount >= 10) {
            fpsAvg = Math.round(fpsAvgAcc / fpsAvgCount);
            fpsAvgCount = 1;
            fpsAvgAcc = fps;
        }
    };

    this.initBall = function () {
        ball.positionX = canvas.width / 2;
        ball.positionY = canvas.height / 2;

        ball.directionX = -1;
        ball.directionY = -1;
    };

    this.moveBall = function (speed) {
        if ((ball.positionX + speed - ball.ballRadius <= 0) || (ball.positionX + speed + ball.ballRadius >= canvas.width)) {
            isStopped = true;
        } else if (this.ballHitsPaddle(speed)) {
            ball.directionX = -ball.directionX;
        }

        if (ball.positionY + speed - ball.ballRadius < 0 || ball.positionY + speed + ball.ballRadius > canvas.height) {
            ball.directionY = -ball.directionY;
        }

        ball.move(speed);
    };

    this.ballHitsPaddle = function (speed) {
        return (
            ((ball.positionX - speed - ball.ballRadius <= paddleLeft.positionX + paddleLeft.width) &&
                (ball.positionY - speed >= paddleLeft.positionY && ball.positionY + speed <= paddleLeft.positionY + paddleLeft.height)) ||
            ((ball.positionX + speed + ball.ballRadius >= paddleRight.positionX) &&
                (ball.positionY - speed >= paddleRight.positionY && ball.positionY + speed <= paddleRight.positionY + paddleLeft.height))
        );
    };

    this.handleKeyEvent = function (event) {
        var keys = {
            ARROWUP: 38,
            ARROWDOWN: 40,
            W: 87,
            S: 83
        };

        switch (event.keyCode) {
        case keys.ARROWUP:
            paddleMoving.rightUp = (event.type === 'keydown');
            break;
        case keys.ARROWDOWN:
            paddleMoving.rightDown = (event.type === 'keydown');
            break;
        case keys.W:
            paddleMoving.leftUp = (event.type === 'keydown');
            break;
        case keys.S:
            paddleMoving.leftDown = (event.type === 'keydown');
            break;
        }
    };

    this.handleTouchEvent = function (event) {
        var paddle = paddleLeft,
            i = 0;

        event.preventDefault(); // Prevent Scrolling

        if (event.targetTouches.length > 0) {
            for (i; i < event.targetTouches.length; i++) {
                if (event.targetTouches[i].pageX > canvas.width / 2) {
                    paddle = paddleRight;
                }

                switch (event.type) {
                case 'touchstart':
                    paddle.direction = 1;
                    paddle.touchY = event.targetTouches[i].pageY;
                    break;
                case 'touchmove':
                    paddle.move(event.targetTouches[i].pageY - paddle.touchY);
                    paddle.touchY = event.targetTouches[i].pageY;
                    break;
                }
            }
        }
    };

    this.resizeCanvas = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        paddleLeft.max = canvas.height;
        paddleRight.max = canvas.height;

        if (isStopped) {
            this.startGame();
        } else {
            this.initGame();
        }
    };

    this.isTouchDevice = function () {
        return 'ontouchstart' in window || 'onmsgesturechange' in window; // IE 10 fix
    };

};

window.objects = window.objects || {};

window.objects.Ball = function (context) {
    'use strict';

    this.positionX = 0;
    this.positionY = 0;
    this.ballRadius = 10;
    this.directionX = 1;
    this.directionY = 1;

    this.draw = function () {
        context.beginPath();
        context.arc(this.positionX, this.positionY, this.ballRadius, 0, Math.PI * 2, true);
        context.closePath();

        context.fill();
    };

    this.move = function (speed) {
        this.positionX += speed * this.directionX;
        this.positionY += speed * this.directionY;
    };
};

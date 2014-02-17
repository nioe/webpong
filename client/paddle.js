window.objects = window.objects || {};

window.objects.Paddle = function (context) {
    'use strict';

    this.positionX = 0;
    this.positionY = 0;
    this.width = 15;
    this.height = 100;
    this.max = 0;
    this.touchY = 0;
    this.direction = -1;

    this.draw = function () {
        context.fillRect(this.positionX, this.positionY, this.width, this.height);
    };

    this.move = function(speed) {
        this.positionY = Math.max(Math.min(this.positionY + speed * this.direction, this.max - this.height), 0);
    }
};

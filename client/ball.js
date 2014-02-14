window.objects = window.objects || {};

window.objects.Ball = function(ballRadius) {
	var canvas = canvas || document.getElementsByTagName('canvas')[0];

	this.positionX = canvas.width/2;
	this.positionY = canvas.height/2;
	this.ballRadius = ballRadius || 10;
	this.deltaX = 0;
	this.deltaY = 0;

	this.draw = function (context) {
		context.beginPath();
        context.arc(this.positionX, this.positionY, this.ballRadius, 0, Math.PI*2, true);
        context.closePath();

        context.fill();   
	}

	this.move = function() {
		this.positionX += this.deltaX;
		this.positionY += this.deltaY;
	}
}
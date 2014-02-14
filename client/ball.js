window.objects = window.objects || {};

window.objects.Ball = function(context) {
	this.positionX = 0;
	this.positionY = 0;
	this.ballRadius = 10;
	this.deltaX = 0;
	this.deltaY = 0;

	this.draw = function () {
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
window.objects = window.objects || {};

window.objects.Paddle = function(context) {
	this.positionX = 0;
    this.positionY = 0;
    this.width = 15;
    this.height = 100;
    this.touchY = 0;

	this.draw = function () {
		context.fillRect(this.positionX, this.positionY, this.width, this.height);
	}
}
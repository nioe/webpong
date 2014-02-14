window.objects = window.objects || {};

window.objects.Paddle = function(positionX, positionY) {
	this.positionX = positionX || 0;
    this.positionY = positionY || 0;
    this.width = 15;
    this.height = 100;

	this.draw = function (context) {
		context.fillRect(this.positionX, this.positionY, this.width, this.height);
	}
}
window.objects = window.objects || {};

window.objects.Paddle = function(positionX, positionY) {
	var positionX = positionX || 0,
		positionY = positionY || 0,
		width = 15,
		height = 100;

	this.draw = function (context) {
		context.fillRect(positionX, positionY, width, height);
	}

	this.move = function (deltaY) {
		// TODO implement moving
	}
}
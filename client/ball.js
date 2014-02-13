window.objects = window.objects || {};

window.objects.Ball = function(canvas, ballRadius, deltaX, deltaY) {
	var canvas = canvas || document.getElementsByTagName('canvas')[0],
		positionX = canvas.width/2,
		positionY = canvas.height/2,
		deltaX = deltaX || 0,
		deltaY = deltaY || 0,
		ballRadius = ballRadius || 10;

	this.draw = function (context) {
		this.move();

		context.beginPath();
        context.arc(positionX, positionY, ballRadius, 0, Math.PI*2, true);
        context.closePath();

        context.fill();   
	}

	this.move = function () {
        if (positionY + deltaY - ballRadius < 0 || positionY + deltaY + ballRadius > canvas.height){
            deltaY = -deltaY;
        }
     
        if ((positionX + deltaX - ballRadius < 0) || (positionX + deltaX + ballRadius > canvas.width)){  
            deltaX = -deltaX;
        }
     
        positionX += deltaX;
        positionY += deltaY;
	}
}
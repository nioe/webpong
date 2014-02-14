if (Meteor.isClient) {
    Meteor.startup(function() {
        document.body.insertAdjacentHTML('beforeend', Template.client());

        var canvas = document.getElementById("canvasMain"),
            game = new Game(canvas);
        
        window.addEventListener('resize', game.resizeCanvas, false);
        
        game.resizeCanvas();
        game.startGame();
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {

    });
}

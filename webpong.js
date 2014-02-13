if (Meteor.isClient) {
    Meteor.startup(function() {
        document.body.insertAdjacentHTML('beforeend', Template.client());

        var canvas = document.getElementById("canvasMain"),
            game = new Game(canvas);

        

        function isTouchDevice() {
            return 'ontouchstart' in window || 'onmsgesturechange' in window; // IE 10 fix
        }

        game.resizeCanvas();
        game.startGame();

        window.addEventListener('resize', game.resizeCanvas, false);
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {

    });
}

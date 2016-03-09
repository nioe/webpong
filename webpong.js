(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById("canvasMain"),
        game = new Game(canvas);

    window.addEventListener('resize', game.resizeCanvas, false);

    game.resizeCanvas();
    game.startGame();
  });
})();

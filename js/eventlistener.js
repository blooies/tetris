// EVENT LISTENER
var EventListener = function(tetris) {
    this.tetris = tetris;
    this.interval = Config.interval;
    this.initializeListener();
}

EventListener.prototype.initializeListener = function() {
    window.addEventListener('keydown', this.listenForKeyPresses.bind(this));
}

EventListener.prototype.startTimer = function() {
    timer = setInterval(this.trigger.bind(this), this.interval);
}

EventListener.prototype.trigger = function() {
    // var piece = this.tetris.fallingPiece;
    this.tetris.movePiece('down');
}

EventListener.prototype.listenForKeyPresses = function(event) {
    // var piece = this.tetris.fallingPiece;

    if (!this.tetris.gameOver) {
        switch (event.keyCode) {
            case 37: //left
                this.tetris.movePiece('left');
                break;
            case 39: //right
                this.tetris.movePiece('right');
                break;
            case 40: //down
                this.tetris.movePiece('down');
                break;
            case 32: //space to rotate
                this.tetris.movePiece('rotate');
                break;
            case 13: //enter for pause
                if (this.paused) {
                    this.startTimer();
                    this.paused = false;
                } else {
                    clearInterval(timer);
                    this.paused = true;
                }
                break;
        }
    }
}
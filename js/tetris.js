// 1: grid and random generated pieces that move down w. preview of next piece
// 2: can rotate pieces and move them in different directions - cant move them when hitting grid border or on top of another piece
// 3: when row has been filled
// 4: points


//before this, i apparently do not know how to play tetris.


// TETRIS
var Tetris = function() {
    this.fallingPiece = null;
    this.pieces = [];
    this.grid = new Grid();
    this.eventListener = new EventListener(this);
    this.gameOver = false;
}

Tetris.prototype = {
    shapes: Config.shapes,
    colors: Config.colors
}

Tetris.prototype.startGame = function() {
    this.grid.buildCells();
    var shapeOrientations = this.generateRandomShape();
    this.generateRandomPiece(shapeOrientations);
    this.eventListener.startTimer();
}

Tetris.prototype.generateRandomShape = function() {
    var randomNum = this.getRandomNumber(this.shapes.length);
    var randomShape = this.shapes[randomNum];
    return randomShape;
}

Tetris.prototype.getRandomNumber = function(notIncluding) {
    return Math.floor(Math.random() * notIncluding);
}

Tetris.prototype.generateRandomPiece = function(shapeOrientations) {
    var randomOrientation = this.getRandomNumber(shapeOrientations.length);
    var piece = new Piece(shapeOrientations, randomOrientation, this.grid);
    this.fallingPiece = piece;
    this.pieces.push(piece);
    this.assignCellsToPiece(piece);
    var color = this.getRandomColor();
    piece.colorInCells(color);
}

Tetris.prototype.assignCellsToPiece = function(piece) {
    var coords = piece.currentCoordinates;
    for (var i = 0; i < coords.length; i++) {
        var cell = this.grid.getCell(coords[i]);
        piece.cells.unshift(cell);
    }
}

Tetris.prototype.getRandomColor = function() {
    var randomNum = this.getRandomNumber(this.colors.length);
    var randomColor = this.colors[randomNum];
    return randomColor;
}


// this is the function that changes the cells in the piece based on the new direction
Tetris.prototype.movePieceInDirection = function(piece, direction) {
    this.setAllowedMoves(piece, direction);
    if (piece.allowedMoves[direction]) {
        this.emptyCells(piece);
        if (direction == 'rotate') {
            piece.getRotationCoordinates();
        } else {
            piece.getCoordinates(direction);
        }
        this.markNewCells(piece);
    }
}

Tetris.prototype.movePiecesInDirection = function(direction) {
    for (var i=0; i<this.pieces.length; i++) {
        this.movePieceInDirection(this.pieces[i], direction);
    }
}

Tetris.prototype.checkIfPieceReachedTop = function(piece) {
    var cells = piece.cells;
    for (var i=0; i<cells.length; i++) {
        var cell = cells[i];
        if (cell.y <= 0) {
            console.log("REACHED TOP OF BOARD MARKING TRUE!")
            document.getElementById('message').innerHTML = 'GAME OVER';
            piece.reachedTopOfBoard = true;
            return true;
        } 
    }

    return false;
}


Tetris.prototype.setAllowedMoves = function(piece, direction) {
    piece.resetMoves();
    console.log(piece)
    for (var i=0; i<piece.currentCoordinates.length; i++) {
        var currentCoordinate = piece.currentCoordinates[i];
        var originalX = currentCoordinate[0];
        var originalY = currentCoordinate[1];
        var xLeft = originalX - 1;
        var xRight = originalX + 1;
        var yDown = originalY + 1;
        var xLeftCell = this.grid.getCell([xLeft, originalY]);
        var xRightCell = this.grid.getCell([xRight, originalY]);
        var yDownCell = this.grid.getCell([originalX, yDown]);

        if (direction == 'down') {
            console.log(yDown, yDownCell)
            if (yDown >= Config.size.height || yDownCell.marked) {
                piece.allowedMoves.down = false;
                piece.allowedMoves.left = false;
                piece.allowedMoves.right = false;
                console.log('setting piece.fallen as TRUE')
                piece.fallen = true;
                if (this.checkIfPieceReachedTop(piece)) {
                    console.log("DONEE")
                    this.gameOver = true;
                    piece.reachedTopOfBoard = true;
                    clearInterval(timer);
                }
            }
        }

        if (direction == 'left') {
            if (xLeft < 0 || xLeftCell.marked) {
                piece.allowedMoves.left = false;
            }
        }

        if (direction == 'right') {
            if (xRight >= Config.size.width || xRightCell.marked) {
                piece.allowedMoves.right = false;
            }
        }

    }
}

// ****MARK PIECE AS FILLED IS CAUSING BUG
Tetris.prototype.unMarkAllCells = function() {
    for (var i=0; i<this.pieces.length; i++) {
        for (var j=0; j<this.pieces[i].cells.length; j++) {
            var cell = this.pieces[i].cells[j];
            cell.unMark();
        }
    }
}

Tetris.prototype.emptyCells = function(piece) {
    var cells = piece.cells;
    for (var i = 0; i < cells.length; i++) {
        cells[i].unMark(piece);
    }
}

Tetris.prototype.markNewCells = function(piece) {
    var self = this;
    var cells = [];
    piece.currentCoordinates.forEach(function(coord) {
        var cell = self.grid.getCell(coord);
        cells.push(cell);
    })
    piece.updateCells(cells);
}


Tetris.prototype.dropNewPiece = function() {
    var shape = this.generateRandomShape();
    this.generateRandomPiece(shape);
}

Tetris.prototype.movePiece = function(piece, direction) {
    if (piece.fallen) {
        this.markCellsAsFilled(piece);
        this.fallingPiece = null;
        var filledRows = this.grid.checkForFilledRows();
        if (filledRows.length > 0) {
            this.grid.emptyRows(filledRows);
        }
        this.dropNewPiece();
    } else if (piece.reachedTopOfBoard) {
        console.log("DONEEEE")
        clearInterval(timer);
    } else {
        this.movePieceInDirection(piece, direction);
    }
}

Tetris.prototype.markCellsAsFilled = function(piece) {
    for (var i=0; i<piece.cells.length; i++) {
        var cell = piece.cells[i];
        this.grid.markCells(cell);
        cell.updateWithPiece(piece);
    }
}

Tetris.prototype.markCellsAsUnFilled = function(piece) {
    for (var i=0; i<piece.cells.length; i++) {
        var cell = piece.cells[i];
        this.grid.unMarkCells(cell);
        cell.updateWithPiece(piece);
    }
}
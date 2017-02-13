// 1: grid and random generated pieces that move down w. preview of next piece
// 2: can rotate pieces and move them in different directions - cant move them when hitting grid border or on top of another piece
// 3: when row has been filled
// 4: points
// other feats: preview of next piece, hard drop, preview of piece on bottom

//before this, i apparently do not know how to play tetris.


// TETRIS
var Tetris = function() {
    this.fallingPiece = null;
    this.grid = new Grid();
    this.eventListener = new EventListener(this);
    this.gameOver = false;
    this.score = 0;
    this.pieces = [];
}

Tetris.prototype = {
    shapes: Config.shapes,
    colors: Config.colors
}


//start game and generate random shape and random orientation;
Tetris.prototype.startGame = function() {
    this.grid.buildCells();
    this.grid.buildPreview();
    var piece = this.generateRandomPiece();
    this.showPiece(piece);
    this.showPreviewPiece();
    this.eventListener.startTimer();
}

Tetris.prototype.showPreviewPiece = function() {
    var piece = this.generateRandomPiece();
    this.pieces.push(piece);
    piece.reassignCells({
        cells: 'previewCells'
    });
    piece.colorInCells();
}

Tetris.prototype.clearPreview = function() {
    var cells = this.grid.previewCells;
    for (columnIndex in cells) {
        var column = cells[columnIndex];
        for (cellIndex in column) {
             var cell = column[cellIndex];
             cell.unMark();
        }
    }
}

Tetris.prototype.generateRandomShape = function() {
    var randomNum = this.getRandomNumber(this.shapes.length);
    var randomShape = this.shapes[randomNum];
    return randomShape;
}

Tetris.prototype.getRandomNumber = function(notIncluding) {
    return Math.floor(Math.random() * notIncluding);
}

Tetris.prototype.generateRandomPiece = function() {
    var shapeOrientations = this.generateRandomShape();
    var randomOrientation = this.getRandomNumber(shapeOrientations.length);
    var piece = new Piece(shapeOrientations, randomOrientation, this.grid);
    var color = this.getRandomColor();
    piece.color = color;
    return piece;
}

Tetris.prototype.showPiece = function(piece) {
    this.fallingPiece = piece;
    piece.reassignCells({cells: 'cells'});
    piece.colorInCells();
    this.showShadow(piece);
}

Tetris.prototype.assignCellsToPiece = function(piece) {
    var coords = piece.currentCoordinates;
    for (var i = 0; i < coords.length; i++) {
        var cell = this.grid.getCell({
            coordinates: coords[i],
            cells: 'cells'
        });
        piece.cells.unshift(cell);
    }
}

Tetris.prototype.getRandomColor = function() {
    var randomNum = this.getRandomNumber(this.colors.length);
    var randomColor = this.colors[randomNum];
    return randomColor;
}

// changes the cells in the piece based on the new direction
Tetris.prototype.movePieceInDirection = function(piece, direction) {
    this.setAllowedMoves(piece, direction);
    if (piece.allowedMoves[direction]) {
        piece.obliviateCells();
        if (direction == 'rotate') {
            piece.getRotationCoordinates();
        } else {
            piece.getCoordinates(direction);
        }
        piece.growCells();
    }
}

Tetris.prototype.checkIfPieceIsOnTopOfBoard = function(piece) {
    var cells = piece.cells;
    for (var i=0; i<cells.length; i++) {
        var cell = cells[i];
        if (cell.y < 1) {
            document.getElementById('message').innerHTML = '<p>GAME OVER</p>';
            piece.reachedTopOfBoard = true;
            return true;
        } 
    }
    return false;
}

Tetris.prototype.setAllowedMoves = function(piece, direction) {
    piece.resetMoves();

    for (var i=0; i<piece.currentCoordinates.length; i++) {
        var currentCoordinate = piece.currentCoordinates[i];
        var originalX = currentCoordinate[0];
        var originalY = currentCoordinate[1];
        var xLeft = originalX - 1;
        var xRight = originalX + 1;
        var yDown = originalY + 1;
        var xLeftCell = this.grid.getCell({
            coordinates: [xLeft, originalY],
            cells: 'cells'
        });
        var xRightCell = this.grid.getCell({
            coordinates: [xRight, originalY],
            cells: 'cells'
        });
        var yDownCell = this.grid.getCell({
            coordinates: [originalX, yDown],
            cells: 'cells'
        });

        if (direction == 'down') {
            //reached bottom of board || reached top of another piece
            if (yDown >= Config.size.height || yDownCell.marked) {
                console.log("setting down as false for piece", piece)
                piece.allowedMoves.down = false;
                piece.allowedMoves.left = false;
                piece.allowedMoves.right = false;
                piece.fallen = true;

                //game over
                if (this.checkIfPieceIsOnTopOfBoard(piece)) {
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

Tetris.prototype.updateScore = function() {
    document.getElementById('score').innerHTML = this.score;
}

Tetris.prototype.removeOpacity = function(piece) {
    for (var i=0; i<piece.cells.length; i++) {
        piece.cells[i].el.classList.remove('highlight');
    }
}

Tetris.prototype.movePiece = function(piece, direction) {
    if (!piece) {
        piece = this.fallingPiece;
    }
    
    if (piece) {
        if (piece.fallen) {
            this.removeOpacity(piece);
            this.markCellsAsFilled(piece);
            this.fallingPiece = null;
            var filledRows = this.grid.getFilledRows();
            var doUpdate = updateGrid.bind(this);
            doUpdate(filledRows);
        } else if (piece.reachedTopOfBoard) {
            clearInterval(timer);
        } else {
            this.movePieceInDirection(piece, direction);
            this.hidePreviousShadow(piece);
            this.showShadow(piece);
        }
    }

    function updateGrid(filledRows) {
        var self = this;
        if (filledRows.length > 0) {
            this.score += filledRows.length * 5;
            this.updateScore();
            this.grid.emptyFilledRows(filledRows).then(function() {
                setTimeout(function() {
                    self.grid.moveAllCellsDown(filledRows).then(function() {
                        setTimeout(function() {
                            rows = self.grid.getFilledRows();
                            return updateGrid.call(self, rows);
                        }, 500);
                    })
                }, 1000)
            });
        } else {
            var newPiece = self.pieces.shift();
            newPiece.cells = [];
            self.showPiece(newPiece);
            self.clearPreview();
            self.showPreviewPiece();
        }
    }
}

// iterate through current cells;
// can go down? go down
// can go down? go down
// until cannot go down
// then highlight those cells;
Tetris.prototype.canShadowMoveDown= function(coords) {
    for (var i=0; i<coords.length; i++) {
        var currentCoordinate = coords[i];
        var originalX = currentCoordinate[0];
        var originalY = currentCoordinate[1];
        var xLeft = originalX - 1;
        var xRight = originalX + 1;
        var yDown = originalY + 1;
        var xLeftCell = this.grid.getCell({
            coordinates: [xLeft, originalY],
            cells: 'cells'
        });
        var xRightCell = this.grid.getCell({
            coordinates: [xRight, originalY],
            cells: 'cells'
        });
        var yDownCell = this.grid.getCell({
            coordinates: [originalX, yDown],
            cells: 'cells'
        });

        if (yDown >= Config.size.height || yDownCell.marked) {
            return false;
        }
    }

    return true;
}

Tetris.prototype.hidePreviousShadow = function(piece) {
    var color = piece ? piece.color : '';
    for (var i=0; i<piece.shadowCoords.length; i++) {
        var coord = piece.shadowCoords[i];
        var cell = this.grid.getCell({
            coordinates: coord,
            cells: 'cells'
        });
        cell.removeHighlight(color);
    }
}

Tetris.prototype.showShadow = function(piece) {
    if (!piece) piece = this.fallingPiece;
    if (piece) {
        var coords = piece.currentCoordinates;
        var canShadowMoveDown = this.canShadowMoveDown(coords);
        var shiftedCoords = [];

        while (canShadowMoveDown) {
            shiftedCoords = [];
            for (var i=0; i<coords.length; i++) {
                var x = coords[i][0];
                var y = coords[i][1];
                shiftedCoords.push([x, y + 1]);
            }
            canShadowMoveDown = this.canShadowMoveDown(shiftedCoords);
            coords = shiftedCoords;
        }
        for (var j=0; j<coords.length; j++) {
            var cell = this.grid.getCell({
                coordinates: coords[j],
                cells: 'cells'
            })

            cell.highlight(piece.color);
        }

        piece.shadowCoords = coords;
    }
}

Tetris.prototype.markCellsAsFilled = function(piece) {
    for (var i=0; i<piece.cells.length; i++) {
        var cell = piece.cells[i];
        cell.mark();
    }
}
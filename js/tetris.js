// 1: grid and random generated pieces that move down w. preview of next piece
// 2: can rotate pieces and move them in different directions - cant move them when hitting grid border or on top of another piece
// 3: when row has been filled
// 4: points


// TETRIS
var Tetris = function() {
    this.fallingPiece = null;
    this.grid = new Grid();
    this.eventListener = new EventListener(this);
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
    var piece = new Piece(shapeOrientations, randomOrientation);
    this.fallingPiece = piece;
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
Tetris.prototype.changeCoordinates = function(piece, direction) {
    switch (direction) {
        case 'rotate':
            piece.rotate();
            break;
        default:
            break;
    }
}

// Tetris.prototype.changeCoordinates = function(cells, piece, direction) {
//     console.log(cells, piece, direction)
//     var boundaries = {
//         x: Config.size.width - 1,
//         y: Config.size.height - 1
//     }

//     var coords = piece.currentCoordinates;
//     this.grid.setAllowedMoves(piece, direction);
//     if (piece.allowedMoves[direction]) {
//         if (direction == 'rotate') {
//             piece.rotate();
//             var cells = [];
//             piece.currentCoordinates.forEach(function(coord) {
//                 var cell = this.grid.getCell(coord);
//                 cells.push(cell);
//             })
//             piece.cells = cells;
//         } else {
//             for (var i = 0; i < coords.length; i++) {
//                 var x = coords[i][0],
//                     y = coords[i][1];

//                 switch (direction) {
//                     case 'down':
//                         y = y + 1;
//                         break;
//                     case 'left':
//                         x = x - 1;
//                         break;
//                     case 'right':
//                         x = x + 1;
//                         break;
//                 }

//                 coords[i] = [x, y];
//                 cells[i] = this.grid.getCell(coords[i]);
//             }
//         }
//     }
// }

Tetris.prototype.dropNewPiece = function() {
    var shape = this.generateRandomShape();
    this.generateRandomPiece(shape);
}

// this is the function that gets triggered by the EventListener for each interval
Tetris.prototype.movePiece = function(piece, direction) {
    console.log('inside move piece', piece)
    if (piece.fallen) {
        console.log('piece is fallen, so we are dropping new piece')
        this.markCellsAsFilled(piece);
        this.fallingPiece = null;
        this.dropNewPiece();
    } else {
        var cells = piece.cells;
        for (var i = 0; i < cells.length; i++) {
            // cells[i].unMark();
        }

        this.changeCoordinates(piece, direction);
        // console.log("ROTATINGGG>..", cells, piece, direction)
        // this.changeCoordinates(cells, piece, direction);
        // piece.colorInCells();
    }
}

Tetris.prototype.markCellsAsFilled = function(piece) {
    for (var i=0; i<piece.cells.length; i++) {
        var cell = piece.cells[i];
        this.grid.markCells(cell);
    }
}

// Tetris.prototype.setAllowedMoves = function(piece) {
//     var self = this;
//     piece.resetMoves();
//     piece.currentCoordinates.forEach(function(coordinate) {
//         var x = coordinate[0];
//         var y = coordinate[1];
//         var xLeftCoordinate = x - 1;
//         var xRightCoordinate = x + 1;
//         var yDownCoordinate = y + 1;
//         // var xLeftCell = self.grid.assignCells([xLeftCoordinate, y]);
//         // var xRightCell = self.grid.assignCells([xRightCoordinate, y]);
//         // var yDownCell = self.grid.assignCells([x, yDownCoordinate]);
//         // console.log(xLeftCell, xRightCell, yDownCell)

//         if (xLeftCoordinate < 0) {
//             piece.allowedMoves.left = false;
//             console.log("SETTING LEFT FALSE")
//         }

//         if (xRightCoordinate >= Config.size.width) {
//             piece.allowedMoves.right = false;
//             console.log("SETTING RIGHT FALSE")
//         }

//         if (yDownCoordinate >= Config.size.height) {
//             piece.allowedMoves.down = false;
//             piece.allowedMoves.right = false;
//             piece.allowedMoves.left = false;
//             piece.fallen = true;
//         }
//     })
// }
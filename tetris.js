// 1: grid and random generated pieces that move down w. preview of next piece
// 2: can rotate pieces and move them in different directions - cant move them when hitting grid border or on top of another piece
// 3: when row has been filled
// 4: points

//Grid, Cell, Piece, 
// Cell knows what piece is on it
// Piece knows what cells it is occupying
// Grid holds cells

// CONFIG
Config = {
    gridName: 'grid',
    size: {
        width: 10, //10 cells across
        height: 20 //20 cells down
    },
    cellDefaultColor: '#fff',
    colors: [
        'color1', 'color2', 'color3', 'color4', 'color5'
    ],
    shapes:[
        //shape I
        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . # . . . .
        //2 . . . . # . . . .
        //3 . . . . # . . . .
        //4 . . . . # . . . .
        shapeOne = [
            [5, 1],
            [5, 2],
            [5, 3],
            [5, 4]
        ]
    ],
    interval: 1000
}

// TETRIS
var Tetris = function() {
    this.fallingPiece = null;
    this.grid = new Grid();
    this.eventListener = new EventListener();
    this.startGame();
}

Tetris.prototype = {
    shapes: Config.shapes,
    colors: Config.colors
}

Tetris.prototype.startGame = function() {
    this.grid.buildCells();
    var shape = this.generateRandomShape();
    var piece = this.generateRandomPiece(shape);
    this.dropPieces();
}

Tetris.prototype.generateRandomShape = function() {
    var randomNum = this.generateRandomNumber(this.shapes.length);
    var randomShape = this.shapes[randomNum];
    return randomShape;
}

Tetris.prototype.generateRandomNumber = function(notIncluding) {
    return Math.floor(Math.random() * notIncluding);
}

Tetris.prototype.generateRandomPiece = function(shape) {
    var piece = new Piece(shape);
    this.fallingPiece = piece;
    this.getCellsForPiece(piece);
    var color = this.getRandomColor();
    piece.colorInCells(color);
}

Tetris.prototype.getCellsForPiece = function(piece) {
    this.grid.assignCellsToPiece(piece);
}

Tetris.prototype.getRandomColor = function() {
    var randomNum = this.generateRandomNumber(this.colors.length);
    var randomColor = this.colors[randomNum];
    return randomColor;
}


Tetris.prototype.movePiece = function(piece, direction) {
    var cells = piece.cells;
    console.log('move piece')
    console.log(piece)
    for (var i=0; i<cells.length; i++) {
        var currentCoordinates = cells[i].coordinates;
        var newCoords = this.getNewCoordinates(currentCoordinates, direction);
        var newCell = this.grid.findCells(newCoords);
        //replace the piece with the new cells;
        cells[i].unMarkColor();
        console.log(cells[i])
        // cells[i] = newCell;
        console.log(newCell)
    }
}

Tetris.prototype.dropPieces = function() {
    var self = this;
    f = setInterval(function() {
        self.movePiece(self.fallingPiece, 'down');
    }, 1000)

    setTimeout(function() {
        console.log("CLEAR INTERVAL")
        clearInterval(f);
    }, 5000)
}

Tetris.prototype.getNewCoordinates = function(coords, direction) {
    var x = coords[0];
    var y = coords[1];

    switch (direction) {
        case 'down':
            y = y + 1;
            break;
        case 'left':
        case 'right':
    }

    return [x, y];
}


// GRID
var Grid = function() {
    this.width = Config.size.width;
    this.height = Config.size.height;
    this.gridName = Config.gridName;
    this.el = document.getElementById(this.gridName);
    this.cells = {};
}

Grid.prototype.buildCells = function() {
    for (var i=0; i<this.height; i++) {
        var y = i;
        for (var j=0; j<this.width; j++) {
            var x = j;
            var cell = new Cell(x, y);
            this.appendCell(cell);
            if (!this.cells[x]) {
                this.cells[x] = {};
            }
            this.cells[x][y] = cell;
        }
    }
}

Grid.prototype.appendCell = function(cell) {
    this.el.appendChild(cell.el);
}

Grid.prototype.assignCellsToPiece = function(piece) {
    var cells = [];
    var shape = piece.shape;
    for (var i=0; i<shape.length; i++) {
        var x = shape[i][0];
        var y = shape[i][1];
        var cell = this.cells[x][y];
        cells.push(cell);
    }
    piece.cells = cells;
    console.log(piece);
}

Grid.prototype.findCells = function(coordinates) {
    var x = coordinates[0];
    var y = coordinates[1];
    var cell = this.cells[x][y];
    return cell;
}

// CELL
var Cell = function(x, y) {
    this.coordinates = String(x) + String(y);
    this.x = x;
    this.y = y;
    this.color = Config.cellDefaultColor;
    this.el = null;
    this.coordinates = [x, y];
    this.buildHtml();
    this.color = null;
}

Cell.prototype.buildHtml = function() {
    var el = document.createElement("div");
    el.setAttribute("class", "cell " + this.x + this.y);
    this.el = el;
}

Cell.prototype.fillColor = function(color) {
    this.color = color;
    if (!color) { color = this.color;}
    this.el.setAttribute("class", "cell " + color);
}

Cell.prototype.unMarkColor = function() {
    this.el.setAttribute("class", "cell");
}

Cell.prototype.changeCoordinates = function(direction) {
    switch (direction) {
        case 'down':

            break;
    }
}

// PIECE
var Piece = function(shape) {
    this.shape = shape;
    this.currentCoordinates = null;
    this.cells = [];
    this.color = null;
}

Piece.prototype.colorInCells = function(color) {
    this.cells.forEach(function(cell) {
        cell.fillColor(color);;
    })
}

// EVENT LISTENER
var EventListener = function() {
    this.interval = Config.interval
}

EventListener.prototype.startInterval = function(func) {
    setInterval(function() {
        func();
    }, this.interval);
}
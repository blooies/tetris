// 1: grid and random generated pieces that move down w. preview of next piece
// 2: can rotate pieces and move them in different directions - cant move them when hitting grid border or on top of another piece
// 3: when row has been filled
// 4: points

//Grid, Cell, Piece, 
// Cell knows what piece is on it
// Piece knows what cells it is occupying
// Grid holds cells

Config = {
    gridName: 'grid',
    size: {
        width: 10, //10 cells across
        height: 20 //20 cells down
    },
    cellDefaultColor: '#fff',
    colors: [
        'color1', 'color2', 'color3', 'color4', 'color5'
    ]
}

var Grid = function() {
    this.width = Config.size.width;
    this.height = Config.size.height;
    this.gridName = Config.gridName;
    this.el = document.getElementById(this.gridName);
    this.cells = {};
    this.fallingPiece = null;
    this.buildCells();
    this.startGame();
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

Grid.prototype.startGame = function() {
    this.generatePiece();
}

Grid.prototype.generatePiece = function() {
    var piece = new Piece();
    this.fallingPiece = piece;
}

Grid.prototype.assignCellToPiece = function(piece) {

}

var Cell = function(x, y) {
    this.coordinates = String(x) + String(y);
    this.x = x;
    this.y = y;
    this.color = Config.cellDefaultColor;
    this.el = null;
    this.buildHtml();
}

Cell.prototype.buildHtml = function() {
    var el = document.createElement("div");
    el.setAttribute("class", "cell " + this.x + this.y);
    this.el = el;
}

var Piece = function() {
    this.shape = null;
    this.currentCoordinates = null;
    this.cells = [];
    this.generateRandomShape();
}

Piece.prototype  = {
    colors: Config.colors,
    shapes: [
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
    ]
}

Piece.prototype.generateRandomShape = function() {
    var randomNum = this.generateRandomNumber(this.shapes.length);
    var randomShape = this.shapes[randomNum];
    this.shape = randomShape;
    this.currentCoordinates = randomShape;
    this.colorShape();
}

Piece.prototype.generateRandomNumber = function(notIncluding) {
    return Math.floor(Math.random() * notIncluding);
}

Piece.prototype.colorShape = function() {
    var randomNum = this.generateRandomNumber(this.colors.length);
    var randomColor = this.colors[randomNum];
    this.colorCell(this.currentCoordinates, randomColor);
}



Piece.prototype.colorCell = function(coordinates, color) {

}
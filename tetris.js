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
        //1 . . . . X . . . .
        //2 . . . . X . . . .
        //3 . . . . X . . . .
        //4 . . . . X . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . X X X X . . .
        //2 . . . . . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .
        shapeOne = [
            [
                [5, 1],
                [5, 2],
                [5, 3],
                [5, 4]
            ],
            [
                [3, 1],
                [4, 1],
                [5, 1],
                [6, 1]
            ]
        ],

        //shape L
        //0 1 2 3 4 5 6 7 8 9
        //1 . . . X . . . . .
        //2 . . . X . . . . .
        //3 . . . X X . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . X X X . . .
        //2 . . . X . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . X X . . .
        //2 . . . . . X . . .
        //3 . . . . . X . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . . X . . .
        //2 . . . X X X . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        shapeTwo = [
            [
                [4, 1],
                [4, 2],
                [4, 3],
                [5, 3]
            ],
            [
                [4, 1],
                [4, 2],
                [5, 1],
                [6, 1]
            ],
            [
                [5, 1],
                [6, 1],
                [6, 2],
                [6, 3]
            ],
            [
                [4, 2],
                [5, 2],
                [6, 1],
                [6, 2]
            ]
        ]
    ],
    interval: 1000
}

// TETRIS
var Tetris = function() {
    this.fallingPiece = null;
    this.grid = new Grid();
    this.eventListener = new EventListener(this);
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
    this.eventListener.startTimer();
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
    this.assignCellsToPiece(piece);
    var color = this.getRandomColor();
    piece.colorInCells(color);
}

Tetris.prototype.assignCellsToPiece = function(piece) {
    var coords = piece.shape;
    for (var i=0; i<coords.length; i++) {
        var cell = this.grid.assignCells(coords[i]);
        piece.cells.unshift(cell);
    }
}

Tetris.prototype.getRandomColor = function() {
    var randomNum = this.generateRandomNumber(this.colors.length);
    var randomColor = this.colors[randomNum];
    return randomColor;
}

Tetris.prototype.changeCoordinates = function(cells, coords, direction) {
    var boundaries = {
        x: Config.size.width - 1,
        y: Config.size.height - 1
    }

    for (var i=0; i<coords.length; i++) {
        var x = coords[i][0],
            y = coords[i][1];

        switch (direction) {
            case 'down':
                y = y + 1;
                break;
            case 'left':
                x = x + 1;
                break;
            case 'right':
                x = x - 1;
                break;
        }

        if (x < 0) {
            console.log(x)
            x = x + 1;
        } else if (x > boundaries.x) {
            console.log(x)
            x = x - 1;
        }

        if (y > boundaries.y) {
            console.log('reached bottom')
            y = y - 1;
        }

        coords[i] = [x, y];
        cells[i] = this.grid.assignCells(coords[i]);
    }
}

Tetris.prototype.movePiece = function(piece, direction) {
    var cells = piece.cells;
    for (var i=0; i<cells.length; i++) {
        cells[i].unMark();
    }
    this.changeCoordinates(cells, piece.currentCoordinates, direction);
    piece.colorInCells();
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

Grid.prototype.assignCells = function(coordinate) {
    var x = coordinate[0];
    var y = coordinate[1];
    var cell = this.cells[x][y]
    return cell;
}


// CELL
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

Cell.prototype.fillColor = function(color) {
    this.el.setAttribute("class", "cell " + color);
}

Cell.prototype.unMark = function() {
    this.el.setAttribute("class", "cell");
}


// PIECE
var Piece = function(shape) {
    this.shape = shape;
    this.currentCoordinates = shape;
    this.cells = [];
    this.color = null;
}

Piece.prototype.colorInCells = function(color) {
    if (color) this.color = color;
    if (!color && this.color) color = this.color;
    this.cells.forEach(function(cell) {
        cell.fillColor(color);
    })
}


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
    var piece = this.tetris.fallingPiece;
    this.tetris.movePiece(piece, 'down');
}

EventListener.prototype.listenForKeyPresses = function(event) {
    var piece = this.tetris.fallingPiece;
    switch (event.keyCode) {
        case 37: //left
            this.tetris.movePiece(piece, 'right');
            break;
        case 39: //right
            console.log('39');
            this.tetris.movePiece(piece, 'left');
            break;
        case 40: //down
            console.log('40')
            this.tetris.movePiece(piece, 'down');
            break;
        case 32: //space to rotate
            console.log('32');
            break;
        case 13: //enter for pause
            clearInterval(timer);
            break;
    }
}


//when the pieces are falling down,
// the cells do not change. the cells are like coordinates.
// BUT the cells in the piece() change and then they redraw themselves
// 1: grid and random generated pieces that move down w. preview of next piece
// 2: can rotate pieces and move them in different directions - cant move them when hitting grid border or on top of another piece
// 3: when row has been filled
// 4: points

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
    shapes: [
        //shape I
        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . X . . . .
        //2 . . . . X . . . .
        //3 . . . . X . . . .
        //4 . . . . X . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . . . . . .
        //2 . . . . . . . . .
        //3 . . . . . . . . .
        //4 . . X X X X . . .
        shapeOne = [
            [
                [5, 1],
                [5, 2],
                [5, 3],
                [5, 4]
            ],
            [
                [3, 4],
                [4, 4],
                [5, 4],
                [6, 4]
            ]
        ],

        //shape L
        //0 1 2 3 4 5 6 7 8 9
        //1 . . . X . . . . .
        //2 . . . X . . . . .
        //3 . . . X X . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . . . . . .
        //2 . . . X X X . . .
        //3 . . . X . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . X X . . .
        //2 . . . . . X . . .
        //3 . . . . . X . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . . . . . .
        //2 . . . . . X . . .
        //3 . . . X X X . . .
        //4 . . . . . . . . .

        shapeTwo = [
            [
                [4, 1],
                [4, 2],
                [4, 3],
                [5, 3]
            ],
            [
                [4, 2],
                [5, 2],
                [6, 2],
                [4, 3]
            ],
            [
                [5, 1],
                [6, 1],
                [6, 2],
                [6, 3]
            ],
            [
                [4, 3],
                [5, 3],
                [6, 3],
                [6, 2]
            ]
        ],

        //shape backwards L
        //0 1 2 3 4 5 6 7 8 9
        //1 . . . X . . . . .
        //2 . . . X . . . . .
        //3 . . X X . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . . . . . .
        //2 . . X . . . . . .
        //3 . . X X X . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . X X . . . . .
        //2 . . X . . . . . .
        //3 . . X . . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . . . . . .
        //2 . . X X X . . . .
        //3 . . . . X . . . .
        //4 . . . . . . . . .
        shapeThree = [
            [
                [4, 1],
                [4, 2],
                [4, 3],
                [3, 3]
            ],
            [
                [3, 2],
                [3, 3],
                [4, 3],
                [5, 3]
            ],
            [
                [3, 1],
                [4, 1],
                [3, 2],
                [3, 3]
            ],
            [
                [3, 2],
                [4, 2],
                [5, 2],
                [5, 3]
            ]
        ],

        //shape square 
        //0 1 2 3 4 5 6 7 8 9
        //1 . . . X X . . . .
        //2 . . . X X . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .
        shapeFour = [
            [
                [4, 1],
                [5, 1],
                [4, 2],
                [5, 2]
            ]
        ],

        //shape T
        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . . . . . .
        //2 . . X X X . . . .
        //3 . . . X . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . X . . . .
        //2 . . . X X . . . .
        //3 . . . . X . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . . . . . .
        //2 . . . X . . . . .
        //3 . . X X X . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . X . . . . . .
        //2 . . X X . . . . .
        //3 . . X . . . . . .
        //4 . . . . . . . . .
        shapeFive = [
            [
                [3, 2],
                [4, 2],
                [5, 2],
                [4, 3]
            ],
            [
                [4, 2],
                [5, 1],
                [5, 2],
                [5, 3]
            ],
            [
                [3, 3],
                [4, 2],
                [4, 3],
                [5, 3]
            ],
            [
                [3, 1],
                [3, 2],
                [3, 3],
                [4, 2]
            ]
        ],

        //shape Z
        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . . . . . .
        //2 . . X X . . . . .
        //3 . . . X X . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . X . . . .
        //2 . . . X X . . . .
        //3 . . . X . . . . .
        //4 . . . . . . . . .

        shapeSix = [
            [
                [3, 2],
                [4, 2],
                [4, 3],
                [5, 3]
            ],
            [
                [4, 2],
                [4, 3],
                [5, 1],
                [5, 2]
            ],
        ],

        //shape backwards Z
        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . . . . . .
        //2 . . . X X . . . .
        //3 . . X X . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . X . . . . .
        //2 . . . X X . . . .
        //3 . . . . X . . . .
        //4 . . . . . . . . .
        shapeSeven = [
            [
                [4, 2],
                [5, 2],
                [3, 3],
                [4, 3]
            ],
            [
                [4, 1],
                [4, 2],
                [5, 2],
                [5, 3]
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
    var randomNum = this.getRandomNumber(this.shapes.length);
    var randomShape = this.shapes[randomNum];
    return randomShape;
}

Tetris.prototype.getRandomNumber = function(notIncluding) {
    return Math.floor(Math.random() * notIncluding);
}

Tetris.prototype.generateRandomPiece = function(shape) {
    var randomOrientation = this.getRandomNumber(shape.length);
    var piece = new Piece(shape, randomOrientation);
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
Tetris.prototype.changeCoordinates = function(cells, piece, direction) {
    var boundaries = {
        x: Config.size.width - 1,
        y: Config.size.height - 1
    }

    var coords = piece.currentCoordinates;
    piece.resetMoves();
    this.grid.setAllowedMoves(piece, direction);
    if (piece.allowedMoves[direction]) {
        if (direction == 'rotate') {
            piece.rotate();
            var cells = [];
            piece.currentCoordinates.forEach(function(coord) {
                var cell = this.grid.getCell(coord);
                cells.push(cell);
            })
            piece.cells = cells;
        } else {
            for (var i = 0; i < coords.length; i++) {
                var x = coords[i][0],
                    y = coords[i][1];

                switch (direction) {
                    case 'down':
                        y = y + 1;
                        break;
                    case 'left':
                        x = x - 1;
                        break;
                    case 'right':
                        x = x + 1;
                        break;
                }

                coords[i] = [x, y];
                cells[i] = this.grid.getCell(coords[i]);
            }
        }
    }
}

Tetris.prototype.dropNewPiece = function() {
    var shape = this.generateRandomShape();
    this.generateRandomPiece(shape);
}

// this is the function that gets triggered by the EventListener for each interval
Tetris.prototype.movePiece = function(piece, direction) {
    if (piece.fallen) {
        this.markCellsAsFilled(piece);
        this.fallingPiece = null;
        this.dropNewPiece();
    } else {
        var cells = piece.cells;
        for (var i = 0; i < cells.length; i++) {
            cells[i].unMark();
        }
        this.changeCoordinates(cells, piece, direction);
        piece.colorInCells();
    }
}

Tetris.prototype.markCellsAsFilled = function(piece) {
    for (var i=0; i<piece.cells.length; i++) {
        var cell = piece.cells[i];
        this.grid.markCells(cell);
    }
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

Grid.prototype.getCell = function(coordinates) {
    var x = coordinates[0];
    var y = coordinates[1];

    if (x >= 0 && x <= Config.size.width - 1 && y <= Config.size.height - 1) {
        var cell = this.cells[x][y];
        return cell;
    }
}

Grid.prototype.markCells = function(cell) {
    cell.mark();
}

Grid.prototype.setAllowedMoves = function(piece, direction) {
    for (var i=0; i<piece.currentCoordinates.length; i++) {
        var currentCoordinate = piece.currentCoordinates[i];
        var originalX = currentCoordinate[0];
        var originalY = currentCoordinate[1];
        var xLeft = originalX - 1;
        var xRight = originalX + 1;
        var yDown = originalY + 1;
        var xLeftCell = this.getCell([xLeft, originalY]);
        var xRightCell = this.getCell([xRight, originalY]);
        var yDownCell = this.getCell([originalX, yDown]);

        if (direction == 'down') {
            if (yDown >= Config.size.height || yDownCell.marked) {
                piece.allowedMoves.down = false;
                piece.allowedMoves.left = false;
                piece.allowedMoves.right = false;
                console.log('setting piece.fallen as TRUE')
                piece.fallen = true;
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

    return piece.allowedMoves[direction];
}

var Cell = function(x, y) {
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

Cell.prototype.mark = function() {
    this.marked = true;
}


// PIECE
var Piece = function(shape, orientation) {
    this.orientations = shape;
    this.currentOrientation = orientation;
    this.currentCoordinates = shape[orientation];
    this.cells = [];
    this.color = null;
    this.resetMoves();
}

Piece.prototype.resetMoves = function() {
    this.allowedMoves = {
        'right': true,
        'left': true,
        'down': true,
        'rotate': true
    }
}

Piece.prototype.colorInCells = function(color) {
    if (color) this.color = color;
    if (!color && this.color) color = this.color;
    this.cells.forEach(function(cell) {
        cell.fillColor(color);
    })
}

Piece.prototype.rotate = function() {
    console.log('inside rotate..')
    var originalCoords = this.orientations[this.currentOrientation];
    //set it to the next orientation;
    if (this.currentOrientation < this.orientations.length - 1) {
        this.currentOrientation += 1;
    } else if (this.currentOrientation == this.orientations.length - 1) {
        this.currentOrientation = 0;
    }

    //get the current coords
    var currentCoords = this.currentCoordinates;
    //get offset from original coordinates (where it was first plopped on top) to now current coordinates (current location);
    //offset is the same for all the coords, so just grab the first one to do calculations
    var originalX = originalCoords[0][0];
    var originalY = originalCoords[0][1];
    var x = currentCoords[0][0];
    var y = currentCoords[0][1];
    var xOffset = x - originalX;
    var yOffset = y - originalY;

    //calculate the new rotation based on these offsets
    var originalNextOrientation = this.orientations[this.currentOrientation];
    console.log(originalNextOrientation)
    debugger;
    var coords = [];
    for (var i=0; i<originalNextOrientation.length; i++) {
        var coord = originalNextOrientation[i];
        var x = coord[0];
        var y = coord[1];
        x = x + xOffset;
        y = y + yOffset;
        coords.push([x,y]);
    }
    console.log('new coords', coords)
    this.currentCoordinates = coords;
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
            this.tetris.movePiece(piece, 'left');
            break;
        case 39: //right
            this.tetris.movePiece(piece, 'right');
            break;
        case 40: //down
            this.tetris.movePiece(piece, 'down');
            break;
        case 32: //space to rotate
            this.tetris.movePiece(piece, 'rotate');
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
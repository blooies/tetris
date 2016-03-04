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
    shapes: [
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
        ],

        //shape backwards L
        //0 1 2 3 4 5 6 7 8 9
        //1 . . . X . . . . .
        //2 . . . X . . . . .
        //3 . . X X . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . X . . . . . .
        //2 . . X X X . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . X X . . . .
        //2 . . . X . . . . .
        //3 . . . X . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . X X X . . . .
        //2 . . . . X . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .
        shapeThree = [
            [
                [4, 1],
                [4, 2],
                [4, 3],
                [3, 3]
            ],
            [
                [3, 1],
                [3, 2],
                [4, 2],
                [5, 2]
            ],
            [
                [4, 1],
                [5, 1],
                [4, 2],
                [4, 3]
            ],
            [
                [3, 1],
                [4, 1],
                [5, 1],
                [5, 2]
            ]
        ],

        //shape square 
        //0 1 2 3 4 5 6 7 8 9
        //1 . . X X . . . . .
        //2 . . X X . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .
        shapeFour = [
            [
                [3, 1],
                [4, 1],
                [3, 2],
                [4, 2]
            ]
        ],

        //shape T
        //0 1 2 3 4 5 6 7 8 9
        //1 . . X X X . . . .
        //2 . . . X . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . X . . . .
        //2 . . . X X . . . .
        //3 . . . . X . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . X . . . . .
        //2 . . X X X . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . X . . . . . .
        //2 . . X X . . . . .
        //3 . . X . . . . . .
        //4 . . . . . . . . .
        shapeFive = [
            [
                [3, 1],
                [4, 1],
                [5, 1],
                [4, 2]
            ],
            [
                [4, 2],
                [5, 1],
                [5, 2],
                [5, 3]
            ],
            [
                [4, 1],
                [3, 2],
                [4, 2],
                [5, 2]
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
        //1 . . X X . . . . .
        //2 . . . X X . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . . X . . . .
        //2 . . . X X . . . .
        //3 . . . X . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . X X . . . . .
        //2 . . . X X . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . X . . . . .
        //2 . . X X . . . . .
        //3 . . X . . . . . .
        //4 . . . . . . . . .
        shapeSix = [
            [
                [3, 1],
                [4, 1],
                [4, 2],
                [5, 2]
            ],
            [
                [4, 2],
                [4, 3],
                [5, 1],
                [5, 2]
            ],
            [
                [3, 1],
                [4, 1],
                [4, 2],
                [5, 2]
            ],
            [
                [3, 2],
                [3, 3],
                [4, 1],
                [4, 2]
            ]
        ],

        //shape backwards Z
        //0 1 2 3 4 5 6 7 8 9
        //1 . . . X X . . . .
        //2 . . X X . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . X . . . . .
        //2 . . . X X . . . .
        //3 . . . . X . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . . X X . . . .
        //2 . . X X . . . . .
        //3 . . . . . . . . .
        //4 . . . . . . . . .

        //0 1 2 3 4 5 6 7 8 9
        //1 . . X . . . . . .
        //2 . . X X . . . . .
        //3 . . . X . . . . .
        //4 . . . . . . . . .
        shapeSeven = [
            [
                [4, 1],
                [5, 1],
                [3, 2],
                [4, 2]
            ],
            [
                [4, 1],
                [4, 2],
                [5, 2],
                [5, 3]
            ],
            [
                [3, 2],
                [4, 2],
                [4, 1],
                [5, 1]
            ],
            [
                [3, 1],
                [3, 2],
                [4, 2],
                [4, 3]
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
    console.log("NEW PIECE", piece)

    this.assignCellsToPiece(piece);
    piece.cells.forEach(function(cell) {
        if (cell == undefined) {
            console.log("STOP")
            debugger;
        }
    })
    var color = this.getRandomColor();
    piece.colorInCells(color);
}

Tetris.prototype.assignCellsToPiece = function(piece) {
    var coords = piece.currentCoordinates;
    for (var i = 0; i < coords.length; i++) {
        var cell = this.grid.assignCells(coords[i]);
        piece.cells.unshift(cell);
    }
}

Tetris.prototype.getRandomColor = function() {
    var randomNum = this.getRandomNumber(this.colors.length);
    var randomColor = this.colors[randomNum];
    return randomColor;
}

Tetris.prototype.changeCoordinates = function(cells, piece, direction) {
    var boundaries = {
        x: Config.size.width - 1,
        y: Config.size.height - 1
    }

    var coords = piece.currentCoordinates;
    piece.resetMoves();
    if (this.grid.checkMoves(piece, direction)) {
        if (direction == 'rotate') {
            console.log('going to call rotate..')
            piece.rotate();
            var cells = [];
            piece.currentCoordinates.forEach(function(coord) {
                var cell = this.grid.assignCells(coord);
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
                cells[i] = this.grid.assignCells(coords[i]);
            }
        }
    }
}

Tetris.prototype.dropNewPiece = function() {
    var shape = this.generateRandomShape();
    this.generateRandomPiece(shape);
}


Tetris.prototype.movePiece = function(piece, direction) {
    console.log(piece)
    console.log(piece.fallen)
    if (piece.fallen) {
        console.log("MARKING...")
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
    console.log("MARKING>..")
    for (var i=0; i<piece.cells.length; i++) {
        var cell = piece.cells[i];
        this.grid.markCells(cell);
        console.log("***************", cell);
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

Grid.prototype.assignCells = function(coordinates) {
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

Grid.prototype.checkMoves = function(piece, direction) {
    for (var i=0; i<piece.currentCoordinates.length; i++) {
        var currentCoordinate = piece.currentCoordinates[i];
        var originalX = currentCoordinate[0];
        var originalY = currentCoordinate[1];
        var xLeft = originalX - 1;
        var xRight = originalX + 1;
        var yDown = originalY + 1;
        console.log(originalX, yDown)
        var xLeftCell = this.assignCells([xLeft, originalY]);
        var xRightCell = this.assignCells([xRight, originalY]);
        var yDownCell = this.assignCells([originalX, yDown]);

        if (direction == 'down') {
            console.log("**********", yDownCell)
            if (yDown >= Config.size.height || yDownCell.marked) {
                piece.allowedMoves.down = false;
                piece.allowedMoves.left = false;
                piece.allowedMoves.right = false;
                console.log('setting piece.fallen as TRUE')
                console.log(piece)
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

    console.log(piece.allowedMoves)
    return piece.allowedMoves[direction];
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

Piece.prototype.checkMoves = function(direction) {
    this.resetMoves();
    for (var i=0; i<this.currentCoordinates.length; i++) {
        var currentCoordinate = this.currentCoordinates[i];
        var xLeft = currentCoordinate[0] - 1;
        var xRight = currentCoordinate[0] + 1;
        var yDown = currentCoordinate[1] + 1;

        if (direction == 'down') {
            if (yDown >= Config.size.height) {
                this.allowedMoves.down = false;
                this.allowedMoves.left = false;
                this.allowedMoves.right = false;
                console.log('setting piece.fallen as TRUE')
                console.log(this)
                this.fallen = true;
            }
        }

        if (direction == 'left') {
            if (xLeft < 0) {
                this.allowedMoves.left = false;
            }
        }

        if (direction == 'right') {
            if (xRight >= Config.size.width) {
                this.allowedMoves.right = false;
            }
        }
    }

    console.log(this.allowedMoves)
    return this.allowedMoves[direction];
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
    var originalCoords = this.shape[this.currentOrientation];

    //set it to the next orientation;
    if (this.currentOrientation < this.orientations.length) {
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
    var originalNextOrientation = this.shape[this.currentOrientation];
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

// Piece.prototype.setAllowedMoves = function() {
//     this.resetMoves();
//     var self = this;
//     this.currentCoordinates.forEach(function(coordinate) {
//         var x = coordinate[0];
//         var y = coordinate[1];
//         var xLeftCoordinate = x - 1;
//         var xRightCoordinate = x + 1;
//         var yDownCoordinate = y + 1;

//         if (x - 1 < 0) {
//             self.allowedMoves.left = false;
//             console.log("SETTING LEFT FALSE")
//         }

//         if (x + 1 >= Config.size.width) {
//             self.allowedMoves.right = false;
//             console.log("SETTING RIGHT FALSE")
//         }

//         if (y + 1 >= Config.size.height) {
//             self.allowedMoves.down = false;
//             self.allowedMoves.right = false;
//             self.allowedMoves.left = false;
//             self.fallen = true;
//         }
//     })
// }


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
            console.log('39');
            this.tetris.movePiece(piece, 'right');
            break;
        case 40: //down
            console.log('40')
            this.tetris.movePiece(piece, 'down');
            break;
        case 32: //space to rotate
            console.log('32');
            console.log('space btn pressed!')
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


//when the pieces are falling down,
// the cells do not change. the cells are like coordinates.
// BUT the cells in the piece() change and then they redraw themselves
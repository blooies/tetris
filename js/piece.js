// PIECE
var Piece = function(shapeOrientations, orientation, grid) {
    this.grid = grid;
    this.orientations = shapeOrientations; //all the different x,y points when the piece is first dropped;
    
    this.currentOrientationIndex = orientation; //current orientation index;
    this.currentCoordinates = shapeOrientations[orientation]; //this will be changed as the piece is dropping;
    this.cells = []; //actual cell elements that correspond to current coordinates;
    
    this.color = null;
    this.allowedMoves = null;
    this.resetMoves();
    this.fallen = false;
    this.reachedTopOfBoard = false;
}

Piece.prototype.resetMoves = function() {
    this.allowedMoves = {
        'right': true,
        'left': true,
        'down': true,
        'rotate': true
    }
}

Piece.prototype.markCells = function(color) {
    if (color) this.color = color;
    if (!color && this.color) color = this.color;
    for (var i=0; i<this.cells.length; i++) {
        this.cells[i].mark(color, this);
    }
}

Piece.prototype.unMarkCells = function() {
    for (var i=0; i<this.cells.length; i++) {
        this.cells[i].unMark(this);
    }
}

Piece.prototype.obliviateCells = function() {
    this.unMarkCells();
    this.cells = [];
}

Piece.prototype.growCells = function() {
    this.reassignCells();
    this.markCells();
}

Piece.prototype.reassignCells = function() {
    for (var i=0; i<this.currentCoordinates.length; i++) {
        var coord = this.currentCoordinates[i];
        var cell = this.grid.getCell(coord);
        this.cells.unshift(cell);
    }
}



Piece.prototype.getNewOrientationIndex = function(currentOrientationIndex) {
    var orientationIndex;
    if (this.currentOrientationIndex == this.orientations.length - 1) {
        orientationIndex = 0;
    } else {
        orientationIndex = currentOrientationIndex + 1;
    }

    return orientationIndex;
}


Piece.prototype.getOffsetsBasedOnRotation = function(originalPosition, newPosition) {
    var offsets = [];
    for (var i=0; i<originalPosition.length; i++) {
        var x = originalPosition[i][0];
        var y = originalPosition[i][1];
        var newX = newPosition[i][0];
        var newY = newPosition[i][1];
        var offsetX = x - newX;
        var offsetY = y - newY;
        offsets.push([offsetX, offsetY]);
    }

    return offsets;
}


Piece.prototype.getCoordinatesBasedOnOffsets = function(currentCoordinates, offsets) {
    var newCoordinates = [];
    for (var i=0; i<currentCoordinates.length; i++) {
        var coordinates = currentCoordinates[i];
        var offset = offsets[i];
        var newX = coordinates[0] - offset[0];
        var newY = coordinates[1] - offset[1];
        newCoordinates.push([newX, newY]);
    }

    return newCoordinates;
}


//updates orientation index and current coordinates;
Piece.prototype.getRotationCoordinates = function() {
    var newOrientationIndex = this.getNewOrientationIndex(this.currentOrientationIndex);
    var originalCoords = this.orientations[this.currentOrientationIndex];
    var originalCoordsOfRotation = this.orientations[newOrientationIndex];
    var offsets = this.getOffsetsBasedOnRotation(originalCoords, originalCoordsOfRotation);
    var newCoordinates = this.getCoordinatesBasedOnOffsets(this.currentCoordinates, offsets);
    
    var rotatedCellsAreOnMarkedCellsOrOutOfBoard = this.grid.checkIfCellsAreMarkedOrOutOfBoard(newCoordinates);

    if (!rotatedCellsAreOnMarkedCellsOrOutOfBoard) {
        this.currentCoordinates = newCoordinates;
        this.currentOrientationIndex = newOrientationIndex;
    }
}


Piece.prototype.getCoordinates =  function(direction) {
    var coords = this.currentCoordinates;
    var updatedCoords = [];

    for (var i=0; i<coords.length; i++) {
        var coord = coords[i];
        var x = coord[0];
        var y = coord[1];
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
        updatedCoords.push([x, y]);
    }

    this.currentCoordinates = updatedCoords;
}
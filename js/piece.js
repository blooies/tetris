// PIECE
var Piece = function(shapeOrientations, orientation) {
    this.orientations = shapeOrientations; //all the different x,y points when the piece is first dropped;
    this.currentOrientation = orientation; //integer;
    this.currentCoordinates = shapeOrientations[orientation];//this will be changed as the piece is dropping;
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
    for (var i=0; i<this.cells.length; i++) {
        var cell = this.cells[i];
        cell.fillColor(color);
    }
}


Piece.prototype.getNewOrientationIndex = function(currentOrientationIndex) {
    var orientationIndex;
    if (this.currentOrientation == this.orientations.length - 1) {
        orientationIndex = 0;
    } else {
        orientationIndex = currentOrientationIndex + 1;
    }

    return orientationIndex;
}



//  //shape I
//         //* 1 2 3 4 5 6 7 8 9
//         //0 . . . . X . . . .
//         //1 . . . . X . . . .
//         //2 . . . . X . . . .
//         //3 . . . . X . . . .
//         //4 . . . . . . . . .

//         //* 1 2 3 4 5 6 7 8 9
//         //0 . . X X X X . . .
//         //1 . . . . . . . . .
//         //2 . . . . . . . . .
//         //3 . . . . . . . . .
//         //4 . . . . . . . . .

Piece.prototype.getOffsetsBasedOnRotation = function(originalPosition, newPosition) {
    var offsets = [];
    for (var i=0; i<originalPosition.length; i++) {
        var x = originalPosition[i][0];
        var y = originalPosition[i][1];
        var newX = newPosition[i][0];
        var newY = newPosition[i][1];
        var offsetX = newX - x;
        var offsetY = newY - y;
        offsets.push([offsetX, offsetY]);
    }

    return offsets;
}


Piece.prototype.getNewCoordinatesBasedOnOffsets = function(currentCoordinates, offsets) {
    var newCoordinates = [];
    for (var i=0; i<currentCoordinates.length; i++) {
        var coordinates = currentCoordinates[i];
        var offset = offsets[i];
        var newX = coordinates[0] + offset[0];
        var newY = coordinates[1] + offset[1];
        newCoordinates.push([newX, newY]);
    }

    return newCoordinates;
}

Piece.prototype.rotate = function() {
    var newOrientationIndex = this.getNewOrientationIndex(this.currentOrientation);
    var originalCoordinations = this.orientations[this.currentOrientation];
    var newOriginalCoordinations = this.orientations[newOrientationIndex];
    var offsets = this.getOffsetsBasedOnRotation(originalCoordinations, newOriginalCoordinations);
    var newCoordinates - this.getNewCoordinatesBasedOnOffsets(this.currentCoordinates, offsets);
    this.currentCoordinates = newCoordinates;
    piece.colorInCells();
}


// Piece.prototype.rotate = function() {
//     var originalCoords = this.orientations[this.currentOrientation];
//     //set it to the next orientation;
//     if (this.currentOrientation < this.orientations.length - 1) {
//         this.currentOrientation += 1;
//     } else if (this.currentOrientation == this.orientations.length - 1) {
//         this.currentOrientation = 0;
//     }

//     //get the current coords
//     var currentCoords = this.currentCoordinates;
//     //get offset from original coordinates (where it was first plopped on top) to now current coordinates (current location);
//     //offset is the same for all the coords, so just grab the first one to do calculations
//     var originalX = originalCoords[0][0];
//     var originalY = originalCoords[0][1];
//     var x = currentCoords[0][0];
//     var y = currentCoords[0][1];
//     var xOffset = x - originalX;
//     var yOffset = y - originalY;

//     //calculate the new rotation based on these offsets
//     var originalNextOrientation = this.orientations[this.currentOrientation];
//     var coords = [];
//     for (var i=0; i<originalNextOrientation.length; i++) {
//         var coord = originalNextOrientation[i];
//         var x = coord[0];
//         var y = coord[1];
//         x = x + xOffset;
//         y = y + yOffset;
//         coords.push([x,y]);
//     }
//     console.log('new coords', coords)
//     this.currentCoordinates = coords;
// }

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

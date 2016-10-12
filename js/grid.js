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

    return null;
}

Grid.prototype.markCells = function(cell) {
    cell.mark();
}

// Grid.prototype.checkForMatchingCells = function(cell) {
//     var up = this.getCell(cell.getUpNeighbor());
//     var down = this.getCell(cell.getDownNeighbor());
//     var left = this.getCell(cell.getLeftNeighbor());
//     var right = this.getCell(cell.getRightNeighbor());
//     var neighbors = [up, down, left, right];
//     for (var i=0; i<neighbors.length; i++) {
//         if (neighbors[i] &&
//             neighbors[i].marked && 
//             (neighbors[i].color == cell.color) &&
//             !Object.is(neighbors[i].piece, cell.piece)) {
//             var piece = neighbors[i].getPiece();
//             piece.emptyCells();
//             console.log("emptying piece cells...")
//         }
//     }
// }

Grid.prototype.checkForFilledRows = function() {
    for (var rowIndex=0; rowIndex<Config.size.height; rowIndex++) {
        var filledRow = this.checkForAFilledRow(rowIndex);
        if (filledRow) {
            this.emptyRow(rowIndex);
        }
    }
}

Grid.prototype.emptyRow = function(rowIndex) {
    for (var x=0; x<Config.size.width; x++) {
        var coord = [x, rowIndex];
        var cell = this.getCell(coord);
        var piece = cell.piece.unMark(cell);
        console.log("UNMARKIGN CELL", cell)
        cell.unMark();
    }
    //clear cell color && marked && piece
    //remove cell from piece
    //remove current coords from piece


}

Grid.prototype.checkForAFilledRow = function(rowIndex) {
    var filled = true;
    var y = rowIndex;
    for (var x=0; x<Config.size.width; x++) {
        var cell = this.getCell([x, y]);
        if (cell && !cell.marked) {
            filled = false;
        }
    }
    return filled;
}

Grid.prototype.checkIfCellsAreMarkedOrOutOfBoard = function(coords) {
    for (var i=0; i<coords.length; i++) {
        var cell = this.getCell(coords[i]);
        if (cell && cell.marked) {
            console.log('returning true..')
            return true;
        } else if (!cell) {
            console.log("RETURNING TRUE HERE TOOO!!!")
            return true;
        }
    }

    return false;
}

// Grid.prototype.setAllowedMoves = function(piece, direction) {
//     piece.resetMoves();

//     for (var i=0; i<piece.currentCoordinates.length; i++) {
//         var currentCoordinate = piece.currentCoordinates[i];
//         var originalX = currentCoordinate[0];
//         var originalY = currentCoordinate[1];
//         var xLeft = originalX - 1;
//         var xRight = originalX + 1;
//         var yDown = originalY + 1;
//         var xLeftCell = this.getCell([xLeft, originalY]);
//         var xRightCell = this.getCell([xRight, originalY]);
//         var yDownCell = this.getCell([originalX, yDown]);

//         if (direction == 'down') {
//             if (yDown >= Config.size.height || yDownCell.marked) {
//                 piece.allowedMoves.down = false;
//                 piece.allowedMoves.left = false;
//                 piece.allowedMoves.right = false;
//                 console.log('setting piece.fallen as TRUE')
//                 piece.fallen = true;
//                 if (this.checkIfPieceReachedTop(piece)) {
//                     console.log("DONEE")
//                     piece.reachedTopOfBoard = true;
//                     clearInterval(timer);
//                 }
//             }
//         }

//         if (direction == 'left') {
//             if (xLeft < 0 || xLeftCell.marked) {
//                 piece.allowedMoves.left = false;
//             }
//         }

//         if (direction == 'right') {
//             if (xRight >= Config.size.width || xRightCell.marked) {
//                 piece.allowedMoves.right = false;
//             }
//         }

//     }
// }


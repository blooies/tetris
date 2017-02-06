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

// Grid.prototype.checkForFilledRows = function() {
//     var rowIndices = [];
//     for (var rowIndex=0; rowIndex<Config.size.height; rowIndex++) {
//         var filledRow = this.checkForAFilledRow(rowIndex);
//         if (filledRow) {
//             // this.emptyRow(rowIndex);
//             this.rowIndices.push(rowIndex);
//         }
//     }

//     return rowIndices;
// }

// Grid.prototype.emptyRows = function(rowIndices) {
//     for (var i=0; i<rowIndices.length; i++) {
//         this.emptyRow(rowIndices[i]);
//     }
//     //clear cell color && marked && piece
//     //remove cell from piece
//     //remove current coords from piece
// }

// Grid.prototype.emptyRow = function(rowIndex) {
//     for (var x=0; x<Config.size.width; x++) {
//         var coord = [x, rowIndex];
//         var cell = this.getCell(coord);
//         var piece = cell.piece.unMark(cell);
//         console.log("UNMARKIGN CELL", cell)
//         cell.unMark();
//     }
// }

// Grid.prototype.checkForAFilledRow = function(rowIndex) {
//     var filled = true;
//     var y = rowIndex;
//     for (var x=0; x<Config.size.width; x++) {
//         var cell = this.getCell([x, y]);
//         if (cell && !cell.marked) {
//             filled = false;
//         }
//     }
//     return filled;
// }

Grid.prototype.emptyRow = function(rowIndex) {
    console.log("EMPTY ROW!!!")
    for (var x=0; x<Config.size.width; x++) {
        var coord = [x, rowIndex];
        var cell = this.getCell(coord);
        cell.emptyColor();
        cell.unMark();
    }
}

Grid.prototype.emptyFilledRows = function() {
    var rowMapper = this.getRowsFilled();
    console.log(rowMapper)
    for (key in rowMapper) {
        console.log("key in rowmapper", key)
        if (rowMapper[key]) {
            console.log("empty row..")
            this.emptyRow(key);
        }
    }
}


Grid.prototype.getRowsFilled = function() {
    var rowMapper = {};
    for (var y=0; y<Config.size.height; y++) {
        rowMapper[y] = true;
        for (var x=0; x<Config.size.height; x++) {
            var cell = this.getCell([x, y]);
            if (cell && !cell.marked) {
                rowMapper[y] = false;
            }
        }
    }
    
    return rowMapper;
}

Grid.prototype.checkIfCellsAreMarkedOrOutOfBoard = function(coords) {
    for (var i=0; i<coords.length; i++) {
        var cell = this.getCell(coords[i]);
        if (cell && cell.marked) {
            return true;
        } else if (!cell) {
            return true;
        }
    }

    return false;
}
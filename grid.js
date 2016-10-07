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

var time = 0;
Grid.prototype.appendCell = function(cell) {
    time += 1;
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
    piece.resetMoves();

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
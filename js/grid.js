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


Grid.prototype.emptyRow = function(rowIndex) {
    console.log("EMPTY ROW!!!")
    for (var x=0; x<Config.size.width; x++) {
        var coord = [x, rowIndex];
        var cell = this.getCell(coord);
        //cell disappears;
        cell.emptyColor();
        cell.unMark();
    }
}

Grid.prototype.emptyFilledRows = function(rows) {
    for (var i=0; i<rows.length; i++) {
        this.emptyRow(rows[i].index);
    }
}


Grid.prototype.getFilledRows = function() {
    var rows = [];
    for (var y=0; y<Config.size.height; y++) {
        var rowMapper = {};
        rowMapper['index'] = y;
        for (var x=0; x<Config.size.height; x++) {
            var cell = this.getCell([x, y]);
            console.log(x, y, cell);
            if (cell && !cell.marked) {
                rowMapper['index'] = false;
            }
        }
        if (rowMapper['index']) rows.push(rowMapper);
    }
    
    return rows;
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
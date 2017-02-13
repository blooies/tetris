// GRID
var Grid = function() {
    this.width = Config.size.width;
    this.height = Config.size.height;
    this.gridName = Config.gridName;
    this.el = document.getElementById(this.gridName);
    this.previewEl = document.getElementById(this.previewName);
    this.cells = {};
    this.previewCells = {};
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

Grid.prototype.buildPreview = function() {
    for (var i=0; i<this.height/2; i++) {
        var y = i;
        for (var j=0; j<this.width; j++) {
            var x = j;
            var cell = new Cell(x, y);
            this.appendPreviewCell(cell);
            if (!this.previewCells[x]) {
                this.previewCells[x] = {};
            }
            this.previewCells[x][y] = cell;
        }
    }
}

Grid.prototype.appendCell = function(cell) {
    this.el.appendChild(cell.el);
}

Grid.prototype.appendPreviewCell = function(cell) {
    this.previewEl.appendChild(cell.el);
}

Grid.prototype.getCell = function(params) {
    var coordinates = params.coordinates;
    var typeOfCell = params.cells;
    var x = coordinates[0];
    var y = coordinates[1];

    if (x >= 0 && x <= Config.size.width - 1 && y <= Config.size.height - 1) {
        var cell = this[typeOfCell][x][y];
        return cell;
    }

    return null;
}

Grid.prototype.emptyRow = function(rowIndex) {
    for (var x=0; x<Config.size.width; x++) {
        var coord = [x, rowIndex];
        var cell = this.getCell({
            coordinates: coord,
            cells: 'cells'
        });
        cell.unMark();
    }
}

Grid.prototype.emptyFilledRows = function(rows) {
    var self = this;
    return new Promise(function(resolve, reject) {
        for (var i=0; i<rows.length; i++) {
            self.emptyRow(rows[i]);
        }
        resolve('');
    });
}

Grid.prototype.getFilledRows = function() {
    var rows = [];
    for (var y=0; y<Config.size.height; y++) {
        var rowMapper = {};
        rowMapper[y] = true;
        for (var x=0; x<Config.size.height; x++) {
            var cell = this.getCell({
                coordinates: [x, y],
                cells: 'cells'
            });
            if (cell && !cell.marked) {
                rowMapper[y] = false;
            }
        }
        if (rowMapper[y]) rows.push(y);
    }
    
    return rows;
}


Grid.prototype.moveAllCellsDown = function(filledRows) {
    var self = this;
    return new Promise(function(resolve, reject) {
        for (xIndex in self.cells) {
            var column = self.cells[xIndex];
            var i = Config.size.height;
            while (i--) {
                //get the last cell in this column;
                var cell = column[i];
                var y = cell['y'];
                if (cell.defaultColor !== cell.color) {
                    var filledRowsBelowCell = 0;
                    for (var j=0; j<filledRows.length; j++) {
                        if (y < filledRows[j]) {
                            filledRowsBelowCell += 1;
                        }
                    }
                    var downCell = column[i + filledRowsBelowCell];

                    var down = 1;
                    function getBottomestDownCell(downCell) {
                        var next = column[i + filledRowsBelowCell + down];
                        if (!next || next.defaultColor !== next.color) {
                            return downCell;
                        }
                        
                        while (next && next.defaultColor == next.color && next['y'] < Config.size.height - 1) {
                            down += 1;
                            next = column[i + filledRowsBelowCell + down];
                        }

                        // return next;
                        if (next.defaultColor !== next.color) {
                            return column[i + filledRowsBelowCell + down - 1]
                        } else {
                            return next;
                        }
                    }

                    if (filledRowsBelowCell !== 0 && downCell && downCell.defaultColor === downCell.color) {
                        var bottom = getBottomestDownCell(downCell);
                        bottom.colorIn(cell.color);
                        bottom.mark();
                        cell.unMark();
                    }
                }
            }
        }
        resolve('');
    });
}

Grid.prototype.checkIfCellsAreMarkedOrOutOfBoard = function(coords) {
    for (var i=0; i<coords.length; i++) {
        var cell = this.getCell({
            coordinates: coords[i],
            cells: 'cells'
        });
        if (cell && cell.marked) {
            return true;
        } else if (!cell) {
            return true;
        }
    }

    return false;
}
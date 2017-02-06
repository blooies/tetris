var Cell = function(x, y) {
    this.x = x;
    this.y = y;
    this.defaultColor = Config.cellDefaultColor;
    this.color = Config.cellDefaultColor;
    this.el = null;
    this.piece = null;
    this.marked = false;
    this.buildHtml();
}

Cell.prototype.buildHtml = function() {
    var el = document.createElement("div");
    el.setAttribute("class", "cell " + this.x + this.y);
    this.el = el;
}

Cell.prototype.colorIn = function(color) {
    this.el.setAttribute("class", "cell " + color);
    this.color = color;
}

Cell.prototype.mark = function(piece) {
    this.marked = true;
    this.piece = piece;
}

Cell.prototype.unMark = function() {
    this.marked = false;
    this.piece = null;
}

Cell.prototype.emptyColor = function() {
    this.el.setAttribute("class", "cell");
    this.color = this.defaultColor;
}

Cell.prototype.getUpNeighbor = function() {
    var y = this.y - 1;
    return [this.x, y];
}

Cell.prototype.getDownNeighbor = function() {
    var y = this.y + 1;
    return [this.x, y];
}

Cell.prototype.getRightNeighbor = function() {
    var x = this.x + 1;
    return [x, this.y];
}

Cell.prototype.getLeftNeighbor = function() {
    var x = this.x - 1;
    return [x, this.y];
}

Cell.prototype.getPiece = function() {
    return this.piece;
}
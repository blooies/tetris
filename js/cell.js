var Cell = function(x, y) {
    this.x = x;
    this.y = y;
    this.defaultColor = Config.cellDefaultColor;
    this.color = Config.cellDefaultColor;
    this.el = null;
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

Cell.prototype.mark = function() {
    this.marked = true;
}

Cell.prototype.unMark = function() {
    this.marked = false;
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

Cell.prototype.highlight = function(color) {
    this.el.classList.add('highlight');
    this.el.classList.add(color);
}

Cell.prototype.removeHighlight = function(color) {
    this.el.classList.remove('highlight');
    this.el.classList.remove(color);
}
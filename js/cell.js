var Cell = function(x, y) {
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

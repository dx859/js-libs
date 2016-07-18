function ComponentChartPie() {
    this.width = 400;
    this.height = 400;

    this.cns = document.createElement('canvas');
    this.ctx = this.cns.getContext('2d');

    this.cns.className = "chartpie";
    this.cns.style.width = this.width / 2 + 'px';
    this.cns.style.height = this.height / 2 + 'px';
    this.cns.width = this.width;
    this.cns.height = this.height;

    function setStyle(ele, opts) {
        var x;
        for (x in opts) {
            ele.style[x] = opts[x];
        }
    }

    document.getElementById('app').appendChild(this.cns);
}

ComponentChartPie.prototype.drawBg = function(color) {
    color = color ? color : '#eee';
    this._drawPie(0, 2 * Math.PI, color);

    return this;
};

ComponentChartPie.prototype.drawPie = function(data) {
    var sAngel = 1.5 * Math.PI; // 起始角度
    var eAngel = 0; // 结束角度
    var aAngel = 2 * Math.PI;

    var colors = ['red', 'green', 'blue', '#a00', 'orange'];
    var step = data.length;

    for (var i = 0; i < step; i++) {
        var item = data[i];
        if (!item.color) item.color = colors[i % 5];

        eAngel = sAngel + aAngel * item.per;
        this._drawPie(sAngel, eAngel, item.color);
        sAngel = eAngel;
    }

    return this;
};

ComponentChartPie.prototype.animateDrawPie = function(data) {
    
};

ComponentChartPie.prototype._drawPie = function(sAngel, eAngel, color) {
    var ctx = this.ctx;
    var r = this.width / 2;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.1;

    ctx.moveTo(r, r);
    ctx.arc(r, r, r, sAngel, eAngel);
    ctx.fill();
    ctx.stroke();
};

module.exports = ComponentChartPie;

function Comete(img, x, y) {
	this._img = img;
	this._x = x;
	this._y = y;
	this._radius = 30;
	this._startAngle = 0;
	this._endAngle = 2 * Math.PI;
}

Comete.prototype.descendre = function(speed) {
	this._y = this._y + 1 * GAME_SPEED;
}
/*Object.defineProperty(MathCommand.prototype, "x",
	{
		get: function() {
			return this._x;
		},
		set: function(value) {
			return this._x = value;
		}
	}


var mc = new MathCommand(...);
mc.x = 50;
console.log(mc.x)*/
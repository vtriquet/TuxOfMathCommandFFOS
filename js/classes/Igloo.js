/**************************************************************************************************
***************************************************************************************************
Constructeur Igloo
/**************************************************************************************************
**************************************************************************************************/
function Igloo(img, x, y) {
	this.img = img;
	this.x = x;
	this.y = y;
	aListIgloo.push(this);
}

/**************************************************************************************************
***************************************************************************************************
Dessine l'igloo sur le Canvas
/**************************************************************************************************
**************************************************************************************************/
Igloo.prototype.draw = function () {
	ctx.drawImage(this.img, this.x, this.y);
 }
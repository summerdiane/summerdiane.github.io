var dataObj=function()
{
	this.fruitNum=0;
	this.double=1;
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;
}
dataObj.prototype.draw=function()
{
	var w=can1.width;
	var h=can1.height;

	ctx1.save();
	ctx1.shadowBlur = 8;
	ctx1.shadowColor = "white";
	ctx1.fillStyle="white";
	ctx1.fillText("SCORE: " +this.score,w*0.5,h-20);

	if(this.gameOver)
	{
		this.alpha += deltaTime * 0.0003;
		if(this.alpha > 1)
			this.alpha = 1;
		ctx1.fillStyle = "rgba(224,242,29," + this.alpha +")";
		ctx1.fillText("gameOver",w*0.5,h*0.2,);
		ctx1.drawImage(over0,w*0.29,h*0.3,w*0.2,h*0.25);
		ctx1.drawImage(over1,w*0.52,h*0.3,w*0.2,h*0.25);
		ctx1.fillText("春风十里",w*0.5,h*0.65);
		ctx1.fillText("皆不如你",w*0.5,h*0.72);
		ctx1.fillText("——tasty food is everything",w*0.7,h*0.79);
	}
	ctx1.restore();
}
dataObj.prototype.addScore = function()
{
	this.score += this.fruitNum * 100 * this.double;
	this.fruitNum = 0;
	this.double = 1;
}
var smallObj=function()
{
	this.x;
	this.y;
	this.angle;

	this.smallTailTimer=0;
	this.smallTailCount=0;

	this.smallEyeTimer=0;
	this.smallEyeCount=0;
	this.smallEyeInterval=1000;

	this.smallBodyTimer=0;
	this.smallBodyCount=0;

}
smallObj.prototype.init=function()
{
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
}
smallObj.prototype.draw=function()
{
	//lerp x,y
	this.x = lerpDistance(big.x,this.x,0.99);
	this.y = lerpDistance(big.y,this.y,0.99);

	var deltaY=big.y-this.y;
	var deltaX=big.x-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	//lerp angle
	this.angle=lerpAngle(beta,this.angle,0.6);

	//small tail count
	this.smallTailTimer+=deltaTime;
	if (this.smallTailTimer>50) 
	{
		this.smallTailCount=(this.smallTailCount+1)%8;
		this.smallTailTimer%=50;
	}

	//small eye
	this.smallEyeTimer+=deltaTime;
	if (this.smallEyeTimer>this.smallEyeInterval) 
	{
		this.smallEyeCount=(this.smallEyeCount+1)%2;
		this.smallEyeTimer%=this.smallEyeInterval;

		if (this.smallEyeCount==0) 
		{
			this.smallEyeInterval=Math.random()*1500+2000;
		}else
		{
			this.smallEyeInterval=200;
		}
	}

	//small body 
	this.smallBodyTimer+=deltaTime;
	if (this.smallBodyTimer>200)
	{
		this.smallBodyCount=this.smallBodyCount+1;
		this.smallBodyTimer%=200;
		if(this.smallBodyCount>19)
		{
			this.smallBodyCount=19;
			//game over
			data.gameOver = true;
		}
	}

	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);

	var smallTailCount=this.smallTailCount;
	ctx1.drawImage(smallTail[smallTailCount],-smallTail[smallTailCount].width*0.5+25,-smallTail[smallTailCount].height*0.5);

	var smallBodyCount=this.smallBodyCount;
	ctx1.drawImage(smallBody[smallBodyCount],-smallBody[smallBodyCount].width*0.5,-smallBody[smallBodyCount].height*0.5);

	var smallEyeCount=this.smallEyeCount;
	ctx1.drawImage(smallEye[smallEyeCount],-smallEye[smallEyeCount].width*0.5,-smallEye[smallEyeCount].height*0.5);

	ctx1.restore();
}